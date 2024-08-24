import login from './login.js'
import registro from './registro.js'
import matricula from './matricula.js'
import auth from './auth.js'

export default app => {

    auth(app);
    login(app);
    registro(app);
    matricula(app);

}