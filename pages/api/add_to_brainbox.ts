const got = require('got');

const BRAINBOX_API_URL = 'https://api.thebrain.com/api-v9/inbox';
const AUTH_URL = 'https://api.thebrain.com/api-v11/authenticate';

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
        .body?.data.id;

    if (newSid) {
        console.log('Got new sid');
        sid = newSid;
    } else {
        console.error('Error updating sid', {
            data: response.body,
            statusCode: response.statusCode,
        });
    }
};

const addItem = async (text, link) => {
    const response = await got.post(BRAINBOX_API_URL, {
        form: {
            title: text,
            url: link,
        },
    });



    

};


const handler = async (req, res) => {
    const message = req.body.message;
    const text = message.text ?? '';

    console.log('Current sid', sid);

    if (!sid) {
        await updateSid();
    }


    // const result = await addItem(text, 'https://yandex.ru');

    // console.log(result);

    res.send(200);

};

export default handler;

