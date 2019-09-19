import { Injectable } from "@angular/core";
import { ComunicacionService } from "src/app/servicios/comunicacion.service";
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'

import { Observable, BehaviorSubject } from "rxjs";
import { Messages } from "./messages";

@Injectable({
  providedIn: "root"
})
export class ClienteServicioService {
  nombre: string;

  readonly token = 'd7c7a29087164a6bb98021ea9f521203';
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Messages[]>([]);

  update(msg: Messages) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    const userMessage = new Messages(msg, "user");
    this.update(userMessage);

    return this.client.textRequest(msg).then(res => {
      const speech = res.result.fulfillment.speech;
      const botMessage = new Messages(speech, "bot");
      this.update(botMessage);
    });
  }
  constructor() {}

  guardeNombre(nombre) {
    localStorage.setItem("nombre", nombre);
  }

  NombreUsuario() {
    return (
      localStorage
        .getItem("nombre")
        .charAt(0)
        .toUpperCase() + localStorage.getItem("nombre").slice(1)
    );
  }
}
