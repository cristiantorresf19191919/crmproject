import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from "@angular/core";
import { ChatAdapter } from "ng-chat";
import { Socket } from "ngx-socket-io";
import { Http } from "@angular/http";
import { SocketIOAdapter } from "./socketio-adapter";
import { HttpClient } from "selenium-webdriver/http";
import { ClienteServicioService } from "../serviciosCliente/cliente-servicio.service";
import { Subject, Observable } from "rxjs";
import { Messages } from "../serviciosCliente/messages";
import { scan } from "rxjs/operators";

@Component({
  selector: "app-clientes-chat",
  templateUrl: "./clientes-chat.component.html",
  styleUrls: ["./clientes-chat.component.scss"]
})
export class ClientesChatComponent implements OnInit, AfterViewChecked {
  title = "app";
  userId: string;
  username: string;

  public adapter: ChatAdapter;

  mensajesbot: Observable<Messages[]>;
  formValue: string;

  /* DIALOG FLOW AUTHENTICATION */
  public accessToken = "0047040994184adb94c051ba792d34a7";
  public message: Subject<any> = new Subject();

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  constructor(
    private socket: Socket,
    private http: Http,
    private serv: ClienteServicioService
  ) {
    this.InitializeSocketListerners();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    console.log('ngAferview');
}

scrollToBottom(): void {
  try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }
}


  ngOnInit() {
    this.username = this.serv.NombreUsuario();
    this.socket.emit("join", this.username);
    this.mensajesbot = this.serv.conversation
      .asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    this.serv.converse(this.formValue);
    this.formValue = "";
  }

  public joinRoom(): void {
    this.socket.emit("join", this.username);
  }
  public InitializeSocketListerners(): void {
    this.socket.on("generatedUserId", userId => {
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.userId = userId;
    });
  }
}
