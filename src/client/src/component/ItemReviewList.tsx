import React from 'react';
import { DetailsList, type IColumn, SelectionMode } from '@fluentui/react';

interface TranslationItem {
  id: string
  source: string
  target: string
}

interface IProps {
  items: TranslationItem[]
}

export const ItemReviewList: React.FC<IProps> = (props) => {
  const { items } = props;

  const columns: IColumn[] = [
    {
      key: 'id',
      name: 'ID',
      fieldName: 'id',
      isResizable: true,
      minWidth: 200,
      maxWidth: 300
    },
    {
      key: 'source',
      name: 'Source Language',
      fieldName: 'source',
      isResizable: true,
      minWidth: 300,
      maxWidth: 500
    }, {
      key: 'target',
      name: 'Target Language',
      fieldName: 'target',
      isResizable: true,
      minWidth: 300,
      maxWidth: 500
    }
  ];

  return (
    <DetailsList items={items} columns={columns} selectionMode={SelectionMode.none} />
  );
};
