import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RutasClienteModulo } from "./rutas-clientes.module";
import { ClientesHeaderComponent } from "./clientes-header/clientes-header.component";
import { ClientesChatComponent } from "./clientes-chat/clientes-chat.component";
import { ClienteHomeComponent } from "./cliente-home/cliente-home.component";
import {
  CloudinaryModule,
  CloudinaryConfiguration

} from "@cloudinary/angular-5.x";
import { Cloudinary } from "cloudinary-core";
import { FormsModule } from "@angular/forms";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { ModuleadmincomponentModule } from "../shared/moduleadmincomponent.module";
import { NgChatModule } from "ng-chat";
import { HttpModule } from '@angular/http';
import { SharedModModule } from '../shared/shared-mod.module';
import { ScrollabajoDirective } from '../directivas/scrollabajo.directive';

@NgModule({
  declarations: [
    ClientesHeaderComponent,
    ClientesChatComponent,
    ClienteHomeComponent,
    ScrollabajoDirective


  ],
  imports: [
    CommonModule,
    FormsModule,
    RutasClienteModulo,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: "just-me"
    } as CloudinaryConfiguration),
    ModuleadmincomponentModule,
    NgFlashMessagesModule,
    NgChatModule,
    HttpModule,
    SharedModModule

  ],
  exports: [
    ClientesHeaderComponent,
    ClientesChatComponent,
    ClienteHomeComponent,
    CloudinaryModule,
    ModuleadmincomponentModule,
    NgFlashMessagesModule,
    NgChatModule,
    HttpModule,
    SharedModModule,
    ScrollabajoDirective


  ]
})
export class ModuloClientesModule {}
