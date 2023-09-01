import type { ErrorMessage } from './types';

export function isError(value: any): value is ErrorMessage {
  if ((value as ErrorMessage).errorMessage) {
    return true;
  }
  return false;
}
