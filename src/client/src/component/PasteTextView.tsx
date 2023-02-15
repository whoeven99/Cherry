import React from 'react';
import { Dropdown, Label, PrimaryButton, Stack, Text, TextField } from '@fluentui/react';
import { languageOptions } from '../data/languages';
import { demoInput } from '../data/demo';

interface IProps {
  disabled: boolean
  sourceLangId: string
  setSourceLangId: (langId: string) => void
}

export const PasteTextView: React.FC<IProps> = (props) => {
  const { disabled, sourceLangId, setSourceLangId } = props;

  const languageDropdownJsx = (
    <Dropdown
      className='editor__dropdown'
      disabled={disabled}
      selectedKey={sourceLangId}
      onChange={(event, option) => {
        if (option != null) {
          setSourceLangId(option.key.toString());
        }
      }}
      options={languageOptions}
    />
  );

  const textAreaJsx = (
    <TextField
      multiline
      resizable
      rows={25}
      disabled={disabled}
      defaultValue={demoInput}
    />
  );

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Stack
        className='common__label'
        horizontal tokens={{ childrenGap: 8 }}>
        <Label>Step 1 - Paste your strings in</Label>
        {languageDropdownJsx}
      </Stack>

      {textAreaJsx}
      <Text>You will see the rephrasing results on the right. Please review each item and modify as necessary. All content cannot be changed after the translation has started.</Text>
      <PrimaryButton text="Rephrase" className='editor__button' disabled={disabled} />
    </Stack>
  );
};
