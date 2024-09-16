import { Button, Flex, Typography } from 'antd';
import styles from './MediasPage.module.css';

function MediasPage() {
  return (
    <>
      <Flex vertical style={{ padding: '1rem' }}>
        <Typography.Title level={2}>Media management</Typography.Title>
        <Flex vertical gap={8}>
          <Flex>
            <Button>Add media</Button>
          </Flex>

          <div className={styles.gridLayout}></div>
        </Flex>
      </Flex>
    </>
  );
}

export default MediasPage;
