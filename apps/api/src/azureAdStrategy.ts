import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import {
  BearerStrategy,
  IBearerStrategyOptionWithRequest,
} from 'passport-azure-ad';

const tenantID = 'aee1f6d1-0e73-4533-80b9-bcc8a302ea71';
const clinetID = 'fc51564d-c70e-4b08-82da-8cf82f06e4fe';
const config = {
  credentials: {
    tenantID,
    clinetID,
    audience: `api://${clinetID}`,
  },
  metadata: {
    authority: 'login.microsoftonline.com',
    discovery: '.well-known/openid-configuration',
    version: 'v2.0',
  },
  resource: {
    scope: ['User.Read'],
  },
  settings: {
    validateIssuer: false,
    passReqToCallback: true,
    loggingLevel: 'info',
    logginNoPII: false,
  },
};
const bearerStrategy: IBearerStrategyOptionWithRequest = {
  identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
  issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
  clientID: config.credentials.clinetID,
  audience: config.credentials.audience,
  validateIssuer: config.settings.validateIssuer,
  passReqToCallback: config.settings.passReqToCallback,
  loggingLevel: config.settings.loggingLevel as any,
  loggingNoPII: config.settings.logginNoPII,
  scope: config.resource.scope,
};
@Injectable()
export class AzureAdStrategy extends PassportStrategy(
  BearerStrategy,
  'azureAd',
) {
  constructor() {
    super(bearerStrategy);
  }
  validate(data) {
    console.log(data);
    return data;
  }
}
export const AzureAdGuard = AuthGuard('azureAd');
