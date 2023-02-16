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
  const targetLangIds = useTypedSelector(state => state.common.targetLangIds);

  const selectedLanguages = languageOptions
    .filter((language) => targetLangIds.includes(language.key));

  return (
    <Stack tokens={{ childrenGap: 40 }} className='editorWrapper'>
      <PasteTextView
        disabled={stage >= Stage.SelectTargetLanguages}/>

      { stage >= Stage.Rephrase && (
        <ReviewRephraseView
          disabled={stage >= Stage.SelectTargetLanguages}
          original={demoInput}
          rephrased={demoPendingRewording}
        />
      )}

      { stage >= Stage.SelectTargetLanguages && (
        <LanguageSelection
          disabled={stage >= Stage.FinalReview}
          confirmLanguages={() => {
            dispatch(setStage(Stage.FinalReview));
          }}
        />
      )}

      {(stage >= Stage.FinalReview &&
          <ReviewTranslationTabView selectedLanguages={selectedLanguages} />
      )}
    </Stack>
  );
};
