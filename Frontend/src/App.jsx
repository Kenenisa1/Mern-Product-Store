import { lazy, Suspense, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { routes } from './routeConfig';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Component loader with error handling
const loadComponent = (componentName) => {
  return lazy(() => 
    import(`./pages/${componentName}`)
      .then(module => ({ default: module[componentName] || module.default }))
      .catch(() => import('./pages/NotFound'))
  );
};

// Pre-load all components to prevent reloads
const componentCache = {};
routes.forEach(route => {
  componentCache[route.element] = loadComponent(route.element);
});

const App = () => {
  // Memoize routes to prevent unnecessary re-renders
  const routeElements = useMemo(() => {
    return routes.map((route) => {
      const LazyComponent = componentCache[route.element];
      
      let element = (
        <Suspense fallback={<LoadingSpinner />}>
          <LazyComponent />
        </Suspense>
      );
      
      // Route protection logic
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
      
      const withLayout = route.layout !== false;
      
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            withLayout ? (
              <>
                <Navbar />
                <main className="grow">
                  {element}
                </main>
                <Footer />
              </>
            ) : (
              <div className="min-h-screen">
                {element}
              </div>
            )
          }
        />
      );
    });
  }, []);

  return (
    <ErrorBoundary>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          // style: { background: '#363636', color: '#fff' },
        }}
      />
      <Routes>
        {routeElements}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;