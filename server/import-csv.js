var fs = require('fs'),
    csv = require('csv-parser'),
    levelup = require('levelup'),
    path = require('path');

var task = path.basename(process.argv[2]).split('.')[0],
    db = levelup('./' + task + '.ldb'),
    count = 0;

var done = 0;

fs.createReadStream(process.argv[2])
    .pipe(csv())
    .on('data', function(data) {
        // should really batch these
        db.put(count, JSON.stringify(data), function (err) {
            if (err) console.log('-- error --', err);
            done++;
        });
        count++;
    })
    .on('end', function() {
        setTimeout(function() {
            console.log(done);
            console.log(count-done);
        }, 2000);
    });
