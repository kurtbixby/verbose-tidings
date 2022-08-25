# Verbose Tidings - Blog Software

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description

A software package for running a blogging website.

A live version of the site can be accessed at [here](https://verbose-tidings.herokuapp.com/).

Functionality includes:
* Signing up for a new account
* Creating new blog posts
* Editing existing blog posts
* Deleting existing blog posts
* Commenting on blog posts

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Shout Outs](#shout-outs)
- [License](#license)

## Installation

This application requires Node.js and npm to run. To run this application, download the code to your computer via a git clone or a zip download.  
Navigate to downloaded directory and run ```npm install``` to install all dependencies.  
To create the database, run ```db/DeploymentScript.sql``` on a MySql RDBMS.  

## Usage

Make sure to run the database creation script located at ```db/schema.sql``` before running the application.  
Run the program by executing ```npm run start``` or ```node server.js```.  
This program uses the multiple environment variables to connect to the database. Make sure that a ```.env``` file exists at the root of the project directory and has the following variables defined  
```
DB_LOCATION  
DB_NAME  
DB_USER  
DB_PASSWORD
```

## Contributing

Although this application is no longer under active development, I welcome any and all pull requests from those who would like to contribute to and improve this software.

## Tests

This software currently does not have any tests.

## License

MIT License

Copyright (c) 2022 kurtbixby

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
