
# React-Node Code Generator

This code contains the core node js code to serve react build and commnads file to make a final release build with both node and react combined.


## Features

- Easy release build for react js to host on aws ec2 instance OR any other terminal
- Automatically push release build to github branch
- Single command to make build and release

  
## Usage/Examples
Download zip of this file to your system.

### Installation

Goto downloaded zip directory and unzip it and cd into it after that do following,

Install the dependencies

```sh
$ npm install
```

### Create Symlink

```sh
$ npm link
```
#### Now you can run the react-node-cli commands globally in your system

### Commands & Options

React Node Application Generator
```sh
Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  generate|g     Generate React Node Application

Example call:
Make sure you are in the proper react project directory before running below command.
  $ react-node-cli g
  $ react-node-cli --help
```
## Note
  "$ react-node-cli g" This command will generate .release
  directory in your root react project directory and 
  will contain build folder too, thats why please 
  add ./release/build to your .gitignore file 
  to ignore the react build from release.

  
## Tech Stack

**Client:** React

**Server:** Node, Express, Git,
## Authors

- [@githubprabin143](https://github.com/githubprabin143/react-node-cli)

  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  