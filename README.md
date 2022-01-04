
# React-Node CLI

This code contains the core node js code to serve react build and commnads file to make a final release build with both node and react combined.


## Features

- Easy to convert your react app into  standalone full stack application.
- Automatically push your fullstack app to github branch
- Single command to make build and release
- Export industry level react project structure.

  
## Usage/Examples

### Installation

Install package

```sh
$ npm i -g @prabink/react-node-cli 
```

#### Now you can run the react-node-cli commands globally in your system

### Commands & Options

React Node Application Generator
```sh
$ react-node-cli --help
Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  generate|g     Generate React Node Application
  export_react_structure|export_rs [options]  Export React Starter Structure



  $ react-node-cli g
  $ react-node-cli --help
```
## API Reference

### Generate react build and node server to serve your FullStack Node React Application in any Hosting provider.
Generate react build and node server to serve your FullStack Node React Application 
in any Hosting provider. This will give you an options to push your fullstack source code 
to github branch.
```sh
$ react-node-cli g
         OR
$ react-node-cli generate
```

### Export industry level react project structure for your reference.
Export industry level react project structure for your reference, 
This will extract all folder structure that you need to manage your highly scable react app.

```sh
$ react-node-cli export_react_structure
              OR
$ react-node-cli export_rs
```

| Options | Type     | Required. | Description                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `-p`or `--path`     | `string` | `false` | Specify path to export |

 
## Tech Stack

**Client:** React

**Server:** Node, Express, Git,
## Authors

- [@githubprabin143](https://github.com/githubprabin143/react-node-cli)

  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  