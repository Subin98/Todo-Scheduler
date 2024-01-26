import CreateTodo from '../pages/CreateTodo';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/login';
import Root from '../pages/root';

export const appRoutes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
      { path: '/create-todo', element: <CreateTodo /> }
    ]
  }
];
