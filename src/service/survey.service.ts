import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from './custom.header.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SurveyService {

  constructor(private http: CustomHttpService) { }

  public GetEvents(Eventmonth){
		return this.http.get('https://yugma-ut.appspot-preview.com/director/3718285666/planner/month/' + Eventmonth)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

  private extractData(res: Response) {
    if (res.status === 204 || res.status === 400) { return res; }
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "Internal server error"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}