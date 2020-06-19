import { isNullOrWhiteSpace, emptyString } from '@groupp/string';

const URL_PARSE_REGEX = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/gi;

export class MongoConnectionSettings {
  private readonly _userName: string;
  private readonly _password: string;
  private readonly _domain: string;
  private readonly _dbName: string;
  get dbName() {
    return this._dbName;
  }

  private _isDnsSeedlist: boolean;
  set isDnsSeedlist(value: boolean) {
    this._isDnsSeedlist = value;
  }

  private _writeConcern: string | number;

  /**
   * The write concern
   */
  set writeConcern(value: string | number) {
    this._writeConcern = value;
  }

  private _isRetryWrites: boolean;
  set isRetryWrites(value: boolean) {
    this._isRetryWrites = value;
  }

  private readonly _collectionName: string;
  get collectionName() {
    return this._collectionName;
  }

  get connectionString(): string {
    let str = `mongodb`;
    str += this._isDnsSeedlist ? '+srv' : emptyString;
    str += '://';
    str += this._userName && this._password ? `${this._userName}:${this._password}@` : emptyString;
    str += this._domain;
    str += this._dbName ? `/${this._dbName}` : emptyString;
    str += `?retryWrites=${this._isRetryWrites}&w=${this._writeConcern}`;
    return str;
  }

  constructor(
    userName: string,
    password: string,
    domain: string,
    dbName = 'test',
    isDnsSeedlist = false,
    writeConcern: string | number = 'majority',
    isRetryWrites = true,
    collectionName?: string
  ) {
    this._userName = userName;
    this._password = password;
    this._domain = domain;
    this._dbName = dbName;
    this._isDnsSeedlist = isDnsSeedlist;
    this._writeConcern = writeConcern;
    this._isRetryWrites = isRetryWrites;
    this._collectionName = collectionName;
  }

  toString(): string {
    return this.connectionString;
  }
}

/**
 *
 */
export class MongoConnectionSettingsBuilder {
  private _userName: string;
  get userName() {
    return this._userName;
  }
  set userName(value: string) {
    this._userName = value;
  }

  private _password: string;
  get isPasswordSet() {
    return isNullOrWhiteSpace(this._password) ? false : true;
  }
  set password(value: string) {
    this._password = value;
  }

  private _domain: string;
  get domain() {
    return this._domain;
  }
  set domain(value: string) {
    this._domain = value;
  }

  private _dbName: string;
  get dbName() {
    return this._dbName;
  }
  set dbName(value: string) {
    this._dbName = value;
  }

  private _isDnsSeedlist: boolean;
  get isDnsSeedlist() {
    return this._isDnsSeedlist;
  }
  set isDnsSeedlist(value: boolean) {
    this._isDnsSeedlist = value;
  }

  private _writeConcern: string | number;
  get writeConcern() {
    return this._writeConcern;
  }
  set writeConcern(value: string | number) {
    this._writeConcern = value;
  }

  private _isRetryWrites: boolean;
  get isRetryWrites() {
    return this._isRetryWrites;
  }
  set isRetryWrites(value: boolean) {
    this._isRetryWrites = value;
  }

  private _collectionName: string;
  get collectionName() {
    return this._collectionName;
  }
  set collectionName(value: string) {
    this._collectionName = value;
  }

  constructor(connectionString?: string) {
    if (!isNullOrWhiteSpace(connectionString)) {
      this.parseConnectionString(connectionString);
    }
  }

  toSettings(): MongoConnectionSettings {
    return new MongoConnectionSettings(
      this._userName,
      this._password,
      this._domain,
      this._dbName,
      this._isDnsSeedlist,
      this._writeConcern,
      this._isRetryWrites,
      this._collectionName
    );
  }

  private parseConnectionString(value: string) {
    value = value.trim();
    const parsed = new RegExp(URL_PARSE_REGEX).exec(value);
    if (!parsed || parsed.length < 10) {
      throw new Error(`Error parsing connection string provided: ${value}`);
    }
    const proto = parsed[2];
    const domain = parsed[4];
    const route = parsed[5];
    const query = parsed[7];
    this._isDnsSeedlist = proto.match(/\+srv/gi) ? true : false;
    const domainSplitted = domain.split('@');
    this._domain = domainSplitted.length === 2 ? domainSplitted[1] : domainSplitted[0];
    if (domainSplitted.length > 1) {
      const credentials = domainSplitted[0].split(':');
      this._userName = credentials[0];
      this._password = credentials[1];
    }
    this._dbName = route ? route.substring(1) : undefined;
    if (query) {
      const querySplitted = query.split('&');
      let queryParams = new Map();
      querySplitted
        .map(q => q.split('='))
        .map(q => {
          if (!isNullOrWhiteSpace(q[1]) && q[1].trim().toLowerCase() === 'true') {
            return [q[0], true];
          } else if (!isNullOrWhiteSpace(q[1]) && q[1].trim().toLowerCase() === 'false') {
            return [q[0], false];
          } else {
            return [q[0], q[1]];
          }
        })
        .forEach(q => (queryParams = queryParams.set(q[0], q[1])));
      if (queryParams.get('retryWrites')) {
        this._isRetryWrites = queryParams.get('retryWrites');
      }
      if (queryParams.get('w')) {
        this._writeConcern = queryParams.get('w');
      }
    }
  }
}
