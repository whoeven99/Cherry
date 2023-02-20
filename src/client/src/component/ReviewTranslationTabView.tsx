import { Label, Pivot, PivotItem, Stack } from '@fluentui/react';
import React, { useEffect } from 'react';
import { ReviewPerLanguage } from './ReviewPerLanguage';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../app/store';
import { translate } from '../redux/translationSlice';

interface IProps {
  selectedLanguages: Array<{ key: string, text: string }>
}

export const ReviewTranslationTabView: React.FC<IProps> = (props) => {
  const { selectedLanguages } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    for (const language of selectedLanguages) {
      dispatch(translate({ langId: language.key }));
    }
  }, []);

  const pivotsJsx = (
    <Pivot aria-label="Basic Pivot Example">
      {selectedLanguages.map((language) => (
        <PivotItem
          key={language.key}
          headerText={language.text}
          alwaysRender={true}
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
