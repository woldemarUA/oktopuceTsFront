import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar';

import AppContextProvider from './context/AppContextProvider';
import Intro from './pages/Intro';

import clientRoutes from './routes/ClientRoutes';
import sitesRoutes from './routes/SitesRoutes';

import globalStyles from './styles/globalStyles';

const App: React.FC = () => {
  return (
    <Router>
      <AppContextProvider>
        <NavBar />
        <div className={globalStyles.body}>
          <div
            className={`${globalStyles.container} ${globalStyles.mobilePadding}`}>
            <Routes>
              <Route
                path='/'
                element={<Intro />}
                caseSensitive={true}
              />
              {clientRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
              {sitesRoutes.map((route) => (
                <Route
                  key={route.path}
                  element={route.element}
                  path={route.path}
                />
              ))}
            </Routes>
          </div>
        </div>
      </AppContextProvider>
    </Router>
  );
};

export default App;
