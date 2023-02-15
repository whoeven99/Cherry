import React from 'react';
import { ItemReviewList } from './ItemReviewList';
import { selectAllTranslationsByLanguageId, updateTranslation } from '../redux/languageSlice';
import { useAppDispatch, useTypedSelector } from '../app/store';

interface IProps {
  langId: string
}

export const ReviewPerLanguage: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const allTranslations = useTypedSelector(state => selectAllTranslationsByLanguageId(state, props.langId));

  const allItems = allTranslations.map(t => ({
    keyId: t.keyId,
    source: t.source,
    target: t.text
  }));

  const onChange = (keyId: string, value: string) => {
    dispatch(updateTranslation({ keyId, languageId: props.langId, text: value }));
  };

  return (
    <ItemReviewList items={allItems} onChange={onChange} />

  );
};
