import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { PasswordModule } from "primeng/password";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { RegistroComponent } from "./registro/registro.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./servicios/auth.guard";
import { AuthGuardUser } from './servicios/guardianCliente';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full", data: { state: "home" } },
  { path: "header", component: HeaderComponent },
  { path: "home", component: HomeComponent },
  { path: "registro", component: RegistroComponent, data: { state: "about" } },
  { path: "login", component: LoginComponent, data: { state: "login" } },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardUser]
  },
  {

    /* Loading lazy module */
    path: "admin",
    loadChildren: "./admin/admin-module.module#AdminModuleModule"

  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    PasswordModule
  ]
})
export class AppRoutingModule {

}
