/* eslint-disable react/jsx-boolean-value */
import { CssBaseline } from '@mui/material';
import { Header, LoginForm } from 'components';
import { routes } from 'consts';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext, AuthContextConfig } from 'store';
import 'styles/index.scss';

const App = (): JSX.Element => {
  const { user } = useContext<AuthContextConfig>(AuthContext);

  return (
    <CssBaseline>
      <Header user={user} />
      <Routes>
        <Route index element={<LoginForm />} />
        {routes.map((route) => (
          <Route path={route} element={<>{route} portal</>} />
        ))}
      </Routes>
    </CssBaseline>
  );
};

export default App;
