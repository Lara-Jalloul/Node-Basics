
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  let cmdHello = /hello/g;
  let cmdAdd = text.split(" ");
  let cmdRemove = text.split(" ");
  let cmdEdit = text.split(" ");
  let cmdCheck = text.split(" ");
  let cmdUnCheck = text.split(" ");

  if (text === 'quit\n' || text=='exit\n') {
    quit();
  }
  else if(cmdHello.test(text)){
    hello(text);
  }
  else if(text ==='list\n'){
    list();
  }
  else if(text === 'add\n'){
    console.log('error, you should add a task after add')
  }
  else if(cmdAdd[0] === 'add'){
    add(text);
  }
  else if(text === 'remove\n'){
    listt.pop();
    done.pop();
    list();
  }
  else if(cmdRemove[0] === 'remove'){
    remove(cmdRemove[1]);
  }
  else if(text === 'edit\n'){
    console.log('error, you should not write edit alone')
  }
  else if (cmdEdit[0] === "edit") {
    edit(text);
  }
  if (text === "check\n") {
    console.log("error");
  } else if (cmdCheck[0] === "check") {
    check(cmdCheck[1]);
  }
  if (text === "uncheck\n") {
    console.log("error");
  } else if (cmdUnCheck[0] === "uncheck") {
    uncheck(cmdUnCheck[1]);
  }
  else if(text === 'help\n'){
    help();
  }
  else{
    unknownCommand(text);
  }
}

const fs = require('fs');
let array;
let file;
if(process.argv[2]){
  file = process.argv[2]
}
else{
  file = 'database.json'
}
try {
    array = fs.readFileSync(file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
  });
} catch (error) {
  array= [];
}
if(array.length > 0){array = JSON.parse(array)}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @param  {string} r the text received
 * @returns {void}
 */
 function hello(r){
   console.log(r.trim()+ "!")
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  fs.writeFile(file, JSON.stringify(listt,null,1), 'utf8', function (err){
    if (err){
        console.log(err); 
    }
  console.log('Saving and Quitting now, goodbye!')
  process.exit();
  });
}

/**
* helps lists all the possible commands 
*
* @returns {void}
*/
function help(){
  const hello = "display hello";
  const extendHello = "handled empty spaces"
  const quit = "quit the app "
  const list = "list all the items"
  const help = "display all the possible commands"
  const remove = "remove the last item in the list"
  const add ="Add a task"
  const edit ="Edit a task"
  const check ="Check a task"
  const uncheck ="Uncheck a task"

  console.log('Here are the possible commands: \nhello: '+ hello+ '\nextended hello: ' +extendHello+ '\nquit: '+quit+ '\nlist: '+list+ '\nhelp: '+help+ '\nremove: '+remove+ '\nadd: '+add+ '\nEdit: '+edit+ '\nCheck: '+check+ '\nUncheck: '+uncheck+ '\n')
}

/**
* list all the items
*
* @returns {void}
*/
let listt = ["buy bread", "do the exercises"];
let done = ["[ ]", "[✓]"];
let task=1;

function list() {
 
  let i = 0;
    while (listt[i] != undefined) {
      console.log(`${task} - ${done[i]} ${listt[i]}`);
      i++;
      task++;
    }
}

/**
* add a task in the list
*
* @returns {void}
*/
function add(res) {
  let l = res.split(" ");
  l.shift();
  let j = l.toString();
  listt.push(j);
  done.push("[✓]");
  list();

}

/**
* remove a task in the list
*
* @returns {void}
*/
function remove(q) {
  if (q <= listt.length && q > 0) {
    listt.splice(q - 1, 1);
    done.splice(q - 1, 1);
    list();
  } else {
    console.log("number doesn't exist");
  }
}

/**
* edit a task in the list
*
* @returns {void}
*/
function edit(x) {
  let w = x.split(" ");
  w.shift();
  let y = w[0];
  if (isNaN(y)) {
    let j = w.toString();
    j = j.replace(/\,/g, " ");
    j = j.replace("\n", "");
    listt.pop();
    listt.push(j);
    list();
  } else if (y <= listt.length && y > 0) {
    w.shift();
    let k = w.toString();
    k = k.replace(/\,/g, " ");
    k = k.replace("\n", "");
    listt.splice(y - 1, 1, k);
    list();
  } 
}

function check(y) {
  done[y - 1] = "[✓]";
  list();
}

function uncheck(x) {
  done[x - 1] = "[ ]";
  list();
}



// The following line starts the application
startApp("Lara Jalloul")
