import { createRng } from '@/data/seed';
import type { Bilingual } from '@/data/types';

const rng = createRng(7042026);

export type ChannelId = 'pregnancy' | 'newborn' | 'sleep' | 'feeding' | 'speech' | 'recovery' | 'mentalHealth';

export interface Channel {
  id: ChannelId;
  name: Bilingual;
  description: Bilingual;
}

export const CHANNELS: Channel[] = [
  { id: 'pregnancy', name: { uz: 'Homiladorlik', en: 'Pregnancy' }, description: { uz: 'Homiladorlik davri haqida suhbatlar', en: 'Conversations about pregnancy' } },
  { id: 'newborn', name: { uz: 'Chaqaloq parvarishi', en: 'Newborn care' }, description: { uz: 'Birinchi oylar boʻyicha savol-javoblar', en: 'Questions and answers about the first months' } },
  { id: 'sleep', name: { uz: 'Uyqu', en: 'Sleep' }, description: { uz: 'Uyqu tartibi va qiyinchiliklari', en: 'Sleep routines and struggles' } },
  { id: 'feeding', name: { uz: 'Ovqatlantirish', en: 'Feeding' }, description: { uz: 'Emizish va qoʻshimcha ovqatlanish', en: 'Breastfeeding and weaning' } },
  { id: 'speech', name: { uz: 'Nutq rivoji', en: 'Speech' }, description: { uz: 'Bolalarda nutq va til rivoji', en: "Children's speech and language development" } },
  { id: 'recovery', name: { uz: 'Tiklanish', en: 'Recovery' }, description: { uz: 'Tugʻruqdan keyingi tiklanish', en: 'Postpartum recovery' } },
  { id: 'mentalHealth', name: { uz: 'Ruhiy salomatlik', en: 'Mental health' }, description: { uz: 'His-tuygʻular va ruhiy holat', en: 'Feelings and emotional wellbeing' } },
];

export interface CommunityAuthor {
  pseudonym: string;
  region: string;
  contextLabel: Bilingual;
  avatarSeed: string;
}

const AUTHOR_POOL: CommunityAuthor[] = [
  { pseudonym: 'Quyosh', region: 'tashkent-city', contextLabel: { uz: '3 oylik bola onasi', en: 'Mother of a 3-month-old' }, avatarSeed: 'quyosh' },
  { pseudonym: 'Bahor', region: 'samarqand', contextLabel: { uz: '24-hafta homilador', en: '24 weeks pregnant' }, avatarSeed: 'bahor' },
  { pseudonym: 'Gulnora', region: 'fargona', contextLabel: { uz: '3 yoshli bola onasi', en: 'Mother of a 3-year-old' }, avatarSeed: 'gulnora' },
  { pseudonym: 'Sevinch', region: 'buxoro', contextLabel: { uz: '8-oylik bola onasi', en: 'Mother of an 8-month-old' }, avatarSeed: 'sevinch' },
  { pseudonym: 'Munira', region: 'andijon', contextLabel: { uz: '12-hafta homilador', en: '12 weeks pregnant' }, avatarSeed: 'munira' },
  { pseudonym: 'Zilola', region: 'namangan', contextLabel: { uz: '5 yoshli bola onasi', en: 'Mother of a 5-year-old' }, avatarSeed: 'zilola' },
  { pseudonym: 'Shahnoza', region: 'qashqadaryo', contextLabel: { uz: '2 oylik bola onasi', en: 'Mother of a 2-month-old' }, avatarSeed: 'shahnoza' },
  { pseudonym: 'Dilorom', region: 'surxondaryo', contextLabel: { uz: 'homilador rejalashtirmoqda', en: 'planning a pregnancy' }, avatarSeed: 'dilorom' },
  { pseudonym: 'Madina', region: 'xorazm', contextLabel: { uz: '1 yoshli bola onasi', en: 'Mother of a 1-year-old' }, avatarSeed: 'madina-c' },
  { pseudonym: 'Kamola', region: 'navoiy', contextLabel: { uz: '18-hafta homilador', en: '18 weeks pregnant' }, avatarSeed: 'kamola' },
  { pseudonym: 'Ozoda', region: 'jizzax', contextLabel: { uz: '4 yoshli bola onasi', en: 'Mother of a 4-year-old' }, avatarSeed: 'ozoda' },
  { pseudonym: 'Feruza', region: 'sirdaryo', contextLabel: { uz: '6 oylik bola onasi', en: 'Mother of a 6-month-old' }, avatarSeed: 'feruza' },
  { pseudonym: 'Sitora', region: 'qoraqalpogiston', contextLabel: { uz: '30-hafta homilador', en: '30 weeks pregnant' }, avatarSeed: 'sitora' },
  { pseudonym: 'Nodira', region: 'tashkent-region', contextLabel: { uz: '2 yoshli bola onasi', en: 'Mother of a 2-year-old' }, avatarSeed: 'nodira' },
  { pseudonym: 'Yulduz', region: 'samarqand', contextLabel: { uz: '5-oylik bola onasi', en: 'Mother of a 5-month-old' }, avatarSeed: 'yulduz' },
];

