import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap, delay, retry } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";

// servicio conecta a backend

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const HttpUploadOptions = {
  headers: new HttpHeaders({
    "Content-Type":
      "multipart/form-data; boundary=----WebKitFormBoundaryzeBxraLRKHwsjeD4"
  })
};
@Injectable({
  providedIn: "root"
})
export class ComunicacionService {
  usuario: Usuario;
  token: string;

  private url = "https://servidor-tigre.herokuapp.com";
  // private url = "localhost:3000";
  authToken: string;
  user: any;
  constructor(private httpClient: HttpClient, private router: Router) {}
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error("hubo algun desafortunado error :( " + error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} ha fallado por aca: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  EnviarVideo(obj) {
    return this.httpClient
      .post(this.url + "/ideas/add", obj, httpOptions)
      .pipe(catchError(this.handleError("Enviar Video")));
  }
  ObtenerDatos() {
    return this.httpClient
      .get(this.url + "/ideas")
      .pipe(catchError(this.handleError("Obtener Datos")));
  }

  PrimerToken() {
    return this.httpClient
      .get(this.url + "/users/token?pagina=cumbre", httpOptions)
      .pipe(catchError(this.handleError("Obtener Datos")));
  }
  OperacionConId(id) {
    return this.httpClient
      .get(`${this.url}/ideas/edit/${id}`)
      .pipe(catchError(this.handleError("operacion con Id")));
  }

  UpdateVideo(video, id) {
    return this.httpClient
      .put(`${this.url}/ideas/${id}`, video, httpOptions)
      .pipe(catchError(this.handleError("UpdateVideo")));
  }

  Borrar(id) {
    return this.httpClient
      .delete(`${this.url}/ideas/borrar/${id}`, httpOptions)
      .pipe(catchError(this.handleError("Borrar")));
  }

  Registro(user) {
    user.rol = "CLIENT_ROLE";
    return this.httpClient
      .post(`${this.url}/users/register`, user, httpOptions)
      .pipe(catchError(this.handleError("registro")));
  }

  Login(user) {
    return this.httpClient
      .post(`${this.url}/users/login`, user, httpOptions)
      .pipe(catchError(this.handleError("login")));
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("rol_user", user.rol);
    this.authToken = token;
    this.user = user;
  }

  cargarStorage() {
    if (localStorage.getItem("id_token")) {
      this.token = localStorage.getItem("id_token");
      this.usuario = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  logout() {
    this.token = null;
    this.usuario = null;
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  TokenValide(token) {
    const re = /(?=.*[0-9])(?=.*[A-Z])[A-Za-z0-9]{300}/;
    return re.test(token);
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
    if (
      token &&
      /* this.TokenValide(this.authToken) && */
      localStorage.getItem("rol_user").includes("ADMIN_ROLE")
    ) {
      return true;
    } else {
      return false;
    }
  }

  loadTokenCliente() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
    if (
      token &&
      /* this.TokenValide(this.authToken) && */
      localStorage.getItem("rol_user").includes("CLIENT_ROLE")
    ) {
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated() {
    if (this.loadToken()) {
      return true;
    } else {
      return false;
    }
  }

  isAuthenticatedCliente() {
    if (this.loadTokenCliente()) {
      return true;
    } else {
      return false;
    }
  }
  ObtenerClientes() {
    return this.httpClient
      .get(this.url + "/users/admin/obtener")
      .pipe(catchError(this.handleError("Obtener Clientes")));
  }

  BuscarClientes(term) {
    if (!term.trim()) {
      // si no hay termino bote un array vacio.
      return of([]);
    }
    return this.httpClient
      .get(this.url + `/users/adminBuscarClientes?cliente=${term}`)
      .pipe(catchError(this.handleError("Buscar Clientes")));
  }

  ComparaEmail(correo) {
    return this.httpClient
      .get(`${this.url}/users/comparaClientes?email=${correo}`)
      .pipe(delay(400));
  }

  SubirFoto(image: File) {
    
    const formData = new FormData();
    formData.append("image", image);

    return this.httpClient
      .post(this.url + `/users/dashboard/foto`, formData)
      .pipe(catchError(this.handleError("Subir Foto")));
  }

  getphoto() {
    return this.httpClient
      .get(this.url + `/users/dashboard/obtenerfoto`, httpOptions)
      .pipe(catchError(this.handleError("Obtener Foto")));
  }
}
