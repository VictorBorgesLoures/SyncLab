import Logger from '../logger/Logger.js'
import middlewares from './middlewares/loader.js'
import routes from './routes/loader.js'

export default app => {
    Logger.info("ROUTES","Loading Routes")
    middlewares(app)
    routes(app);

}