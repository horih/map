import { IconLanguageHiragana } from '@tabler/icons-react';
import { useAtom } from 'jotai';
import { languageAtom } from '../atoms';
import { ButtonControlGroup } from './ButtonControlGroup';

export function LanguageControl() {
  const [language, setLanguage] = useAtom(languageAtom);
  document.documentElement.lang = language;

  return (
    <ButtonControlGroup position="top-left">
      <button
        type="button"
        onClick={() =>
          setLanguage((language) => (language === 'en' ? 'ja' : 'en'))
        }
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconLanguageHiragana color="#333" />
      </button>
    </ButtonControlGroup>
  );
}
