let config = require('../config');

fetch(config.getUrl(config)+'/login', {
    method: "POST",
    body: {}
}).then(res => {
    console.log(res);
}).catch(e => {
    console.log(e)
})