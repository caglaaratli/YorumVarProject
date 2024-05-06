
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser as loginUserRedux } from './redux/actions/authActions'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      dispatch(loginUserRedux(JSON.parse(user)));
    }
  }, [dispatch]);
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;