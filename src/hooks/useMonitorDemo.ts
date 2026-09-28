import { useCallback, useEffect, useReducer, useRef } from 'react';
import {
  confidenceForDay,
  DEMO_LEARNING_DAY,
  FAMILY_ALERTS,
  LEARNING_WINDOW_DAYS,
  predictReasons,
  type FamilyAlertMember,
  type ReasonProbability,
} from '@/data/monitor';
import { lastFeedForNow } from '@/data/monitorStats';
import type { CryReason } from '@/data/types';

export type BabyState = 'sleeping' | 'awake' | 'crying';

export interface ActiveCry {
  startedAt: number;
  predictions: ReasonProbability[];
  lastFeedMinutesAgo: number;
  sleptForMin: number;
  stage: 'notifying' | 'analyzing' | 'result' | 'feedback-given';
  confirmedReason: CryReason | null;
  timeToCalmMin: number | null;
}

interface State {
  babyState: BabyState;
  stateSince: number;
  learningDay: number;
  confidence: number;
  activeCry: ActiveCry | null;
  family: FamilyAlertMember[];
  fastForwarding: boolean;
  feedToast: boolean;
  cryLogToday: number;
}

type Action =
  | { type: 'CRY_START'; predictions: ReasonProbability[]; lastFeedMinutesAgo: number; sleptForMin: number }
  | { type: 'CRY_ANALYZED' }
  | { type: 'CRY_FEEDBACK'; reason: CryReason }
  | { type: 'CRY_DISMISS' }
  | { type: 'SIMULATE_WAKING' }
  | { type: 'SIMULATE_FEEDING' }
  | { type: 'FAST_FORWARD_TICK' }
  | { type: 'FAST_FORWARD_DONE' }
  | { type: 'FAST_FORWARD_START' }
  | { type: 'TOGGLE_FAMILY'; id: string }
  | { type: 'FEED_TOAST_DONE' };

function initialState(): State {
  return {
    babyState: 'sleeping',
    stateSince: Date.now(),
    learningDay: DEMO_LEARNING_DAY,
    confidence: confidenceForDay(DEMO_LEARNING_DAY),
    activeCry: null,
    family: FAMILY_ALERTS,
    fastForwarding: false,
    feedToast: false,
    cryLogToday: 0,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CRY_START':
      return {
        ...state,
        babyState: 'crying',
        stateSince: Date.now(),
        activeCry: {
          startedAt: Date.now(),
          predictions: action.predictions,
          lastFeedMinutesAgo: action.lastFeedMinutesAgo,
          sleptForMin: action.sleptForMin,
          stage: 'notifying',
          confirmedReason: null,
          timeToCalmMin: null,
        },
      };
    case 'CRY_ANALYZED':
      return state.activeCry ? { ...state, activeCry: { ...state.activeCry, stage: 'result' } } : state;
    case 'CRY_FEEDBACK': {
      if (!state.activeCry) return state;
      const timeToCalmMin = Math.max(1, Math.round((Date.now() - state.activeCry.startedAt) / 1000 / 4));
      const nextDay = Math.min(LEARNING_WINDOW_DAYS, state.learningDay + 1);
      return {
        ...state,
        learningDay: nextDay,
        confidence: Math.min(96, confidenceForDay(nextDay) + (state.confidence - confidenceForDay(state.learningDay))),
        activeCry: { ...state.activeCry, stage: 'feedback-given', confirmedReason: action.reason, timeToCalmMin },
        cryLogToday: state.cryLogToday + 1,
      };
    }
    case 'CRY_DISMISS':
      return { ...state, babyState: 'sleeping', stateSince: Date.now(), activeCry: null };
    case 'SIMULATE_WAKING':
      return { ...state, babyState: 'awake', stateSince: Date.now() };
    case 'SIMULATE_FEEDING':
      return { ...state, feedToast: true };
    case 'FEED_TOAST_DONE':
      return { ...state, feedToast: false };
    case 'FAST_FORWARD_START':
      return { ...state, fastForwarding: true };
    case 'FAST_FORWARD_TICK':
      return state.learningDay >= LEARNING_WINDOW_DAYS
        ? state
        : { ...state, learningDay: state.learningDay + 1, confidence: confidenceForDay(state.learningDay + 1) };
    case 'FAST_FORWARD_DONE':
      return { ...state, fastForwarding: false, learningDay: LEARNING_WINDOW_DAYS, confidence: confidenceForDay(LEARNING_WINDOW_DAYS) };
    case 'TOGGLE_FAMILY':
      return { ...state, family: state.family.map((f) => (f.id === action.id ? { ...f, enabled: !f.enabled } : f)) };
    default:
      return state;
  }
}

export function useMonitorDemo() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const simulateCry = useCallback(() => {
    if (state.activeCry) return;
    const now = new Date();
    const { minutesAgo } = lastFeedForNow(now);
    const sleptForMin = 60 + Math.round(Math.random() * 60);
    const predictions = predictReasons(
      { timeSinceLastFeedMin: minutesAgo, sleptBeforeMin: sleptForMin, hour: now.getHours() },
      state.confidence,
    );
    dispatch({ type: 'CRY_START', predictions, lastFeedMinutesAgo: minutesAgo, sleptForMin });
    const t = window.setTimeout(() => dispatch({ type: 'CRY_ANALYZED' }), 1600);
    timers.current.push(t);
  }, [state.activeCry, state.confidence]);

  const giveFeedback = useCallback((reason: CryReason) => {
    dispatch({ type: 'CRY_FEEDBACK', reason });
  }, []);

  const dismissCry = useCallback(() => dispatch({ type: 'CRY_DISMISS' }), []);
  const simulateWaking = useCallback(() => dispatch({ type: 'SIMULATE_WAKING' }), []);

  const simulateFeeding = useCallback(() => {
    dispatch({ type: 'SIMULATE_FEEDING' });
    const t = window.setTimeout(() => dispatch({ type: 'FEED_TOAST_DONE' }), 2400);
    timers.current.push(t);
  }, []);

  const fastForward = useCallback(() => {
    if (state.fastForwarding || state.learningDay >= LEARNING_WINDOW_DAYS) return;
    dispatch({ type: 'FAST_FORWARD_START' });
    let ticks = 0;
    const total = LEARNING_WINDOW_DAYS - state.learningDay;
    const interval = window.setInterval(() => {
      ticks++;
      dispatch({ type: 'FAST_FORWARD_TICK' });
      if (ticks >= total) {
        window.clearInterval(interval);
        dispatch({ type: 'FAST_FORWARD_DONE' });
      }
    }, 220);
  }, [state.fastForwarding, state.learningDay]);

  const toggleFamily = useCallback((id: string) => dispatch({ type: 'TOGGLE_FAMILY', id }), []);

  return { state, simulateCry, giveFeedback, dismissCry, simulateWaking, simulateFeeding, fastForward, toggleFamily };
}
