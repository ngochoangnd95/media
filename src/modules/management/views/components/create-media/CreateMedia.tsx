import { CreateMediaParams } from '@/modules/management/types/medias.type';
import { Modal, ModalInstance } from '@/renderer/components/modal';
import { useMutation } from '@tanstack/react-query';
import { Form, FormProps, Input, Radio, RadioGroupProps, Rate } from 'antd';
import { MediaType } from '../../../constants';
import { SelectTag } from '../select-tag';

interface CreateMediaProps {
  modal: ModalInstance;
  onSuccess?: () => void;
}

export function CreateMedia({ modal, onSuccess }: CreateMediaProps) {
  const [form] = Form.useForm();

  const { mutate: createMedia } = useMutation({
    mutationFn: (params: CreateMediaParams) => window.managementApi.createMedia(params),
    onSuccess() {
      onSuccess?.();
    },
  });

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
    createMedia({
      ...values,
      rate: Math.round(values.rate * 2),
    });
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
          <SelectTag />
        </Form.Item>
      </Form>
    </Modal>
  );
}
