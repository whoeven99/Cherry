import './style.css';
import React from 'react';
import { Image, Stack, Text } from '@fluentui/react';

export const NavigationBar: React.FC = () => {
  return (
    <Stack verticalAlign='center' horizontal className='App-navigation' tokens={{ childrenGap: 20 }}>
      <Image src='https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' height={32} />
      <Text variant="xLarge">ChatGPT for i18n</Text>
    </Stack>
  );
};
