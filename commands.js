#!/usr/bin/env node
const program = require("commander");
const shell = require("shelljs");
const path = require("path");
const fs = require("fs");
const { prompt } = require("inquirer");
const packageInfo = require('./package.json')

const CWD = process.cwd();
const releaseFolderName = '.release'
const releaseDir = `${CWD}/${releaseFolderName}`;
const colorReference = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

program
  .version(packageInfo.version)
  .alias("v")
  .description("React Node Application Generator");

// Generate Command
program
  .command("generate")
  .alias("g")
  .description("Generate React Node Application")
  .action(async () => {
    try {
      const { isCorrectDirectory } = await prompt([
        {
          type: "confirm",
          name: "isCorrectDirectory",
          message: `Make sure you are inside the react project root directory`,
        },
      ]);
      if (!isCorrectDirectory) {
        console.log(
          colorReference.FgRed,
          "Sorry: You must be in root directoy of react project",
          colorReference.Reset
        );
        process.exit();
      }
      console.log(
        colorReference.FgMagenta,
        "....Making Release Started....",
        colorReference.Reset
      );

      // making release directory and copying core node code inside it to serve react build
      console.log(
        colorReference.FgCyan,
        "Your current working directory: ",
        CWD,
        colorReference.Reset
      );
      const { isNewRelease } = await prompt([
        {
          type: "confirm",
          name: "isNewRelease",
          default: false,
          message: `Do you want to generate brand new release. only give Yes if you want to overide all your code on ${releaseFolderName} directory?`,
        },
      ]);

      if (isNewRelease) {
        shell.rm("-rf", releaseDir);
        shell.mkdir(releaseDir);
        shell.cp(
          "-R",
          `${__dirname}/node/*`,
          `${__dirname}/node/.*`,
          releaseDir
        );
      } else {
        if (!fs.existsSync(releaseDir)) {
          console.log(
            colorReference.FgRed,
            "Sorry: You dont have existing release directory",
            colorReference.Reset
          );
          process.exit();
        }
      }

      console.log(
        colorReference.FgMagenta,
        "....Making React Build, This will take some time....",
        colorReference.Reset
      );
      // making react build
      if (shell.exec("npm run build").code !== 0) {
        console.log(
          colorReference.FgRed,
          "Error: React build failed",
          colorReference.Reset
        );
        shell.exit(1);
      }

      // copying build to release directory
      shell.cp("-R", `${CWD}/build/.`, releaseDir);

      //[gitignire-operation] Add build folder to gitignore from release directory
      const gitIgnireFilePath = `${CWD}/.gitignore`
      const stringToAdd = `\n\n#Added By React-Node-Cli\n${releaseFolderName}/build\n`
      const data = fs.readFileSync(gitIgnireFilePath)
      // Only add if it is not added previously
      if(data.indexOf(stringToAdd) < 0){
        fs.appendFileSync(gitIgnireFilePath, stringToAdd);
       }

      const { CURRENT_GIT_ORIGIN, BRANCH_NAME, COMMIT_MESSAGE } =
        await workingOnGit();

      console.info(
        colorReference.FgGreen,
        `Deployed successfully 😀 ,please check on your ${BRANCH_NAME} branch in github(${CURRENT_GIT_ORIGIN})`,
        colorReference.Reset
      );
      console.info(
        colorReference.FgGreen,
        `To run locally: $cd ${releaseFolderName} && npm start`,
        colorReference.Reset
      );
      process.exit();
    } catch (error) {
      console.log(
        colorReference.FgRed,
        "Error: error executing command ",
        error,
        colorReference.Reset
      );
    }
  });

program.parse(process.argv);


async function workingOnGit() {
  console.log(
    colorReference.FgMagenta,
    "....Working on git....",
    colorReference.Reset
  );
  // checking git and working on git
  if (!shell.which("git")) {
    console.log(
      colorReference.FgRed,
      "Sorry, this script requires git",
      colorReference.Reset
    );
    shell.exit(1);
  }
  // Findout git origin
  const CURRENT_GIT_ORIGIN_RESULT = shell.exec(
    "git config --get remote.origin.url"
  );
  if (CURRENT_GIT_ORIGIN_RESULT.code !== 0) {
    console.log(
      colorReference.FgRed,
      "Error: Please make sure you have git initialized and added the remote origin, Try again later..",
      colorReference.Reset
    );
    shell.exit(1);
  }
  const CURRENT_GIT_ORIGIN = CURRENT_GIT_ORIGIN_RESULT.stdout.replace(
    /(\n|\r)/g,
    ""
  );
  console.log(
    colorReference.FgCyan,
    "Your current git origin: ",
    CURRENT_GIT_ORIGIN,
    colorReference.Reset
  );
  // switching to release directory to work on git operation
  shell.cd(releaseDir);
  // initialized git
  shell.exec("git init");
  // Set remote origin
  shell.exec(`git remote add origin "${CURRENT_GIT_ORIGIN}"`);

  // Get prefer branch name and commit message
  const DEFAULT_BRANCH_NAME = "frontend-release";
  const DEFAULT_COMMIT_MESSAGE = "release with build";
  const { branchName, commitMessage } = await prompt([
    {
      type: "input",
      name: "branchName",
      message: `Enter your prefer branch name: [default:${DEFAULT_BRANCH_NAME}]: `,
    },
    {
      type: "input",
      name: "commitMessage",
      message: `Enter your commit message: [default:${DEFAULT_COMMIT_MESSAGE}]: `,
    },
  ]);
  const BRANCH_NAME = branchName || DEFAULT_BRANCH_NAME;
  const COMMIT_MESSAGE = commitMessage || DEFAULT_COMMIT_MESSAGE;

  // Do basic git operation to push to prefer branch
  shell.exec(`git checkout -b "${BRANCH_NAME}"`);
  shell.exec(`git add .`);
  shell.exec(`git commit -m "${COMMIT_MESSAGE}"`);
  shell.exec(`git push -f origin "${BRANCH_NAME}"`);

  return { CURRENT_GIT_ORIGIN, BRANCH_NAME, COMMIT_MESSAGE };
}
