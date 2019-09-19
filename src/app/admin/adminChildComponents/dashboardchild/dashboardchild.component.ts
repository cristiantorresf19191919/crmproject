import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
import { animations } from "ack-angular-fx";
import { Observable, of, Subject, timer } from "rxjs";
import Swal from "sweetalert2";
import { MenuItem, SelectItem } from "primeng/api";
import { Usuario } from "src/app/models/usuario.model";
import { ComunicacionService } from "src/app/servicios/comunicacion.service";
import { errorHandler } from "@angular/platform-browser/src/browser";
import { map } from "rxjs/operators";
import { Socket } from "ngx-socket-io";



interface Clientes {
  correo;
  cedula;
  celular;
  clientes: any;
}

interface SocketUser {
  name: string;
}

interface Response {
  success: boolean;
  msg: string;
  clientes: any;
}

interface PlanVenta{
  name: string;
  price : number;
}

@Component({
  animations: animations,
  selector: "app-dashboardchild",
  templateUrl: "./dashboardchild.component.html",
  styleUrls: ["./dashboardchild.component.scss"]
})
export class DashboardchildComponent implements OnInit {
  @ViewChild("ngxLoading") ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild("customLoadingTemplate") customLoadingTemplate: TemplateRef<any>;
  @ViewChild("searchBox") searchBox;
  brands: any;
  colors: any;
  errorhandler: boolean;
  cols: any;
  yearFilter: number;
  yearTimeout: any;

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
  //Planes de venta Para Agregar
  planesVenta:any;
  //loader Elegante dandole mas tiempo
  loadingElegante=true;
  // fin loader config
  // variables
  public loading = false;
  withRefresh = false;
  packages$: Observable<Usuario[]>;
  private searchText$ = new Subject<string>();
  private items: MenuItem[];
  cars: any;
  meses: SelectItem[];
  cuadreFechas = [];
  // toda la data de los clientes
  clientes: any;
  paginator: boolean;
  first = 0;
  filas: number;
  // Vamos a bregar con CRUD Y Modales por cada cliente
  selectedCustomer: any;
  soloClienteCrud: any = {};
  displayDialog: boolean;
  nuevoCliente: boolean;
  planActual:string;
  costoPlanActual: number;

  onRowSelect(event) {
    this.nuevoCliente = false;
    console.log(`onRowSelect metodo vamos a imprimir el evento ${JSON.stringify(event)} pilas por que se va a usar el event.data`);
    console.log(`solo imprima evento`);
    console.log(`999999999999999999999999999999999999999`);
    console.log(`999999999999999999999999999999999999999`);
    console.log(event);
    console.log(`999999999999999999999999999999999999999`);
    console.log(`999999999999999999999999999999999999999`);
    console.log(`solo usamos la propiedad data dentro del la variable event`);
    console.log(`********************************************************`);
    console.log(`********************************************************`);
    console.log(event);
    console.log(`********************************************************`);
    console.log(`********************************************************`);
    console.log(`********************************************************`);
    
    this.soloClienteCrud = this.clonarClienteSeleccionado(event.data);
    this.soloClienteCrud.plan ={name:"no hay plan",price:0};
    this.planActual = this.soloClienteCrud.plan.name;
    this.costoPlanActual = this.soloClienteCrud.plan.price;
    console.log(this.soloClienteCrud.plan);
    this.displayDialog = true;
  }

  clonarClienteSeleccionado(c: any): any {
    let clienteObjeto = {};
    for (let keys in c) {
      clienteObjeto[keys] = c[keys];
    }
    return clienteObjeto;
  }

  showDialogToAdd(){
    this.nuevoCliente= true;  
    this.soloClienteCrud = {};
    this.displayDialog = true;
  }

  reset() {
    this.first = this.first + 1;
    if (this.first % 2 === 0) {
      this.paginator = false;
    } else {
      this.paginator = true;
    }
  }

  AgregarMeses(clientes) {
    console.log(`LOS CLIENTES QUE ESTAN DENTRO DE AGREGAR MESES SON ${JSON.stringify(clientes)}`);
    clientes.map(objetos => {
      const meses = objetos.date.slice(5, 7);
      switch (meses) {
        case "01":
          objetos.mes = "enero";
          break;
        case "02":
          objetos.mes = "febrero";
          break;
        case "03":
          objetos.mes = "marzo";
          break;
        case "04":
          objetos.mes = "abril";
          break;
        case "05":
          objetos.mes = "mayo";
          break;
        case "06":
          objetos.mes = "junio";
          break;
        case "07":
          objetos.mes = "julio";
          break;
        case "08":
          objetos.mes = "agosto";
          break;
        case "09":
          objetos.mes = "septiembre";
          break;
        case "10":
          objetos.mes = "octubre";
          break;
        case "11":
          objetos.mes = "noviembre";
          break;
        case "12":
          objetos.mes = "diciembre";
          break;

        default:
      }
    });
  }

