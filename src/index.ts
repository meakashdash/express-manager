import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import path from "path";
import { generateModelTemplate } from "./generateModelTemplate.js";
import { generateControllerTemplate } from "./generateControllerTemplate.js";
import { generateRouterTemplate } from "./generateRouterTemplate.js";

const configFile = path.join(process.cwd(), "express-manager-config.json");

let config: { language?: string } = {};

if (fs.existsSync(configFile)) {
  config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
}

async function languageSelect() {
  if (!config.language) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: "Select Language:",
        choices: [
          { name: chalk.yellow("Javascript"), value: "js" },
          { name: chalk.blue("TypeScript"), value: "ts" },
        ],
      },
    ]);

    config.language = answer.language;
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  }
}

program
  .version("1.0.0")
  .description(
    "An CLI based tool to generate express controller, model and router for you."
  );

program
  .command("generate <type> <name>")
  .description("Generate a model, controller, or router")
  .action(async (type, name) => {
    await languageSelect();
    if (
      type !== "module" &&
      (type === "model" || type === "controller" || type === "router")
    ) {
      await generateFile(name, type);
    } else if (type === "module") {
      await generateFile(name, "model");
      await generateFile(name, "controller");
      await generateFile(name, "router");
    } else {
      console.log(
        chalk.bgRed(
          'Invalid type. Use "model" or "controller" or "controller" or "module".'
        )
      );
    }
  });

async function generateFile(name: string, type: string) {
  const folderPath = path.join(process.cwd(), name);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const filePath = path.join(folderPath, `${name}.${type}.${config.language}`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, await getTemplate(name, type));
    console.log(
      chalk.bgGreen(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } ${name} created successfully.`
      )
    );
  } else {
    console.log(
      chalk.bgRed(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } ${name} Already Created`
      )
    );
  }
}

function getTemplate(name: string, type: string): string {
  switch (type) {
    case "model":
      return generateModelTemplate(name,type);
    case "controller":
      return generateControllerTemplate(name,type);
    case "router":
      return generateRouterTemplate(name,type);
    default:
      return '' 
  }
}

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
