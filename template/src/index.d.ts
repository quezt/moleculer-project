/* eslint-disable typescript-sort-keys/interface, @typescript-eslint/no-explicit-any */
import { CommonConnectionOptions, SecureContextOptions } from 'tls';
import { ServiceSettingSchema } from 'moleculer';

interface GatewaySettingSchema extends ServiceSettingSchema {
  ip?: string;
  port?: number;
  https?: CommonConnectionOptions | SecureContextOptions;
  http2?: boolean;
  // If false, it will start without server in middleware mode
  server?: boolean;
  cors?: CorsSettingSchema;
  routes?: RouteSettingSchema[];
  etag?: boolean | Function;
  logRequestParams?: string;
  logResponseData?: string;
  log4XXResponses?: boolean;
  httpServerTimeout?: number;
}

interface CorsSettingSchema {
  origin?: string | string[];
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

interface RouteSettingSchema {
  path: string;
  cors?: CorsSettingSchema;
  authentication?: boolean;
  authorization?: boolean;
  aliases?: object;
  mappingPolicy?: 'all' | 'restrict';
  bodyParsers?: {
    json?: boolean | any;
    raw?: any;
    text?: boolean | any;
    urlencoded?: boolean | any;
  };
  mergeParams?: boolean;
  etag?: boolean | Function;
}
