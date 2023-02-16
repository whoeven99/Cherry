import React from 'react';
import { Stack } from '@fluentui/react';
import { LanguageSelection } from '../component/LanguageSelection';
import { demoInput, demoPendingRewording } from '../data/demo';
import { PasteTextView } from '../component/PasteTextView';
import { ReviewRephraseView } from '../component/ReviewRephraseView';
import { ReviewTranslationTabView } from '../component/ReviewTranslationTabView';
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
