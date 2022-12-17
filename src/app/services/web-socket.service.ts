import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket = new WebSocket('ws://localhost:8080/chat');
  chatMessages: ChatMessageDto[] = [];
  constructor() { 

  }

  public openWebSocket(){
    this.webSocket.onopen = (event) => {
      console.log('Open: ' , event)


    };

    this.webSocket.onmessage = (event) =>{
      const charMessageDto = JSON.parse(event.data);
      this.chatMessages.push(charMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close' , event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket(){
    this.webSocket.close();
  }
}
