import { Route, Routes } from 'react-router-dom';
import { routes } from 'consts';
import { Header, LoginForm } from 'components';

const App = (): JSX.Element => (
  <>
    <Header routes={routes}/>
    <Routes>
      <Route index element={<>Insurance App</>} />
      {routes.map((route) => (
        <Route path={route} element={<LoginForm userType={route} />} />
      ))}
    </Routes>
  </>
);

export default App;
