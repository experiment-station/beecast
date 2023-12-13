import ExtendableError from 'es6-error';
import { NextResponse } from 'next/server';

type ServerErrorParams = {
  error_message: string;
  error_type: string;
  status_code: number;
  underlyingError?: unknown;
};

class ServerError extends ExtendableError {
  params: ServerErrorParams;
  trace_id?: string;

  constructor(params: ServerErrorParams) {
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

type ExtendedServerErrorParams = {
  error?: unknown;
  message?: string;
  type?: string;
};

export class InternalServerError extends ServerError {
  constructor(params: ExtendedServerErrorParams = {}) {
    super({
      error_message: params.message ?? 'Internal server error',
      error_type: params.type ?? 'INTERNAL_SERVER_ERROR',
      status_code: 500,
      underlyingError: params.error,
    });
  }
}

export class BadRequestError extends ServerError {
  constructor(params: ExtendedServerErrorParams = {}) {
    super({
      error_message: params.message ?? 'Bad request',
      error_type: params.type ?? 'INVALID_REQUEST',
      status_code: 400,
    });
  }
}
