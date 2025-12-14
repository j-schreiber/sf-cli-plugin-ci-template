import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@j-schreiber/sf-cli-plugin-ci-template', 'hello-world');

export type HelloWorldResult = {
  message: string;
};

export default class HelloWorld extends SfCommand<HelloWorldResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    'target-org': Flags.requiredOrg({
      summary: messages.getMessage('flags.target-org.summary'),
      char: 'o',
      required: true,
    }),
  };

  public async run(): Promise<HelloWorldResult> {
    const { flags } = await this.parse(HelloWorld);
    return { message: `Hello from ${flags['target-org'].getUsername()!} ` };
  }
}
