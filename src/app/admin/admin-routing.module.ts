import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/servicios/auth.guard";
import { DashboardchildComponent } from "./adminChildComponents/dashboardchild/dashboardchild.component";
import { SettingsChildComponent } from "./adminChildComponents/settings-child/settings-child.component";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

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
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { state: "home" },
    children: [
      {
        path: "dash",
        component: DashboardchildComponent,
        data: { state: "about" }
      },
      {
        path: "settings",
        component: SettingsChildComponent,
        data: { state: "login" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutasAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
