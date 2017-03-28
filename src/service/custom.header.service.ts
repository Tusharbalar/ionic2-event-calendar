import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomHttpService extends Http {
  constructor (backend: XHRBackend, options: RequestOptions) {
    options.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer 93873deb-4679-48ab-90ee-9725d2cb9ea9`
    });
    super(backend, options);
  }

  // its like interceptor, calls by each methods internally like get, post, put, delete etc
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Content-Type', 'application/json');
      options.headers.set('Authorization', `Bearer 93873deb-4679-48ab-90ee-9725d2cb9ea9`);
    } else {
      url.headers.set('Content-Type', 'application/json');
      url.headers.set('Authorization', `Bearer 93873deb-4679-48ab-90ee-9725d2cb9ea9`);
    }
    return super.request(url, options);
  }
}
