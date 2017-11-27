// If you'd like to have more than one js file use node.js requires.
// For example here we have file.js being inlcuded. For each additional file
// you're requiring all you need is to create an object (Ex: fileName) and set
// as require('whatever path and file name as a string'), (Ex: require('./file.js');)

// const fileName = require('./file.js');
//
// window.onload = function() {
//     console.log("file included", fileName);
// }

console.log('js compiled');


// const schedule = require('./schedule.js');


// const contactScript = require('./contactScript.js');
const moire = require('./moire.js');
const jquery = require('./vendor/jquery-3.2.1.slim.min.js');

window.onload = function() {


  // console.log("schedule included", schedule);


  // console.log("contactScript included", contactScript);
  console.log("moire included", moire);
  console.log("jquery included", jquery);
}
