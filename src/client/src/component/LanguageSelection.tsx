import './style.css';
import React from 'react';
import { Checkbox, Label, Link, PrimaryButton, Stack, Text } from '@fluentui/react';
import { languageOptions } from '../data/languages';
import { useTranslation } from 'react-i18next';

interface IProps {
  disabled: boolean
  sourceLangId: string
  targetLangIds: string[]
  setTargetLangIds: (ids: string[]) => void
  confirmLanguages: () => void
}

export const LanguageSelection: React.FC<IProps> = (props) => {
  const { disabled, sourceLangId, targetLangIds, setTargetLangIds, confirmLanguages } = props;

  const { t } = useTranslation();

  const checkboxesJsx = (
    <Stack horizontal wrap tokens={{ childrenGap: '6 0' }}>
      {languageOptions.map((language) => {
        const onChange = (checked: boolean) => {
          if (checked) {
            setTargetLangIds([...targetLangIds, language.key]);
          } else {
            setTargetLangIds(targetLangIds.filter((id) => id !== language.key));
          }
        };

        const onRenderLabel = () => (
          <Stack verticalAlign="start">
            <Text className='language__text'>{t(`language.${language.key}`)}</Text>
            {<Text className='language__native'>{language.native}</Text>}
          </Stack>
        );

        return (
          <Checkbox
            key={language.key}
            disabled={disabled || sourceLangId === language.key}
            checked={targetLangIds.includes(language.key) || sourceLangId === language.key}
            onChange={(_, checked) => { onChange(checked ?? false); }}
            onRenderLabel={onRenderLabel} />
        );
      })}
    </Stack>
  );

  const labelJsx = (
    <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 8 }} className='common__label'>
      <Label>Step 3 - Select your target languages</Label>
      <Link
        href='https://support.microsoft.com/en-us/office/what-languages-is-office-available-in-26d30382-9fba-45dd-bf55-02ab03e2a7ec'
        target="_blank"
        className='language__link'>Learn more</Link>
    </Stack>
  );

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      {labelJsx}
      <Stack horizontal wrap tokens={{ childrenGap: '6 0' }}>
        {checkboxesJsx}
      </Stack>
      <PrimaryButton
        className='editor__button'
        text={disabled ? 'Translation started' : 'Start translation'}
        onClick={confirmLanguages}
        disabled={disabled}
      />
    </Stack>
  );
};
