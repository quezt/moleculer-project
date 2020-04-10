const exeq = require('exeq');
const { existsSync, mkdirSync, readFileSync } = require('fs');
const rimraf = require('rimraf');

const targetDir = `${process.cwd()}/target`;
if (!existsSync(`${targetDir}`)) {
  mkdirSync(`${targetDir}`);
}

describe('create simple project', () => {
  it('create simple 25 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case25 --answers ${process.cwd()}/test/fixtures/answers/simple25.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case25`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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
    expect(launch.configurations).toHaveLength(2);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(2);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeDefined();

    rimraf.sync(`${baseDir}`);
  });

  it('create simple 26 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case26 --answers ${process.cwd()}/test/fixtures/answers/simple26.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case26`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });

  it('create simple 27 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case27 --answers ${process.cwd()}/test/fixtures/answers/simple27.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case27`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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
    expect(launch.configurations).toHaveLength(2);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(2);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeUndefined();

    rimraf.sync(`${baseDir}`);
  });

  it('create simple with lint project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case28 --answers ${process.cwd()}/test/fixtures/answers/simple-lint.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case28`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });

  it('create simple 29 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case29 --answers ${process.cwd()}/test/fixtures/answers/simple29.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case29`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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
    expect(launch.configurations).toHaveLength(2);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(1);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeDefined();

    rimraf.sync(`${baseDir}`);
  });

  it('create simple with prettier project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case30 --answers ${process.cwd()}/test/fixtures/answers/simple-prettier.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case30`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });

  it('create simple with jest project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case31 --answers ${process.cwd()}/test/fixtures/answers/simpleWithJest.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case31`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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
    expect(launch.configurations).toHaveLength(2);
    const tasks = JSON.parse(readFileSync(`${baseDir}/.vscode/tasks.json`));
    expect(tasks.tasks).toHaveLength(1);

    const pkg = JSON.parse(readFileSync(`${baseDir}/package.json`));
    expect(pkg.prettier).toBeUndefined();

    rimraf.sync(`${baseDir}`);
  });

  it('create simple project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} case32 --answers ${process.cwd()}/test/fixtures/answers/simple.json --no-install`,
    ]);
    const baseDir = `${targetDir}/case32`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/calculator.service.ts`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/calculator.service.spec.ts`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/mixins/mongodb.mixin.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/mixins/mongodb.mixin.spec.ts`)).toBeFalsy();

    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });
});
