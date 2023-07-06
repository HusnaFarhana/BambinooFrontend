import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';
import jwt_decode from 'jwt-decode';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css'],
})
export class AdminChatComponent implements OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  private socket: any;
  message: string;
  messages: any[] = [];
  username: string = 'Admin';
  chatHistory: any;
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.socket = io('http://localhost:4000');

    this.socket.on('connect', () => {
      this.socket.emit('custom-event', 10, 'hi');
    });
    this.socket.on('receive-message', (message: any) => {
      console.log(message, 'recvd onee in admn');

      this.messages.push({
        content: message.content,
        time: new Date().toLocaleTimeString(),
        type: 'received',
        username: message.username,
      });
    });
    this.scrollToBottom();
    console.log(this.username, '4565');
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
    this.adminService.getChatHistory().subscribe((response) => {
      this.messages = response.chat;
    });
    setTimeout(() => {
      this.scrollToBottomWithDelay();
    }, 50);
  }
  scrollToBottom() {
    setTimeout(() => {
      const chatMessagesElement = this.chatMessages.nativeElement;
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    });
  }
  // scrollToBottomWithDelay() {
  //     const chatMessagesElement = this.chatMessages.nativeElement;
  //     const scrollHeight = chatMessagesElement.scrollHeight;
  //     const scrollTop = chatMessagesElement.scrollTop;
  //     const clientHeight = chatMessagesElement.clientHeight;
  //     const scrollStep = Math.PI / (scrollHeight / 2);
  //     let count = 0;
  //     let scrollPosition = 0;

  //     const scrollAnimation = () => {
  //       if (chatMessagesElement) {
  //         count += 1;
  //         const position =
  //           scrollTop +
  //           (scrollHeight - scrollTop) * Math.sin(scrollStep * count);
  //         chatMessagesElement.scrollTop = position;

  //         if (count < scrollHeight) {
  //           requestAnimationFrame(scrollAnimation);
  //         }
  //       }
  //     };

  //     requestAnimationFrame(scrollAnimation);
  // }
  scrollToBottomWithDelay() {
    const chatMessagesElement = this.chatMessages.nativeElement;
    const scrollHeight = chatMessagesElement.scrollHeight;

    const animationDuration = 500; // Duration of the scroll animation in milliseconds
    const startTime = Date.now();
    const startPosition = chatMessagesElement.scrollTop;
    const targetPosition = scrollHeight - chatMessagesElement.clientHeight;

    const scrollAnimation = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1); // Ensure progress is between 0 and 1
      const easedProgress = this.easeOutCubic(progress); // Apply easing function for smoother animation

      const position =
        startPosition + (targetPosition - startPosition) * easedProgress;
      chatMessagesElement.scrollTop = position;

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  }

  // Easing function: Cubic easing out
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}
