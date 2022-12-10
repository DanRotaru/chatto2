const axios = require('axios');


// async function reqq(url, data, cb){
//     axios({
//         method: 'POST',
//         url: url,
//         data: data
//     }).then(function (response) {
//         console.log(">>>"+response.data);
//         // if(cb) cb(response);
//     });
// } 

const qiwi = async () => {
    const URL = 'https://edge.qiwi.com';
    const o = '/funding-sources/v2/persons/personId/accounts';

    // req("https://edge.qiwi.com/funding-sources/v2/persons/personId/accounts", {
    //     hello: 1
    // });
    // axios({
    //     method: 'POST',
    //     url: 'https://edge.qiwi.com/funding-sources/v2/persons/personId/accounts'
    // }).then(function (response) {
    //     console.log(">>>"+response.data);
    //     // if(cb) cb(response);
    // });
    const token = '..your token..'

    axios.post("https://edge.qiwi.com/funding-sources/v2/persons/personId/accounts", {}, {
        headers: {
            'Authorizatioxn': `Basic ${token}` 
        }
    })
}

module.exports = qiwi;