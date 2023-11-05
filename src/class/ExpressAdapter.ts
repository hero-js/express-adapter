import express, { Express, RouterOptions } from 'express';
import {
  NextFunction,
  Request,
  RequestHandler,
  RequestHandlerFunction,
  Response,
} from '../interfaces/router';
import Router from './Router';

/**
 * This class provides an adapter for Express.js.
 * It allows the use of Express.js as the underlying HTTP server for the Hero.js framework.
 * It provides methods for handling results, wrapping Express middleware, and setting up routers.
 */
export default class ExpressAdapter {
  expressApp: Express;
  routers: { router: Router; expressRouterConfig: RouterOptions }[] = [];
  constructor(expressApp?: Express) {
    this.expressApp = expressApp ?? express();
  }

  private handleResult(result: any, res: Response, middleware?: any) {
    if (!res.headersSent && result) {
      const responseToSend = middleware
        ? middleware.responseBuilder(result)
        : result;
      res.send(responseToSend);
    }
  }

  private async wrapExpressMiddleware(
    handler: RequestHandler,
    MiddlewareClass: any,
    router: Router
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (typeof handler === 'function') {
          const [result] = await Promise.all([
            handler({ request: req, response: res, next }),
          ]);
          this.handleResult(result, res);
        } else {
          const middleware = new MiddlewareClass(router['context']);
          const classHandler = middleware[handler] as RequestHandlerFunction;
          middleware.request = req;
          middleware.response = res;
          const result = await classHandler.call(middleware, {
            request: req,
            response: res,
            next,
          });
          this.handleResult(result, res, middleware);
        }
      } catch (error) {
        console.error('Error in middleware:', error);
        next(error); // Forward the error to the Express error handler
      }
    };
  }

  /**
   * This method is used to set the router and its configuration.
   * @param {Router} router - The router to be set.
   * @param {RouterOptions} expressRouterConfig - The configuration for the express router.
   */
  public setRouter(router: Router, expressRouterConfig: RouterOptions = {}) {
    this.routers.push({ router, expressRouterConfig });
  }

  /**
   * This method is used to adapt the routers.
   * @param {Router[]} routers - The routers to be adapted.
   * @returns {Promise<Express>} - The adapted Express app.
   */
  public async adapt(...routers: Router[]): Promise<Express> {
    const startTimestamp = Date.now();

    if (routers.length > 0)
      this.routers.push(
        ...routers.map((router) => ({ router, expressRouterConfig: {} }))
      );

    try {
      for (const { router, expressRouterConfig } of this.routers) {
        const expressRouter = express.Router(expressRouterConfig);
        console.log(`Adapting router ${router.basePath} 🔃`);
        const { resolver, routes } = router.getRoutes();

        for (const route of routes) {
          const [routeKey, { method, middlewares }] = route;
          const path = routeKey.split('::')[1];

          const expressMiddlewares = await Promise.all(
            middlewares.map(async (middleware) => {
              const { MiddlewareClass, handler } = resolver(middleware);
              console.log(`\t${routeKey} adapted`);
              return await this.wrapExpressMiddleware(
                handler,
                MiddlewareClass,
                router
              );
            })
          );

          expressRouter[method](path, ...expressMiddlewares);
        }
        console.log(`Router ${router.basePath} adapted ✅\n`);

        this.expressApp.use(router.basePath, expressRouter);
      }
    } catch (error) {
      console.error('Error adapting routers:', error);
      throw error;
    }

    console.log(`Adapted in ${Date.now() - startTimestamp}ms`);
    return this.expressApp;
  }
}
