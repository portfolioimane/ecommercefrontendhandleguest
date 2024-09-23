import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../../axios'; // Ensure axios is configured correctly
import { registerSuccess, setError } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();

  // Debugging: Log form values
  console.log('Form Values:', { name, email, password, confirmPassword });

  if (password !== confirmPassword) {
    dispatch(setError('Passwords do not match.'));
    return;
  }

  try {
    // Debugging: Log the request data
    console.log('Sending registration request...');
    const response = await axios.post('/api/register', {
      name,
      email,
      password,
      password_confirmation: confirmPassword, // This field is used for confirmation

    });

    // Debugging: Log the response data
    console.log('Registration Response:', response.data);
    dispatch(registerSuccess(response.data));
    navigate('/login'); // Redirect to login after successful registration
  } catch (err) {
    // Debugging: Log error details
    console.error('Registration Error:', err.response?.data);
    const errorMessage = err.response?.data?.errors?.password?.[0] || 'Failed to register.';
    dispatch(setError(errorMessage));
  }
};


  return (
    <Container className="mt-5">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </Form.Group>


        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;