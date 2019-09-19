import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { ComunicacionService } from "./comunicacion.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardUser implements CanActivate {
  constructor(
    private comunicacionService: ComunicacionService,
    private router: Router
  ) {}

  // canActivate():boolean{
  //   if (!this.ComunicacionService.isAuthenticated()){
  //     this.Router.navigate(['login']);
  //     return false;
  //   } else if (this.ComunicacionService.isAuthenticated()){
  //     return true;
  //   }
  // }

  canActivate() {
    if (this.comunicacionService.isAuthenticatedCliente()) {
      return true;
    } else {
      this.router.navigate(["registro"]);
      return false;
    }
  }
}
