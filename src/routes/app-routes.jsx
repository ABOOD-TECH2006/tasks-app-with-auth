import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CategoriesPage from "../pages/Dashboard/CategoriesPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import NewCategoryPage from "../pages/Dashboard/NewCategoryPage";
import NewTaskPage from "../pages/Dashboard/NewTaskPage";
import TaskDetailsPage from "../pages/Dashboard/TaskDetailsPage";
import TasksPage from "../pages/Dashboard/TasksPage";
import UpdateCategoryPage from "../pages/Dashboard/UpdateCategoryPage";
import UpdateTaskPage from "../pages/Dashboard/UpdateTaskPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/Dashboard/NotFoundPage";
const AppRoutes = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={loggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
      />

      {/* Redirect / to dashboard or login */}
      <Route
        path="/"
        element={
          loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* Dashboard protected routes */}
      <Route
        path="/dashboard"
        element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
      >
        {/* Default dashboard page */}
        <Route index element={<TasksPage />} /> {/* /dashboard */}
        {/* Tasks routes */}
        <Route path="tasks/new" element={<NewTaskPage />} />
        <Route path="tasks/details" element={<TaskDetailsPage />} />
        <Route path="tasks/update" element={<UpdateTaskPage />} />
        {/* Categories routes */}
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/new" element={<NewCategoryPage />} />
        <Route path="categories/update" element={<UpdateCategoryPage />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
