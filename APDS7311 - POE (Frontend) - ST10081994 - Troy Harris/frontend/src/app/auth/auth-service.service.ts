import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //Stores the token
  private token!: string;

  constructor(private http: HttpClient) { }

  //Method used to create a new account for a user
  async signup (userusername:string, userfirstname:string, userlastname:string, userpassword:string){
    try
    {
      //Assigning the result to const response
      const response = await this.http.post<{message: string}>('https://localhost:3000/api/user/signup', 
      {
        username: userusername, 
        firstname:userfirstname, 
        lastname:userlastname, 
        password:userpassword
      }).toPromise();

      //Success or error validation
      if(response && response.message){       
        return {success:true, message: response.message}
      }else{
        return {success: false}
      }

    }catch(error: any){
      return { success: false, error: error.error.error };
    }
  }

  //Method used to login the user through the API
  async login(userusername: string, userpassword: string) {
    // Prepare the login data
    const authData = {
      username: userusername,
      password: userpassword
    };
  
      // Make a POST request to the login endpoint and wait for the response
      const response = await this.http.post<{ token: string, username: string }>(
        'https://localhost:3000/api/user/login',
        authData
      ).toPromise();
  
      // Return the response containing the token and username
      return response;
  }

  

  //Method used to add the token to the local storage
  setToken(token: string){
    localStorage.setItem('authtoken', token)
  }

  //Method used to get token from the local storage
  getToken(){
    return localStorage.getItem('authtoken')
  }

  //Returns true if user is logged in
  isLoggedIn(): boolean{
    return !!this.getToken()
  }
}
