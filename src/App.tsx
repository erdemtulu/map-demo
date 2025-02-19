import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
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
        path: '',
        element: <Navigate to={localStorage.getItem('accessToken') ? '/app' : '/login'} />,
      },
      {
        path: 'login',
        element: localStorage.getItem('accessToken') ? <Navigate to='/app' /> : <LoginPage />,
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
