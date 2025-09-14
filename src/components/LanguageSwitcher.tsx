import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر' }
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('careerAI_language', languageCode);
    
    // Update document direction for RTL languages
    const isRTL = ['ur', 'ks'].includes(languageCode);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode;
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue>
            <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
            <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.nativeName}</span>
              <span className="text-xs text-gray-500">({language.name})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}