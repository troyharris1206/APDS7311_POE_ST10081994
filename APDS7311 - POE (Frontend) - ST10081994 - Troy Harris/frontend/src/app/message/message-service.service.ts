import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  private messagesdisplay: { 
    _id: string; 
    title: string; 
    body: string; 
    dateTime: string; 
    importance: string; 
    __v: string; 
  }[] = [];
  
  private updatedmessagesdisplay = new Subject<{_id:string, title:string, body:string, dateTime:string, importance:string, __v:string}[]>();


  constructor(private http: HttpClient, private authService: AuthServiceService) { } 

  //Method that calls the API that adds the user entered info into the db
  async addmessage_service(usertitle: string, userbody: string, userdatetime: string, userimportance: string) {
    try 
    {
      //checks if the user is logged in
      if (this.authService.isLoggedIn()) 
      {
        //Assinging the result to the response
        const response = await this.http.post<{ feedback: string, messages: any }>('https://localhost:3000/api/message', 
        {
          title: usertitle,
          body: userbody,
          dateTime: userdatetime,
          importance: userimportance,
        }).toPromise();
  
        //Gives user success or error feedback
        if (response && response.feedback) 
        {
          this.messagesdisplay.push(response.messages);
          this.updatedmessagesdisplay.next([...this.messagesdisplay]);
          return { success: true, message: response.feedback };
        } else {
          return { success: false };
        }
      } else {
        alert('Please login to continue.')
        return { success: false, error: 'User not logged in.' };
      }
    } catch (error: any) {
      return { success: false, error: error.error.error};//catches any error
    }
  }

  //Method that calls the API that gets all the messages
  getmessage_service() {
  if (this.authService.isLoggedIn()) {
    this.http.get<{ feedback: string; messages: any }>('https://localhost:3000/api/message')
      .subscribe(
        (themessage) => {
          console.log('Received response from API:', themessage);
          this.messagesdisplay = themessage.messages;
          this.updatedmessagesdisplay.next([...this.messagesdisplay]);
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  } else {
    console.error('User not logged in.');
    alert('Please login to continue.')
  }
}



  //Method that calls the API to delete a message
  deletemessage_service(_id:string){
    //Checks if the user is logged in
    if(this.authService.isLoggedIn()){
      this.http.delete('https://localhost:3000/api/message/' + _id)
      .subscribe(()=>{
        //Updates the messages with the deleted message
        const updateddeleted = this.messagesdisplay.filter(message=>message._id!==_id);
        this.messagesdisplay = updateddeleted;
        this.updatedmessagesdisplay.next([...this.messagesdisplay]);
      },
        (error) => {
          console.error('Error deleting post:', error);
        })
    }else{
      return { success: false, error: 'User not logged in.' };
    }
    return
  }

  //Gets the updated messages array
  getUpdateListener()
  {
    return this.updatedmessagesdisplay.asObservable();
  }
}
