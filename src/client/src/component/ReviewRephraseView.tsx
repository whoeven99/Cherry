import React, { useEffect, useState } from 'react';
import { Label, PrimaryButton, Stack, Text, type IColumn, DetailsList, DetailsListLayoutMode, SelectionMode, TextField } from '@fluentui/react';
import classname from 'classnames';
interface IProps {
  disabled: boolean
  original: string
  rephrased: string
  startTranslation: () => void
}

interface IRephrasedItem {
  keyName: string
  originalValue: unknown
  rephrasedValue: unknown
}

export const ReviewRephraseView: React.FC<IProps> = (props) => {
  const { original, startTranslation, rephrased, disabled } = props;
  const [originalRecords, setOriginalRecords] = useState<Record<string, unknown>>({});
  const [rephrasedRecords, setRephrasedRecords] = useState<Record<string, unknown>>({});

  useEffect(() => {
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(original);
    } catch {
      try {
        data = JSON.parse(`{${original}}`);
      } catch {
        data = {};
      }
    }
    setOriginalRecords(data);
  }, [original]);

  useEffect(() => {
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(rephrased);
    } catch {
      try {
        data = JSON.parse(`{${rephrased}}`);
      } catch {
        data = {};
      }
    }
    setRephrasedRecords(data);
  }, [rephrased]);

  const items: IRephrasedItem[] = Object.keys(rephrasedRecords).map(key => ({ keyName: key, originalValue: originalRecords[key], rephrasedValue: rephrasedRecords[key] }));
  console.log(items);

  const columns: IColumn[] = [
    { key: 'keyName', name: 'Key', fieldName: 'keyName', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'originalValue', name: 'Original Value', fieldName: 'originalValue', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'rephrasedValue', name: 'Rephrased Value', fieldName: 'rephrasedValue', minWidth: 100, maxWidth: 200, isResizable: true }
  ];

  function renderItemColumn (item: IRephrasedItem, index: number | undefined, column: IColumn | undefined) {
    if (column != null) {
      const fieldContent = item[column.fieldName as keyof IRephrasedItem] as string;
      const className = classname({ 'input-changed': item.originalValue !== item.rephrasedValue });
      switch (column.key) {
        case 'rephrasedValue':
          return <TextField className={className} defaultValue={fieldContent} onChange={(event, value) => { setRephrasedRecords({ ...rephrasedRecords, [item.keyName]: value }); }}/>;
        default:
          return <span>{fieldContent}</span>;
      }
    }
  }

  return (
    <Stack tokens={{ childrenGap: 10 }} className='ReviewRephraseViewWrapper'>
      <Label className='common__label'>Step 2 - Review result of rephrasing</Label>
      <DetailsList
            items={items}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            selectionMode={SelectionMode.none}
            onRenderItemColumn={renderItemColumn}
          />
      <Text>After you confirm the rephrasing results, you will be directed to another page to complete the translation. Once the translation is started, you will not be able to modify the inputs here.</Text>
      <PrimaryButton
        className='editor__button'
        text="Confirm & Continue"
        onClick={startTranslation}
        disabled={disabled}
      />
    </Stack>
  );
};
