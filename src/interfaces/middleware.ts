import { MiddlewareInstance as CoreMiddlewareInstance } from '@hero-js/core/dist/interfaces/middleware';
import { ExpressAdapterGenericTypes } from './router';

export type MiddlewareInstance =
  CoreMiddlewareInstance<ExpressAdapterGenericTypes>;
