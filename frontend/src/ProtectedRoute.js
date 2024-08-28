import fetchApi from "./fetch/fetch-api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default props => {
    const navigate = useNavigate();
    const locate = useLocation();
    console.log(locate);
    fetchApi('/auth', "post").then(res => {
        console.log(res);
        res.json().then(r => {
            if (r.redirect && locate.pathname != r.redirect) navigate(r.redirect);
        });
    }).catch(e => navigate('/'));
    return <Outlet></Outlet>
}