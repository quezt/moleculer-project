const exeq = require('exeq');
const { existsSync, mkdirSync, readFileSync } = require('fs');
const rimraf = require('rimraf');

const targetDir = `${process.cwd()}/target`;
if (!existsSync(`${targetDir}`)) {
  mkdirSync(`${targetDir}`);
}

describe('create mongo project', () => {
  it('create mongo-all project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} mongo-all --answers ${process.cwd()}/test/fixtures/answers/mongo-all.json --no-install`,
    ]);
    const baseDir = `${targetDir}/mongo-all`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

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
    expect(pkg.prettier).toBeDefined();

    rimraf.sync(`${baseDir}`);
  });

  it('create mongo18 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} mongo18 --answers ${process.cwd()}/test/fixtures/answers/mongo18.json --no-install`,
    ]);
    const baseDir = `${targetDir}/mongo18`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });

  it('create mongo19 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} mongo19 --answers ${process.cwd()}/test/fixtures/answers/mongo19.json --no-install`,
    ]);
    const baseDir = `${targetDir}/mongo19`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

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

    rimraf.sync(`${baseDir}`);
  });

  it('create mongo20 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init .. mongo20 --answers ${process.cwd()}/test/fixtures/answers/mongo20.json --no-install`,
    ]);
    const baseDir = `${targetDir}/mongo20`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });

  it('create mongo21 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} mongo21 --answers ${process.cwd()}/test/fixtures/answers/mongo21.json --no-install`,
    ]);

    const baseDir = `${targetDir}/mongo21`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

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

    rimraf.sync(`${baseDir}`);
  });

  it('create mongo22 project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} mongo22 --answers ${process.cwd()}/test/fixtures/answers/mongo22.json --no-install`,
    ]);
    const baseDir = `${targetDir}/mongo22`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });

  it('create mongo-jest project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} mongo23 --answers ${process.cwd()}/test/fixtures/answers/mongo23.json --no-install`,
    ]);
    const baseDir = `${targetDir}/mongo23`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeTruthy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/stores/documents-store.service.ts`)).toBeTruthy();

    expect(existsSync(`${baseDir}/test/fixtures/localhost.crt`)).toBeFalsy();
    expect(existsSync(`${baseDir}/test/fixtures/localhost.key`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/test/unit/services/routes.service.spec.ts`)).toBeFalsy();

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

    rimraf.sync(`${baseDir}`);
  });

  it('create mongo-only project', async () => {
    await exeq([
      `cd ${targetDir}`,
      `moleculer init ${process.cwd()} mongo-only --answers ${process.cwd()}/test/fixtures/answers/mongo-only.json --no-install`,
    ]);
    const baseDir = `${targetDir}/mongo-only`;

    expect(existsSync(`${baseDir}/.eslintrc.json`)).toBeFalsy();
    expect(existsSync(`${baseDir}/.gitignore`)).toBeTruthy();
    expect(existsSync(`${baseDir}/.prettierignore`)).toBeFalsy();
    expect(existsSync(`${baseDir}/jest.config.js`)).toBeFalsy();

    expect(existsSync(`${baseDir}/rest/node.http`)).toBeFalsy();

    expect(existsSync(`${baseDir}/src/index.d.ts`)).toBeFalsy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/moleculer-db-adapter-mongo.d.ts`)).toBeTruthy();
    expect(existsSync(`${baseDir}/src/moleculer.config.js`)).toBeTruthy();
    // prettier-ignore
    expect(existsSync(`${baseDir}/src/services/controllers/documents.service.ts`)).toBeFalsy();
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
    expect(existsSync(`${baseDir}/src/services/routes.service.ts`)).toBeFalsy();
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

    rimraf.sync(`${baseDir}`);
  });
});
