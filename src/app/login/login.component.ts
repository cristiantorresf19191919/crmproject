import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from "@angular/core";
import { ComunicacionService } from "../servicios/comunicacion.service";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import Swal from "sweetalert2";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AsyncValidador } from "../_validadores/LoginCorreonoEsta";
import { ValidacionesPersonalizadas } from "../_validadores/ValidacionesPersonalizadas";
import { of, merge, Observable, observable, Subscription, timer } from "rxjs";
import { mapTo, delay, tap } from "rxjs/operators";
import { Title } from "@angular/platform-browser";
import { ClienteServicioService } from '../dashboard/serviciosCliente/cliente-servicio.service';

const helper = new JwtHelperService();
interface Data {
  success: boolean;
  msg: string;
  user: any;
  token: string;
  admin: string;
  role: string;
}

declare const $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  subscripcionLogin: Subscription;
  subscripcionSwal: Subscription;
  isauth: boolean;
  @ViewChild("ngxLoading") ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild("customLoadingTemplate") customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = "rgb(42, 206, 42)";
  public secondaryColour = "rgb(247, 64, 8)";
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public fullscreenloadingdecision = true;
  public radio = "20px";
  public colorback = "rgba(70, 70, 70, 0.384)";

  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: this.radio,
    fullScreenBackdrop: this.fullscreenloadingdecision,
    backdropBackgroundColour: this.colorback
  };
  // LOADER BOOLEANO
  public loading = false;

  // DATOS INPUT
  LoginDaddy: FormGroup;
  Email: string;
  Password: string;
  recordarD: boolean;
  nombreUsuario: string;
  // FIN VALOS INPUT

  values = "";
  expirationDate: any;
  isExpired: boolean;

  onKey(event: KeyboardEvent) {
    // without type info
    this.values += (<HTMLInputElement>event.target).value + " | ";
  }

  binario() {
    alert(this.recordarD);
  }

  // model usuario

  constructor(
    private Com: ComunicacionService,
    private flash: NgFlashMessageService,
    private router: Router,
    private ConstructorFormu: FormBuilder,
    private asyncValidator: AsyncValidador,
    private validacionesPersonalizadas: ValidacionesPersonalizadas,
    private clienteservicio : ClienteServicioService
  ) {}

  ngOnDestroy() {
    console.log("finished");
  }

  Instrucciones() {
    this.swalGuideSinDelay().subscribe();
  }

  ngOnInit() {
    this.isauth = this.Com.isAuthenticated();
    if (this.isauth || this.Com.isAuthenticated()) {
      this.router.navigate(["/admin"]);
    }
    if (!localStorage.getItem("id_token")) {
      this.swalGuide().subscribe();
    }
    const isauthcliente = this.Com.isAuthenticatedCliente();
    if (isauthcliente || this.Com.isAuthenticatedCliente()) {
      const nombreserv = this.clienteservicio.NombreUsuario();
      Swal.fire("Hola", `${nombreserv}`, "success");
      this.router.navigate(["/dashboard"]);
    }

    $(".wrapper").mousemove(e => {
      console.log("muevete mouse");
      const moveX = (e.pageX * -1) / 10;
      const moveY = (e.pageX * -1) / 10;
      $(".wrapper").css("background-position", moveX + "px " + moveY + "px ");
    });

    this.LoginDaddy = this.ConstructorFormu.group({
      Email: [
        "",
        this.validacionesPersonalizadas.Busque(/@/i),
        this.asyncValidator.validate.bind(this.asyncValidator)
      ],
      Password: [""],
      recordarD: [""]
    });
  }

  get Emailgetter() {
    return this.LoginDaddy.get("Email");
  }
  get passwordgetter() {
    return this.LoginDaddy.get("Password");
  }

  go() {
    this.loading = true;
    const user = {
      Email: this.Email,
      Password: this.Password
    };

    this.Com.Login(this.LoginDaddy.value).subscribe(
      (data: Data) => {
        if (data) {
          if (data.success) {

            this.clienteservicio.guardeNombre(data.user.nombre);

            console.log('MI USUARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
            console.log(data.user.nombre);
            this.loading = false;
            // guarda la fecha de expiracion del token
            this.expirationDate = helper.getTokenExpirationDate(data.token);
            // guarda boolean si el token es expirado o no
            this.isExpired = helper.isTokenExpired(data.token);
            this.flash.showFlashMessage({
              messages: [
                "Expiracion = " +
                  this.expirationDate +
                  " booleano => " +
                  this.isExpired
              ],
              dismissible: true,
              timeout: false,
              type: "success"
            });
            if (data.user.rol === "ADMIN_ROLE") {
              this.Com.storeUserData(data.token, data.user);

              // begin swal
              Swal.fire({
                title: data.msg,
                animation: false,
                type: "success",
                customClass: "animated tada",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ingresa a tu cuenta admin!"
              }).then(result => {
                if (result.value) {
                  this.router.navigate(["/admin"]);
                } else {
                  this.router.navigate(["/"]);
                }
              });
              // fIN SWAL
            } else {
              localStorage.setItem("id_token", data.token);
              localStorage.setItem("rol_user", "CLIENT_ROLE");
              console.log(`si llego el token cliente? carajo ${data.token}`);

              // begin swal
              Swal.fire({
                title: "Ingreso Autorizado Bienvenido ",
                html: `<h4> ${data.msg.substring(0, 29)} </h4>`,
                animation: false,
                type: "success",
                customClass: "animated tada",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ingresa al Dashboard!"
              }).then(result => {
                if (result.value) {
                  this.router.navigate(["/dashboard"]);
                }
              });
              // fIN SWAL
            }

            /*  this.flash.showFlashMessage({
          messages: [data.msg],
          dismissible: true,
          timeout: false,
          type: "success"
        }); */
          }

          if (!data.success) {
            this.loading = false;
            this.flash.showFlashMessage({
              messages: [data.msg],
              dismissible: true,
              timeout: false,
              type: "danger"
            });
          }
        } else {
          const source = timer(2000);
          source.subscribe(_ => {
            this.loading = false;
            Swal.fire({
              title: "SERVER ERROR",
              type: "error"
            });
          });
        }
      },
      error => {
        alert("error del backend");
      }
    );
  }

  swalGuideSinDelay() {
    return of(null).pipe(
      tap(() => {
        // begin swal
        Swal.mixin({
          title: "Instrucciones",
          animation: false,
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
          progressSteps: ["1", "2"],
          customClass: "animated tada",
          showCancelButton: true,
          confirmButtonText: "Siguiente! &rarr;",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33"
        }).queue([
          {
            html: `<h1><strong>Correo :</storng></h1><h4>admin@test.com</h4>`
          },
          {
            html: `<h1><strong>Clave :</storng></h1><h4>test19</h4>`
          }
        ]);
        // fIN SWAL
      })
    );
  }

  swalGuide() {
    return of(null).pipe(
      delay(2900),
      tap(() => {
        // begin swal
        Swal.mixin({
          title: "Instrucciones",
          animation: false,
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
          progressSteps: ["1", "2"],
          customClass: "animated tada",
          showCancelButton: true,
          confirmButtonText: "Siguiente! &rarr;",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33"
        }).queue([
          {
            html: `<h1><strong>Correo :</storng></h1><h4>admin@test.com</h4>`
          },
          {
            html: `<h1><strong>Clave :</storng></h1><h4>test19</h4>`
          }
        ]);
        // fIN SWAL
      })
    ); // fin observable
  }
}
