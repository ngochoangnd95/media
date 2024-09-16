import { Button, Divider, Input, InputRef, Select, SelectProps, Space } from 'antd';
import { PlusIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

export interface SelectTagProps extends SelectProps {}

export function SelectTag({ ...props }: SelectTagProps) {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: debounce
    setKeyword(e.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    //
  };

  return (
    <Select
      mode='multiple'
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              ref={inputRef}
              value={keyword}
              onChange={onKeywordChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type='text' icon={<PlusIcon size={'1rem'} />} onClick={addItem}>
              Add
            </Button>
          </Space>
        </>
      )}
      {...props}
    />
  );
}
