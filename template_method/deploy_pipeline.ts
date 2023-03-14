import { cloneCmd, installCmd, testCmd, buildCmd, publishCmd } from "./utils";

interface DeployConfig {
  project: string;
  repo: string;
  notifyEmail: string;
  targetTestCoverage: number;
}

abstract class DeployPipeline {
  config: DeployConfig;
  async deploy() {
    const cloneSuccess = await this.cloneProject();
    if (!cloneSuccess) {
      this.notify("Repo cloning failed");
      return;
    }

    const installSuccess = await this.installDependency();
    if (!installSuccess) {
      this.notify("Packages installing failed");
      return;
    }

    const testCoverage = await this.runTest();
    if (testCoverage < this.config.targetTestCoverage) {
      this.notify(
        `Test coverage ${testCoverage} lower than ${this.config.targetTestCoverage}`,
      );
      return;
    }

    const buildSuccess = await this.build();
    if (!buildSuccess) {
      this.notify("Project build failed");
      return;
    }

    const publishSuccess = await this.publish();
    if (!publishSuccess) {
      this.notify("Publish failed");
      return;
    }

    this.notify(`Deploy success with ${testCoverage} test coverage`);
  }
  notify(msg: string) {
    console.log(`Notifying ${this.config.notifyEmail} ${msg}`);
  }
  async cloneProject() {
    console.log(`Cloning from ${this.config.repo}`);
    return cloneCmd();
  }
  async publish(): Promise<boolean> {
    console.log(`Publishing ${this.config.project} through API service`);
    return publishCmd()
  }
  abstract installDependency(): Promise<boolean | Error>;
  abstract runTest(): Promise<number>;
  abstract build(): Promise<boolean | Error>;
}

class ReactAppDeployPipeline extends DeployPipeline {
  constructor(config: DeployConfig) {
    super();
    this.config = config;
  }
  async installDependency() {
    console.log("npm install");
    return installCmd();
  }
  async runTest() {
    console.log("npm test");
    return testCmd();
  }
  async build() {
    console.log("npm build");
    return buildCmd();
  }
}

class DjangoAppDeployPipeline extends DeployPipeline {
  constructor(config: DeployConfig) {
    super();
    this.config = config;
  }
  async installDependency() {
    console.log("pip3 install");
    return installCmd();
  }
  async runTest() {
    console.log("pytest");
    return testCmd();
  }
  async build() {
    // Django project doesn't need a build
    return Promise.resolve(true);
  }
}

export { ReactAppDeployPipeline, DjangoAppDeployPipeline, DeployConfig };
