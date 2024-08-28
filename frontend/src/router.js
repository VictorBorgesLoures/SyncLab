import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from './App';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MatriculaLogin from './pages/MatriculaLogin';
import RequisitarMat from './pages/MatriculaLogin/Requisitar'

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
                    element: <MatriculaLogin />,
                    children: [
                        {
                            path: "requisitar",
                            element: <RequisitarMat />,

                        }
                    ]
                }
            ],
        },
    ]
);

export default router;