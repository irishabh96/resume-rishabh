#!/usr/bin/env node
// This line is important as our package is going to run from cli and we need to know the environment in the script.

const inquirer = require('inquirer');
const chalk = require('chalk');

const response = chalk.bold.green;
const title = chalk.bold.yellow;
const resume = require('./resume.json');

var resumePrompts = {
  type: 'list',
  name: 'resumeOptions',
  message: 'What do you want to know about me?',
  choices: [...Object.keys(resume), 'Exit'],
};

function main() {
  console.log(title('Hello, My name is Rishabh, welcome to my resume'));
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then((answer) => {
    if (answer.resumeOptions == 'Exit') {
      return;
    }
    var option = answer.resumeOptions;

    console.log(response('--------------------------------------'));
    resume[`${option}`].forEach((info) => {
      console.log(response('|   => ' + info));
    });
    console.log(response('--------------------------------------'));
    inquirer
      .prompt({
        type: 'list',
        name: 'exitBack',
        message: 'Go back or Exit?',
        choices: ['Back', 'Exit'],
      })
      .then((choice) => {
        if (choice.exitBack == 'Back') {
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

main();
