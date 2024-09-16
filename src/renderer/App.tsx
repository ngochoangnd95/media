import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, ThemeConfig } from 'antd';
import Router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const theme: ThemeConfig = {
  token: {
    colorPrimary: 'rgb(109 40 217)',
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <Router />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
