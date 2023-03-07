import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import LayoutPage from './components/LayoutPage';
import RequireAuth from './hoc/RequireAuth';
import { useAppDispatch } from './hooks/redux';
import Caledar from './pages/Calendar/Caledar';
import Error from './pages/Error';
import Login from './pages/Login/Login';
import { logIn } from './store/reducers/Login/AuthSlice';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(localStorage.getItem('auth')){
      dispatch(logIn((localStorage.getItem('username') || ' ')))
    }
  },[])
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutPage />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Login />,
        },
        {
          path: "calendar",
          element: (
            <RequireAuth path="/">
              <Caledar />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);
  return (
    <div className="App">
         <RouterProvider router={router} />
    </div>
  )
}

export default App
