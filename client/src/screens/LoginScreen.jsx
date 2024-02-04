import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-3xl font-bold">Sign In</h1>
      <TextField
        autoFocus
        id="email"
        label="Email"
        type="text"
        fullWidth
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <TextField
        autoFocus
        id="password"
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        size="large"
      >
        Sign In
      </Button>

      <p>
        New Customer?{' '}
        <Link to={`/register`}>
          <u>
            <b>Register</b>
          </u>
        </Link>
      </p>
    </FormContainer>
  );
};

export default LoginScreen;
