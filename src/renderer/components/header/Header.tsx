import { Menu, MenuProps } from 'antd';
import { FolderKanbanIcon, PencilRulerIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>('/video-editor/edit');

  const menuItems: MenuProps['items'] = [
    {
      key: '/video-editor',
      label: 'Video editor',
      icon: <PencilRulerIcon size={'1rem'} />,
      children: [
        {
          key: '/video-editor/edit',
          label: 'Edit video',
        },
        {
          key: '/video-editor/merge',
          label: 'Merge videos',
        },
        {
          key: '/video-editor/take-screenshot',
          label: 'Take screenshots',
        },
      ],
    },
    {
      key: '/management',
      label: 'Management',
      icon: <FolderKanbanIcon size={'1rem'} />,
    },
  ];

  useEffect(() => {
    navigate('/video-editor/edit');
  }, []);

  const handleClick: MenuProps['onClick'] = (info) => {
    setActiveKey(info.key);
    navigate(info.key);
  };

  return (
    <Menu
      mode='horizontal'
      theme='dark'
      items={menuItems}
      selectedKeys={[activeKey]}
      onClick={handleClick}
    />
  );
}

export default Header;
