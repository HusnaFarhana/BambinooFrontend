import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { io } from 'socket.io-client';
import { UserPayload, userModel } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  userid: String = '';
  data: userModel;
  decoded: UserPayload;
  token: any;
  private socket: any;
  message: string;
  messages: any[] = [];
  username:string=''
  constructor(private userService: UserService) {}
  ngOnInit(): void {
     this.token = localStorage.getItem('id_token');
     this.decoded = jwt_decode(this.token);
     this.userid = this.decoded.userid;
    this.socket = io('http://localhost:4000');

    this.socket.on('connect', () => {
    
      this.socket.emit('custom-event', 10, 'hi');
    });

    this.socket.on('receive-message', (message: any) => {
    

      this.messages.push({
        content: message.content,
        time: new Date().toLocaleTimeString(),
        type: 'received',
        username: message.username,
      });
    });
    this.scrollToBottom();
  }
  send(message) {
    if (message.trim() === '') {
    return;
  }
    this.userService.getUser(this.userid).subscribe((response) => {
      this.data = response.user[0];
       this.username = this.data.name;
     

       this.messages.push({
         content: message,
         time: new Date().toLocaleTimeString(),
         type: 'sent',
         username: this.username,
       });
      this.socket.emit('send-message', {
        message: message,
        username: this.username,
      });
      this.message=''
      this.scrollToBottom();
    });
   
    
    
  }
  scrollToBottom() {
    setTimeout(() => {
      const chatMessagesElement = this.chatMessages.nativeElement;
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    });
  }
}
