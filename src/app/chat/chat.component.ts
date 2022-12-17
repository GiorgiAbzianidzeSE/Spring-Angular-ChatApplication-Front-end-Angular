import { Component, OnDestroy, OnInit } from '@angular/core';
import{ NgForm } from '@angular/forms'
import { ChatMessageDto } from '../models/chatMessageDto';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit , OnDestroy {

  constructor(public webSocketService: WebSocketService){}
  
  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  ngOnInit(): void{
    this.webSocketService.openWebSocket();
  }

  sendMessage(sendForm: NgForm){
    const chatMessageDto = new ChatMessageDto(sendForm.value.user , sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls['message'].reset();
  }
}
