import { BrowserRouter } from 'react-router';
import { AppProviders } from './app/providers/AppProviders';
import { AppRoutes } from './app/routes';
import './shared/i18n/config';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
