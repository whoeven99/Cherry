import React from 'react';
import { ItemReviewList } from './ItemReviewList';
import { selectAllTranslationsByLanguageId, updateTranslation } from '../redux/languageSlice';
import { useAppDispatch, useTypedSelector } from '../app/store';
import { PrimaryButton } from '@fluentui/react';
import { useTranslation } from 'react-i18next';
import { saveLocaleFiles } from '../utils/saveFile';
import { toLocalizationString } from '../utils/parse';

interface IProps {
  langId: string
}

export const ReviewPerLanguage: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const allTranslations = useTypedSelector(state => selectAllTranslationsByLanguageId(state, props.langId));
  const {t} = useTranslation();
  const {langId} = props;

  const allItems = allTranslations.map(t => ({
    keyId: t.keyId,
    source: t.source,
    target: t.text
  }));

  const onChange = (keyId: string, value: string) => {
    dispatch(updateTranslation({ keyId, languageId: props.langId, text: value }));
  };

  const onExport = () => {
    const finalRes:Record<string, string> = {};
    allTranslations.forEach(item => finalRes[item.keyId] = item.text);
    saveLocaleFiles(langId, toLocalizationString(finalRes, '.'));
  }

  return (
    <>
      <ItemReviewList items={allItems} onChange={onChange} />
      <PrimaryButton
        className='editor__button'
        text={t('button.export') as string}
        onClick={onExport}
      />
    </>
    
  );
};
