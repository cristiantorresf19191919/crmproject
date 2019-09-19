import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ComunicacionService } from "./comunicacion.service";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private comunicacionService: ComunicacionService,
    private Router: Router
  ) {}

  canActivate():boolean{
    if (!this.comunicacionService.isAuthenticated()){
      this.Router.navigate(['login']);
      return false;
    } else if (this.comunicacionService.isAuthenticated()){
      return true;
    }
  }

  // canActivate() {
  //   if
  //   return true;
  //   /* console.log(this.comunicacionService.user.rol); */

  //      if (
  //     this.comunicacionService.user.rol === "ADMIN_ROLE" &&
  //     this.TokenValide(this.comunicacionService.authToken)
  //   ) {
  //     return false;
  //   } else if (this.comunicacionService.user.rol === undefined) {
  //     return false;
  //   } else {
  //     alert("ruta protegida que haces?");
  //     console.log("Bloqueado por el ADMIN GUARD");
  //     this.comunicacionService.logout();

  //     return false;
  //   }
  // }

  TokenValide(token) {
    const re = /(?=.*[0-9])(?=.*[A-Z])[A-Za-z0-9]{100}/;
    return re.test(token);
  }
}
