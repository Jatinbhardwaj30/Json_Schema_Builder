import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Droppable } from 'react-beautiful-dnd';
import SchemaRow from './SchemaRow';

interface SchemaBuilderProps {
  nestIndex: string;
}

const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ nestIndex }) => {
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
  });

  const getFields = () => getValues(nestIndex);

  return (
    <div>
      {fields.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No fields defined. Add one below."
          style={{padding: '20px 0'}}
        />
      ) : (
        <Droppable droppableId={nestIndex}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((item, index) => (
                <SchemaRow
                  key={item.id}
                  nestIndex={nestIndex}
                  index={index}
                  onRemove={remove}
                  getFields={getFields}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      <Button
        type="dashed"
        onClick={() => append({ key: '', type: 'String', fields: [], id: `field_${Date.now()}` })}
        icon={<PlusOutlined />}
        style={{ marginTop: '10px' }}
      >
        Add Field
      </Button>
    </div>
  );
};

export default SchemaBuilder;