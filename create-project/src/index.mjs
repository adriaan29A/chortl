import inquirer from 'inquirer';


const question = [
    {
        type: "input",
        name: "wordlHint",
        message: "Enter word, hint",
        filter(answer) {
            return answer.split(/[ ,]+/).filter(Boolean);
        },
        validate(answer) {
            if (answer.length != 2) {
                return "Please enter  word, hint";
            }
            return true;
        }
    }
]

function doPrompt(question) {

    inquirer
        .prompt(question)

        .then((answers) => {
            console.log(JSON.stringify(answers, null, 2))
            doPrompt(question)

        })

        .catch((error) => {
            if (error.isTtyError) {
                console.log("Your console environment is not supported!")
            } else {
                console.log(error)
            }}) 
}


doPrompt(question)
