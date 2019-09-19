import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SocketService {

  getDocument(id: string) {
    this.socket.emit("getDoc", id);
  }

  LlegaNuevoUsuario(usuario) {
    return this.socket.fromEvent("UsuarioRegistrado").pipe();
  }

  nuevoUsuario(usuario) {
    this.socket.emit("newUser", usuario);
  }
  editDocument(document: Document) {
    this.socket.emit("editDoc", document);
  }
  private docId() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
  constructor(private socket: Socket) {}
}
