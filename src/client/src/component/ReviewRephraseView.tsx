import React from 'react';
import { Label, PrimaryButton, Stack, Text } from '@fluentui/react';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { ReviewList } from './ReviewList';
import { startRephrasing } from '../redux/commonSlice';

interface IProps {
  disabled: boolean
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { disabled } = props;

  const dispatch = useAppDispatch();

  const rawText = useTypedSelector((state) => state.common.rawText);
  const rephrasedText = useTypedSelector((state) => state.common.rephrasedText);

  const onStart = () => {
    dispatch(startRephrasing(rephrasedText));
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} className='ReviewRephraseViewWrapper'>
      <Label className='common__label'>Step 2 - Review rephrasing results</Label>

      <ReviewList
        disabled={disabled}
        original={rawText}
        rephrased={rephrasedText}
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
