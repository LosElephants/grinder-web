
var request = require('request');

module.exports.getProfile = (auth, callback) => {
    var options = {
        url: `${process.env.REACT_APP_API_URI}/profile`,
        headers: {
            'Authorization': `Bearer ${auth}`
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

module.exports.updateProfile = (auth, profile, callback) => {
    var options = {
        url: `${process.env.REACT_APP_API_URI}/profile`,
        headers: {
            'Authorization': `Bearer ${auth}`
        },
        body: JSON.stringify(profile)
    }
    request.post(options, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            callback(error);
        } else {
            callback(null, JSON.parse(body));
        }
    });
    
}