import React from 'react';
import { Label, PrimaryButton, Stack, Text, TextField } from '@fluentui/react';

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
      <Label className='common__label'>Step 2 - Review result of rephrasing</Label>
      {textAreaJsx}
      <Text>After you confirm the rephrasing results, you will be directed to another page to complete the translation. Once the translation is started, you will not be able to modify the inputs here.</Text>
      <PrimaryButton
        className='editor__button'
        text="Confirm & Continue"
        onClick={startTranslation}
        disabled={disabled}
      />
    </Stack>
  );
};
