const got = require('got');

const BRAINBOX_API_URL = 'https://api.thebrain.com/api-v9/inbox';
const AUTH_URL = 'https://api.thebrain.com/api-v11/authenticate';

let sid = null;

const updateSid = () => {


};

export default (req, res) => {
    const message = req.body.message;
    const text = message.text ?? '';

    console.log(text);

    if (!sid) {
        updateSid();
    }


    console.log('password', process.env);

    res.send(200);

}

