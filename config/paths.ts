"use strict";

import path from "path";
import fs from "fs";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export const moduleFileExtensions = [
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "js",
  "jsx",
  "web.js",
  "web.jsx",
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn: (relativePath: string) => string, filePath: string) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const paths = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appBuild: resolveApp("build"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveModule(resolveApp, "src/index"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appTsConfig: resolveApp("tsconfig.json"),
  appJsConfig: resolveApp("jsconfig.json"),
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveModule(resolveApp, "src/setupTests"),
  proxySetup: resolveApp("src/setupProxy.js"),
  appNodeModules: resolveApp("node_modules"),
  appComponents: resolveApp("src/components"),
  appHooks: resolveApp("src/hooks"),
  appPages: resolveApp("src/pages"),
  appAssets: resolveApp("src/assets"),
  appState: resolveApp("src/state"),
  appUtils: resolveApp("src/utils"),
  appTypes: resolveApp("src/types"),
  appApi: resolveApp("src/api"),
  swSrc: resolveModule(resolveApp, "src/service-worker"),
};

export default paths;
