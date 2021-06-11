
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


  if (text === 'quit\n' || text=='exit\n') {
    quit();
  }
  else if(cmdHello.test(text)){
    hello(text);
  }
  else if(text === 'help\n'){
    help();
  }
  else{
    unknownCommand(text);
  }
}


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
  console.log('Quitting now, goodbye!')
  process.exit();
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
  const check = "Mark a task as done"
  const uncheck = "Mark a task as pending"

  console.log('Here are the possible commands: \nhello: '+ hello+ '\nextended hello: ' +extendHello+ '\nquit: '+quit+ '\nlist: '+list+ '\nhelp: '+help+ '\nremove: '+remove+ '\nadd: '+add+ '\ncheck: '+check+ '\nunchecked: '+uncheck+ '\n')
  }

// The following line starts the application
startApp("Lara Jalloul")
