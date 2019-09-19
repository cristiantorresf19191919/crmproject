import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ContactoComponent } from "./contacto/contacto.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegistroComponent } from "./registro/registro.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { httpInterceptorProviders } from "./http-interceptors";
import { FooterComponent } from "./footer/footer.component";
import { FontTagDirective } from "./directivas/font-tag.directive";
import { ScrollaaDirective } from "./directivas/scrollaa.directive";
import { ModuleadmincomponentModule } from "./shared/moduleadmincomponent.module";
import { NgxLoadingModule } from "ngx-loading";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { NgwWowModule } from 'ngx-wow';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ModuloClientesModule } from './dashboard/modulo-clientes.module';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { AdminModuleModule } from './admin/admin-module.module';
import { NgChatModule } from 'ng-chat';
import { ScrollabajoDirective } from './directivas/scrollabajo.directive';
import { TogglesplashDirective } from './directivas/togglesplash.directive';

const config: SocketIoConfig = { url: 'https://servidor-tigre.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactoComponent,
    RegistroComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    FontTagDirective,
    ScrollaaDirective,
    TogglesplashDirective

    //  ChatBot

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgFlashMessagesModule,
    NgwWowModule,
    SocketIoModule.forRoot(config),
    FlashMessagesModule,
    ModuloClientesModule,
    NgChatModule,




  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
