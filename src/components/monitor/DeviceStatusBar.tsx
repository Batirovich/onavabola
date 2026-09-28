import { Cpu, Droplets, Plug, Thermometer, Wifi } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DEVICE_STATUS } from '@/data/monitor';

function StatusChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
      <span className="text-turquoise-300">{icon}</span>
      <div className="leading-tight">
        <div className="text-[11px] uppercase tracking-wide text-night-50">{label}</div>
        <div className="text-sm font-semibold text-white">{value}</div>
      </div>
    </div>
  );
}

export function DeviceStatusBar() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="flex items-center gap-2 rounded-full border border-turquoise-400/40 bg-turquoise-500/10 px-3.5 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turquoise-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-turquoise-400" />
        </span>
        <span className="text-sm font-semibold text-turquoise-200">{t('monitor.deviceStatus.online')}</span>
      </div>

      <StatusChip icon={<Plug className="h-4 w-4" />} label={t('monitor.deviceStatus.powered')} value="✓" />
      <StatusChip
        icon={<Wifi className="h-4 w-4" />}
        label={t('monitor.deviceStatus.wifi')}
        value={`${DEVICE_STATUS.wifiStrength}/4`}
      />
      <StatusChip
        icon={<Thermometer className="h-4 w-4" />}
        label={t('monitor.deviceStatus.roomTemp')}
        value={`${DEVICE_STATUS.roomTempC}°C`}
      />
      <StatusChip
        icon={<Droplets className="h-4 w-4" />}
        label={t('monitor.deviceStatus.humidity')}
        value={`${DEVICE_STATUS.roomHumidityPct}%`}
      />
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-night-50">
        <Cpu className="h-3.5 w-3.5 text-turquoise-300" aria-hidden="true" />
        {t('monitor.deviceStatus.onDeviceBadge')}
      </div>
    </div>
  );
}
