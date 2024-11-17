import chalk from 'chalk';

const logger = {
    info: (message) => console.log(chalk.blue(`[INFO] ${message}`)),
    success: (message) => console.log(chalk.green(`[SUCCESS] ${message}`)),
    error: (message) => console.log(chalk.red(`[ERROR] ${message}`)),
    warn: (message) => console.log(chalk.yellow(`[WARN] ${message}`)),
};

export default logger;
