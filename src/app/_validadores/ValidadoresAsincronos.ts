import { Directive, forwardRef, Injectable } from "@angular/core";
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { ComunicacionService } from "../servicios/comunicacion.service";
import { Observable, timer,of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AsyncValidador implements AsyncValidator {
  constructor(private servidorPost: ComunicacionService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.servidorPost.ComparaEmail(ctrl.value).pipe(
      map(isTaken => {
        return isTaken ? { correoExiste: true } : null;
      }),
      catchError(err => {
        return of({ ErrorServer: true });
      })
    );
  }
}
