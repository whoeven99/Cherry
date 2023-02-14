import React from 'react';
import { Label, PrimaryButton, Stack, TextField, Text } from '@fluentui/react';

interface IProps {
  response: string
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { response } = props;

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Label className='common__label'>Step 3 - Review result of rephrasing</Label>
      <TextField
        multiline
        autoAdjustHeight
        resizable={false}
        defaultValue={response}
        rows={20} />
      <PrimaryButton text="Start to translate" className='editor__button' />
      <Text>You will be directed to another page to complete the next steps. Once the translation is started, you will not be able to modify the options on this page.</Text>
    </Stack>
  );
};
