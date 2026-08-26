import {
  Alert,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  useState,
  type FormEvent,
} from 'react';

import { useAuth } from '../context/AuthContext';

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      await login({
        email,
        password,
      });
      navigate('/', { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to sign in.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit}
    >
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        fullWidth
        required
        autoComplete="email"
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        fullWidth
        required
        autoComplete="current-password"
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </Stack>
  );
}