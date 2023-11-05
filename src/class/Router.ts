import { Router as CoreRouter } from '@hero-js/core';
import { ExpressAdapterGenericTypes } from '../interfaces/router';

/**
 * This class extends the CoreRouter from Hero.js core with ExpressAdapterGenericTypes.
 * It allows the use of Express.js as the underlying HTTP server for the Hero.js framework.
 */
export default class Router extends CoreRouter<ExpressAdapterGenericTypes> {}
