import React from 'react';
import { Dropdown, Label, PrimaryButton, Stack, Text, TextField } from '@fluentui/react';
import { languageOptions } from '../data/languages';
import { demoInput } from '../data/demo';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { rephrase, setSourceLangId, Stage } from '../redux/commonSlice';

interface IProps {
  disabled: boolean
}

export const PasteTextView: React.FC<IProps> = (props) => {
  const { disabled } = props;

  const dispatch = useAppDispatch();

  const stage = useTypedSelector((state) => state.common.stage);
  const sourceLangId = useTypedSelector((state) => state.common.sourceLangId);

  const [input, setInput] = React.useState(demoInput);

  const languageDropdownJsx = (
    <Dropdown
      className='editor__dropdown'
      disabled={disabled}
      selectedKey={sourceLangId}
      onChange={(event, option) => {
        if (option != null) {
          dispatch(setSourceLangId(option.key.toString()));
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

  const onSubmit = () => {
    dispatch(rephrase({ input }));
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
        text={stage === Stage.LoadingRephrase ? 'Rephrasing...' : 'Rephrase'}
        onClick={onSubmit}
        disabled={disabled || input === '' || stage === Stage.LoadingRephrase} />
    </Stack>
  );
};
