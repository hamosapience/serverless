export default (req, res) => {
    const i = req.body.data;

    function s (strings, value1, value2) {
        if (!value1) {
            return null;
        }

        const parts = [
            strings[0],
            value1,
            strings[1],
            value2
        ].filter(x => x).join('');

        return {string: parts};
    };

    const roam = [{
        title: i.title,
        children: [{
            string: "Meta",
            heading: 2,
            children: [
                s`Type: #${i.type}`,
                s`Source: #${i.source}`,
                s`Date: [[${i.date}]]`,
                s`Added at: [[${i.added_at}]]`,
                s`Link: [${i.link_type}](${i.added_at})]`,
                s`Tags: ${i.tags.map(t => '#' + t).join(' ')}`,
                {string: `Related: `},
                s`Read: ${i.read}`,
                s`Author: [[${i.author}]]`,
                s`Name: **${i.author_display_name}**`,
                s`Thread: [Thread](${i.thread})`,
            ].filter(Boolean)
        }, {
            string: "Content",
            heading: 2,
            children: [
                {string: i.content}
            ]
        }]
    }];

    res.status(200).json(roam);
};