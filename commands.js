#!/usr/bin/env node
const program = require("commander");
const shell = require("shelljs");
const path = require("path");
const fs = require("fs");
const { prompt } = require("inquirer");
const packageInfo = require("./package.json");
var settings = require("./settings.json");
const utils = require("./utils");

const CWD = process.cwd();
/**
 * Parent Directory in client side to hold all reference code
 */
const referenceCodeDirectoryName = ".react-node-cli";
const settingsJsonFileName = "settings.json";
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
  .description("React Node Full Stack Application Generator & Helper");

// Generate Command
program
  .command("generate")
  .alias("g")
  .description("Generate node application to serve react build")
  .action(async () => {
    /**
     * This directory will have core node js code to server react build
     */
    const nodeCodeDirectoryName = `${referenceCodeDirectoryName}/node`;
    const clentSettingJsonFile = path.join(
      process.cwd(),
      referenceCodeDirectoryName,
      settingsJsonFileName
    );
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
      // making release directory and copying core node code inside it to serve react build
      console.log(
        colorReference.FgCyan,
        "Your current working directory: ",
        CWD,
        colorReference.Reset
      );

      //Storing reference code initially
      if (
        !fs.existsSync(nodeCodeDirectoryName) ||
        !fs.existsSync(referenceCodeDirectoryName)
      ) {
        shell.rm("-rf", referenceCodeDirectoryName);
        shell.mkdir("-p", nodeCodeDirectoryName);
        shell.cp(
          "-R",
          `${__dirname}/node/*`,
          `${__dirname}/node/.*`,
          nodeCodeDirectoryName
        );
        shell.cp(
          "-R",
          `${__dirname}/settings.json`,
          referenceCodeDirectoryName
        );
        await prompt([
          {
            name: "continue",
            message: `Make sure to change your node code if needed inside ${nodeCodeDirectoryName} folder before procedding. eg PORT , CORS etc: Press enter to continue`,
          },
        ]);
      }
      //Storing seetings file
      if (
        fs.existsSync(referenceCodeDirectoryName) &&
        !fs.existsSync(clentSettingJsonFile)
      ) {
        shell.cp(
          "-R",
          `${__dirname}/settings.json`,
          referenceCodeDirectoryName
        );
      }
      const clientSettings = await utils
        .readJsonFile(clentSettingJsonFile)
        .catch(() => {});
      if (clientSettings) settings = clientSettings;

      var releaseFolderName = settings.generate.releaseFolderName;
      var reactBuildFolderName = settings.generate.reactBuildFolderName;
      const {
        runBuildCommand,
        userInputReleaseOutputDirectory,
        userInputReactBuildDirectory,
        deployToGit,
      } = await prompt([
        {
          type: "confirm",
          name: "runBuildCommand",
          default: true,
          message: `Do you want to run react build command ?`,
        },
        {
          type: "input",
          name: "userInputReleaseOutputDirectory",
          message: `Enter your prefer react node release output directory: [default:${releaseFolderName}]: `,
        },
        {
          type: "input",
          name: "userInputReactBuildDirectory",
          message: `Enter your prefer react build directory to serve: [default:${reactBuildFolderName}]: `,
        },
        {
          type: "confirm",
          name: "deployToGit",
          default: true,
          message: `Do you want to deploy your release output directory to github branch using git ?`,
        },
      ]);

      //Copy all fresh/modified code from code node folder to release folder
      if (
        userInputReleaseOutputDirectory &&
        userInputReleaseOutputDirectory !== releaseFolderName
      ) {
        releaseFolderName = userInputReleaseOutputDirectory;
        //Store in user setting too
        settings.generate.releaseFolderName = releaseFolderName;
      }
      if (
        userInputReactBuildDirectory &&
        userInputReactBuildDirectory !== reactBuildFolderName
      ) {
        reactBuildFolderName = userInputReactBuildDirectory;
        //Store in user setting too
        settings.generate.reactBuildFolderName = reactBuildFolderName;
      }
      const releaseDir = path.join(CWD, releaseFolderName);
      const buildDirPath = path.join(CWD, reactBuildFolderName);
      if (runBuildCommand) {
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
      }
      if (!fs.existsSync(buildDirPath)) {
        console.log(
          colorReference.FgRed,
          `Error: Given folder does not exists [${buildDirPath}]`,
          colorReference.Reset
        );
        shell.exit(1);
      }
      // copying build to release directory
      shell.rm("-rf", releaseDir);
      shell.mkdir(releaseDir);
      shell.cp(
        "-R",
        `${nodeCodeDirectoryName}/*`,
        `${nodeCodeDirectoryName}/.*`,
        `${buildDirPath}/.`,
        releaseDir
      );
      //[gitignire-operation] Add release out folder to gitignore which is auto generaterd
      const gitIgnireFilePath = `${CWD}/.gitignore`;
      const stringToAdd = `\n\n#Added By React-Node-Cli\n${releaseFolderName}\n`;
      if (fs.existsSync(gitIgnireFilePath)) {
        const data = fs.readFileSync(gitIgnireFilePath);
        // Only add if it is not added previously
        if (data.indexOf(stringToAdd) < 0) {
          fs.appendFileSync(gitIgnireFilePath, stringToAdd);
        }
      }

      //Only deploy to git if user wants to deploy
      if (deployToGit) {
        await workingOnGit(releaseDir);
      }
      // Save Settings into a setting file
      await utils
        .writeJsonFile(settings, clentSettingJsonFile)
        .catch((err) => {});
      console.info(
        colorReference.FgGreen,
        `Completed: To run locally: $cd ${releaseFolderName} && npm start`,
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

// Generate Starter Structure Command
program
  .command("export")
  .alias("exp")
  .description("Export React Starter Structure")
  .action(async () => {
    const exportTemplates = [
      {
        name: "Export react structure only",
        outFolderName: "exported_react_structure_only",
        path: "/templates/react_structure_only",
      },
      {
        name: "Export react structure with materialUI & Mobx",
        outFolderName: "exported_react_mui_mobx",
        path: "/templates/react_mui_mobx",
      },
      {
        name: "Export react structure with materialUI & Redux",
        outFolderName: "exported_react_mui_redux",
        path: "/templates/react_mui_redux",
      },
    ];
    try {
      console.log(
        colorReference.FgCyan,
        "Your current working directory: ",
        CWD,
        colorReference.Reset
      );
      const DEFAULT_EXTRACT_FOLDER_NAME = "/exported_react_structure";
      var folderToExport = DEFAULT_EXTRACT_FOLDER_NAME;
      const { exportType } = await prompt([
        {
          type: "list",
          name: "exportType",
          message: "What you want to export? (Use arrow keys)",
          choices: exportTemplates.map((i) => i.name),
        },
      ]);
      const templateType = exportTemplates.find((i) => i.name == exportType);
      folderToExport = templateType.outFolderName;
      const { extractFolderName } = await prompt([
        {
          type: "input",
          name: "extractFolderName",
          message: `Enter your prefer folder name to export: ${colorReference.FgGreen}[default:${folderToExport}]${colorReference.Reset}, If it is your fresh project, simply enter directory as ${colorReference.FgGreen}/${colorReference.Reset}: `,
        },
      ]);
      if (extractFolderName) folderToExport = extractFolderName;
      const { aggreed } = await prompt([
        {
          type: "confirm",
          name: "aggreed",
          default: false,
          message: `This will replace all code that you have in ${colorReference.FgGreen}[${folderToExport}]${colorReference.Reset} directory and it is can not be Undone. Do you aggreed of this ?`,
        },
      ]);
      if (!aggreed) {
        console.log(
          colorReference.BgRed,
          "Exited: Reason not aggreed",
          colorReference.Reset
        );
        process.exit();
      }
      //Export Path: where to export
      const exportPath = path.join(CWD, folderToExport);
      //Template Path: from where to export
      const templatePath = path.join(__dirname, templateType.path);

      shell.mkdir("-p", exportPath);
      shell.cp("-R", `${templatePath}/*`, `${templatePath}/.*`, exportPath);
      const dirs = fs.readdirSync(templatePath);
      console.log(
        colorReference.FgGreen,
        `Completed:: Exported Directories: ${JSON.stringify(
          dirs
        )} inside ${exportPath}`,
        colorReference.Reset
      );
      console.log(
        colorReference.BgRed,
        `Please make sure to install all required packages to work with this structure by running command:${colorReference.FgGreen} $ npm install ${colorReference.Reset}`,
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
      process.exit(1);
    }
  });

// Deploy any folder to github branch
program
  .command("git_deploy")
  .alias("gdeploy")
  .description("Deploy any folder to github branch")
  .action(async () => {
    try {
      const { userInputTargetFolderName } = await prompt([
        {
          type: "input",
          name: "userInputTargetFolderName",
          message: `Enter your prefer folderName to deploy in github: `,
        },
      ]);
      const userInputTargetFolderPath = path.join(
        CWD,
        userInputTargetFolderName
      );
      if (
        !userInputTargetFolderName ||
        !fs.existsSync(userInputTargetFolderPath)
      ) {
        console.log(
          colorReference.FgRed,
          `Error: Given folder does not exists or invalid folder, please provide valid foldername`,
          colorReference.Reset
        );
        shell.exit(1);
      }

      await workingOnGit(userInputTargetFolderPath);

      console.info(colorReference.FgGreen, `Completed`, colorReference.Reset);
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

/**
 * This will deploy the given folder to github branch
 * @param {string} folderToDeploy
 * @returns
 */
async function workingOnGit(folderToDeploy) {
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
  shell.cd(folderToDeploy);
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

  console.info(
    colorReference.FgGreen,
    `${folderToDeploy} is successfully Deployed to git 😀 ,please check on your ${BRANCH_NAME} branch in github(${CURRENT_GIT_ORIGIN})`,
    colorReference.Reset
  );

  return { CURRENT_GIT_ORIGIN, BRANCH_NAME, COMMIT_MESSAGE };
}
