/* eslint-disable @typescript-eslint/no-empty-function */
import { endpoints } from 'consts';
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage,
  sendRequest
} from 'helpers';
import { FormValues, User } from 'interfaces';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { createContext, useEffect, useMemo, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';

interface AuthProviderProps {
  children: React.ReactNode;
}
export interface AuthContextConfig {
  user?: User;
  // eslint-disable-next-line no-unused-vars
  login: (values: FormValues) => Promise<void>;
  logout: () => void;
}
interface DecodedJwt extends JwtPayload {
  username?: string;
  userType?: string;
}
const getDecodedUser = (token: string): User => {
  const { username, userType }: DecodedJwt = jwtDecode(token);
  return { username, userType };
};
export const AuthContext = createContext<AuthContextConfig>({
  user: undefined,
  login: () => new Promise(() => {}),
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate: NavigateFunction = useNavigate();

  const logout = (): void => {
    deleteFromLocalStorage('token');
    setUser(undefined);
  };
  const login = async (values: FormValues): Promise<void> => {
    const { token }: { token: string } = await sendRequest(
      endpoints.login,
      'post',
      values
    );
    saveInLocalStorage('token', token);
    const decodedUser: User = getDecodedUser(token);
    setUser(decodedUser);
    navigate(`/${decodedUser.userType || '/'}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const token: string | null = getFromLocalStorage('token');
        if (token) {
          const { tokenIsValid }: { tokenIsValid: boolean } = await sendRequest(
            endpoints.validate,
            'post'
          );
          if (tokenIsValid) {
            const decodedUser: User = getDecodedUser(token);
            setUser(decodedUser);
            navigate(`/${decodedUser.userType || '/'}`);
          }
        } else {
          navigate('/');
        }
      } catch {
        logout();
        navigate('/');
      }
    })();
  }, []);

  const authValue = useMemo<AuthContextConfig>(
    () => ({ user, login, logout }),
    [user]
  );
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
