import type { AuthError, PostgrestError } from '@supabase/supabase-js';

import ExtendableError from 'es6-error';
import { NextResponse } from 'next/server';

type HttpErrorParams = {
  error_message: string;
  error_type: string;
  status_code: number;
  underlyingError?: unknown;
};

export class HttpError extends ExtendableError {
  params: HttpErrorParams;
  trace_id?: string;

  constructor(params: HttpErrorParams) {
    super(params.error_type);
    this.params = params;
  }

  toJSON() {
    return {
      error_id: this.trace_id,
      error_message: this.params.error_message,
      error_type: this.params.error_type,
      status_code: this.params.status_code,
    };
  }

  toNextResponse() {
    return NextResponse.json(this.toJSON(), {
      status: this.params.status_code,
    });
  }
}

type ExtendedHttpErrorParams = {
  error?: unknown;
  message?: string;
  type?: string;
};

export class HttpInternalServerError extends HttpError {
  constructor(params: ExtendedHttpErrorParams = {}) {
    super({
      error_message: params.message ?? 'Internal server error',
      error_type: params.type ?? 'INTERNAL_SERVER_ERROR',
      status_code: 500,
      underlyingError: params.error,
    });
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(params: ExtendedHttpErrorParams = {}) {
    super({
      error_message: params.message ?? 'Bad request',
      error_type: params.type ?? 'INVALID_REQUEST',
      status_code: 400,
    });
  }
}

export class HttpAuthenticationError extends HttpError {
  constructor(error: AuthError) {
    super({
      error_message: error.message,
      error_type: 'AUTHENTICATION_ERROR',
      status_code: error.status || 401,
    });
  }
}

export class DatabaseError extends ExtendableError {
  underlyingError: PostgrestError;

  constructor(error: PostgrestError) {
    super(error.message);
    this.underlyingError = error;
  }
}

export const createExternalServiceError = (serviceName: string) =>
  class ExternalServiceError extends ExtendableError {
    serviceName = serviceName;
    underlyingError: unknown;

    constructor(error: unknown) {
      super(`Error from ${serviceName}`);
      this.underlyingError = error;
    }
  };
