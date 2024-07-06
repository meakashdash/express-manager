var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import path from "path";
import figlet from "figlet";
import ora from "ora";
import boxen from "boxen";
import { generateModelTemplate } from "./generateModelTemplate.js";
import { generateControllerTemplate } from "./generateControllerTemplate.js";
import { generateRouterTemplate } from "./generateRouterTemplate.js";
const configFile = path.join(process.cwd(), "express-manager-config.json");
let config = {};
if (fs.existsSync(configFile)) {
    config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
}
function centerText(text, width) {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text;
}
function displayBanner() {
    console.log(chalk.cyan(figlet.textSync('Express Manager', { horizontalLayout: 'full' })));
    const boxWidth = process.stdout.columns - 4;
    const centeredText = centerText('🚀 Generate Express template files with your terminal! 🎨', boxWidth);
    console.log(boxen(centeredText, {
        padding: 1,
        borderColor: 'green',
        borderStyle: 'round',
        width: boxWidth
    }));
}
function languageSelect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.language) {
            displayBanner();
            const answer = yield inquirer.prompt([
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
    });
}
program
    .version("1.0.0")
    .description("An CLI based tool to generate express controller, model and router for you.");
program
    .command("generate <type> <name>")
    .description("Generate a model, controller, or router")
    .action((type, name) => __awaiter(void 0, void 0, void 0, function* () {
    yield languageSelect();
    if (type !== "module" &&
        (type === "model" || type === "controller" || type === "router")) {
        yield generateFile(name, type);
    }
    else if (type === "module") {
        console.log(chalk.cyan('🎉 Generating full module...'));
        yield generateFile(name, "model");
        yield generateFile(name, "controller");
        yield generateFile(name, "router");
    }
    else {
        console.log(chalk.red('❌ Invalid type. Use "model", "controller", "router", or "module".'));
    }
}));
function generateFile(name, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderPath = path.join(process.cwd(), name);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        const fileName = `${name}.${type}.${config.language}`;
        const filePath = path.join(folderPath, fileName);
        const relativePath = path.join(name, fileName);
        if (!fs.existsSync(filePath)) {
            const spinner = ora(`Creating ${type} ${name}...`).start();
            yield new Promise(resolve => setTimeout(resolve, 1000));
            fs.writeFileSync(filePath, yield getTemplate(name, type));
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats.size;
            const fileSizeInKB = fileSizeInBytes / 1024;
            spinner.succeed(chalk.green(`✨ ${type.charAt(0).toUpperCase() + type.slice(1)} ${name} ${chalk.cyan(`(${relativePath}) (${fileSizeInKB.toFixed(2)} KB)`)} created successfully!`));
        }
        else {
            console.log(chalk.yellow(`😅 Oops! ${type.charAt(0).toUpperCase() + type.slice(1)} ${name} already exists!`));
        }
    });
}
function getTemplate(name, type) {
    switch (type) {
        case "model":
            return generateModelTemplate(name, type);
        case "controller":
            return generateControllerTemplate(name, type);
        case "router":
            return generateRouterTemplate(name, type);
        default:
            return '';
    }
}
program.parse(process.argv);
if (!process.argv.slice(2).length) {
    displayBanner();
    program.outputHelp();
}
