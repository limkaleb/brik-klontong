import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('value name: ', name);
    console.log('value email: ', email);
    console.log('value password: ', password);
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <TextField
        autoFocus
        id="name"
        label="Name"
        type="text"
        fullWidth
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
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
      <Button variant="contained" onClick={handleSubmit} size="large">
        Sign Up
      </Button>
      <p>
        Already have an account?{' '}
        <Link to={`/login`}>
          <u>
            <b>Login</b>
          </u>
        </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterScreen;
