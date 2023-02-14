import './style.css';
import React from 'react';
import {Stack, TextField, Text, Separator, Label, PrimaryButton, Dropdown} from "@fluentui/react";
import {LanguageMenu} from "./LanguageMenu";

export const EditorView: React.FC = () => {
  const twoColJsx = (
    <Stack horizontal className='editor' tokens={{ childrenGap: 10 }}>
      <Stack.Item className='editor__input'>
        <TextField multiline autoAdjustHeight resizable={false} label="Step 2 - Paste your strings" rows={20} />
      </Stack.Item>
      <Separator vertical />
      <Stack.Item className='editor__output'>
        <Stack>
          <Label>Step 3 - Output</Label>
        </Stack>
        <Text>Demo Text</Text>
      </Stack.Item>
    </Stack>
  );

  return <Stack tokens={{ childrenGap: 30 }} className='editorWrapper'>
    <LanguageMenu />
    <Stack tokens={{ childrenGap: 12 }}>
      {twoColJsx}
      <PrimaryButton text="Generate" className='editor__button' />
    </Stack>
  </Stack>;
};