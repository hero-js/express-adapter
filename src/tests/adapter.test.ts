import ExpressAdapter from '../class/ExpressAdapter';
import Router from '../class/Router';
import express from 'express';
import request from 'supertest';

describe('ExpressAdapter', () => {
  let expressAdapter: ExpressAdapter;
  let app: express.Express;

  beforeEach(() => {
    app = express();
    expressAdapter = new ExpressAdapter(app);
  });

  test('should correctly set a router', () => {
    const router = new Router();
    expressAdapter.setRouter(router);

    expect(expressAdapter.routers).toContainEqual({
      router,
      expressRouterConfig: {},
    });
  });

  test('should correctly adapt routers', async () => {
    const router = new Router();
    router.get('/test', ({ response }) => {
      console.log('Test middleware called');
      response.send('Test');
    });
    router.get('/test2', ({ response }) => {
      console.log('Test middleware called');
      response.send('Test2');
    });
    router.get('/test3', ({ response }) => {
      console.log('Test middleware called');
      response.send('Test3');
    });
    expressAdapter.setRouter(router);
    await expressAdapter.adapt();

    const adaptedApp = app;

    const response = await request(adaptedApp).get('/test');
    expect(response.text).toBe('Test');
  }, 30000);
});
