import React, { useEffect, useState } from 'react';
import { DetailsList, DetailsListLayoutMode, type IColumn, SelectionMode, TextField } from '@fluentui/react';
import { toFlattenObject } from '../utils/parse';
import _ from 'lodash';
import classname from 'classnames';

interface IProps {
  disabled: boolean
  original: string
  rephrased: string
}

interface IRephrasedItem {
  keyName: string
  originalValue: unknown
  rephrasedValue: unknown
}

export const ReviewList: React.FC<IProps> = (props) => {
  const { disabled, original, rephrased } = props;

  const [originalRecords, setOriginalRecords] = useState<Record<string, unknown>>({});
  const [rephrasedRecords, setRephrasedRecords] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setOriginalRecords(toFlattenObject(original));
  }, [original]);

  useEffect(() => {
    setRephrasedRecords(toFlattenObject(rephrased));
  }, [rephrased]);

  if (_.isEmpty(originalRecords) || _.isEmpty(rephrasedRecords)) {
    return <></>;
  }

  const items: IRephrasedItem[] = Object.keys(rephrasedRecords).map(key => ({ keyName: key, originalValue: originalRecords[key], rephrasedValue: rephrasedRecords[key] }));

  const columns: IColumn[] = [
    { key: 'keyName', name: 'Key', fieldName: 'keyName', minWidth: 200, maxWidth: 300, isResizable: true },
    { key: 'originalValue', name: 'Original Value', fieldName: 'originalValue', minWidth: 200, maxWidth: 300, isResizable: true },
    { key: 'rephrasedValue', name: 'Rephrased Value', fieldName: 'rephrasedValue', minWidth: 200, maxWidth: 300, isResizable: true }
  ];

  function renderItemColumn (item: IRephrasedItem, index: number | undefined, column: IColumn | undefined) {
    console.log(index);
    if (column != null) {
      const fieldContent = item[column.fieldName as keyof IRephrasedItem] as string;
      const className = classname({ 'input-changed': item.originalValue !== item.rephrasedValue });
      switch (column.key) {
        case 'rephrasedValue':
          return <TextField disabled={disabled} className={className} defaultValue={fieldContent} onChange={(event, value) => { setRephrasedRecords({ ...rephrasedRecords, [item.keyName]: value }); }}/>;
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
