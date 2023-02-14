import React from 'react';
import { Label, Stack, TextField } from '@fluentui/react';

interface IProps {
  response: string
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { response } = props;

  return (
    <Stack className='common__label'>
      <Label>Step 3 - Review result of rephrasing</Label>
      <TextField
        multiline
        autoAdjustHeight
        resizable={false}
        defaultValue={response}
        rows={20} />
    </Stack>
  );
};
