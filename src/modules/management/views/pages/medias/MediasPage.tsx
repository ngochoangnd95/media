import { Modal } from '@/renderer/components/modal';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Flex, Typography } from 'antd';
import { CreateMedia } from '../../components/create-media';
import styles from './MediasPage.module.css';

function MediasPage() {
  const [createMediaModal] = Modal.useModal();

  const { data: { items, total } = {} } = useQuery({
    queryKey: ['medias'],
    queryFn: () => window.managementApi.findManyMedias({ page: 1, limit: 20 }),
  });

  return (
    <>
      <Flex vertical style={{ padding: '1rem' }}>
        <Typography.Title level={2}>Media management</Typography.Title>
        <Flex vertical gap={8}>
          <Flex>
            <Button onClick={() => createMediaModal.open()}>Add media</Button>
          </Flex>

          <div className={styles.gridLayout}>
            {items?.map((item) => <Card key={item.id}></Card>)}
          </div>
        </Flex>
      </Flex>

      <CreateMedia modal={createMediaModal} />
    </>
  );
}

export default MediasPage;
