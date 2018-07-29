import { Component, OnInit } from '@angular/core';
import { HubConnection,HubConnectionBuilder,LogLevel } from '@aspnet/signalr';
import {environment} from '../../environments/environment'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  name:string = "";
  message:string = '';
  messages:any[] = [];
  private hubConnection:HubConnection;
  constructor() { }

  ngOnInit() {
    this.name = window.prompt("Enter your name: ","Niladri");
    this.hubConnection = new HubConnectionBuilder().withUrl(environment.apiUrls.chat).configureLogging(LogLevel.Debug).build();
    this.hubConnection
    .start()
    .then(() => console.log('Connection started!'))
    .catch(err => console.log('Error while establishing connection :('));
    
    this.hubConnection.on("sendToAll",(user:string,message:string) => {
      const receivedMessage = {"name":user ,"msg":message};
      this.messages.push(receivedMessage);
    })
  }

  public sendMessage() :void {
    this.hubConnection.send("sendMessage",this.name,this.message)
                      .then(() => this.message = "")
                      .catch(err => console.error(err));
  }

}
