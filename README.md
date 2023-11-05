# @hero-js/express-adapter

`@hero-js/express-adapter` is an adapter for Express.js, allowing you to use Express.js as the underlying HTTP server for the Hero.js framework. With this adapter, you can seamlessly integrate Hero.js with Express.js to build powerful web applications and APIs.

## Features

- Adapt Hero.js routers to work with Express.js.
- Handle results and wrap Express middleware seamlessly.
- Customize router configurations for different endpoints.

## Installation

To use `@hero-js/express-adapter` in your Hero.js project, you need to install it as a dependency. You can do this using npm or yarn:

```bash
npm install @hero-js/express-adapter
# or
yarn add @hero-js/express-adapter
```

## Usage

To get started with this adapter, you'll need to follow these steps:

1. Import the necessary modules:

```javascript
const express = require('express');
const { ExpressAdapter, Router } = require('@hero-js/express-adapter');
```

2. Create an instance of the `ExpressAdapter` class:

```javascript
const expressApp = express();
const adapter = new ExpressAdapter(expressApp);
```

3. Set up your Hero.js routers and configure them:

```javascript
const router1 = new Router({ basePath: '/api/v1' });
// ... Define routes and middleware for router1 ...

const router2 = new Router({ basePath: '/auth' });
// ... Define routes and middleware for router2 ...

// Add routers to the adapter
adapter.setRouter(router1);
adapter.setRouter(router2);
```

4. Adapt the routers to work with Express:

```javascript
adapter.adapt().then((expressApp) => {
  // Start the Express app
  const port = process.env.PORT || 3000;
  expressApp.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
  });
});
```

5. Run your Hero.js application using Express as the HTTP server.

## Configuration

You can customize your router configurations by passing `RouterOptions` when setting up routers. This allows you to configure things like middleware, error handling, and more.

## Documentation

For detailed documentation, API references, and usage examples, please visit the [official documentation](https://hero-js.github.io/express-adapter/).

## Contributing

If you'd like to contribute to `@hero-js/express-adapter`, please follow our [contribution guidelines](https://github.com/hero-js/hero/blob/main/CONTRIBUTING.md).

## License

This package is open-source software licensed under the [MIT License](https://github.com/hero-js/config/blob/main/LICENSE).
