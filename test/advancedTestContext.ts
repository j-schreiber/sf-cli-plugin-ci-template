import { Connection } from '@salesforce/core';
import { MockTestOrgData, TestContext } from '@salesforce/core/testSetup';

/**
 * The advanced test context encapsulates all testing related stubs and mocks
 * for unit tests (not NUTs!). It is primarily used to stub Salesforce API calls.
 */
export default class AdvancedTestContext {
  public context: TestContext;
  public targetOrg: MockTestOrgData;
  public targetOrgConnection!: Connection;

  public constructor() {
    this.context = new TestContext();
    this.targetOrg = new MockTestOrgData();
  }

  public async init(): Promise<void> {
    await this.context.stubAuths(this.targetOrg);
    this.targetOrgConnection = await this.targetOrg.getConnection();
  }

  public reset(): void {
    this.context.restore();
    process.removeAllListeners();
  }
}
