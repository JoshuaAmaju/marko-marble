import 'marko/express';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import markoExpress from 'marko/express';
import {combineRoutes, createServer, httpListener} from '@marblejs/core';
import {getPhotos$} from './pages/home';

import {r} from '@marblejs/core';
import {map, mergeMap} from 'rxjs/operators';

import {readFile} from 'fs';

// import HomePage from './pages/home';
// import DetailsPage from './pages/details';

// const app = express ();
const port = process.env.PORT || 8080;

const getFile$ = r.pipe (
  r.matchPath ('/static/:dir*'),
  r.matchType ('GET'),
  r.useEffect (req$ =>
    req$.pipe (
      map (req => req.params.dir),
      mergeMap (readFile),
      map (body => ({body}))
    )
  )
);

const api$ = combineRoutes ('/', [getPhotos$]);

(async () => {
  const server$ = createServer ({
    port: 8080,
    listener: httpListener ({effects: [api$, getFile$]}),
  });

  await (await server$) ();
}) ();

// Enable gzip compression for all HTTP responses
// app.use (compression ());

// app.use (markoExpress ());

// Allow all of the generated files to be served up by Express
// app.use ('/static', serveStatic ('dist/client'));

// Initialize mock service routes
// initServices(app);

// Map the "/" route to the home page
// app.get ('/', HomePage);
// app.get ('/photo/:id', DetailsPage);

// Start the server
// app.listen (port, err => {
//   if (err) {
//     throw err;
//   }

//   if (port !== '0') {
//     console.log (`Listening on port ${port}`);
//   }
// });
