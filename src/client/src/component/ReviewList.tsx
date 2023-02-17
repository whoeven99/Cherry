import React, { useEffect, useState } from 'react';
import { DetailsList, DetailsListLayoutMode, type IColumn, SelectionMode, TextField } from '@fluentui/react';
import { toFlattenObject } from '../utils/parse';
import _ from 'lodash';
import classname from 'classnames';

interface IProps {
  disabled: boolean
  original: Record<string, unknown>
  inReview: Record<string, unknown>
  onChange: (key: string, value: string) => void
}

interface IRephrasedItem {
  keyName: string
  originalValue: unknown
  inReviewValue: unknown
}

export const ReviewList: React.FC<IProps> = (props) => {
  const { disabled, original: originalRecords, inReview: inReviewRecords, onChange } = props;

  if (_.isEmpty(originalRecords) || _.isEmpty(inReviewRecords)) {
    return <></>;
  }

  const items: IRephrasedItem[] = Object.keys(inReviewRecords).map(key => ({ keyName: key, originalValue: originalRecords[key], inReviewValue: inReviewRecords[key] }));

  const columns: IColumn[] = [
    { key: 'keyName', name: 'Key', fieldName: 'keyName', minWidth: 200, maxWidth: 300, isResizable: true },
    { key: 'originalValue', name: 'Original Value', fieldName: 'originalValue', minWidth: 200, maxWidth: 300, isResizable: true },
    { key: 'inReviewValue', name: 'In Review Value', fieldName: 'inReviewValue', minWidth: 200, maxWidth: 300, isResizable: true }
  ];

  function renderItemColumn (item: IRephrasedItem, index: number | undefined, column: IColumn | undefined) {
    if (column != null) {
      const fieldContent = item[column.fieldName as keyof IRephrasedItem] as string;
      const className = classname({ 'input-changed': item.originalValue !== item.inReviewValue });
      switch (column.key) {
        case 'inReviewValue':
          return <TextField disabled={disabled} className={className} defaultValue={fieldContent} onChange={(event, value) => { onChange(item.keyName, value ?? ''); }}/>;
        default:
          return <span>{fieldContent}</span>;
      }
    }
  }

  return (
    <DetailsList
      items={items}
      columns={columns}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      selectionMode={SelectionMode.none}
      onRenderItemColumn={renderItemColumn}
    />
  );
};
