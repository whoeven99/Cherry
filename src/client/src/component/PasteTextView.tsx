import React from 'react';
import { Dropdown, Label, PrimaryButton, Stack, Text, TextField } from '@fluentui/react';
import { languageOptions } from '../data/languages';
import { demoInput } from '../data/demo';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { rephrase, setSourceLangId, Stage } from '../redux/commonSlice';
import { toFlattenObject } from '../utils/parse';
import { useTranslation } from 'react-i18next';
interface IProps {
  disabled: boolean
}

export const PasteTextView: React.FC<IProps> = (props) => {
  const { disabled } = props;

  const dispatch = useAppDispatch();

  const stage = useTypedSelector((state) => state.common.stage);
  const sourceLangId = useTypedSelector((state) => state.common.sourceLangId);

  const [input, setInput] = React.useState(demoInput);
  const { t } = useTranslation();

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
    dispatch(rephrase({ input: JSON.stringify(toFlattenObject(input)).slice(1).slice(0, -1) }));
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Stack
        className='common__label'
        horizontal tokens={{ childrenGap: 8 }}>
        <Label>{t('label.step1Instruction')}</Label>
        {languageDropdownJsx}
      </Stack>

      {textAreaJsx}
      <Text>{t('label.step1Explanation')}</Text>
      <PrimaryButton
        className='editor__button'
        text={(stage === Stage.LoadingRephrase ? t('button.rephrasing') : t('button.rephrase')) ?? ''}
        onClick={onSubmit}
        disabled={disabled || input === '' || stage === Stage.LoadingRephrase} />
    </Stack>
  );
};
