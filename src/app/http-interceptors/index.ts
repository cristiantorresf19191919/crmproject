/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {AdminInterceptor} from "./admin-interceptors";
import { PrimerInterceptor } from "./primer-interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: PrimerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true }
];
