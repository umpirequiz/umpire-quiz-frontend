import {Component, OnInit} from '@angular/core';
import {AlertMessage, MessageService} from '../../services/message.service';
import {NgbAlert, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'message',
  standalone: true,
  imports: [
    NgbAlert,
    NgForOf,
    NgbToast
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})

export class MessageComponent implements OnInit {
  messages: AlertMessage[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.alert$.subscribe(alert => {
      this.messages.push(alert);
    });
  }

  close(alert: AlertMessage) {
    this.messages = this.messages.filter(a => a !== alert);
  }

  class(message: AlertMessage): string {
    return "text-light bg-" + message.type
  }
}
