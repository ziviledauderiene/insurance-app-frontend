/* eslint-disable react/jsx-boolean-value */
import { Route, Routes } from 'react-router-dom';
import { routes } from 'consts';
import { Header, LoginForm } from 'components';
import { CssBaseline } from '@mui/material';
import 'styles/index.scss';

const App = (): JSX.Element => (
  <CssBaseline>
    <Header userIsLogged={true} />
    <Routes>
      <Route index element={<LoginForm />} />
      {routes.map((route) => (
        <Route path={route} element={<>{route} portal</>} />
      ))}
    </Routes>
  </CssBaseline>
);

export default App;

// userIsLogged value should come from redux/context later
