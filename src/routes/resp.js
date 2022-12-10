/**
 * @param {object} res Express res object
 * @param {number} code HTTP Response code (404, 403, 401, 500 ...)
*/
const resp = (res, code) => {
    res.setHeader('content-type', 'text/html; charset=UTF-8').
        status(code).
        render('pages/error', {error: code});
}
module.exports = resp;