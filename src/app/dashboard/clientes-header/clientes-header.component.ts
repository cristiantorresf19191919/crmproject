import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/servicios/comunicacion.service';

@Component({
  selector: 'app-clientes-header',
  templateUrl: './clientes-header.component.html',
  styleUrls: ['./clientes-header.component.scss']
})
export class ClientesHeaderComponent implements OnInit {

  constructor(private servicio: ComunicacionService) { }

  ngOnInit() {
  }

  salirSesion(){
    this.servicio.logout();

  }


}
