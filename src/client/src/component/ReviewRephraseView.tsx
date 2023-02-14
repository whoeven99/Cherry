import React from 'react';
import { Label, PrimaryButton, Stack, TextField, Text } from '@fluentui/react';

interface IProps {
  disabled: boolean
  response: string
  startTranslation: () => void
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { disabled, response, startTranslation } = props;

  const textAreaJsx = (
    <TextField
      multiline
      resizable
      rows={25}
      disabled={disabled}
      defaultValue={response}
    />
  );

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Label className='common__label'>Step 3 - Review result of rephrasing</Label>
      {textAreaJsx}
      <PrimaryButton
        className='editor__button'
        text="Start to translate"
        onClick={startTranslation}
      />
      <Text>You will be directed to another page to complete the next steps. Once the translation is started, you will not be able to modify the options on this page.</Text>
    </Stack>
  );
};
