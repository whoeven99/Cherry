import { Label, Pivot, PivotItem, Stack, Spinner, SpinnerSize } from '@fluentui/react';
import React, { useState, useEffect } from 'react';
import { ReviewPerLanguage } from './ReviewPerLanguage';
import { useTranslation } from 'react-i18next';
import { translateAsync } from '../app/api';
import { useTypedSelector } from '../app/store';
import _ from 'lodash';

interface IProps {
  selectedLanguages: Array<{ key: string, text: string }>
}

export const ReviewTranslationTabView: React.FC<IProps> = (props) => {
  const { selectedLanguages } = props;
  const { t } = useTranslation();

  const [translations, setTranslations] = useState<Record<string, string>>({});
  const sourceText = useTypedSelector((state) => state.common.rephrasedText);
  useEffect(() => {
    if (!_.isEmpty(selectedLanguages)) {
      Promise.all(selectedLanguages.map(async l => await translateAsync(l.key, sourceText)))
        .then(results => {
          const tmp: Record<string, string> = {};
          results.forEach((item, index) => {
            tmp[selectedLanguages[index].key] = item.text;
          });
          setTranslations(tmp);
        });
    }
  }, [selectedLanguages]);

  const pivotsJsx = (
    <Pivot aria-label="Basic Pivot Example">
      {selectedLanguages.map((language) => (
        <PivotItem
          key={language.key}
          headerText={language.text}
          alwaysRender={true}
        >
          {_.isEmpty(translations[language.key])
            ? <Spinner size={SpinnerSize.medium} />
            : <ReviewPerLanguage langId={language.key} translation={translations[language.key]}/>}
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