  buscaAsyncA(evento: string) {
    console.log(evento);
    this.searchText$.next(evento);
  }
  constructor(
    private Com: ComunicacionService,
    private flash: NgFlashMessageService,
    private router: Router,
    private socket: Socket
  ) {
    this.soloClienteCrud.plan={};
    this.soloClienteCrud.plan.price=0;
    this.soloClienteCrud.plan.name="no hay plan";
  
    
    // agregando planes de venta en el dropdown
    this.planesVenta = [
      {name: 'Mes', price:'80000'},
      {name: '3Meses', price:'212000'},
      {name: '6Meses', price:'350000'},
      {name: 'Año', price:''},
      {name: '8Clases', price:'130000'},
      {name: '8ClasesMensual', price:'200000'},
      {name: '12ClasesMensual', price:'250000'},
      {name: '4clasesSabado', price:'130000'},
    ]
      

    




   }
  ngOnInit() {
    const source = timer(3000);
    source.subscribe(val=> {
      this.loadingElegante = false;
      this.peticionClients();
    })
    
    this.LlegoUsuarioServer().subscribe(a => {
      console.log("Nuevo Evento Ocurrio");
      console.log(a);
    });

    this.cols = [
      { field: "nombre", header: "Nombre" },
      { field: "correo", header: "Correo" },
      { field: "cedula", header: "Cedula" },
      { field: "celular", header: "Celular" },
      { field: "mes", header: "Fecha" },
    ];
    this.meses = [
      { label: "enero", value: "enero" },
      { label: "febrero", value: "febrero" },
      { label: "marzo", value: "marzo" },
      { label: "abril", value: "abril" },
      { label: "mayo", value: "mayo" },
      { label: "junio", value: "junio" },
      { label: "julio", value: "julio" },
      { label: "agosto", value: "agosto" },
      { label: "septiembre", value: "septiembre" },
      { label: "octubre", value: "octubre" },
      { label: "noviembre", value: "noviembre" },
      { label: "diciembre", value: "diciembre" }
    ];
  }

  LlegoUsuarioServer() {
    return this.socket.fromEvent("UsuarioRegistrado").pipe(
      map((data: SocketUser) => {

        Swal.fire(
          "HEY",
          `${data.name.charAt(0).toUpperCase() +
          data.name.slice(1)} se acaba de registrar a la pagina`,
          "success"
        );
        this.peticionClients();

      })
    );
  }

  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, "year", "gt");
    }, 250);
  }

  salirsesion() {
    this.Com.logout();
  }
  peticionClients() {
    this.loading = true;
    this.Com.ObtenerClientes().subscribe(
      (data: Response) => {
        if (data) {
          if (data.success) {
            console.log(`imprima todo lo que llega del servidor ///9999`);
            console.log(`//////////////////////////////////////////////`);
            console.log(`//////////////////////////////////////////////`);
            console.log(data.clientes[59]);
            console.log(`//////////////////////////////////////////////`);
            console.log(`//////////////////////////////////////////////`);
            console.log(`//////////////////////////////////////////////`);
            
            this.errorhandler = true;
            this.loading = false;
            this.flash.showFlashMessage({
              messages: [data.msg],
              dismissible: true,
              timeout: false,
              type: "success"
            });
            // this.clientes = data.clientes;
            const clientes = data.clientes;
            this.AgregarMeses(clientes);
            this.clientes = clientes;
            console.log("Clientes ahora tienen propiedad meses");
            console.log(this.clientes);
          } else {
            this.errorhandler = false;
            Swal.fire({
              title: "Error del backend",
              type: "error"
            });
            this.clientes = [];
            this.loading = false;
            this.flash.showFlashMessage({
              messages: [data.msg],
              dismissible: true,
              timeout: false,
              type: "danger"
            });
          }
        } else {
          Swal.fire({
            title: "Error del backend",
            type: "error"
          });
        }
      },
      error => {
        Swal.fire({
          title: "Error del backend",
          type: "error"
        });
        this.clientes = [];
      }
    );
  }
  eliminar(item) {
    this.clientes = this.clientes.filter(h => h !== item);
  }

  erroreshandler() {
    Swal.fire({
      title: "Error del backend",
      type: "error"
    });
  }
}
