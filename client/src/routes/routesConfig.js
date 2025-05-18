export const ROUTES = {
  PUBLIC: [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> }
  ],
  PRIVATE: [
    { path: '/dashboard', element: <Dashboard /> }
  ]
}