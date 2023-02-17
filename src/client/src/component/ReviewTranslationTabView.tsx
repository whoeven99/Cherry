import { Label, Pivot, PivotItem, Stack } from '@fluentui/react';
import React from 'react';
import { ReviewPerLanguage } from './ReviewPerLanguage';
import { useTranslation } from 'react-i18next';

interface IProps {
  selectedLanguages: Array<{ key: string, text: string }>
}

export const ReviewTranslationTabView: React.FC<IProps> = (props) => {
  const { selectedLanguages } = props;
  const { t } = useTranslation();

  const pivotsJsx = (
    <Pivot aria-label="Basic Pivot Example">
      {selectedLanguages.map((language) => (
        <PivotItem
          key={language.key}
          headerText={language.text}
        >
          <ReviewPerLanguage langId={language.key} />
        </PivotItem>
      ))}
    </Pivot>
  );

  return (
    <Stack>
      <Label className='common__label'>{t('label.step4')}</Label>
      {pivotsJsx}
    </Stack>
  );
};
