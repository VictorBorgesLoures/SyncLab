import Logger from "../../logger/Logger.js";

export default class DBResponse {

    constructor(from, message, data, error = null, status = 200) {
        this.from = from;
        this.error = error;
        this.data = data;
        this.message = message;
        this.status = status;
    }

    logPrint() {
        Logger.info(this.from, this.message);
        Logger.logMessage(this.status);
        if(this.error)
            Logger.logMessage(this.error);
        if(this.data)
            Logger.logMessage(this.data);
    }

}