import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MessageService } from '../_service';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('openModal') openModal: ElementRef;

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    if(this.messageService.messages.length > 0)
      this.openModal.nativeElement.click();
  }
}
