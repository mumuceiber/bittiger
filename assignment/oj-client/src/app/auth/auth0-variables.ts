interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'jg0MeErHg71IsePSwEUlFJZxK7FUz0VG',
  domain: 'mumuceiber.auth0.com',
  callbackURL: 'http://localhost:3000/'
};
