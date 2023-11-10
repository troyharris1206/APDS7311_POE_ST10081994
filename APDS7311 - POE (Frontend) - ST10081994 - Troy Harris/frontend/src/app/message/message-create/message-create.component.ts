import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css']
})
export class MessageCreateComponent {

  constructor(public messageService: MessageServiceService){ }

  ngOnInit(): void {   
  }

  // Method triggered on form submission to add a new message
  onAddMessage(messageform: NgForm){
    // Check if the form is invalid
    if (messageform.invalid)
    {
      // Alert user about invalid form
      alert('Invalid!')
      return
    }

    // Call the addmessage_service method from the MessageServiceService to add the message
    this.messageService.addmessage_service(
      messageform.value.enteredTitle,
      messageform.value.enteredBody,
      messageform.value.enteredDateTime,
      messageform.value.enteredImportance
    )

    // Alert user of message being added
    alert('Message added successfully')   

    // Reset the form after adding the message
    messageform.resetForm()
  }
}
