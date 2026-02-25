import fs from 'fs-extra';
import path from 'path';

export class Logger {
  private logs: string[] = [];
  private logFile: string | null = null;

  /**
   * @param testName Optional – when provided, logs are also written to
   *                 `test-results/logs/<testName>.log`.
   */
  constructor(testName?: string) {
    if (testName) {
      const safeName = testName.replace(/\s+/g, '_').replace(/[^\w-]/g, '');
      const logsDir = path.join('test-results', 'logs');
      fs.ensureDirSync(logsDir);
      this.logFile = path.join(logsDir, `${safeName}.log`);
    }
  }

  log(message: string) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
    if (this.logFile) {
      fs.appendFileSync(this.logFile, entry + '\n');
    }
  }

  info(message: string) {
    this.log(`INFO: ${message}`);
  }

  error(message: string) {
    this.log(`ERROR: ${message}`);
  }

  getLogs(): string {
    return this.logs.join('\n');
  }

  clear() {
    this.logs = [];
  }
}