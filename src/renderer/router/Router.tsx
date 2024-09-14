import { createHashRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../pages/error';
import RootLayout from '../pages/root';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
