import { Modal, ModalProps } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { CustomModalInstance, useModal } from './useModal';

interface CustomModalProps<TData = any> extends ModalProps {
  modal: CustomModalInstance<TData>;
}

const CustomModal = <TData,>({ modal, title = true, onCancel, ...rest }: CustomModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(modal.ref, () => ({
    open,
    close,
  }));

  const open = (data?: TData) => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleCancel: ModalProps['onCancel'] = (e) => {
    onCancel?.(e);
    close();
  };

  return <Modal open={isOpen} centered title={title} onCancel={handleCancel} {...rest} />;
};

CustomModal.useModal = useModal;

export { CustomModal, type CustomModalProps };
