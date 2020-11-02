const glob = require('glob');
const converter = require('json-2-csv');
const fs = require('fs');

glob('page1.json', (err, files) => {
    const data = [];

    files.forEach(filename => {
        const content = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const books = content.books;

        books.forEach(book => {
            data.push({
                read: book.library_card.state === 'finished',
                author: book.author,
                comments: book.annotation,
                cover: book.cover.large,
            });
        })
    });

    converter.json2csv(data, (err, csv) => {
        if (err) {
            throw err;
        }
    
        // print CSV string
        console.log(csv);
    });
});