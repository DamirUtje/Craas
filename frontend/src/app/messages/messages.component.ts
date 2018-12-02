import { Component } from '@angular/core';
import { MessageService } from '../_service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html'
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
