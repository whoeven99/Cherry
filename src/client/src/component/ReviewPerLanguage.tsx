import React from 'react';
import { ItemReviewList } from './ItemReviewList';
import { selectAllTranslationsByLanguageId } from '../redux/languageSlice';
import { useTypedSelector } from '../app/store';

interface IProps {
  langId: string
}

export const ReviewPerLanguage: React.FC<IProps> = (props) => {
  const allTranslations = useTypedSelector(state => selectAllTranslationsByLanguageId(state, props.langId));

  return (
    <ItemReviewList items={allTranslations.map(t => ({
      id: t.id,
      source: t.source,
      target: t.text
    }))} />
  );
};
