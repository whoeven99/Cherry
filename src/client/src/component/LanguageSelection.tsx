import React from 'react';
import { Checkbox, Label, Link, PrimaryButton, Stack, Text } from '@fluentui/react';
import { languageOptions } from '../data/languages';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { setTargetLangIds } from '../redux/commonSlice';

interface IProps {
  disabled: boolean
  confirmLanguages: () => void
}

export const LanguageSelection: React.FC<IProps> = (props) => {
  const { disabled, confirmLanguages } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const sourceLangId = useTypedSelector(state => state.common.sourceLangId);
  const targetLangIds = useTypedSelector(state => state.common.targetLangIds);

  const checkboxesJsx = (
    <Stack horizontal wrap tokens={{ childrenGap: '6 0' }}>
      {languageOptions.map((language) => {
        const onChange = (checked: boolean) => {
          const newIds = checked ? [...targetLangIds, language.key] : targetLangIds.filter((id) => id !== language.key);
          dispatch(setTargetLangIds(newIds));
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
    <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 8 }} className='common__label' horizontalAlign='space-between'>
      <Stack.Item>
        <Label>{t('label.step3')}</Label>
        <Link
          href='https://support.microsoft.com/en-us/office/what-languages-is-office-available-in-26d30382-9fba-45dd-bf55-02ab03e2a7ec'
          target="_blank"
          className='language__link'>{t('label.learnMore')}</Link>
      </Stack.Item>
      <Stack.Item>
        {t('label.selectedLanguages', { count: targetLangIds.length, total: languageOptions.length })}
      </Stack.Item>

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
        text={(disabled ? t('button.translating') : t('button.startTranslation')) ?? ''}
        onClick={confirmLanguages}
        disabled={disabled}
      />
    </Stack>
  );
};
