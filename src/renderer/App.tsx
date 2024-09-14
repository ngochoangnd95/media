import { ConfigProvider, ThemeConfig } from 'antd';
import Router from './router';

const theme: ThemeConfig = {
  token: {
    colorPrimary: 'rgb(109 40 217)',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
