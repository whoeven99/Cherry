import React from 'react';
import { Dropdown, Label, PrimaryButton, Stack, Text, TextField } from '@fluentui/react';
import { languageOptions } from '../data/languages';
import { demoInput } from '../data/demo';
import { rephrase } from '../app/api';
import { useAppDispatch } from '../app/store';
import { setStage, Stage } from '../redux/commonSlice';

interface IProps {
  disabled: boolean
  sourceLangId: string
  setSourceLangId: (langId: string) => void
}

export const PasteTextView: React.FC<IProps> = (props) => {
  const { disabled, sourceLangId, setSourceLangId } = props;

  const dispatch = useAppDispatch();

  const [input, setInput] = React.useState(demoInput);

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
      rows={20}
      disabled={disabled}
      value={input}
      onChange={(event, newValue) => {
        setInput(newValue ?? '');
      }}
    />
  );

  const onSubmit = async () => {
    const response = await rephrase(input);
    dispatch(setStage(Stage.Rephrase));
    console.log(response);
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Stack
        className='common__label'
        horizontal tokens={{ childrenGap: 8 }}>
        <Label>Step 1 - Paste your strings in</Label>
        {languageDropdownJsx}
      </Stack>

      {textAreaJsx}
      <Text>You will see the rephrasing results in next step. You will start translation from there.</Text>
      <PrimaryButton
        className='editor__button'
        text="Rephrase"
        onClick={onSubmit}
        disabled={disabled || input === ''} />
    </Stack>
  );
};
