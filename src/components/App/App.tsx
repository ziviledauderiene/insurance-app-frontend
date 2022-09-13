/* eslint-disable react/jsx-boolean-value */
import { CssBaseline } from '@mui/material';
import { AdminPortal, Header, LoginForm } from 'components';
import { Portals } from 'interfaces';
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
        <Route path={Portals.admin} element={<AdminPortal />} />
      </Routes>
    </CssBaseline>
  );
};

export default App;
