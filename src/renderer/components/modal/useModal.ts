import { useRef } from 'react';

interface CustomModalImperativeHandle<TData> {
  open: (data?: TData) => void;
  close: () => void;
}

interface CustomModalInstance<TData = any> extends CustomModalImperativeHandle<TData> {
  readonly ref: React.RefObject<CustomModalImperativeHandle<TData>>;
}

const useModal = <TData = any>() => {
  const ref = useRef<CustomModalImperativeHandle<TData>>(null);

  const modal: CustomModalInstance<TData> = {
    ref,
    open: (data) => ref.current?.open(data),
    close: () => ref.current?.close(),
  };

  return [modal];
};

export { useModal, type CustomModalInstance };
