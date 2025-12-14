import { expect } from 'chai';
import HelloWorld from '../../src/commands/hello-world.js';
import AdvancedTestContext from '../advancedTestContext.js';

describe('hello-world', () => {
  const $$ = new AdvancedTestContext();

  beforeEach(async () => {
    await $$.init();
  });

  afterEach(() => {
    $$.reset();
  });

  it('just calls the code for the sake of calling it', async () => {
    // Act
    const result = await HelloWorld.run(['--target-org', $$.targetOrgConnection.getUsername()!]);

    // Assert
    expect(result.message).to.contain($$.targetOrgConnection.getUsername());
  });
});
