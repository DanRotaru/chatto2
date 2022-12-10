/**
 * Qiwi API Payments
 */

const axios = require('axios');
class QIWI {
    URL = 'https://edge.qiwi.com';

    /**
     * @param {String} number Qiwi wallet number (without +)
     * @param {String} token QIWI Token
     */
    constructor(number, token){
        if(!number || token) return 'QIWI Number or TOKEN is undefined!';
        
        this.number = number;
        this.token = token;
        console.log(number, this.number);
    }

    /**
     * @param {String} url Request Path
     * @param {String} method Request Method (POST, GET, PUT..). By Default is GET
     */
    request = async (url, method) => {
        if(!method) method = 'GET';
        let res;
        axios({
            method: method,
            url: this.URL + url,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        }).then(response => {
            res = {
                success: 1,
                data: response.data
            }
            return res;
        }).catch(err => {
            res = {
                success: 0,
                data: err
            }
            return res;
        });
    }

    /**
     * @param {Number} currency Currency type (0 (default): RUB, 1: USD, 2: EUR, 3: TENGE)
     */
    getBalance = async (currency) => {
        console.log(this.number);
        if(!currency) currency = 0;
        if(currency > 3 || currency < 0) return 'Undefined currency type';

        let data = await this.request(`https://edge.qiwi.com/funding-sources/v2/persons/${this.number}/accounts`);
        return data;
    }
}

module.exports = QIWI;