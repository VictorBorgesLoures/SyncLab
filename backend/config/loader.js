import middlewares from './middlewares/loader.js'
import routes from './routes/loader.js'

export default app => {

    middlewares(app)
    routes(app);

}