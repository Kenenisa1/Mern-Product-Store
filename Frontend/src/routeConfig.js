export const routes = [
  { path: '/', element: 'HomePage' },
  { path: '/about', element: 'About' },
  { path: '/contact', element: 'Contact' },
  { path: '/home', element: 'HomePage' },
  { path: '/product/:id', element: 'ProductDetail' },
  { 
    path: '/create', 
    element: 'CreatePage',
    protected: true,
    admin: true 
  },
  { 
    path: '/products/:id/edit', 
    element: 'UpdateProductPage',
    protected: true,
    admin: true 
  },
  { path: '/signin', element: 'SignIn' },
  { path: '/signup', element: 'SignUp' },
  { 
    path: '/products', 
    element: 'Products',
    protected: true 
  },
  {
    path: '/privacy',
    element: 'PrivacyPolicy'
  }
];