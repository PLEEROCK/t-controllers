import { getMetadataArgsStorage } from '../index';
import { Newable, Callable } from '@rce/types/Types';

/**
 * Specifies a given middleware to be used for controller or controller action BEFORE the action executes.
 * Must be set to controller action or controller class.
 */
export function UseBefore(...middlewares: Array<Newable>): Callable;

/**
 * Specifies a given middleware to be used for controller or controller action BEFORE the action executes.
 * Must be set to controller action or controller class.
 */
export function UseBefore(...middlewares: Array<(context: any, next: () => Promise<any>) => Promise<any>>): Callable;

/**
 * Specifies a given middleware to be used for controller or controller action BEFORE the action executes.
 * Must be set to controller action or controller class.
 */
export function UseBefore(...middlewares: Array<(request: any, response: any, next: Callable) => any>): Callable;

/**
 * Specifies a given middleware to be used for controller or controller action BEFORE the action executes.
 * Must be set to controller action or controller class.
 */
export function UseBefore(
  ...middlewares: Array<Newable | ((request: any, response: any, next: Callable) => any)>
): Callable {
  return function (objectOrFunction: Newable | Callable, methodName?: string) {
    middlewares.forEach(middleware => {
      getMetadataArgsStorage().uses.push({
        target: methodName ? objectOrFunction.constructor : (objectOrFunction as Callable),
        method: methodName,
        middleware: middleware,
        afterAction: false,
      });
    });
  };
}
