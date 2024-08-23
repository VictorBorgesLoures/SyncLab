import { createConnection } from 'mysql2'
import Logger from '../../logger/Logger.js';
import env from 'dotenv';

env.config();

let mysqlPool = createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});


export default class DBConnection {

    constructor() {
        if (this.constructor === UserManager) {
            Logger.danger('DBConnection tried to be instaciated');
            throw new Error("DBConnection can't be instaciated");
        }
    }

    static createPool(query, keys = []) {
        return new Promise((resolve, reject) => {
            mysqlPool.query(query, keys, (error, results) => {
                if (error) {
                    Logger.danger('DBConnection: QUERY', error);
                    reject({ status: 500, msg: ['Error on query'] });
                }
                else {
                    Logger.info('DBConnection', results);
                    resolve(results);
                }              
            });      

        });
    }
}