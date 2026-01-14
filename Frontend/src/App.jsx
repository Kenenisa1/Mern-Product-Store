// src/App.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { routes } from './routeConfig';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const loadComponent = (componentName) => {
  return lazy(() => 
    import(`./pages/${componentName}`)
      .catch(() => {
        console.error(`Failed to load component: ${componentName}`);
        return import('./pages/NotFound');
      })
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {routes.map((route) => {
          const LazyComponent = loadComponent(route.element);
          
          let element = (
            <Suspense fallback={<LoadingSpinner />}>
              <LazyComponent />
            </Suspense>
          );
          
          // Apply route guards - admin routes require both auth and admin privileges
          if (route.admin) {
            element = (
              <ProtectedRoute>
                <AdminRoute>
                  {element}
                </AdminRoute>
              </ProtectedRoute>
            );
          } else if (route.protected) {
            element = (
              <ProtectedRoute>
                {element}
              </ProtectedRoute>
            );
          }
          
          // Routes can opt-out of layout (e.g., login page)
          const withLayout = route.layout !== false;
          
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                withLayout ? (
                  <>
                    <Navbar />
                    {element}
                    <Footer />
                  </>
                ) : (
                  element
                )
              }
            />
          );
        })}
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;