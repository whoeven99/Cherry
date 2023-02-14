import './style.css';
import React from 'react';
import { Separator, Stack } from '@fluentui/react';
import { LanguageSelection } from './LanguageSelection';
import { demoPendingRewording } from '../data/demo';
import { PasteTextView } from './PasteTextView';
import { ReviewRephraseView } from './ReviewRephraseView';
import { ReviewTranslationTabView } from './ReviewTranslationTabView';
import { languageOptions } from '../data/languages';

export const EditorView: React.FC = () => {
  const [showTranslationTab, setShowTranslationTab] = React.useState(false);

  const [sourceLangId, setSourceLangId] = React.useState('en');
  const [targetLangIds, setTargetLangIds] = React.useState<string[]>([]);

  const startTranslation = () => {
    // remove sourceLangeId from targetLangIds
    setTargetLangIds(targetLangIds.filter((id) => id !== sourceLangId));
    setShowTranslationTab(true);
  };

  const twoColJsx = (
    <Stack horizontal className='editor' tokens={{ childrenGap: 10 }}>
      <Stack.Item className='editor__input'>
        <PasteTextView
          disabled={showTranslationTab}
          sourceLangId={sourceLangId}
          setSourceLangId={setSourceLangId} />
      </Stack.Item>
      <Separator vertical />
      <Stack.Item className='editor__input'>
        <ReviewRephraseView
          disabled={showTranslationTab}
          response={demoPendingRewording}
          startTranslation={startTranslation}
        />
      </Stack.Item>
    </Stack>
  );

  const selectedLanguages = languageOptions
    .filter((language) => targetLangIds.includes(language.key));

  const reviewSectionJsx = (showTranslationTab &&
      <ReviewTranslationTabView selectedLanguages={selectedLanguages} />
  );

  return (
    <Stack tokens={{ childrenGap: 40 }} className='editorWrapper'>
      <LanguageSelection
        disabled={showTranslationTab}
        sourceLangId={sourceLangId}
        targetLangIds={targetLangIds}
        setTargetLangIds={setTargetLangIds}
      />
      {twoColJsx}
      {reviewSectionJsx}
    </Stack>
  );
};
