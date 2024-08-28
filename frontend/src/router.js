import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from './App';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MatriculaLogin from './pages/MatriculaLogin';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "registro",
                    element: <Registro />
                },
                {
                    path: "dashboard",
                    element: <Dashboard />
                },
                {
                    path: "matricula",
                    element: <MatriculaLogin />
                }
            ],
        },
    ]
);

export default router;