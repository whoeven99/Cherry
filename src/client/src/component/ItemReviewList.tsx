import React from 'react';
import { DetailsList, type IColumn, SelectionMode, TextField } from '@fluentui/react';

interface TranslationItem {
  keyId: string
  source: string
  target: string
}

interface IProps {
  items: TranslationItem[]
  onChange: (keyId: string, value: string) => void
}

export const ItemReviewList: React.FC<IProps> = (props) => {
  const { items, onChange } = props;

  const columns: IColumn[] = [
    {
      key: 'keyId',
      name: 'ID',
      fieldName: 'keyId',
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
      maxWidth: 500,
      onRender: (item: TranslationItem) => {
        return <TextField value={item.target} onChange={(e, v) => { onChange(item.keyId, v ?? ''); }} />;
      }
    }
  ];

  return (
    <DetailsList items={items} columns={columns} selectionMode={SelectionMode.none} />
  );
};
