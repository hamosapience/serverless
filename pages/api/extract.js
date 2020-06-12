export default (req, res) => {
    const data = req.body.data;
    const itemId = Object.keys(data.list)[0];
    const item = data.list[itemId];
    const tags = item.tags ? Object.keys(item.tags) : [];

    if (parseInt(item.favorite)) {
        tags.push('best')
    }

    res.status(200).json({
        tags
    });
};