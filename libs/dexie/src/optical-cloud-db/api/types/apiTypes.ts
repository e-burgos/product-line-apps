/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from './errorTypes';

type ISODateTimeString = string;

export interface TokenClaims {
  sub: string;
  license?: 'ok' | 'expired' | 'deactivated';
  [claimName: string]: any;
}

export interface TokenFinalResponse {
  type: 'tokens';
  claims: TokenClaims;
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken?: string;
  refreshTokenExpiration?: number | null;
  userType: 'demo' | 'eval' | 'prod' | 'client';
  evalDaysLeft?: number;
  userValidUntil?: number;
  alerts?: {
    type: 'warning' | 'info';
    messageCode: string;
    message: string;
    messageParams?: { [param: string]: string };
  }[];
}

export interface TokenValidateResponse {
  claims: TokenClaims;
  valid: boolean;
}

export interface DBUserJsonModel {
  readonly userId: string;
  readonly created: ISODateTimeString;
  readonly updated: ISODateTimeString;
  readonly lastLogin?: ISODateTimeString | null;
  type: 'eval' | 'prod' | 'demo';
  validUntil?: ISODateTimeString;
  evalDaysLeft?: number;
  readonly maxAllowedEvalDaysLeft: number;
  deactivated?: ISODateTimeString;
  data: {
    displayName?: string;
    email?: string;
    [key: string]: any;
  };
}

export interface DBUserListResponse {
  data: DBUserJsonModel[];
  hasMore: boolean; // true if more than "limit" results where available
  pagingKey?: string; // The pagingKey to use in next request to get more results
}

type ApiResponses = {
  'post-token': TokenFinalResponse;
  'get-token-validate': TokenValidateResponse;
  'get-users': DBUserListResponse;
  'post-users': DBUserJsonModel;
  'get-user-prescriptions': any;
};
export type { ApiResponses };

type ApiErrorResponses = {
  'post-token': ErrorResponse;
  'get-token-validate': ErrorResponse;
  'get-users': ErrorResponse;
  'post-users': ErrorResponse;
  'get-user-prescriptions': ErrorResponse;
};
export type { ApiErrorResponses };
