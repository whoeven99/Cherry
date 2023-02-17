import React, { useState, useEffect } from 'react';
import { Label, PrimaryButton, Stack, Text } from '@fluentui/react';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { ReviewList } from './ReviewList';
import { startRephrasing } from '../redux/commonSlice';
import { toFlattenObject } from '../utils/parse';
import { rephraseAsync } from '../app/api';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

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
    console.log(rephrasedRecords);
    dispatch(startRephrasing(JSON.stringify(rephrasedRecords).slice(1).slice(0, -1)));
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

      <PrimaryButton
        className='editor__button'
        text={t('button.confirmAndContinue') ?? ''}
        onClick={onStart}
        disabled={disabled}
      />
    </Stack>
  );
};
