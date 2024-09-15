import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Flex,
  Form,
  FormProps,
  Input,
  Radio,
  Row,
  Space,
  Tabs,
  TabsProps,
  Typography,
  Upload,
} from 'antd';
import { MoreHorizontalIcon, UploadIcon } from 'lucide-react';
import { Flip, Rotate } from '../../../constants';
import { createOutputPath, getFilePath, normFile } from '../../../utils';
import styles from './EditVideoPage.module.css';

function EditVideoPage() {
  const [form] = Form.useForm();

  const handleTrimBlankBorder = () => {
    form
      .validateFields(['input'])
      .then(() => {
        window.videoEditorApi.trimBlankBorder({
          input: getFilePath(form.getFieldValue('input')),
        });
      })
      .catch((result) => Promise.resolve(result));
  };

  const items: TabsProps['items'] = [
    {
      key: 'cut',
      label: 'Cut',
      children: (
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name='startTime' label='Start time' className='flex-1 basis-36'>
              <Input placeholder='h:mm:ss.xxx' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='endTime' label='End time' className='flex-1 basis-36'>
              <Input placeholder='h:mm:ss.xxx' />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      key: 'crop',
      label: 'Crop',
      children: (
        <Form.Item label='Crop'>
          <Row gutter={8}>
            <Col flex={'auto'}>
              <Form.Item name='crop' noStyle>
                <Input placeholder='w:h:x:y' />
              </Form.Item>
            </Col>
            <Col flex={'none'}>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'trimBlankBorders',
                      label: 'Trim blank borders',
                      onClick: handleTrimBlankBorder,
                    },
                  ],
                }}
              >
                <Button icon={<MoreHorizontalIcon size={'1rem'} />} />
              </Dropdown>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      key: 'rotate',
      label: 'Rotate',
      children: (
        <Form.Item name='rotate' label='Rotate'>
          <Radio.Group>
            <Space direction='horizontal' wrap>
              <Radio value={undefined}>None</Radio>
              <Radio value={Rotate.D90}>{`90\u00B0`}</Radio>
              <Radio value={Rotate.D180}>{`180\u00B0`}</Radio>
              <Radio value={Rotate.D270}>{`270\u00B0`}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      ),
    },
    {
      key: 'flip',
      label: 'Flip',
      children: (
        <Form.Item name='flip' label='Flip'>
          <Checkbox.Group>
            <Space direction='horizontal' wrap>
              <Checkbox value={Flip.Horizontal}>Horizontal</Checkbox>
              <Checkbox value={Flip.Vertical}>Vertical</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
      ),
    },
  ];

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
      input: getFilePath(values.input?.[0]),
    };
    window.videoEditorApi.edit(params);
  };

  const handleValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    if (changedValues.input?.[0]) {
      const inputPath = getFilePath(changedValues.input[0]);
      const destination = createOutputPath(inputPath, 'EDITED');
      form.setFieldValue('destination', destination);
    }
  };

  return (
    <Flex vertical style={{ padding: '1rem' }}>
      <Typography.Title level={2}>Edit video</Typography.Title>
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

        <Tabs items={items} type='card' className={styles.editOptionsTabs} />

        <Flex justify='center' className={styles.actions}>
          <Button type='primary' htmlType='submit' size='large'>
            Submit
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
}

export default EditVideoPage;
