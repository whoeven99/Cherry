import React from 'react';
import { Label, PrimaryButton, Stack, Text } from '@fluentui/react';
import { completeRephrase } from '../redux/commonSlice';
import { useAppDispatch } from '../app/store';
import { ReviewList } from './ReviewList';

interface IProps {
  disabled: boolean
  original: string
  rephrased: string
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { original, rephrased, disabled } = props;

  const dispatch = useAppDispatch();

  const startTranslation = () => {
    dispatch(completeRephrase(rephrased));
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} className='ReviewRephraseViewWrapper'>
      <Label className='common__label'>Step 2 - Review result of rephrasing</Label>

      <ReviewList
        disabled={disabled}
        original={original}
        rephrased={rephrased}
      />

      <Text>Once the translation is started, you will not be able to modify the inputs above.</Text>

      <PrimaryButton
        className='editor__button'
        text="Confirm & Continue"
        onClick={startTranslation}
        disabled={disabled}
      />
    </Stack>
  );
};
