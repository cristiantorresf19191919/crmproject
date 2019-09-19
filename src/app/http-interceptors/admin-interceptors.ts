import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const adminToken = localStorage.getItem("id_token");

    if (adminToken) {
      const adminTokenReq = req.clone({
        setHeaders: { admintoken: adminToken }
      });
      return next.handle(adminTokenReq);
    } else {
      return next.handle(req);
    }
  }
}
