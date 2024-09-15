import EditVideoPage from '@/modules/video-editor/views/pages/edit';
import MergeVideosPage from '@/modules/video-editor/views/pages/merge/MergeVideosPage';
import TakeScreenshotPage from '@/modules/video-editor/views/pages/take-screenshot';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../pages/error';
import RootLayout from '../pages/root';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'video-editor',
        children: [
          {
            path: 'edit',
            element: <EditVideoPage />,
          },
          {
            path: 'merge',
            element: <MergeVideosPage />,
          },
          {
            path: 'take-screenshot',
            element: <TakeScreenshotPage />,
          },
        ],
      },
      {
        path: 'management',
        element: <></>,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
