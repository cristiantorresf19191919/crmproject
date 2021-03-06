import { ChatAdapter, User, Message, ParticipantResponse } from "ng-chat";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Response, Http, } from "@angular/http";
import { Socket } from "ngx-socket-io";

export class SocketIOAdapter extends ChatAdapter {
  private socket: Socket;
  private http: Http;
  private userId: string;

  constructor(userId: string, socket: Socket, http:Http) {
    super();
    this.socket = socket;
    this.http = http;
    this.userId = userId;

    this.InitializeSocketListerners();
  }

  listFriends(): Observable<ParticipantResponse[]> {
    // List connected users to show in the friends list
    // Sending the userId from the request body as this is just a demo
    return this.http
      .post("https://servidor-tigre.herokuapp.com/listFriends", { userId: this.userId })
      .pipe(
        map((res: any) => res.json()),
        catchError((error: any) =>
          Observable.throw(error.json().error || "Server error")
        )
      );
  }

  getMessageHistory(userId: any): Observable<Message[]> {
    // This could be an API call to your NodeJS application that would go to the database
    // and retrieve a N amount of history messages between the users.
    return of([]);
  }

  sendMessage(message: Message): void {
    this.socket.emit("sendMessage", message);
  }

  public InitializeSocketListerners(): void {
    this.socket.on("messageReceived", messageWrapper => {
      // Handle the received message to ng-chat

      this.onMessageReceived(messageWrapper.user, messageWrapper.message);
    });

    this.socket.on(
      "friendsListChanged",
      (usersCollection: Array<ParticipantResponse>) => {
        // Handle the received message to ng-chat
        this.onFriendsListChanged(
          usersCollection.filter(x => x.participant.id !== this.userId)
        );
      }
    );
  }
}
