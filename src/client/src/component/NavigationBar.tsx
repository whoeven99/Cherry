import './style.css';
import React, { useState } from 'react';
import { Dropdown, type IDropdownOption, Image, Stack, Text, StackItem } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '../data/languages';

export const NavigationBar: React.FC = () => {
  const { i18n } = useTranslation();
  const options: IDropdownOption[] = languageOptions.map(lo => ({ key: lo.key, text: lo.native }));
  const [lng, setLng] = useState('en');

  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption<any> | undefined): void => {
    if (item != null) {
      i18n.changeLanguage(item.key as string).finally(() => {});
      setLng(item.key as string);
    }
  };

  return (
    <Stack verticalAlign='center' horizontal className='App-navigation' tokens={{ childrenGap: 20 }} horizontalAlign="space-between">
      <StackItem>
        <Stack verticalAlign='center' horizontal className='App-navigation' tokens={{ childrenGap: 20 }} >
          <Image src='https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' height={32} />
          <Text variant="xLarge">ChatGPT for i18n</Text>
        </Stack>
      </StackItem>
      <StackItem>
        <Dropdown
          placeholder="Select an option"
          options={options}
          onChange={onChange}
          selectedKey={lng}
        />
      </StackItem>
    </Stack>
  );
};
