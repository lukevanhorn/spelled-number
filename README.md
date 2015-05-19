# Spelled Number 

A number spelling utility for Node.js

## Install

    npm install spelled-number

## Usage

Typical usage:

    var spelledNumber = require('spelled-number');

	spelledNumber.toWords(9999);
	//=> "ninety nine thousand nine hundred ninety nine"
	 
	spelledNumber.toWords(2015);
	//=> "two thousand fifteen"

	spelledNumber.toWords("1,234");
	//=> "one thousand two hundred thirty four"
	
	spelledNumber.toWords("123,432,567");
	//=> "one hundred twenty three million four hundred thirty two thousand five hundred sixty seven"

	spelledNumber.findAndReplace("The 2 users crashed 10 servers 1,234 times.");
	//=> "The two users crashed ten servers one thousand two hundred thirty four times."

	
Stream example: 

	var fs = require('fs');
	var es = require('event-stream');
	var spelledNumber = require('spelled-number');

	var rs = fs.createReadStream('./input.txt');
	var fd = fs.openSync('./output.txt', 'w');
	rs.setMaxListeners(0);

	rs.pipe(es.split())
		.pipe(es.through(
		function write(data) {
			this.pause();
			fs.writeSync(fd, spelledNumber.findAndReplace(data) + '\n');
			this.resume();
			this.emit('data',data);
		}));



