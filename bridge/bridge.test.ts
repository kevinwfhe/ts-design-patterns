import { describe, test, expect, jest } from "@jest/globals";
import { getOS } from "../factory_method/util";
import { JsBridge } from "./js_bridge";

jest.mock("../factory_method/util");

describe("Bridge", () => {
  test("Running on iOS", () => {
    const mockGetOS = jest.fn(() => "iOS");
    jest.mocked(getOS).mockImplementationOnce(mockGetOS);

    const bridge = new JsBridge();
    expect(bridge.downloadApp()).toBe("Download from App Store");
    expect(bridge.cloudSync()).toBe("Synced from iCloud");
  });

  test("Running on Android", () => {
    const mockGetOS = jest.fn(() => "Android");
    jest.mocked(getOS).mockImplementationOnce(mockGetOS);
    const bridge = new JsBridge();
    expect(bridge.cloudSync()).toBe("Synced from Google Drive");
    expect(bridge.downloadApp()).toBe("Download from Google Play");
  });
});
