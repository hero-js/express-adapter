import { MiddlewareInstance as CoreMiddlewareInstance } from '@hero-js/core/src/interfaces/middleware';
import { ExpressAdapterGenericTypes } from './router';

export type MiddlewareInstance =
  CoreMiddlewareInstance<ExpressAdapterGenericTypes>;
