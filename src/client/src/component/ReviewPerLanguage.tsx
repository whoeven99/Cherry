import React, { useEffect } from 'react';
import { useTypedSelector } from '../app/store';
import { translate } from '../app/api';
import { demoInput } from '../data/demo';
import { ReviewList } from './ReviewList';

interface IProps {
  langId: string
}

export const ReviewPerLanguage: React.FC<IProps> = (props) => {
  const { langId } = props;

  const sourceText = useTypedSelector((state) => state.common.text);
  const [translatedText, setTranslatedText] = React.useState<string>('');

  useEffect(() => {
    translate(langId, demoInput)
      .then((result) => {
        setTranslatedText(result.text);
      }).catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <ReviewList
      disabled={false}
      original={sourceText}
      rephrased={translatedText}
    />
  );
};
