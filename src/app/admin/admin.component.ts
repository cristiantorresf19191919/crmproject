import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ComunicacionService } from "../servicios/comunicacion.service";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
import { animations } from "ack-angular-fx";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import Swal from "sweetalert2";
import { Usuario } from "../models/usuario.model";
import { MenuItem } from "primeng/api";
import { routerTransition } from '../router.animations';

interface Clientes {
  correo;
  cedula;
  celular;
  clientes: any;
}

interface Response {
  success: boolean;
  msg: string;
  clientes: any;
}

@Component({
  animations: [routerTransition],
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  private items: MenuItem[];

  cars: any;

  clientes: any;

  brands: any;

  colors: any;

  cols: any;

  yearFilter: number;

  yearTimeout: any;

  @ViewChild("ngxLoading") ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild("customLoadingTemplate") customLoadingTemplate: TemplateRef<any>;
  @ViewChild("searchBox") searchBox;
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
  // fin loader config
  // variables
  public loading = false;
  constructor(
    private Com: ComunicacionService,
    private flash: NgFlashMessageService,
    private router: Router
  ) {}
  ngOnInit() {



  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  salirsesion() {
    this.Com.logout();
  }

}
