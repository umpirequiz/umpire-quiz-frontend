import {Component, OnInit} from '@angular/core';
import {AlertMessage, MessageService} from '../../services/message.service';
import {Subscription} from 'rxjs';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'message',
  standalone: true,
  imports: [
    NgbAlert,
    NgForOf
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})

export class MessageComponent implements OnInit {
  alerts: AlertMessage[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.subscription = this.messageService.alert$.subscribe(alert => {
      this.alerts.push(alert);
      setTimeout(() => this.close(alert), 5000); // Close alert after 5 seconds
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close(alert: AlertMessage) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }
}
