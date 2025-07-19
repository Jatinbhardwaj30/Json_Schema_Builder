import React, { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col, Card, Tabs, Button, message } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import SchemaBuilder from './SchemaBuilder';
import { SchemaField } from './types';
import 'antd/dist/reset.css';

const { TabPane } = Tabs;
const LOCAL_STORAGE_KEY = 'json_schema_data';

const loadSchemaFromLS = (): { schema: SchemaField[] } => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data && JSON.parse(data).schema?.length > 0) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load or parse schema from localStorage", error);
  }
  // Return a default schema if nothing is found or an error occurs
  return {
    schema: [
      { id: 'field1', key: 'user', type: 'Nested', fields: [
        { id: 'field2', key: 'name', type: 'String', fields: [] },
        { id: 'field3', key: 'age', type: 'Number', fields: [] }
      ]}
    ]
  };
};

const App: React.FC = () => {
  const methods = useForm({
    defaultValues: loadSchemaFromLS(),
    mode: 'onChange',
  });
  const { watch, reset } = methods;
  const [jsonResult, setJsonResult] = useState({});

  // Wrap generateJson in useCallback to fix exhaustive-deps warning
  const generateJson = useCallback((schema: SchemaField[]): any => {
    const result: any = {};
    if (!schema) return result;
    schema.forEach(field => {
      if (field && field.key) {
        switch (field.type) {
          case 'String': result[field.key] = 'Sample String'; break;
          case 'Number': result[field.key] = 12345; break;
          case 'Boolean': result[field.key] = true; break;
          case 'Nested': result[field.key] = generateJson(field.fields || []); break;
          case 'Array':
            if (field.arrayType === 'Nested') {
              result[field.key] = [generateJson(field.fields || [])];
            } else if (field.arrayType === 'String') {
              result[field.key] = ['String 1', 'String 2'];
            } else if (field.arrayType === 'Number') {
              result[field.key] = [1, 2, 3];
            } else if (field.arrayType === 'Boolean') {
              result[field.key] = [true, false];
            }
            break;
        }
      }
    });
    return result;
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      setJsonResult(generateJson(value.schema as SchemaField[]));
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
      } catch (error) {
        console.error("Failed to save schema to localStorage", error);
      }
    });
    setJsonResult(generateJson(methods.getValues().schema as SchemaField[]));
    return () => subscription.unsubscribe();
  }, [watch, methods, generateJson]);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonResult, null, 2));
    message.success('JSON copied to clipboard!');
  };

  const handleClearAll = () => {
    reset({ schema: [] });
    message.info('Schema cleared.');
  };

    return (
    <FormProvider {...methods}>
      <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Card 
              title="JSON Schema Builder" 
              extra={<Button danger icon={<DeleteOutlined />} onClick={handleClearAll}>Clear All</Button>}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              {/* Remove DragDropContext from here */}
              <SchemaBuilder nestIndex="schema" />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Real-time JSON Output">
              <Tabs 
                defaultActiveKey="1" 
                tabBarExtraContent={<Button icon={<CopyOutlined />} onClick={copyToClipboard}>Copy</Button>}
              >
                <TabPane tab="JSON" key="1">
                  <pre style={{ background: '#fafafa', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: '70vh', overflow: 'auto' }}>
                    {JSON.stringify(jsonResult, null, 2)}
                  </pre>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default App;