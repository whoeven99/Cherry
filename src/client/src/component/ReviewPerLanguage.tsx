import React, { useEffect } from 'react';
import { useTypedSelector } from '../app/store';
import { ReviewList } from './ReviewList';
import { PrimaryButton, Spinner } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { saveLocaleFiles } from '../utils/saveFile';
import { toFlattenObject, toLocalizationString } from '../utils/parse';
import { selectTranslatedLanguageById } from '../redux/translationSlice';

interface IProps {
  langId: string
}

export const ReviewPerLanguage: React.FC<IProps> = (props) => {
  const { langId } = props;
  const { t } = useTranslation();

  const sourceText = useTypedSelector((state) => state.common.rephrasedText);
  const translatedLanguage = useTypedSelector((state) => selectTranslatedLanguageById(state, langId));

  const [translatedRecords, setTranslatedRecords] = React.useState<Record<string, string>>({});

  const spinnerJsx = <Spinner label={'Translation in progress...'} />;

  useEffect(() => {
    if (translatedLanguage) {
      setTranslatedRecords(toFlattenObject(translatedLanguage.translated));
    }
  }, [translatedLanguage]);

  if (!translatedLanguage) {
    return spinnerJsx;
  }

  const originalRecords = toFlattenObject(sourceText);

  const onExport = () => {
    saveLocaleFiles(langId, toLocalizationString(translatedRecords, '.'));
  };

  return (
    <div>
      {translatedLanguage.loading
        ? spinnerJsx
        : (
          <>
            <ReviewList
              disabled={false}
              original={originalRecords}
              inReview={translatedRecords}
              onChange={(key, value) => { setTranslatedRecords({ ...translatedRecords, [key]: value }); }}
            />
            <PrimaryButton
              className='editor__button'
              text={t('button.export') ?? ''}
              onClick={onExport}
            />
          </>
          )}
    </div>
  );
};
