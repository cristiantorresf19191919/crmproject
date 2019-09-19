import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ComunicacionService } from 'src/app/servicios/comunicacion.service';
import Swal from "sweetalert2";
import { NgFlashMessageService } from "ng-flash-messages";


interface Res {
  success: boolean;
  msg: string;
  foto: object;
  user: { nombre: string };
}
@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent implements OnInit {
  selectedFile;
  picture = null;
  datos: Object;
  minombre: String;
  exito: any;

  constructor(private router: Router, private com: ComunicacionService,
    private msj: NgFlashMessageService,
    ) {}

  ngOnInit() {
    console.log(this.exito);
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

  onFileSelected(imageInput: any) {
    const file: File = imageInput.files[0];
    this.selectedFile = file;
    console.log(file.name);
    this.msj.showFlashMessage({
      messages: [`Seleccionaste  el archivo ${file.name} como foto `],
      dismissible: true,
      timeout: 1600,
      type: "info"
    });
  }

  onUpload() {
    //CRUD
    this.com.SubirFoto(this.selectedFile).subscribe((respuesta: Res) => {
      console.log(respuesta);

      if (respuesta) {
        console.log(`respuesta cuando subo foto`);
        console.log(respuesta);
        setTimeout(() => {
          // location.reload();
        }, 600);
        localStorage.setItem("foto", respuesta.user.nombre);
        this.exito = localStorage.getItem("foto");
        this.datos = respuesta.user;
        this.minombre = respuesta.user.nombre;
        this.picture = respuesta.foto;
        this.msj.showFlashMessage({
          messages: [respuesta.msg],
          dismissible: true,
          timeout: 1600,
          type: "success"
        });
        Swal.fire("EXITO", respuesta.msg, "success");
      }
      if (!respuesta) {
        Swal.fire("ERROR", respuesta.msg, "error");
      }
    });
  }
}
