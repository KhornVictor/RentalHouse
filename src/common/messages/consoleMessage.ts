import chalk from "chalk";

const ConsoleMessageSuccess = (message: string) => { console.log(chalk.green(`✅ ${message}`)); }
const ConsoleMessageError = (message: string) => { console.log(chalk.red(`❌ ${message}`)); }

export { ConsoleMessageSuccess, ConsoleMessageError };
