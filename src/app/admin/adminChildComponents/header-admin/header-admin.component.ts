import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/servicios/comunicacion.service';


@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private servicio: ComunicacionService) { }

  ngOnInit() {
  }

  salirSesion(){
    this.servicio.logout();

  }

}
