import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AddJob,
  AllJobs,
  Error,
  Landing,
  Layout,
  Login,
  Profile,
  Register,
  SingleError,
  Stats,
} from "./pages";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (1000 * 60),
      cacheTime: 5 * (1000 * 60),
    },
  },
});
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// loaders
import { loader as statsLoader } from "./pages/Stats";
// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
// store
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // global error
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Stats />,
        // errorElement: <SingleError />,
        loader: statsLoader(store),
      },
      {
        path: "/all-jobs",
        element: <AllJobs />,
      },
      {
        path: "/add-job",
        element: <AddJob />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  // 這三個 route 沒有使用共同部分
  {
    path: "/landing",
    element: <Landing />,
    // global error
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    // global error
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    // global error
    errorElement: <Error />,
    action: loginAction(store),
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
