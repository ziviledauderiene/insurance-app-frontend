import { CssBaseline } from '@mui/material';
import {
  AdminPortal,
  EmployerSetup,
  Header,
  LoginForm,
  EmployerUsersManager,
} from 'components';
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
        <Route path={Portals.admin} element={<AdminPortal />}>
          <Route path="employers/:employerId" element={<EmployerSetup />} />
          <Route
            path="employers/:employerId/users"
            element={<EmployerUsersManager />}
          />
        </Route>
      </Routes>
    </CssBaseline>
  );
};

export default App;
