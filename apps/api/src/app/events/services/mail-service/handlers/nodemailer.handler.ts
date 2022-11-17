import { ChannelTypeEnum } from '@novu/shared';
import { ICredentials } from '@novu/dal';
import { NodemailerProvider } from '@novu/nodemailer';
import { ConnectionOptions } from 'tls';

import { BaseHandler } from './base.handler';

export class NodemailerHandler extends BaseHandler {
  constructor() {
    super('nodemailer', ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: {
      from: string;
      host: string;
      port: number;
      secure: boolean;
      user: string;
      password: string;
      requireTls: boolean;
      ignoreTls: boolean;
      tlsOptions: ConnectionOptions;
      dkim: {
        domainName: string;
        keySelector: string;
        privateKey: string;
      };
    } = {
      from,
      host: credentials.host,
      port: Number(credentials.port),
      secure: credentials.secure,
      user: credentials.user,
      password: credentials.password,
      requireTls: credentials.requireTls,
      ignoreTls: credentials.ignoreTls,
      tlsOptions: credentials.tlsOptions,
      dkim: {
        domainName: credentials.domain,
        keySelector: credentials.accountSid,
        privateKey: credentials.secretKey,
      },
    };

    this.provider = new NodemailerProvider(config);
  }
}
