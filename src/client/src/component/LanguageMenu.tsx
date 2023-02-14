import './style.css';
import React from 'react';
import { Checkbox, Label, Link, Stack, Text } from '@fluentui/react';
import { languageOptions } from '../data/languages';

export const LanguageMenu: React.FC = () => {
  const checkboxesJsx = languageOptions.map((language) => (
    <Checkbox key={language.key} onRenderLabel={(props) => {
      if (props == null) {
        return null;
      }
      return (
        <Stack verticalAlign="start">
          <Text className='language__text'>{language.text}</Text>
          {<Text className='language__native'>{language.native}</Text>}
        </Stack>
      );
    }} />
  ));

  return (
    <Stack>
      <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 8 }} className='common__label'>
        <Label>Step 1 - Select your target languages</Label>
        <Link
          href='https://support.microsoft.com/en-us/office/what-languages-is-office-available-in-26d30382-9fba-45dd-bf55-02ab03e2a7ec'
          target="_blank"
          className='language__link'>Learn more</Link>
      </Stack>
      <Stack horizontal wrap tokens={{ childrenGap: '6 0' }}>
        {checkboxesJsx}
      </Stack>
    </Stack>
  );
};
