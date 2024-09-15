import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import styles from './RootLayout.module.css';

function RootLayout() {
  return (
    <Layout className={styles.container}>
      <Layout.Header className={styles.header}>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Suspense>
          <Outlet />
        </Suspense>
      </Layout.Content>
    </Layout>
  );
}

export default RootLayout;
