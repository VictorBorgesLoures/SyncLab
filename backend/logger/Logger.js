module.exports = new class {

    _successColor = '\\x1b[32m';
    _warningColor = '\\x1b[33m';
    _infoColor = '\\x1b[34m';
    _dangerColor = '\\x1b[31m';
    _reset = '\\x1b[0m';

    success(from, message) {
        this.logMessage(`${this._successColor}[${from}]: ${message}${this._reset}`);
    }

    warning(from, message) {
        this.logMessage(`${this._warningColor}[${from}]: ${message}${this._reset}`);
    }

    info(from, message) {
        this.logMessage(`${this._infoColor}[${from}]: ${message}${this._reset}`);
    }

    danger(from, message) {
        this.logMessage(`${this._dangerColor}[${from}]: ${message}${this._reset}`);
    }

    logMessage(msg) {
        console.log(msg)
    }
}