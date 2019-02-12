import { Injectable } from '@angular/core';

/**
 * Message service
 * @author Frank, Damir
 */
@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
