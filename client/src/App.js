import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appRoutes } from './routes/appRoutes';
import { Provider } from 'react-redux';
import { persistor, store } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  const router = createBrowserRouter(appRoutes);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
