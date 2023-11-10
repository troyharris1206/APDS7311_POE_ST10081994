import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit, OnDestroy {

  // Array to store messages retrieved from the service
  messages: {_id:string, title:string, body:string, dateTime:string, importance:string, __v:string}[] = [];

  constructor(public messageservice: MessageServiceService){}

  // Subscription to handle updates when messages change
  private messagesubscription!: Subscription;

  // Initializing component and subscribing to message updates
  ngOnInit(){
    // Calling the method from the message service to fetch and display all the messages
    this.messageservice.getmessage_service();

    // Subscribing to the update listener to get notified when messages change
    this.messagesubscription = this.messageservice.getUpdateListener()
      .subscribe((messages:{_id:string, title:string, body:string, dateTime:string, importance:string, __v:string}[]) => {
        console.log('Received messages:', messages);
        this.messages = messages;
      });
  }
  
  // Unsubscribing from the messages subscription to prevent memory leaks
  ngOnDestroy() {
    this.messagesubscription.unsubscribe();
  }

  // Method to trigger deletion of a specific message
  onDelete(messageid: string) {
    this.messageservice.deletemessage_service(messageid);
  }
}
