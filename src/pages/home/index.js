import template from './template.marko';
import {photos} from '../../../photos';

import {HttpStatus, r} from '@marblejs/core';
import {of} from 'rxjs';
import {map, mergeMap, mapTo, tap} from 'rxjs/operators';

import {createWriteStream} from 'fs';

export const getPhotos$ = r.pipe (
  r.matchPath ('/'),
  r.matchType ('GET'),
  r.useEffect (req$ => {
    const render = template.renderSync ({photos});
    // const html = template.renderToString ({photos});

    const body = render.getOutput ();

    console.log (body);

    return req$.pipe (
      // mapTo ({body: html, headers: {'Content-Type': 'text/html'}}),
      // mergeMap (_ => of (render)),
      // map (({stream: {str}}) => str),
      // tap (console.log),
      mapTo ({
        body,
        status: HttpStatus.OK,
        headers: {'Content-Type': 'text/html'},
      })
    );
  })
);

// export default async function (_, res) {
//   template.stream ({photos}).pipe (res);
// }
