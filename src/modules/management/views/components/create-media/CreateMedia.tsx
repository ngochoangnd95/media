import { Modal, ModalInstance } from '@/renderer/components/modal';
import {
  Button,
  Divider,
  Form,
  FormProps,
  Input,
  Radio,
  RadioGroupProps,
  Rate,
  Select,
  Space,
} from 'antd';
import { PlusIcon } from 'lucide-react';
import { MediaType } from '../../../constants';

interface CreateMediaProps {
  modal: ModalInstance;
  onSuccess?: () => void;
}

function CreateMedia({ modal, onSuccess }: CreateMediaProps) {
  const [form] = Form.useForm();

  const mediaTypeOptions: RadioGroupProps['options'] = [
    {
      value: MediaType.Image,
      label: 'Image',
    },
    {
      value: MediaType.Video,
      label: 'Video',
    },
  ];

  const handleSubmit: FormProps['onFinish'] = (values) => {
    //
  };

  return (
    <Modal
      modal={modal}
      title={'Add media'}
      afterClose={() => form.resetFields()}
      onOk={form.submit}
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item name={'name'} label={'Name'}>
          <Input />
        </Form.Item>
        <Form.Item name={'type'} label={'Type'} rules={[{ required: true }]}>
          <Radio.Group options={mediaTypeOptions} optionType='button' buttonStyle='solid' />
        </Form.Item>
        <Form.Item name={'url'} label={'URL'}>
          <Input />
        </Form.Item>
        <Form.Item name={'path'} label={'Path'}>
          <Input />
        </Form.Item>
        <Form.Item name={'rate'} label={'Rate'}>
          <Rate allowHalf />
        </Form.Item>
        <Form.Item name={'tags'} label={'Tags'}>
          <Select
            mode='multiple'
            options={[]}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input />
                  <Button type='text' icon={<PlusIcon size={'1rem'} />}>
                    Add
                  </Button>
                </Space>
              </>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateMedia;
