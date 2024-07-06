# Express Manager

**Express Manager** is a CLI-based tool to generate Express controller, model, and router files for your project. This tool helps streamline the setup process for Express applications, ensuring consistency and saving time.

## Features

- Generate model, controller, and router files
- Supports both JavaScript and TypeScript
- Easy to use interactive CLI

## Installation

To install Express Manager, use npm:

```sh
npm install -g express-manager
```

# Usage

## Basic Command

To use Express Manager, run the following command:

```sh
express-manager generate <type> <name>
```

- **<type>**: The type of file to generate. This can be model, controller, router, or module.
- **<name>**: The name of the file to generate.

# Examples

### Generate a Model

```sh
express-manager generate model user
```

This command will generate a model file named user.model.js or user.model.ts based on your selected language.

### Generate a Controller

```sh
express-manager generate controller user
```

This command will generate a controller file named user.controller.js or user.controller.ts.


### Generate a Router

```sh
express-manager generate router user
```

This command will generate a router file named user.router.js or user.router.ts.


### Generate a Full Module

```sh
express-manager generate module user
```

This command will generate all three files: user.model.js (or .ts), user.controller.js (or .ts), and user.router.js (or .ts).


# Language Selection

When you run the tool for the first time, you will be prompted to select a language (JavaScript or TypeScript). This selection will be saved in a configuration file (express-manager-config.json) in your project directory.

# Example Directory Structure

After generating a user module, your directory structure will look like this:

```sh

project-directory/
│
├── user/
│   ├── user.model.js
│   ├── user.controller.js
│   └── user.router.js
│
├── express-manager-config.json
│
└── ...
```

# License

This project is licensed under the ISC License. See the LICENSE file for details.

# Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on [GitHub](#https://github.com/meakashdash/express-manager.git).

# Contact

For any inquiries or feedback, please contact the author.