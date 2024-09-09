    export default new class {

    _successColor = '\x1b[32m';
    _warningColor = '\x1b[33m';
    _infoColor = '\x1b[34m';
    _dangerColor = '\x1b[31m';
    _reset = '\x1b[0m';

    success(from, message = "") {
        if(typeof(message) == "object")
            message = JSON.stringify(message);
        this.logMessage(`${this._successColor}[${from}]${this._reset}: ${message}`);
    }

    warning(from, message = "") {
        if(typeof(message) == "object")
            message = JSON.stringify(message);
        this.logMessage(`${this._warningColor}[${from}]${this._reset}: ${message}`);
    }

    info(from, message = "") {
        if(typeof(message) == "object")
            message = JSON.stringify(message);
        this.logMessage(`${this._infoColor}[${from}]${this._reset}: ${message}`);
    }

    danger(from, message = "") {
        if(typeof(message) == "object")
            message = JSON.stringify(message);
        this.logMessage(`${this._dangerColor}[${from}]${this._reset}: ${message}`);
    }

    logMessage(msg) {
        let prod = process.env.PROD || false;
        if(prod) 
            console.log(msg);
    }
}