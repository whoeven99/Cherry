import { Label, Pivot, PivotItem, Stack } from '@fluentui/react';
import React, { useEffect } from 'react';
import { ReviewPerLanguage } from './ReviewPerLanguage';
import { setTranslations } from '../redux/languageSlice';
import { useAppDispatch } from '../app/store';

interface IProps {
  selectedLanguages: Array<{ key: string, text: string }>
}

export const ReviewTranslationTabView: React.FC<IProps> = (props) => {
  const { selectedLanguages } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTranslations([
      {
        id: 'label.hello',
        items: {
          en: 'Hello',
          fr: 'Bonjour',
          zh: '你好',
          de: 'Hallo'
        }
      },
      {
        id: 'label.goodbye',
        items: {
          en: 'Goodbye',
          fr: 'Au revoir',
          zh: '再见',
          de: 'Auf Wiedersehen'
        }
      }
    ]));
  }, []);

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
      <Label className='common__label'>Step 4 - Review translation</Label>
      {pivotsJsx}
    </Stack>
  );
};
