import { Middleware as CoreMiddleware } from '@hero-js/core';
import { ExpressAdapterGenericTypes } from '../interfaces/router';

/**
 * The Middleware class serves as a model for defining methods that will be used by other middlewares or controllers.
 * It includes basic methods like 'handler', which returns the module name of the class,
 * and 'responseBuilder', which determines the format of the responses.
 * The 'handle' method must be implemented, even if it is not necessary in a controller.
 */
export default abstract class Middleware extends CoreMiddleware<ExpressAdapterGenericTypes> {}
