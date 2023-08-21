import { ErrorMessage } from './types';

export function isError(value: any): value is ErrorMessage {
  if ((value as ErrorMessage).message) {
    return true;
  }
  return false;
}
