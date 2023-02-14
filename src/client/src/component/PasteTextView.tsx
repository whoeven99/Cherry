import React from 'react';
import { Dropdown, Label, Stack, TextField } from '@fluentui/react';
import { languageOptions } from '../data/languages';
import { demoInput } from '../data/demo';

export const PasteTextView: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = React.useState('en');

  const languageDropdownJsx = (
    <Dropdown
      className='editor__dropdown'
      selectedKey={sourceLanguage}
      onChange={(event, option) => {
        if (option != null) {
          setSourceLanguage(option.key.toString());
        }
      }}
      options={languageOptions}
    />
  );

  const textAreaJsx = (
    <TextField
      multiline
      autoAdjustHeight
      resizable={false}
      defaultValue={demoInput}
      rows={20} />
  );

  return (
    <Stack>
      <Stack
        className='common__label'
        horizontal tokens={{ childrenGap: 8 }}>
        <Label>Step 2 - Paste your strings in</Label>
        {languageDropdownJsx}
      </Stack>
      {textAreaJsx}
    </Stack>
  );
};
