
var request = require('request');

module.exports.getProfile = (auth, callback) => {
    var options = {
        url: `${process.env.REACT_APP_API_URI}/profile`,
        headers: {
            'Authorization': auth
        }
    };

    request(options, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            callback(error);
        } else {
            callback(null, JSON.parse(body));
        }
    });
}