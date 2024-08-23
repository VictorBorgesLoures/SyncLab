module.exports = {
    server: "localhost",
    port: "3300",
    scheme: "http",
    getUrl: (c) => c.scheme+"://"+c.server + ":" + c.port
}