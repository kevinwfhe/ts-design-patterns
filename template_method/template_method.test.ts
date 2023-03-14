import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import {
  ReactAppDeployPipeline,
  DjangoAppDeployPipeline,
  DeployConfig,
} from "./deploy_pipeline";
import { cloneCmd, installCmd, testCmd, buildCmd, publishCmd } from "./utils";

beforeEach(() => {
  jest.restoreAllMocks();
});
jest.mock("./utils");
jest
  .mocked(cloneCmd)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(false)
  .mockResolvedValue(true);
jest
  .mocked(installCmd)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(false)
  .mockResolvedValue(true);
jest
  .mocked(testCmd)
  .mockResolvedValueOnce(100)
  .mockResolvedValueOnce(99)
  .mockResolvedValueOnce(98)
  .mockResolvedValue(100);
jest
  .mocked(buildCmd)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(false)
  .mockResolvedValue(true);
jest
  .mocked(publishCmd)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(false)
  .mockResolvedValue(true);

describe("Template Method", () => {
  test("Deploy React app", async () => {
    const logSpy = jest.spyOn(console, "log");
    const PipelineConfig: DeployConfig = {
      project: "React App",
      repo: "https://my-git/react-app.git",
      notifyEmail: "my-email@designpatters.com",
      targetTestCoverage: 100,
    };
    const pipeline = new ReactAppDeployPipeline(PipelineConfig);
    await pipeline.deploy();
    expect(logSpy).toHaveBeenCalledWith(`Cloning from ${PipelineConfig.repo}`);
    expect(logSpy).toHaveBeenCalledWith(`npm install`);
    expect(logSpy).toHaveBeenCalledWith(`npm test`);
    expect(logSpy).toHaveBeenCalledWith(`npm build`);
    expect(logSpy).toHaveBeenCalledWith(
      `Publishing ${PipelineConfig.project} through API service`,
    );
    expect(logSpy).toHaveBeenCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Deploy success with 100 test coverage`,
    );
  });

  test("Deploy Django app", async () => {
    const logSpy = jest.spyOn(console, "log");
    const PipelineConfig: DeployConfig = {
      project: "Django App",
      repo: "https://my-git/django-app.git",
      notifyEmail: "my-email@designpatters.com",
      targetTestCoverage: 99,
    };
    const pipeline = new DjangoAppDeployPipeline(PipelineConfig);
    await pipeline.deploy();
    expect(logSpy).toHaveBeenCalledWith(`Cloning from ${PipelineConfig.repo}`);
    expect(logSpy).toHaveBeenCalledWith(`pip3 install`);
    expect(logSpy).toHaveBeenCalledWith(`pytest`);
    expect(logSpy).toHaveBeenCalledWith(
      `Publishing ${PipelineConfig.project} through API service`,
    );
    expect(logSpy).toHaveBeenCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Deploy success with 99 test coverage`,
    );
  });

  test("Deploy failing", async () => {
    const logSpy = jest.spyOn(console, "log");
    const PipelineConfig: DeployConfig = {
      project: "React App",
      repo: "https://my-git/react-app.git",
      notifyEmail: "my-email@designpatters.com",
      targetTestCoverage: 99,
    };
    const pipeline = new ReactAppDeployPipeline(PipelineConfig);

    await pipeline.deploy();
    expect(logSpy).toBeCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Repo cloning failed`,
    );

    await pipeline.deploy();
    expect(logSpy).toBeCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Packages installing failed`,
    );

    await pipeline.deploy();
    expect(logSpy).toBeCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Test coverage 98 lower than 99`,
    );

    await pipeline.deploy();
    expect(logSpy).toBeCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Project build failed`,
    );

    await pipeline.deploy();
    expect(logSpy).toBeCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Publish failed`,
    );

    await pipeline.deploy();
    expect(logSpy).toBeCalledWith(
      `Notifying ${PipelineConfig.notifyEmail} Deploy success with 100 test coverage`,
    );
  });
});
