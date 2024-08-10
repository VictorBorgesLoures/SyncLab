let mysqlPool = require('mysql').createPool({
    connectionLimit : 10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});

let logger = require('../../logger/Logger');

export default class DBConnection {

    constructor() {
        logger.danger('DBConnection', this);
        //throw new Error("DBConnection can't be instaciated");
    }

    static async createPool(query) {
        return new Promise((resolve, reject) => {
            mysqlPool.query(query, (err, results) => {
                if(err) {
                    logger.danger('DBConnection', 'Error on query: '+ query);
                    reject(err);
                } else 
                    resolve(results);                
            });
        });
    }
}