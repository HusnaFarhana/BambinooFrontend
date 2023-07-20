import { Component, OnInit, ViewChild,OnDestroy, ElementRef } from '@angular/core';
import { io,Socket } from 'socket.io-client';
import { iUserPayload, iUserModel } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';
import jwt_decode from 'jwt-decode';
import { environment } from '../../../environment';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  userid: String = '';
  data: iUserModel;
  decoded: iUserPayload;
  token: any;
  private socket: Socket;
  message: string;
  messages: ChatMessage[] = [];
  username: string = '';
  chatHistory: ChatMessage[];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.onChatPageOpen();

    this.token = localStorage.getItem('id_token');
    this.decoded = jwt_decode(this.token);
    this.userid = this.decoded.userid;

    this.userService.getUser(this.userid).subscribe((response) => {
      this.data = response.user[0];
      this.username = this.data.name;
    });

    this.socket = io(environment.apiUrl);
    console.log(this.socket, 'sockettoiii');
    this.socket.on('connect', () => {
      this.socket.emit('custom-event', 10, 'hi');
      this.socket.emit('user-joined', { username: this.username });
    });
    this.socket.on('system-message', (message: any) => {
      this.messages.push({
        content: message,
        time: new Date().toLocaleTimeString(),
        type: 'system',
      });
      this.scrollToBottom();
    });

    this.socket.on('receive-message', (message: any) => {
      this.messages.push({
        content: message.content,
        time: new Date().toLocaleTimeString(),
        type: 'received',
        username: message.username,
      });
      if (!this.isOnChatComponent()) {

        this.userService.showNotification('New chat message received!');
      }
    });

    this.scrollToBottom();
  }
  ngOnDestroy(): void {
    this.userService.showNotification('');
    this.userService.isChatPageOpen = false;
  }

  private isOnChatComponent(): boolean {
    return window.location.pathname.includes('/chat');
  }
  send(message) {
    if (message.trim() === '') {
      return;
    }
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
    this.message = '';
    this.scrollToBottom();
  }

  loadChatHistory() {
    this.userService.getChatHistory().subscribe((response) => {
      console.log(response);

      this.messages = response.chat;
    });
    setTimeout(() => {
      this.scrollToBottomWithDelay();
    }, 200);
  }
  scrollToBottomWithDelay() {
    const chatMessagesElement = this.chatMessages.nativeElement;
    const scrollHeight = chatMessagesElement.scrollHeight;

    const animationDuration = 500; 
    const startTime = Date.now();
    const startPosition = chatMessagesElement.scrollTop;
    const targetPosition = scrollHeight - chatMessagesElement.clientHeight;

    const scrollAnimation = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1); 
      const easedProgress = this.easeOutCubic(progress); 

      const position =
        startPosition + (targetPosition - startPosition) * easedProgress;
      chatMessagesElement.scrollTop = position;

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  }


  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatMessagesElement = this.chatMessages.nativeElement;
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    });
  }
}
interface ChatMessage {
  content: string;
  time: string;
  type: string;
  username?: string;
}