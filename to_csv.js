const glob = require('glob');
const converter = require('json-2-csv');
const fs = require('fs');

glob('page1.json', (err, files) => {
    const data = [];

    files.forEach(filename => {
        const content = JSON.parse(fs.readFileSync(filename, 'utf8'));
        data.push(content);
    });

    converter.json2csv(data, (err, csv) => {
        if (err) {
            throw err;
        }
    
        // print CSV string
        console.log(csv);
    });
});