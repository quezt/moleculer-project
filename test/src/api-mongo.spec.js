const exeq = require('exeq');
const { existsSync, mkdirSync, readFileSync } = require('fs');
const rimraf = require('rimraf');

const targetDir = `${process.cwd()}/target`;
if (!existsSync(`${targetDir}`)) {
  mkdirSync(`${targetDir}`);
}

describe('create api with mongo project', () => {
  it('create api-mongo2 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init  ${process.cwd()} api-mongo2 --answers ${process.cwd()}/test/fixtures/answers/api-mongo2.json --no-install`,
    ]);

    const baseDir = `${targetDir}/api-mongo2`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/names.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/names.action.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/tip.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/tip.action.spec.ts`)).toBeFalsy();

    const launch = JSON.parse(readFileSync(`${baseDir}/.vscode/launch.json`));
    expect(launch.configurations).toHaveLength(1);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(2);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeDefined();

    const ts = require('typescript');
    const source = ts.transpileModule(
      readFileSync(`${baseDir}/src/services/routes.service.ts`)
        .toString()
        .replace(/import.*;/g, '')
        .replace(/mixins.*,/, ''),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          removeComments: true,
          lib: ['es2018'],
          target: 'ES2018',
        },
      }
    ).outputText;
    const Module = require('module');
    const m = new Module();
    m._compile(source, '');

    expect(m.exports.settings.routes).toHaveLength(2);

    rimraf.sync(`${baseDir}`);
  });

  it('create api-mongo3 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init  ${process.cwd()} api-mongo3 --answers ${process.cwd()}/test/fixtures/answers/api-mongo3.json --no-install`,
    ]);

    const baseDir = `${targetDir}/api-mongo3`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeTruthy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeTruthy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/actions/names.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/names.action.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/tip.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/tip.action.spec.ts`)).toBeFalsy();

    const launch = JSON.parse(readFileSync(`${baseDir}/.vscode/launch.json`));
    expect(launch.configurations).toHaveLength(2);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(2);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeUndefined();

    const ts = require('typescript');
    const source = ts.transpileModule(
      readFileSync(`${baseDir}/src/services/routes.service.ts`)
        .toString()
        .replace(/import.*;/g, '')
        .replace(/mixins.*,/, ''),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          removeComments: true,
          lib: ['es2018'],
          target: 'ES2018',
        },
      }
    ).outputText;
    const Module = require('module');
    const m = new Module();
    m._compile(source, '');

    expect(m.exports.settings.routes).toHaveLength(2);

    rimraf.sync(`${baseDir}`);
  });

  it('create api-mongo4 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api-mongo4 --answers ${process.cwd()}/test/fixtures/answers/api-mongo4.json --no-install`,
    ]);

    const baseDir = `${targetDir}/api-mongo4`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/names.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/names.action.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/tip.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/tip.action.spec.ts`)).toBeFalsy();

    const launch = JSON.parse(readFileSync(`${baseDir}/.vscode/launch.json`));
    expect(launch.configurations).toHaveLength(1);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(2);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeUndefined();

    const ts = require('typescript');
    const source = ts.transpileModule(
      readFileSync(`${baseDir}/src/services/routes.service.ts`)
        .toString()
        .replace(/import.*;/g, '')
        .replace(/mixins.*,/, ''),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          removeComments: true,
          lib: ['es2018'],
          target: 'ES2018',
        },
      }
    ).outputText;
    const Module = require('module');
    const m = new Module();
    m._compile(source, '');

    expect(m.exports.settings.routes).toHaveLength(2);

    rimraf.sync(`${baseDir}`);
  });

  it('create api-mongo5 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api-mongo5 --answers ${process.cwd()}/test/fixtures/answers/api-mongo5.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api-mongo5`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeTruthy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeTruthy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/actions/names.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/names.action.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/tip.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/tip.action.spec.ts`)).toBeFalsy();

    const launch = JSON.parse(readFileSync(`${baseDir}/.vscode/launch.json`));
    expect(launch.configurations).toHaveLength(2);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(1);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeDefined();

    const ts = require('typescript');
    const source = ts.transpileModule(
      readFileSync(`${baseDir}/src/services/routes.service.ts`)
        .toString()
        .replace(/import.*;/g, '')
        .replace(/mixins.*,/, ''),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          removeComments: true,
          lib: ['es2018'],
          target: 'ES2018',
        },
      }
    ).outputText;
    const Module = require('module');
    const m = new Module();
    m._compile(source, '');

    expect(m.exports.settings.routes).toHaveLength(2);

    rimraf.sync(`${baseDir}`);
  });

  it('create api-mongo6 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init .. api-mongo6 --answers ${process.cwd()}/test/fixtures/answers/api-mongo6.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api-mongo6`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/names.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/names.action.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/tip.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/tip.action.spec.ts`)).toBeFalsy();

    const launch = JSON.parse(readFileSync(`${baseDir}/.vscode/launch.json`));
    expect(launch.configurations).toHaveLength(1);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(1);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeDefined();

    const ts = require('typescript');
    const source = ts.transpileModule(
      readFileSync(`${baseDir}/src/services/routes.service.ts`)
        .toString()
        .replace(/import.*;/g, '')
        .replace(/mixins.*,/, ''),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          removeComments: true,
          lib: ['es2018'],
          target: 'ES2018',
        },
      }
    ).outputText;
    const Module = require('module');
    const m = new Module();
    m._compile(source, '');

    expect(m.exports.settings.routes).toHaveLength(2);

    rimraf.sync(`${baseDir}`);
  });

  it('create api-mongo7 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api-mongo7 --answers ${process.cwd()}/test/fixtures/answers/api-mongo7.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api-mongo7`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeTruthy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeTruthy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/actions/names.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/names.action.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/tip.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/tip.action.spec.ts`)).toBeFalsy();

    const launch = JSON.parse(readFileSync(`${baseDir}/.vscode/launch.json`));
    expect(launch.configurations).toHaveLength(2);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(1);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeUndefined();

    const ts = require('typescript');
    const source = ts.transpileModule(
      readFileSync(`${baseDir}/src/services/routes.service.ts`)
        .toString()
        .replace(/import.*;/g, '')
        .replace(/mixins.*,/, ''),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          removeComments: true,
          lib: ['es2018'],
          target: 'ES2018',
        },
      }
    ).outputText;
    const Module = require('module');
    const m = new Module();
    m._compile(source, '');

    expect(m.exports.settings.routes).toHaveLength(2);

    rimraf.sync(`${baseDir}`);
  });

  it('create api-mongo-only project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api-mongo-only --answers ${process.cwd()}/test/fixtures/answers/api-mongo-only.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api-mongo-only`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/names.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/names.action.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/actions/tip.action.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/actions/tip.action.spec.ts`)).toBeFalsy();

    const launch = JSON.parse(readFileSync(`${baseDir}/.vscode/launch.json`));
    expect(launch.configurations).toHaveLength(1);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(1);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeUndefined();

    const ts = require('typescript');
    const source = ts.transpileModule(
      readFileSync(`${baseDir}/src/services/routes.service.ts`)
        .toString()
        .replace(/import.*;/g, '')
        .replace(/mixins.*,/, ''),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          removeComments: true,
          lib: ['es2018'],
          target: 'ES2018',
        },
      }
    ).outputText;
    const Module = require('module');
    const m = new Module();
    m._compile(source, '');

    expect(m.exports.settings.routes).toHaveLength(2);

    rimraf.sync(`${baseDir}`);
  });
});
