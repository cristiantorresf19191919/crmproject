import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { SettingsChildComponent } from "./adminChildComponents/settings-child/settings-child.component";
import { HeaderAdminComponent } from "./adminChildComponents/header-admin/header-admin.component";
import { DashboardchildComponent } from "./adminChildComponents/dashboardchild/dashboardchild.component";
import { AdminComponent } from "./admin.component";
import { ModuleadmincomponentModule } from "../shared/moduleadmincomponent.module";
import { FormsModule } from '@angular/forms';
/* I can't do this because it is lazy module*/
import { NgFlashMessagesModule } from "ng-flash-messages";
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SettingsChildComponent,
    HeaderAdminComponent,
    DashboardchildComponent,
    AdminComponent,
  ],
  imports: [
    // CommonModule,
    AdminRoutingModule,
    ModuleadmincomponentModule,
    FormsModule,
    // NgFlashMessagesModule


  ]
})
export class AdminModuleModule {}
