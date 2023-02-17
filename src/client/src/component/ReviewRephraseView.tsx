import React, { useState, useEffect } from 'react';
import { Label, PrimaryButton, Stack, Text } from '@fluentui/react';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { ReviewList } from './ReviewList';
import { startRephrasing } from '../redux/commonSlice';
import { toFlattenObject } from '../utils/parse';
import { rephraseAsync } from '../app/api';
import _ from 'lodash';

interface IProps {
  disabled: boolean
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { disabled } = props;

  const dispatch = useAppDispatch();

  const rawText = useTypedSelector((state) => state.common.rawText);
  const rephrasedText = useTypedSelector((state) => state.common.rephrasedText);

  const [rephrasedRecords, setRephrasedRecords] = useState<Record<string, string>>({});

  const originalRecords = toFlattenObject(rawText);

  useEffect(() => {
    setRephrasedRecords(toFlattenObject(rephrasedText));
  }, [rephrasedText]);

  // useEffect(() => {
  //   if (!_.isEmpty(rawText)) {
  //     rephraseAsync(rawText).then(result => { setRephrasedRecords(toFlattenObject(result.text)); }).catch(e => { console.log(e); });
  //   }
  // }, [rawText]);

  const onStart = () => {
    console.log(rephrasedRecords);
    dispatch(startRephrasing(JSON.stringify(rephrasedRecords).slice(1).slice(0, -1)));
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} className='ReviewRephraseViewWrapper'>
      <Label className='common__label'>Step 2 - Review rephrasing results</Label>

      <ReviewList
        disabled={disabled}
        original={originalRecords}
        inReview={rephrasedRecords}
        onChange={(key, value) => { setRephrasedRecords({ ...rephrasedRecords, [key]: value }); }}
      />

      <Text>Once the translation is started, you will not be able to modify the inputs above.</Text>

      <PrimaryButton
        className='editor__button'
        text="Confirm & Continue"
        onClick={onStart}
        disabled={disabled}
      />
    </Stack>
  );
};
