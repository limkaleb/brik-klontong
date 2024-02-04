import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Klontong
        </Typography>
        {userInfo ? (
          <div className="flex flex-row gap-8">
            <Typography variant="h4">{userInfo.name}</Typography>
            <Button variant="outlined" color="inherit" onClick={logoutHandler}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex flex-row gap-8">
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
