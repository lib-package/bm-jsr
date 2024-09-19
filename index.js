#!/usr/bin/env node

import chalk from "chalk";
import degit from "degit";
import readlineSync from "readline-sync";

// Prompt user for project name
const defaultProjectName = "bm-boilerplate-svelte-app";
const projectName =
  readlineSync.question(
    chalk.magenta.bold(`Enter project name (e.g: ${defaultProjectName}): `)
  ) || defaultProjectName;

const repo = "https://github.com/lib-package/byteminds-template#main";

const emitter = degit(repo, {
  cache: false,
  force: true,
});

// Handle info event
emitter.on("info", (info) => {
  console.log(info.message);
});

// Start cloning process
console.log(
  chalk.green(
    `Creating your new Svelte App templated by ByteMinds PH "${projectName}"...\n`
  )
);

emitter
  .clone(`./${projectName}`)
  .then(() => {
    console.log(
      `${chalk.green(
        `\n - "${projectName}", a Beginner-friendly Svelte App successfully created and is ready to use. \n - Navigate to your project directory via`
      )} ${chalk.bgMagenta.bold("cd")} ${chalk.green(
        "command. \n\n****INSTALL DEPENDENCIES****\n -"
      )} ${chalk.bgMagenta.bold("npm install\n")} ${chalk.green(
        "\n****START DEVELOPMENT SERVER****\n -"
      )} ${chalk.bgBlue.bold("npm run dev")} ${chalk.green(
        `\n\n - Happy Coding :)`
      )}`
    );
  })
  .catch((error) => {
    console.error(chalk.red("Error in creating the app:"), error);
  });
