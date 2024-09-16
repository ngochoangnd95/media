import { extractPath } from '@/utils';
import { Button, Col, Flex, Form, FormProps, Input, message, Row, Typography, Upload } from 'antd';
import { UploadIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { normFile } from '../../../utils';
import { useProcess } from '../../hooks/useProcess';
import styles from './TakeScreenshotPage.module.css';

function TakeScreenshotPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  useProcess({
    onStart: useCallback(() => {
      setLoading(true);
    }, []),
    onEnd: useCallback(() => {
      setLoading(false);
      messageApi.success('Take screenshots completed.');
    }, []),
  });

  const handleChooseDestination = async () => {
    const path = await window.commonApi.saveToFolder({
      defaultPath: form.getFieldValue('destination'),
    });
    if (path) {
      form.setFieldValue('destination', path);
    }
  };

  const handleSubmit: FormProps['onFinish'] = (values) => {
    const params = {
      ...values,
      input: window.commonApi.showFilePath(values.input?.[0]),
      timestamps: (values.timestamps || '').split(','),
    };
    window.videoEditorApi.takeScreenshot(params);
  };

  const handleValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    if (changedValues.input) {
      const inputPath = window.commonApi.showFilePath(changedValues.input?.[0]);
      const { dirname } = extractPath(inputPath);
      form.setFieldValue('destination', dirname);
    }
  };

  return (
    <Flex vertical style={{ padding: '1rem' }}>
      <Typography.Title level={2}>Take screenshots</Typography.Title>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name={'input'}
          label={'Input'}
          valuePropName='fileList'
          getValueFromEvent={normFile}
          required
          rules={[{ required: true }]}
        >
          <Upload.Dragger beforeUpload={() => false} accept='video/*' maxCount={1}>
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

        <Form.Item label='Destination folder' required>
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

        <Form.Item name={'timestamps'} label={'Timestamps'} rules={[{ required: true }]}>
          <Input placeholder='sss,h:mm:ss.xxx,...' />
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

export default TakeScreenshotPage;
