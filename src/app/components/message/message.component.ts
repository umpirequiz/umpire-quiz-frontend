import {Component, OnInit} from '@angular/core';
import {AlertMessage, MessageService} from '../../services/message.service';
import {Subscription} from 'rxjs';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'message',
  standalone: true,
  imports: [
    NgbAlert
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class AlertComponent implements OnInit {
  alerts: AlertMessage[] = [];

  constructor(private alertService: MessageService, private subscription: Subscription) {
  }

  ngOnInit(): void {
    this.subscription = this.alertService.alert$.subscribe(alert => {
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
