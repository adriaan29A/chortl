import inquirer from 'inquirer';

const questions = [
  {
      type: "input",
      name: "fruitList",
      message: "List all your favorite fruit",
      filter(answer) {
          return answer.split(/[ ,]+/).filter(Boolean);
      },
      validate(answer) {
          if (answer.length < 1) {
              return "Mention at least one fruit!";
          }
          return true;
      },
  }
]


function getFruitQuestions(answers) {
  const fruitList = answers.fruitList
  const fruitQuestions = []
  for (let i = 0; i < fruitList.length; i++) {
      const fruitName = fruitList[i]
      fruitQuestions.push(
          {
              type: "input",
              name: `fruit.${fruitName}.reason`,
              message: `Why do you like ${fruitName}?`
          }
      )
  }
  return fruitQuestions
}

inquirer
  .prompt(questions)
  .then((answers) => {
      inquirer.prompt(getFruitQuestions(answers)).then((fruitAnswers) => {
          console.log(JSON.stringify(fruitAnswers, null, 2))
      })
  })
  .catch((error) => {
      if (error.isTtyError) {
          console.log("Your console environment is not supported!")
      } else {
          console.log(error)
      }
  })
