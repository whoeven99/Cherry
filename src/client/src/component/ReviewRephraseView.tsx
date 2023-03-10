import React, { useEffect, useState } from 'react';
import { Label, PrimaryButton, Stack, Text } from '@fluentui/react';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { ReviewList } from './ReviewList';
import { startRephrasing } from '../redux/commonSlice';
import { toFlattenObject, toLocalizationString } from '../utils/parse';
import { useTranslation } from 'react-i18next';
import { saveLocaleFiles } from '../utils/saveFile';

interface IProps {
  disabled: boolean
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { disabled } = props;

  const dispatch = useAppDispatch();

  const rawText = useTypedSelector((state) => state.common.rawText);
  const rephrasedText = useTypedSelector((state) => state.common.rephrasedText);

  const [rephrasedRecords, setRephrasedRecords] = useState<Record<string, string>>({});

  const { t } = useTranslation();

  const originalRecords = toFlattenObject(rawText);

  useEffect(() => {
    setRephrasedRecords(toFlattenObject(rephrasedText));
  }, [rephrasedText]);

  const onStart = () => {
    dispatch(startRephrasing(JSON.stringify(rephrasedRecords).slice(1).slice(0, -1)));
  };

  const onExport = () => {
    saveLocaleFiles('original', toLocalizationString(rephrasedRecords, '.'));
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} className='ReviewRephraseViewWrapper'>
      <Label className='common__label'>{t('label.step2Instruction')}</Label>

      <ReviewList
        disabled={disabled}
        original={originalRecords}
        inReview={rephrasedRecords}
        onChange={(key, value) => { setRephrasedRecords({ ...rephrasedRecords, [key]: value }); }}
      />

      <Text>{t('label.step2Explanation')}</Text>
      <Stack horizontal tokens={{ childrenGap: 20 }} >
        <PrimaryButton
          className='editor__button'
          text={t('button.confirmAndContinue') ?? ''}
          onClick={onStart}
          disabled={disabled}
        />
        <PrimaryButton
          className='editor__button'
          text={t('button.export') ?? ''}
          onClick={onExport}
        />
      </Stack>

    </Stack>
  );
};
