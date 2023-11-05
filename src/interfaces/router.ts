import * as ICoreRouter from '@hero-js/core/dist/interfaces/router';
import {
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

/**
 * ExpressAdapterGenericTypes is a type alias for the GenericTypes interface from Hero.js core.
 * It is used to define the types for the next function, request, and response in the context of Express.js.
 */
export type ExpressAdapterGenericTypes = ICoreRouter.GenericTypes<
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse
>;

/**
 * Request is a type alias for the request parameter in the context of Express.js.
 */
export type Request =
  ICoreRouter.RequestHandlerParams<ExpressAdapterGenericTypes>['request'];

/**
 * Response is a type alias for the response parameter in the context of Express.js.
 */
export type Response =
  ICoreRouter.RequestHandlerParams<ExpressAdapterGenericTypes>['response'];

/**
 * NextFunction is a type alias for the next function in the context of Express.js.
 */
export type NextFunction =
  ICoreRouter.RequestHandlerParams<ExpressAdapterGenericTypes>['next'];

/**
 * Parameters for a request handler function.
 */
export interface RequestHandlerParams
  extends ICoreRouter.RequestHandlerParams<ExpressAdapterGenericTypes> {}

/**
 * Represents a request handler which can be a class name or a function.
 */
export type RequestHandler =
  ICoreRouter.RequestHandler<ExpressAdapterGenericTypes>;

/**
 * Represents a request handler function.
 */
export type RequestHandlerFunction = Exclude<RequestHandler, string>;
