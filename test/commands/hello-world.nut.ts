import path from 'node:path';
import { assert } from 'chai';
import { execCmd, TestSession } from '@salesforce/cli-plugins-testkit';
import { HelloWorldResult } from '../../src/commands/hello-world.js';

const testingWorkingDir = path.join('test', 'data', 'test-sfdx-project');
const scratchOrgAlias = 'Test Org';

describe('hello-world NUTs', () => {
  let session: TestSession;

  before(async () => {
    session = await TestSession.create({
      project: {
        name: 'helloWorldNuts',
        sourceDir: testingWorkingDir,
      },
      devhubAuthStrategy: 'AUTO',
      scratchOrgs: [
        {
          alias: scratchOrgAlias,
          config: path.join('config', 'default-scratch-def.json'),
          setDefault: true,
          duration: 1,
        },
      ],
    });
  });

  after(async () => {
    await session?.clean();
  });

  it('successfully executes hello-world and returns org alias', () => {
    // Act
    const result = execCmd<HelloWorldResult>(`hello-world --target-org ${scratchOrgAlias}`, {
      ensureExitCode: 0,
    }).jsonOutput?.result;

    // Assert
    assert.isDefined(result);
  });
});