const MIDWIFE_AUTHOR: CommunityAuthor = {
  pseudonym: 'Hamshira Gulbahor',
  region: 'tashkent-city',
  contextLabel: { uz: 'Tasdiqlangan patronaj hamshirasi', en: 'Verified patronage nurse' },
  avatarSeed: 'midwife-gulbahor',
};

export interface CommunityReply {
  id: string;
  author: CommunityAuthor;
  body: Bilingual;
  verifiedMidwife: boolean;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  channel: ChannelId;
  author: CommunityAuthor;
  title: Bilingual;
  body: Bilingual;
  createdAt: string;
  replies: CommunityReply[];
}

const GENERIC_REPLIES: Bilingual[] = [
  { uz: 'Menda ham xuddi shunday boʻlgan, vaqt oʻtishi bilan yaxshi boʻldi. Sabr qiling 🤍', en: 'I went through the exact same thing — it got better with time. Hang in there 🤍' },
  { uz: 'Judayam foydali fikr, rahmat baham koʻrganingiz uchun!', en: 'This is really helpful, thank you for sharing!' },
  { uz: 'Bizning oilada ham shunday, doim yolgʻiz emassiz deb oʻylang.', en: "It's the same in our family — remember you're never alone in this." },
  { uz: 'Shifokorimga aytganimda ham xuddi shu tavsiyani berishdi.', en: 'My doctor gave me the exact same advice when I asked.' },
  { uz: 'Judayam tushunaman, menda ham xuddi shu tashvish bor edi.', en: 'I completely understand — I had the same worry.' },
  { uz: 'Omad tilayman sizga, hammasi yaxshi boʻladi!', en: 'Wishing you all the best, it will be okay!' },
  { uz: 'Rahmat, bu postni saqlab qoʻydim, keyinroq kerak boʻladi.', en: 'Thank you, I saved this post — will need it later.' },
  { uz: 'Bizga ham monitor yordam berdi, tavsiya qilaman.', en: 'The monitor helped us too, I recommend it.' },
  { uz: 'Bolam ham xuddi shunday qilardi, katta muammo emas ekan.', en: 'My baby did the exact same thing — turned out not to be a big deal.' },
  { uz: 'Bu haqda patronaj hamshiramga ham aytib qoʻydim, ular ham xabardor.', en: 'I mentioned this to my patronage nurse too, so they know.' },
];

const MIDWIFE_REPLIES: Bilingual[] = [
  { uz: 'Bu tashvishlanarli emas, lekin agar davom etsa, keyingi tashrifda albatta ayting — birga koʻrib chiqamiz.', en: 'This is not a cause for alarm, but if it continues, please mention it at your next visit so we can look at it together.' },
  { uz: 'Yaxshi savol. Umumiy tavsiya shu — lekin har bir bola boshqacha, shaxsiy holatingizni koʻrib chiqish uchun navbatdagi koʻrikka keling.', en: 'Good question. This is the general guidance — but every child is different, so let’s go over your specific case at the next checkup.' },
  { uz: 'Bu haqda tashvishlanmang, bu keng tarqalgan holat. Agar belgilar kuchaysa, menga toʻgʻridan-toʻgʻri yozing.', en: 'No need to worry — this is quite common. If symptoms get stronger, feel free to message me directly.' },
  { uz: 'Sizga alohida yozib, tashrif vaqtini kelishib olaman.', en: "I'll message you directly to arrange a visit time." },
];

