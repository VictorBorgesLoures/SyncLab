import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MatriculaLoign from './pages/MatriculaLogin';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            loader: rootLoader,
            children: [
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "registro",
                    element: <Login />
                },
                {
                    path: "dashboard",
                    element: <Login />
                },
                {
                    path: "matricula",
                    element: <Login />
                },
            ],
        },
    ]
);

export default router;