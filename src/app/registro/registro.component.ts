import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ComunicacionService } from "../servicios/comunicacion.service";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
// reactive forms
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { first, switchMap, map, subscribeOn } from "rxjs/operators";
import { Observable, timer, of } from "rxjs";
import { ValidacionesPersonalizadas } from "src/app/_validadores/ValidacionesPersonalizadas";
import { AsyncValidador } from "src/app/_validadores/ValidadoresAsincronos";
import { SocketService } from "../servicios/socket.service";

declare const $: any;
interface DataModel {
  success: boolean;
  msg: string;
  password: string;
  hash: string;
}

const PrimaryWhite = "white";
const segundoColor = "green";
const SecondaryGrey = "#ccc";
const PrimaryRed = "#dd0031";
const SecondaryBlue = "#006ddd";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit {
  formReg: FormGroup;

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
  name: string;
  Email: string;
  username: string;
  password: string;
  password2: string;
  referido: string;
  numero: String;
  cc: String;

  public loading = false;

  constructor(
    private com: ComunicacionService,
    private msj: NgFlashMessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private asyncValidador: AsyncValidador,
    public validacionesPersonalizadas: ValidacionesPersonalizadas,
    private socketServicio: SocketService
  ) {}

  ngOnInit() {
    /* this.loadingTemplate = this.customLoadingTemplate; */
    $(".view").mousemove(e => {
      const moveX = (e.pageX * -1) / 10;
      const moveY = (e.pageX * -1) / 10;
      $(".view").css("background-position", moveX + "px " + moveY + "px ");
    });
    // formReg: FormGroup;
    // private formBuilder: FormBuilder,
    // private asyncValidador: AsyncValidador,
    // public validacionesPersonalizadas: ValidacionesPersonalizadas
    this.formReg = this.formBuilder.group(
      {
        name: ["", Validators.required],
        Email: [
          "",
          [
            Validators.required,
            Validators.email,
            this.validacionesPersonalizadas.Busque(/@/i)
          ],
          this.asyncValidador.validate.bind(this.asyncValidador)
        ],
        Telefono: [
          "",
          [
            Validators.required,
            this.validacionesPersonalizadas.tieneNumero(/^[-\s\.\d]*$/)
          ]
        ],
        cc: [
          "",
          [
            Validators.required,
            this.validacionesPersonalizadas.tieneNumero(/^[-\s\.\d]*$/)
          ]
        ],
        password: [
          "",
          [Validators.required],
          [this.masde4.bind(this), this.contraVal.bind(this)]
        ],
        password2: [
          "",
          [Validators.required],
          [this.masde4.bind(this), this.contraVal.bind(this)]
        ]
      },
      { validator: this.validacionesPersonalizadas.passwordMatcher }
    );

    this.com.ComparaEmail("crisasdsadsa19@hotmail.com").pipe(
      map(data => {
        console.log("datos de registro component.ts son con PIPE " + data);
      })
    );
  }
  // end ng oninit

  masde4(valor: AbstractControl) {
    if (valor.value.length < 4) {
      return of({ menosde4: true });
    } else {
      return of(null);
    }
  }

  // GETTERS
  get namegetter() {
    return this.formReg.get("name");
  }
  get Emailgetter() {
    return this.formReg.get("Email");
  }
  get Telefonogetter() {
    return this.formReg.get("Telefono");
  }
  get ccgetter() {
    return this.formReg.get("cc");
  }
  get passwordgetter() {
    return this.formReg.get("password");
  }
  get password2getter() {
    return this.formReg.get("password2");
  }

  // FIN GETTERS
  contraVal(control: AbstractControl) {
    const number = /(?=.*[0-9])/;
    if (!number.test(control.value)) {
      return of({ passwordInvalid: true });
    } else {
      return of(null);
    }
  }

  go() {
    this.loading = true;
    /*    const user = {
      name: this.name,
      email: this.Email,
      username: this.username,
      cc : this.cc,
      password: this.password,
      password2: this.password2
    } */

    // registro al servidor
    console.log(this.formReg.value);
    this.socketServicio.nuevoUsuario(this.formReg.value);
    this.com.Registro(this.formReg.value).subscribe((data: DataModel) => {
      this.loading = false;
      if (data) {
        if (data.success) {
          this.msj.showFlashMessage({
            messages: [
              data.msg,
              "COntraseña encriptada por hash",
              data.hash
            ],
            dismissible: true,
            timeout: 1200,
            type: "success"
          });
          // begin swal
          Swal.fire({
            title: "Se ha registrado con Exito",
            animation: false,
            type: "success",
            customClass: "animated tada",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iniciar Sesión!"
          }).then(result => {
            if (result.value) {
              this.router.navigate(["/login"]);
            }
          });
          // fin swal
        }

        if (data.msg === "El correo ya se encuentra registrado") {
          this.loading = false;
          this.msj.showFlashMessage({
            messages: [data.msg],
            dismissible: true,
            timeout: false,
            type: "danger"
          });
        }

        if (!data.success) {
          this.loading = false;
          this.msj.showFlashMessage({
            messages: [data.msg],
            dismissible: true,
            timeout: false,
            type: "danger"
          });
        }
      } else {
        this.loading = true;
        Swal.fire({
          title: "Error en el Servidor :(",
          type: "error"
        });
        this.loading = false;
      }
    });
  }
}