const MISINFO_CORRECTION_REPLY: Bilingual = {
  uz: 'Bu maslahat xavfli boʻlishi mumkin — iltimos, tasdiqlanmagan davolash usullarini sinamang va shifokoringiz bilan maslahatlashing.',
  en: 'That advice could be risky — please avoid unverified remedies and check with your doctor first.',
};

function author(): CommunityAuthor {
  return rng.pick(AUTHOR_POOL);
}

function isoDate(daysAgo: number): string {
  const d = new Date('2026-09-28T10:00:00');
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

interface PostSeed {
  channel: ChannelId;
  title: Bilingual;
  body: Bilingual;
  replyTexts: Array<Bilingual | 'midwife' | 'correction'>;
  daysAgo: number;
}

const POST_SEEDS: PostSeed[] = [
  {
    channel: 'pregnancy',
    title: { uz: '24-haftada orqa ogʻrigʻi — bu normalmi?', en: 'Back pain at 24 weeks — is this normal?' },
    body: { uz: 'Soʻnggi hafta orqamda tortishish bor, ayniqsa kechqurun. Kimlarda ham shunday boʻlgan?', en: 'My lower back has been pulling this past week, especially in the evenings. Has anyone else experienced this?' },
    replyTexts: ['midwife', { uz: 'Menda ham 6-oyda boshlangan edi, yostiq bilan yotish yordam berdi.', en: 'Mine started around month 6 too — sleeping with a pillow between my knees helped.' }],
    daysAgo: 2,
  },
  {
    channel: 'pregnancy',
    title: { uz: 'Birinchi skrining natijasi haqida savol', en: 'Question about my first screening results' },
    body: { uz: 'Birinchi skrining natijalarini oldim, lekin raqamlar nimani anglatishini tushunmadim. Kimdir tushuntira oladimi?', en: 'I got my first screening results but I do not understand what the numbers mean. Can anyone explain?' },
    replyTexts: ['midwife', { uz: 'Men ham shu haftada oldim, shifokor batafsil tushuntirib berdi.', en: 'I got mine this week too — my doctor explained it in detail.' }],
    daysAgo: 5,
  },
  {
    channel: 'pregnancy',
    title: { uz: 'Homiladorlik davrida sport bilan shugʻullansa boʻladimi?', en: 'Is it okay to exercise during pregnancy?' },
    body: { uz: 'Homiladorlikdan oldin sport zaliga borardim. Hozir yengil mashqlar qilsam boʻladimi?', en: 'I used to go to the gym before pregnancy. Is it okay to do light exercise now?' },
    replyTexts: [{ uz: 'Shifokorim yengil yurish va yoga tavsiya qildi.', en: 'My doctor recommended light walking and yoga.' }, 'midwife'],
    daysAgo: 9,
  },
  {
    channel: 'pregnancy',
    title: { uz: 'Tuz talab qilinadimi, ovqatlanish boʻyicha maslahat kerak', en: 'Nutrition advice needed for this trimester' },
    body: { uz: 'Ikkinchi trimestrda qanday ovqatlanish toʻgʻri boʻladi? Temir yetishmasligi haqida oʻqidim.', en: 'What is the right diet for the second trimester? I read about iron deficiency being common.' },
    replyTexts: [{ uz: 'Quritilgan oʻrik va jigar menga koʻp yordam berdi.', en: 'Dried apricots and liver helped me a lot.' }],
    daysAgo: 12,
  },
  {
    channel: 'newborn',
    title: { uz: 'Kindik parvarishi boʻyicha savol', en: 'Question about umbilical cord care' },
    body: { uz: 'Kindik hali tushmadi, uni qanday parvarish qilish kerak? Suvga tegishi mumkinmi?', en: 'The umbilical stump has not fallen off yet — how should I care for it? Can it get wet?' },
    replyTexts: ['midwife', { uz: 'Bizniki 10 kunda tushdi, quruq tutish yetarli edi.', en: "Ours fell off around day 10 — keeping it dry was enough." }],
    daysAgo: 1,
  },
  {
    channel: 'newborn',
    title: { uz: 'Sariqlik haqida tashvishdaman', en: 'Worried about jaundice' },
    body: { uz: 'Chaqaloqning terisi biroz sarargʻish. Bu qachon oʻtadi?', en: "My newborn's skin looks slightly yellow. When does this usually go away?" },
    replyTexts: ['midwife', 'midwife'],
    daysAgo: 3,
  },
  {
    channel: 'newborn',
    title: { uz: 'Birinchi vaksinatsiya kuni haqida', en: 'About the first vaccination day' },
    body: { uz: 'Ertaga birinchi vaksinatsiyaga boramiz, biroz hayajondaman. Nimalarga tayyorlanishim kerak?', en: "We're going for the first vaccination tomorrow and I'm a bit nervous. What should I prepare?" },
    replyTexts: [{ uz: 'Ovqatlantirib boring, keyin biroz bezovta boʻlishi mumkin — bu normal.', en: 'Feed before you go — some fussiness afterward is completely normal.' }],
    daysAgo: 6,
  },
  {
    channel: 'newborn',
    title: { uz: 'Chaqaloq terisida mayda toshmalar', en: 'Small rash on newborn skin' },
    body: { uz: 'Yuzida mayda oqish toshmalar bor, xavotirlanishim kerakmi?', en: 'There are small white bumps on the face — should I be concerned?' },
    replyTexts: [{ uz: 'Bu koʻpincha "milia" deb ataladi, oʻz-oʻzidan oʻtadi.', en: 'That is usually just "milia" — it goes away on its own.' }, 'midwife'],
    daysAgo: 10,
  },
  {
    channel: 'sleep',
    title: { uz: 'Kechqurun uxlab qolishi qiyin', en: 'Struggling to settle her in the evening' },
    body: { uz: 'Kechqurun soat 19-21 orasida doim bezovta boʻladi, uxlashi qiyin kechadi. Kimda shunday boʻlgan?', en: 'Between 7-9pm she is always fussy and hard to settle. Anyone else dealt with this?' },
    replyTexts: [{ uz: 'Bu "witching hour" deyiladi, bizda ham xuddi shunday boʻlgan, oʻtib ketadi.', en: 'That’s the "witching hour" — we had it too, it does pass.' }, { uz: 'Yorugʻlikni xiralashtirib, ovozni pasaytirish yordam berdi.', en: 'Dimming the lights and lowering noise helped for us.' }],
    daysAgo: 2,
  },
  {
    channel: 'sleep',
    title: { uz: 'Kunduzgi uyqu qisqa boʻlib qoldi', en: 'Daytime naps have gotten short' },
    body: { uz: '30 daqiqadan koʻp uxlamayapti, kunduzi. Bu normalmi?', en: 'She is not napping more than 30 minutes during the day. Is that normal?' },
    replyTexts: [{ uz: 'Bu davr oʻtadi, bizda ham 2 oy davom etdi.', en: 'This phase passes — ours lasted about 2 months.' }],
    daysAgo: 7,
  },
  {
    channel: 'sleep',
    title: { uz: 'Tungi uyqu uzunroq boʻlyapti, ammo uygʻonish qiyin', en: 'Night sleep is longer but mornings are rough' },
    body: { uz: 'Tunda yaxshi uxlaydi, lekin ertalab uygʻonganda juda bezovta. Sabab nima boʻlishi mumkin?', en: 'She sleeps well at night, but mornings are very fussy. Any idea why?' },
    replyTexts: [{ uz: 'Ertalabki ochlik boʻlishi mumkin, tezroq ovqatlantiring.', en: 'Could be morning hunger — try feeding right away.' }],
    daysAgo: 15,
  },
  {
    channel: 'feeding',
    title: { uz: 'Koʻkrak suti yetarli emasdek tuyulyapti', en: 'Feels like my milk supply is not enough' },
    body: { uz: 'Bolam tez-tez yigʻlayapti, sut yetarli emasdek his qilyapman. Nima qilishim mumkin?', en: 'My baby keeps crying often and I feel like my supply is low. What can I do?' },
    replyTexts: ['midwife', { uz: 'Koʻproq suv ichish va tez-tez emizish menga yordam berdi.', en: 'Drinking more water and feeding more often helped me.' }],
    daysAgo: 4,
  },
  {
    channel: 'feeding',
    title: { uz: 'Qoʻshimcha ovqatga qachon oʻtish kerak?', en: 'When to start introducing solid foods?' },
    body: { uz: '5 oylik boʻldi, atrofdagilar qoʻshimcha ovqat berishni maslahat berishyapti. Erta emasmi?', en: 'She just turned 5 months, and relatives suggest starting solids. Is that too early?' },
    replyTexts: [{ uz: '6 oygacha kutish tavsiya qilinadi, lekin shifokor bilan maslahatlashing.', en: 'Waiting until 6 months is generally recommended, but check with your doctor.' }, 'midwife'],
    daysAgo: 8,
  },
  {
    channel: 'feeding',
    title: { uz: 'Emizish paytida ogʻriq bormi sizlarda ham?', en: 'Does anyone else get pain while breastfeeding?' },
    body: { uz: 'Har safar emizganda biroz ogʻriq bor, bu normalmi?', en: 'There is some pain every time I feed her — is this normal?' },
    replyTexts: [{ uz: 'Toʻgʻri ushlash usulini tekshirtiring, bizda shu sabab edi.', en: 'Get your latch checked — that was the cause for us.' }, 'midwife'],
    daysAgo: 11,
  },
  {
    channel: 'feeding',
    title: { uz: 'Bolam har 2 soatda ovqat soʻraydi, bu koʻp emasmi?', en: 'She wants to feed every 2 hours — is that too often?' },
    body: { uz: '2 oylik bolam juda tez-tez ovqat soʻraydi. Bu normalmi yoki koʻproq narsa bormi?', en: 'My 2-month-old wants to feed very frequently. Is this normal or something else going on?' },
    replyTexts: [{ uz: 'Oʻsish sakrashi boʻlishi mumkin, bir necha kunda oʻtadi.', en: 'Could be a growth spurt — usually passes in a few days.' }],
    daysAgo: 14,
  },
  {
    channel: 'speech',
    title: { uz: '2 yoshda hali kam soʻz gapiryapti', en: 'Still few words at 2 years old' },
    body: { uz: 'Bolam 2 yoshda, lekin atrofidagilarga qaraganda kamroq soʻz ishlatadi. Xavotirlanishim kerakmi?', en: 'My child is 2 and uses fewer words than others their age. Should I be worried?' },
    replyTexts: [{ uz: 'Har bir bola oʻzicha rivojlanadi, lekin nutq terapevtiga koʻrsatish yomon emas.', en: 'Every child develops at their own pace, but a speech therapist check-in cannot hurt.' }, 'midwife'],
    daysAgo: 3,
  },
  {
    channel: 'speech',
    title: { uz: '"R" tovushini talaffuz qilolmayapti', en: 'Cannot pronounce the "r" sound' },
    body: { uz: '4 yoshda, lekin "r" tovushini hali chiqarolmayapti. Bu yoshda normalmi?', en: 'At 4 years old, she still cannot make the "r" sound. Is that normal at this age?' },
    replyTexts: [{ uz: 'Bu yoshda hali normal, koʻpincha 5 yoshgacha shakllanadi.', en: 'That is still within the normal range — it often develops by age 5.' }],
    daysAgo: 6,
  },
  {
    channel: 'speech',
    title: { uz: 'Ilovadagi oʻyinlar haqiqatan foydali ekan', en: 'The app games are actually helpful' },
    body: { uz: '"Hayvon ovozlari" oʻyinini har kuni oʻynaymiz, bolam judayam yoqtiradi va yangi soʻzlar oʻrganyapti.', en: 'We play the "Animal sounds" game every day — she loves it and is picking up new words.' },
    replyTexts: [{ uz: 'Bizda ham xuddi shunday, rahmat tavsiya uchun!', en: 'Same for us — thanks for the recommendation!' }],
    daysAgo: 16,
  },
  {
    channel: 'recovery',
    title: { uz: 'Tugʻruqdan keyin qachon sport qilsa boʻladi?', en: 'When can I start exercising after birth?' },
    body: { uz: 'Tabiiy tugʻruqdan 6 hafta oʻtdi. Yengil mashqlarni boshlasam boʻladimi?', en: 'It has been 6 weeks since a natural birth. Can I start light exercises now?' },
    replyTexts: ['midwife', { uz: 'Tekshiruvdan keyin boshlaganman, judayam yaxshi his qilaman.', en: 'I started after my checkup and I feel great now.' }],
    daysAgo: 2,
  },
  {
    channel: 'recovery',
    title: { uz: 'Choʻzilish chiziqlari uchun nima ishlaydi?', en: 'What actually works for stretch marks?' },
    body: { uz: 'Choʻzilish chiziqlarini butunlay olib tashlaydigan biror narsa bormi? Koʻp krem koʻryapman internetda.', en: 'Is there anything that completely removes stretch marks? I see a lot of creams advertised online.' },
    replyTexts: [{ uz: 'Toʻliq yoʻqolishiga vaʼda beradigan mahsulotlarga ishonmang, namlash yordam beradi xolos.', en: "Don't trust anything promising complete removal — moisturizing just helps a little, that's realistic." }],
    daysAgo: 9,
  },
  {
    channel: 'recovery',
    title: { uz: 'Soch toʻkilishi meni xavotirga solyapti', en: 'Hair loss is worrying me' },
    body: { uz: 'Tugʻruqdan 3 oy oʻtdi, sochim juda koʻp toʻkilyapti. Bu normalmi?', en: "It's been 3 months since giving birth and my hair is shedding a lot. Is this normal?" },
    replyTexts: [{ uz: 'Bu vaqtinchalik, mening ham shunday boʻlgan, 6 oyda toʻxtadi.', en: 'This is temporary — mine did the same and stopped around 6 months.' }, 'midwife'],
    daysAgo: 13,
  },
  {
    channel: 'mentalHealth',
    title: { uz: 'Har doim charchagan va gʻamgin his qilyapman', en: 'I feel tired and low all the time' },
    body: { uz: 'Bolam tugʻilganidan beri koʻp vaqt oʻzimni gʻamgin his qilyapman. Bu meningina boshimdami?', en: 'Since my baby was born I have often felt down. Am I the only one going through this?' },
    replyTexts: ['midwife', { uz: 'Yolgʻiz emassiz, men ham shunday his qilganman, gaplashish yordam berdi.', en: "You are not alone — I felt this too, and talking to someone helped." }],
    daysAgo: 1,
  },
  {
    channel: 'mentalHealth',
    title: { uz: 'Tunlar juda qiyin kechyapti, uxlay olmayapman', en: 'Nights are really hard, I cannot sleep' },
    body: { uz: 'Bolam uxlab qolgandan keyin ham men uxlolmayapman, xavotir meni tark etmayapti.', en: 'Even after the baby falls asleep, I cannot sleep — the worry never seems to leave.' },
    replyTexts: ['midwife'],
    daysAgo: 4,
  },
  {
    channel: 'mentalHealth',
    title: { uz: 'Yordam soʻrash uyat emasligini angladim', en: 'I realized asking for help is not shameful' },
    body: { uz: 'Uzoq vaqt hech kimga aytmay yurdim, oxiri hamshiram bilan gaplashdim va yengil tortdim.', en: "For a long time I did not tell anyone, but I finally spoke to my nurse and it lifted a weight off me." },
    replyTexts: [{ uz: 'Bu postni oʻqib, men ham qadam tashladim, rahmat sizga.', en: 'Reading this pushed me to take that step too — thank you.' }, { uz: 'Judayam qadrli fikr, koʻpchilikka kerak boʻladi.', en: 'This is such a valuable share, many will need to read it.' }],
    daysAgo: 8,
  },
  {
    channel: 'mentalHealth',
    title: { uz: 'Onalik haqida internetdagi maslahatlar meni bezovta qilyapti', en: 'Online parenting advice is stressing me out' },
    body: { uz: 'Har xil manbalarda qarama-qarshi maslahatlar bor, kimga ishonishni bilmayman.', en: 'Different sources give conflicting advice and I do not know who to trust.' },
    replyTexts: [{ uz: 'Faqat tasdiqlangan manbalarga ishoning, shifokoringiz bilan tekshiring.', en: 'Trust only verified sources, and double-check with your doctor.' }, 'correction'],
    daysAgo: 17,
  },
  {
    channel: 'pregnancy',
    title: { uz: 'Homiladorlikda uyda tayyorlangan "dori"lar haqida ogohlantirish', en: 'A warning about home remedies during pregnancy' },
    body: { uz: 'Qoʻshnim homiladorlikda maxsus oʻtlar qaynatib ichishni maslahat berdi, kim biladi bu xavfsizmi?', en: 'My neighbor suggested drinking a boiled herbal mix during pregnancy — does anyone know if that is safe?' },
    replyTexts: ['correction', 'midwife'],
    daysAgo: 5,
  },
  {
    channel: 'newborn',
    title: { uz: 'Vaksinatsiyadan voz kechish haqida fikringiz?', en: 'What do you think about skipping vaccinations?' },
    body: { uz: 'Bir guruhda vaksinatsiyadan voz kechish haqida koʻp yozishyapti, chalkashib qoldim.', en: 'I saw a group where people are saying to skip vaccinations, and now I am confused.' },
    replyTexts: ['correction', 'midwife', { uz: 'Bizning pediatr rejaga qatʼiy amal qilishni tavsiya qildi.', en: 'Our pediatrician strongly recommended sticking to the schedule.' }],
    daysAgo: 6,
  },
  {
    channel: 'feeding',
    title: { uz: 'Sotib olish uchun taklif — ona suti kamaytiruvchi choy', en: 'For sale — tea to reduce milk supply' },
    body: { uz: '[reklama posti — moderatsiya tomonidan olib tashlangan misol]', en: '[example ad post — shown here as removed by moderation]' },
    replyTexts: [],
    daysAgo: 20,
  },
  {
    channel: 'sleep',
    title: { uz: 'Kecha uxlamadi, judayam charchadim', en: 'She did not sleep last night, I am exhausted' },
    body: { uz: 'Kecha deyarli uxlamadi, ertalab kuch-quvvatim qolmadi. Sizlarda ham shunday kunlar boʻladimi?', en: 'She barely slept last night and I have no energy left this morning. Do you all have days like this too?' },
    replyTexts: [{ uz: 'Har birimizda shunday kunlar boʻladi, imkon qadar dam oling.', en: 'We all have days like this — rest whenever you can.' }],
    daysAgo: 18,
  },
  {
    channel: 'speech',
    title: { uz: 'Ikki tilli muhitda tarbiyalash haqida', en: 'Raising a child in a bilingual environment' },
    body: { uz: 'Uyda oʻzbek va rus tillarida gaplashamiz, bu nutq rivojiga xalaqit berishi mumkinmi?', en: 'We speak both Uzbek and Russian at home — could this slow down speech development?' },
    replyTexts: [{ uz: 'Aksincha, koʻp tadqiqotlar ikki tillilik foydali ekanini koʻrsatadi.', en: 'Actually, a lot of research suggests bilingualism is a benefit, not a hindrance.' }],
    daysAgo: 19,
  },
];

function buildReplies(seeds: PostSeed['replyTexts']): CommunityReply[] {
  return seeds.map((seed, i) => {
    if (seed === 'midwife') {
      return {
        id: `reply-${rng.int(100000, 999999)}`,
        author: MIDWIFE_AUTHOR,
        body: rng.pick(MIDWIFE_REPLIES),
        verifiedMidwife: true,
        createdAt: isoDate(rng.int(0, 3) + i),
      };
    }
    if (seed === 'correction') {
      return {
        id: `reply-${rng.int(100000, 999999)}`,
        author: MIDWIFE_AUTHOR,
        body: MISINFO_CORRECTION_REPLY,
        verifiedMidwife: true,
        createdAt: isoDate(rng.int(0, 3) + i),
      };
    }
    return {
      id: `reply-${rng.int(100000, 999999)}`,
      author: author(),
      body: seed,
      verifiedMidwife: false,
      createdAt: isoDate(rng.int(0, 3) + i),
    };
  });
}

export const COMMUNITY_POSTS: CommunityPost[] = POST_SEEDS.map((seed, i) => ({
  id: `post-${i + 1}`,
  channel: seed.channel,
  author: author(),
  title: seed.title,
  body: seed.body,
  createdAt: isoDate(seed.daysAgo),
  replies: buildReplies(seed.replyTexts),
}));

// Pad reply counts toward the brief's ~80 target with warm generic replies on
// the liveliest threads, keeping the dataset deterministic.
const EXTRA_REPLY_TARGETS = COMMUNITY_POSTS.map((_, i) => i).filter((i) => POST_SEEDS[i].replyTexts.length > 0);
for (const idx of EXTRA_REPLY_TARGETS) {
  const post = COMMUNITY_POSTS[idx];
  if (!post) continue;
  post.replies.push({
    id: `reply-${rng.int(100000, 999999)}`,
    author: author(),
    body: rng.pick(GENERIC_REPLIES),
    verifiedMidwife: false,
    createdAt: isoDate(rng.int(0, 3)),
  });
}

export const TOTAL_REPLY_COUNT = COMMUNITY_POSTS.reduce((sum, p) => sum + p.replies.length, 0);

export const DEMO_VERIFICATION_CODE = 'ONA-2026';
