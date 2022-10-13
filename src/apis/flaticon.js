import axios from 'axios';

const KEY = 'be00846d20af42c3e41dbc3003d5d80320881ee6';

// flaticon APIのドキュメントで指定されているもの
var headers = {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
};

export const temporalToken = axios.post('https://api.flaticon.com/v3/app/authentication', {
    apikey: KEY,
    headers: headers,
}).then(res => {
    console.log(res);
    console.log(res.data);

    return res.data.data.token;
});

/**
 * これでtemporal tokenが返って来ていることがわかる
 *
 * 公式ドキュメントによると「Authorization: A temporal authentication token is needed to validate the request.」らしいので、
 * 下記コメントアウト部分のように、Bearer tokenとしてheaderに含め渡しているが、「Cannot read properties of undefined (reading 'data')」のエラーになる
 *
 * stylesを呼び出しているときに、temporalTokenがAPIからまだ返って来ていないのか？？
 */

// -----------------

// var headersForStyles = {
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${temporalToken.data.data.token}`
// };

// export const styles = axios.get('https://api.flaticon.com/v3/styles', {
//     headers: headersForStyles,
// }).then(res => {
//     console.log(res);
// });
