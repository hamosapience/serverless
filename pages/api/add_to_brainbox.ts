const got = require('got');

const BRAINBOX_API_URL = 'https://api.thebrain.com/api-v9/inbox';
const AUTH_URL = 'https://api.thebrain.com/api-v11/authenticate';

console.log("INIT");
let sid = null;

const updateSid = async () => {
    console.log('Updating sid...');

    const response = await got.post(AUTH_URL, {
        json: {
            username: process.env.THE_BRAIN_LOGIN,
            password: process.env.THE_BRAIN_PWD,
        },
        responseType: 'json'
    });

    const newSid = response
        .body?.data.attributes['session-id'];

    if (newSid) {
        console.log('Got new sid', newSid, response.body);
        sid = newSid;
    } else {
        console.error('Error updating sid', {
            data: response.body,
            statusCode: response.statusCode,
        });
    }
};

const addItem = async (text, link) => {
    console.log('Adding item', text, link);
    const response = await got.post(BRAINBOX_API_URL, {
        headers: {
            cookie: `sid=${sid}`,
        },
        form: {
            title: text,
            url: link,
        },
    });


    return response;
};


const handler = async (req, res) => {
    const message = req.body.message;
    const text = message.text ?? '';
    const url = message;

    console.log('Current sid', sid);

    if (!sid) {
        await updateSid();
    }

    const result = await addItem(text, 'https://yandex.ru');

    if (result.statusCode !== 200) {
        await updateSid();

    }

    console.log(result.statusCode);

    res.send(200);

};

export default handler;

