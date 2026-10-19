// UI text only. Story/worksheet content stays in English.
export const en = {
  'nav.explore': 'Explore Us', 'nav.about': 'About Us', 'nav.themes': 'Themes', 'nav.contact': 'Contact',
  'lang.switch': 'العربية',
  'themes.title': 'Choose a Theme', 'themes.open': 'Open theme',
  'locked.badge': 'Coming soon', 'locked.title': 'This theme is not ready yet', 'locked.text': 'We are still working on it. Check back soon!',
  'theme.stories': 'Stories', 'theme.decoration': 'Decoration', 'theme.guide': 'Teacher Guide',
  'theme.upcoming': 'Opens on', 'theme.back': 'Back to themes', 'story.back': 'Back to theme',
  'act.story': 'Story', 'act.worksheet': 'Worksheet', 'act.flashcards': 'Flashcards', 'act.crafts': 'Crafts',
  'res.soon': 'Coming soon', 'res.open': 'Open',
  'ws.name': "Child's name (printed on the sheet only)", 'ws.print': 'Print',
  'contact.title': 'Contact us', 'contact.visits': 'Visits', 'contact.customise': 'Customise',
  'contact.email': 'Email', 'contact.whatsapp': 'WhatsApp',
  'social.follow': 'Follow us',
} as const;
export type Key = keyof typeof en;
export const ar: Record<Key, string> = {
  'nav.explore': 'اكتشفنا', 'nav.about': 'من نحن', 'nav.themes': 'الثيمات', 'nav.contact': 'تواصل معنا',
  'lang.switch': 'English',
  'themes.title': 'اختر ثيمًا', 'themes.open': 'افتح الثيم',
  'locked.badge': 'قريبًا', 'locked.title': 'هذا الثيم غير جاهز بعد', 'locked.text': 'ما زلنا نعمل عليه. عد قريبًا!',
  'theme.stories': 'القصص', 'theme.decoration': 'الديكور', 'theme.guide': 'دليل المعلم',
  'theme.upcoming': 'يفتح في', 'theme.back': 'العودة إلى الثيمات', 'story.back': 'العودة إلى الثيم',
  'act.story': 'القصة', 'act.worksheet': 'ورقة العمل', 'act.flashcards': 'البطاقات التعليمية', 'act.crafts': 'الأشغال اليدوية',
  'res.soon': 'قريبًا', 'res.open': 'افتح',
  'ws.name': 'اسم الطفل (يُطبع على الورقة فقط)', 'ws.print': 'طباعة',
  'contact.title': 'تواصل معنا', 'contact.visits': 'الزيارات', 'contact.customise': 'تخصيص',
  'contact.email': 'البريد الإلكتروني', 'contact.whatsapp': 'واتساب',
  'social.follow': 'تابعنا',
};