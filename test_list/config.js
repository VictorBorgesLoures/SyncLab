let config = {
    server: "localhost",
    port: "3000",
    scheme: "http"
}

let getUrl = () => config.scheme + "://" + config.server + ":" + config.port;

module.exports = {
    fetch: (url, body) => {
        return fetch(getUrl() + url, {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            withCredential: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}