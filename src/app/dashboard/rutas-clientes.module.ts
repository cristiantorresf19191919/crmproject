import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ClientesChatComponent } from './clientes-chat/clientes-chat.component';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { AuthGuardUser } from '../servicios/guardianCliente';


/* const rutasAdmin: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/admin/adminDash",
        pathMatch: "full",
        data: { state: "home" }
      },
      {
        path: "adminDash",
        component: DashboardchildComponent,
        data: { state: "about" }
      },

      { path: "settings", component: SettingsChildComponent }
    ]
  }
]; */

/* const rutasAdmin: Routes = [
  { path: "", redirectTo: "/admin/dash", data: { state: "home" } },
  { path: "dash", component: DashboardchildComponent, data: {state: "about"} },
  {path: "settings", component: SettingsChildComponent, data: {state: "login"}}
]; */

const rutasAdmin: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate:[AuthGuardUser],
    data: { state: "home" },
    children: [
      {
        path: "dashboard/chat",
        component: ClientesChatComponent,
        data: { state: "about" }
      },
      {
        path: "dashboard/cuentaCliente",
        component: ClienteHomeComponent,
        data:  { state: "login" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rutasAdmin)],
  exports: [RouterModule]
})
export class RutasClienteModulo {}
