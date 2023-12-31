import { IUsers } from '../../interfaces/types';
import { assertIsSingleUser } from '../../services/getData';

export async function authenticate(): Promise<IUsers | undefined> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login/success`, {
    credentials: 'include',
  });
  const body = (await response.json()) as unknown;
  assertIsSingleUser(body);
  return body;
}

export async function logout(): Promise<void> {
  await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`);
}
