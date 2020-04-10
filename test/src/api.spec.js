const exeq = require('exeq');
const { existsSync, mkdirSync, readFileSync } = require('fs');
const rimraf = require('rimraf');

const targetDir = `${process.cwd()}/target`;
if (!existsSync(`${targetDir}`)) {
  mkdirSync(`${targetDir}`);
}

describe('create api project', () => {
  it('create api9 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api9 --answers ${process.cwd()}/test/fixtures/answers/api9.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api9`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });

  it('create api10 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api10 --answers ${process.cwd()}/test/fixtures/answers/api10.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api10`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });

  it('create api11 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api11 --answers ${process.cwd()}/test/fixtures/answers/api11.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api11`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });

  it('create api12 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api12 --answers ${process.cwd()}/test/fixtures/answers/api12.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api12`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });

  it('create api13 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api13 --answers ${process.cwd()}/test/fixtures/answers/api13.json --no-install`,
    ]);
    
    const baseDir = `${targetDir}/api13`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });

  it('create api14 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api14 --answers ${process.cwd()}/test/fixtures/answers/api14.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api14`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });

  it('create api project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api1 --answers ${process.cwd()}/test/fixtures/answers/apiOnly.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api1`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });

  it('create api with jest project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} api-jest --answers ${process.cwd()}/test/fixtures/answers/apiWithJest.json --no-install`,
    ]);
    const baseDir = `${targetDir}/api-jest`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeFalsy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeTruthy();
    expect(existsSync(`${baseDir}/test/fixtures/privkey`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/pubkey`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/utils/utils.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/utils/utils.spec.ts`)).toBeFalsy();

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

    expect(m.exports.settings.routes).toHaveLength(1);

    rimraf.sync(`${baseDir}`);
  });
});
