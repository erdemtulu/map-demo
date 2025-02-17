import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthRouterOutlet from './AuthRouterOutlet';
import HomePage from './pages/HomePage';
import RouterOutlet from './RouterOutlet';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <RouterOutlet />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
    ]
  },
  {
    path: '/',
    element: <AuthRouterOutlet />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ]
  }
])


function App() {
  return (<>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
