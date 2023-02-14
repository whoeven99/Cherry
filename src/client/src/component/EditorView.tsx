import './style.css';
import React from 'react';
import { Stack, Separator } from '@fluentui/react';
import { LanguageMenu } from './LanguageMenu';
import { demoPendingRewording } from '../data/demo';
import { PasteTextView } from './PasteTextView';
import { ReviewRephraseView } from './ReviewRephraseView';

export const EditorView: React.FC = () => {
  const twoColJsx = (
    <Stack horizontal className='editor' tokens={{ childrenGap: 10 }}>
      <Stack.Item className='editor__input'>
        <PasteTextView />
      </Stack.Item>
      <Separator vertical />
      <Stack.Item className='editor__input'>
        <ReviewRephraseView response={demoPendingRewording} />
      </Stack.Item>
    </Stack>
  );

  return (
    <Stack tokens={{ childrenGap: 36 }} className='editorWrapper'>
      <LanguageMenu />
      <Stack tokens={{ childrenGap: 12 }}>
        {twoColJsx}
      </Stack>
    </Stack>
  );
};
