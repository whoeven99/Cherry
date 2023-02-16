import './style.css';
import React from 'react';
import { Stack } from '@fluentui/react';
import { LanguageSelection } from './LanguageSelection';
import { demoInput, demoPendingRewording } from '../data/demo';
import { PasteTextView } from './PasteTextView';
import { ReviewRephraseView } from './ReviewRephraseView';
import { ReviewTranslationTabView } from './ReviewTranslationTabView';
import { languageOptions } from '../data/languages';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { setStage, Stage } from '../redux/commonSlice';

export const MainPageView: React.FC = () => {
  const dispatch = useAppDispatch();

  const stage = useTypedSelector(state => state.common.stage);

  const [sourceLangId, setSourceLangId] = React.useState('en');
  const [targetLangIds, setTargetLangIds] = React.useState<string[]>(['fr', 'zh', 'de']);

  const confirmRephrasing = () => {
    // remove sourceLangeId from targetLangIds
    setTargetLangIds(targetLangIds.filter((id) => id !== sourceLangId));
    dispatch(setStage(Stage.SelectTargetLanguages));
  };

  const selectedLanguages = languageOptions
    .filter((language) => targetLangIds.includes(language.key));

  const reviewSectionJsx = (stage >= Stage.FinalReview &&
      <ReviewTranslationTabView selectedLanguages={selectedLanguages} />
  );

  return (
    <Stack tokens={{ childrenGap: 40 }} className='editorWrapper'>
      <PasteTextView
        disabled={stage >= Stage.SelectTargetLanguages}
        sourceLangId={sourceLangId}
        setSourceLangId={setSourceLangId} />

      { stage >= Stage.Rephrase && (
        <ReviewRephraseView
          disabled={stage >= Stage.SelectTargetLanguages}
          original={demoInput}
          rephrased={demoPendingRewording}
          startTranslation={confirmRephrasing}
        />
      )}

      { stage >= Stage.SelectTargetLanguages && (
        <LanguageSelection
          disabled={stage >= Stage.FinalReview}
          sourceLangId={sourceLangId}
          targetLangIds={targetLangIds}
          setTargetLangIds={setTargetLangIds}
          confirmLanguages={() => {
            dispatch(setStage(Stage.FinalReview));
          }}
        />
      )}

      {reviewSectionJsx}
    </Stack>
  );
};
