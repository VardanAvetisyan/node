module.exports.msgs = [
    {
        "header": "Test header",
        "body": "Test body"
    },
    {
        "header": "Test header 2",
        "body": "Test body 2"
    }
];

module.exports.mongoObjectId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};