/*  Spelled Number
    Author: Luke Van Horn
    License: MIT
    Description: Spelled Number Utility.
*/

//regex pattern to match numbers
//exludes decimals, percentages or numbers with non-standard comma formatting
var pattern = /(?:\s|^)(([\d]{1,3}([,]\d{3})+)|([\d]+))(?:\.\s|\s|\.$|$)/g;

var ones = [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tens = [null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var places = [null, null, 'hundred', 'thousand', null, 'hundred', 'million', null, 'hundred', 'billion', null, 'hundred', 'trillion', null, 'hundred'];

module.exports = {
    
    /* function findAndReplace 
     * @param {String} [data] string containing one or more numbers to replace with words
     * @return {String}  Returns modified string
     * 
     * Find and replace multiple numbers within a string
     */
    findAndReplace: function (data) {
        var self = this;
        
        //for each match of pattern
        return data.toString().replace(pattern, function (val, num) {
            
            //replace and return the spelled number 
            return val.replace(num,self.toWords(num));
        });
    },
    

    /* function toWords 
     * @param {String|Number} [numbers] Number to convert into spelled number string
     * @return {String}  Returns formatted spelled number string or the original value if unable to convert
     */
    toWords: function (numbers) {
        //check for invalid number
        if (!numbers) {
            return null;
        }
        
        //do not convert numbers larger than 15 digits
        if (numbers.toString().replace(/,/g, '').length > 15) {
            return numbers;
        }

        //replace commas if present
        numbers = numbers.toString().replace(/,/g, '');
        
        //remove any leading zeros by converting to a number and back to string
        numbers = (+numbers).toString().replace(/,/g, '');

        var words = [];
        
        //convert to a character array and reverse order
        numbers = numbers.split('').reverse();
        
        //init i to end of array
        var i = numbers.length - 1;

        //temp integer value
        var val = 0;

        while (i >= 0) {
            //add the current digit to val (normally zero unless special tens place)
            val += +numbers[i];

            //look for tens place
            if (!places[i] && i > 0) {
                
                //if less than twenty
                if (val < 2) {
                    
                    //multiply by 10 and get the next digit
                    val *= 10;

                    //move the index
                    i--;
                    continue;
                } else {
                    //get from tens array and add to words array
                    words.push(tens[val]);
                }
            } else {
                //add digit to word array
                if (ones[val]) {
                    words.push(ones[val]);
                }

                //add significance to word array
                if (i > 0 && val > 0) {
                    words.push(places[i]);
                }
            }
            //move the index
            i--;
            //reset val to zero
            val = 0;
        }
        
        //join words array with spaces and return 
        return words.join(' ');
    }
}
