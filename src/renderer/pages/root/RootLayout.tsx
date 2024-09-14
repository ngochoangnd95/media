import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.css';

function RootLayout() {
  return (
    <Layout className={styles.container}>
      <Layout.Header className={styles.header}></Layout.Header>
      <Layout.Content className={styles.content}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Layout.Content>
    </Layout>
  );
}

export default RootLayout;
