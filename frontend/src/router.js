import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from './App';
import Registro from './pages/Registro';
import Login from './pages/Login';
import SyncLab from './pages/SyncLab';
import Dashboard from './pages/SyncLab/Dashboard';
import MatriculaLogin from './pages/MatriculaLogin';
import RequisitarMat from './pages/Requisitar';
import Projetos from "./pages/SyncLab/Projetos";
import Admin from "./pages/SyncLab/Admin"
import Requisicoes from "./pages/SyncLab/Admin/requisicoes";

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
                    path: "matricula",
                    element: <MatriculaLogin />,
                },
                {
                    path: "matricula/requisitar",
                    element: <RequisitarMat />,

                },
                {
                    path: "synclab",
                    element: <SyncLab></SyncLab>,
                    children: [

                        {
                            path: "dashboard",
                            element: <Dashboard />,
                            
                        },
                        {
                            path: 'projetos',
                            element:<Projetos />
                        },
                        {
                            path: 'admin',
                            element: <Admin />,
                            children: [
                                {
                                    path: 'requisicoes',
                                    element: <Requisicoes />,
                                }
                            ]
                        }

                    ]
                }
            ],
        },
    ]
);

export default router;