var fs = require('fs');
var spelledNumber = require('../lib/spelled-number');
var es = require('event-stream');

var rs = fs.createReadStream('./input.txt');
var fd = fs.openSync('./outfile.txt', 'w');
rs.setMaxListeners(0);

rs.pipe(es.split())
    .pipe(es.through(
    function write(data) {
        this.pause();
        fs.writeSync(fd, spelledNumber.findAndReplace(data) + '\n');
        this.resume();
        this.emit('data',data);
    }));

