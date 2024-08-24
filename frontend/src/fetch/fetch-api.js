let config = {
    server: "localhost",
    port: "3006",
    scheme: "http"
}

let getUrl = () => config.scheme + "://" + config.server + ":" + config.port;

export default (url, method, body) => {
        let config = {
            method,
            credentials: "include",
            withCredential: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        if(method != "get")
            config.body = JSON.stringify(body);

        //check method? must be get, put, post or delete.
        return fetch(getUrl() + url, config);
    }