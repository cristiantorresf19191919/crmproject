import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ComunicacionService } from "../servicios/comunicacion.service";
import Swal from "sweetalert2";
import { ClienteServicioService } from "./serviciosCliente/cliente-servicio.service";
import { routerTransition } from '../router.animations';

interface Res {
  success: boolean;
  msg: string;
  foto: object;
  user: { nombre: string };
}

@Component({
  animations: [routerTransition],
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  selectedFile;
  picture = null;
  datos: Object;
  minombre: String;
  exito: any;
  nombreUsuario: string;

  constructor(
    private router: Router,
    private com: ComunicacionService,
    private servcl: ClienteServicioService
  ) {}

  ngOnInit() {
    console.log(this.exito);
    this.nombreUsuario = this.servcl.NombreUsuario();
    this.com.getphoto().subscribe((datos: Res) => {
      if (datos) {
        this.picture = datos.foto;
        this.minombre = datos.user.nombre;
      }
    });
  }
  salirsesion() {
    localStorage.clear();
    this.router.navigate(["/home"]);
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }


  onFileSelected(imageInput: any) {
    const file: File = imageInput.files[0];
    this.selectedFile = file;
  }

  onUpload() {
    this.com.SubirFoto(this.selectedFile).subscribe((respuesta: Res) => {
      console.log(respuesta);

      if (respuesta) {
        setTimeout(() => {
          location.reload();
        }, 600);
        localStorage.setItem("foto", respuesta.user.nombre);
        this.exito = localStorage.getItem("foto");
        this.datos = respuesta.user;
        this.minombre = respuesta.user.nombre;
        this.picture = respuesta.foto;
        Swal.fire("EXITO", respuesta.msg, "success");
      }
      if (!respuesta) {
        Swal.fire("ERROR", respuesta.msg, "error");
      }
    });
  }
}
