import React, { useEffect } from 'react';
import { useTypedSelector } from '../app/store';
import { translateAsync } from '../app/api';
import { demoInput } from '../data/demo';
import { ReviewList } from './ReviewList';
import { PrimaryButton } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { saveLocaleFiles } from '../utils/saveFile';
import { toFlattenObject, toLocalizationString } from '../utils/parse';

interface IProps {
  langId: string
}

export const ReviewPerLanguage: React.FC<IProps> = (props) => {
  const { langId } = props;
  const { t } = useTranslation();

  const sourceText = useTypedSelector((state) => state.common.rephrasedText);
  const [translatedRecords, setTranslatedRecords] = React.useState<Record<string, string>>({});

  useEffect(() => {
    translateAsync(langId, demoInput)
      .then((result) => {
        setTranslatedRecords(toFlattenObject(result.text));
      }).catch(e => {
        console.log(e);
      });
  }, []);

  const originalRecords = toFlattenObject(sourceText);

  const onExport = () => {
    saveLocaleFiles(langId, toLocalizationString(translatedRecords, '.'));
  };

  return (
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

  );
};
