import { Button, Col, Flex, Form, FormProps, Input, message, Row, Typography, Upload } from 'antd';
import { UploadIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { createOutputPath, normFile } from '../../../utils';
import { useProcess } from '../../hooks/useProcess';
import styles from './MergeVideosPage.module.css';

function MergeVideosPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  useProcess({
    onStart: useCallback(() => {
      setLoading(true);
    }, []),
    onEnd: useCallback(() => {
      setLoading(false);
      messageApi.success('Merge videos completed.');
    }, []),
  });

  const handleChooseDestination = async () => {
    const path = await window.commonApi.saveToFile({
      defaultPath: form.getFieldValue('destination'),
    });
    if (path) {
      form.setFieldValue('destination', path);
    }
  };

  const handleSubmit: FormProps['onFinish'] = (values) => {
    const params = {
      ...values,
      inputs: values.inputs.map((input: File) => window.commonApi.showFilePath(input)),
    };
    window.videoEditorApi.merge(params);
  };

  const handleValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    if (changedValues.inputs) {
      const inputPath = window.commonApi.showFilePath(changedValues.inputs?.[0]);
      const destination = createOutputPath(inputPath, 'MERGED');
      form.setFieldValue('destination', destination);
    }
  };

  return (
    <Flex vertical style={{ padding: '1rem' }}>
      <Typography.Title level={2}>Merge videos</Typography.Title>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name={'inputs'}
          label={'Inputs'}
          valuePropName='fileList'
          getValueFromEvent={normFile}
          required
          rules={[{ required: true }]}
        >
          <Upload.Dragger beforeUpload={() => false} accept='video/*' multiple>
            <Flex
              vertical
              align='center'
              justify='center'
              gap={8}
              className={styles.uploadPlaceholder}
            >
              <UploadIcon size={'2rem'} />
              <span>Click or drag file to this area to upload</span>
            </Flex>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item label='Destination' required>
          <Row gutter={8}>
            <Col flex={'auto'}>
              <Form.Item name='destination' noStyle rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col flex={'none'}>
              <Button onClick={handleChooseDestination}>Choose</Button>
            </Col>
          </Row>
        </Form.Item>

        <Flex justify='center' className={styles.actions}>
          <Button type='primary' htmlType='submit' size='large' loading={loading}>
            Submit
          </Button>
        </Flex>
      </Form>

      {messageContextHolder}
    </Flex>
  );
}

export default MergeVideosPage;
