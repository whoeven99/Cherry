import React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  type IColumn,
  IconButton,
  SelectionMode,
  Text,
  TextField
} from '@fluentui/react';
import _ from 'lodash';

interface IProps {
  disabled: boolean
  original: Record<string, string>
  inReview: Record<string, string>
  onChange: (key: string, value: string) => void
}

interface IRephrasedItem {
  keyName: string
  originalValue: string
  inReviewValue: string
}

export const ReviewList: React.FC<IProps> = (props) => {
  const { disabled, original: originalRecords, inReview: inReviewRecords, onChange } = props;

  if (_.isEmpty(originalRecords) || _.isEmpty(inReviewRecords)) {
    return <></>;
  }

  const items: IRephrasedItem[] = Object.keys(inReviewRecords).map(key => ({ keyName: key, originalValue: originalRecords[key], inReviewValue: inReviewRecords[key] }));

  const onRenderTextField = (item: IRephrasedItem) => {
    const different = item.originalValue !== item.inReviewValue;
    return <TextField
      disabled={disabled}
      styles={different ? { field: { backgroundColor: '#FFD5AACC' } } : undefined}
      autoAdjustHeight
      value={item.inReviewValue}
      rows={2}
      multiline={item.inReviewValue.length > 60}
      onChange={(event, value) => { onChange(item.keyName, value ?? ''); }}
    />;
  };

  const onRenderAction = (item: IRephrasedItem) => {
    if (item.originalValue !== item.inReviewValue) {
      return <IconButton
        iconProps={{ iconName: 'Undo' }}
        title="Revert"
        ariaLabel="Revert"
        disabled={disabled}
        onClick={() => { onChange(item.keyName, item.originalValue); }}
      />;
    }
  };

  const columns: IColumn[] = [
    { key: 'keyName', name: 'Key', fieldName: 'keyName', minWidth: 250, maxWidth: 350, isResizable: true },
    { key: 'originalValue', name: 'Original', fieldName: 'originalValue', minWidth: 400, maxWidth: 400, isResizable: true, isMultiline: true },
    { key: 'inReviewValue', name: 'Generated', fieldName: 'inReviewValue', minWidth: 400, maxWidth: 400, isResizable: true, isMultiline: true, onRender: onRenderTextField },
    { key: 'action', name: 'Action', minWidth: 100, maxWidth: 100, isResizable: true, onRender: onRenderAction }
  ];

  function renderItemColumn (item: IRephrasedItem, index: number | undefined, column: IColumn | undefined) {
    if (column != null) {
      const fieldContent = item[column.fieldName as keyof IRephrasedItem];
      return <Text nowrap={false}>{fieldContent}</Text>;
    }
  }

  return (
    <DetailsList
      items={items}
      columns={columns}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      selectionMode={SelectionMode.none}
      onRenderItemColumn={renderItemColumn}
      onShouldVirtualize={() => false}
    />
  );
};
