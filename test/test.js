var spelledNumber = require('../lib/spelled-number');

var testArray = [
    0,
    2015,
    '1,234',
    '123,432,567',
    '143,000,000,000,001',
    'There are 0 people on the spacecraft.',
    'The 2 users crashed 10 servers 1,234 times.',
    '410 million Windows 8.1 machines will upgrade to Windows 10 within the 1st year.',
    '9999,9999', //invalid, should not change
    '9,990,000,000,000,121' //too large, should not change
];

console.log(spelledNumber.toWords(99999));
console.log(spelledNumber.toWords(1234));
console.log(spelledNumber.toWords('123,345'));


for(var i = 0; i < testArray.length; i++) {
    console.log(spelledNumber.findAndReplace(testArray[i]));
}

console.log('finished');
