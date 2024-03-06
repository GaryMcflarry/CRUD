import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

const baseUrlClient = 'http://localhost:3000/api/Client_Database/clients'
const baseurlUser = 'http://localhost:3000/api/Client_Database/user'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createClient(client:any = null) {
    // We want to send a web request to create a client
  //  return this.webReqService.post('clients/add', client);
  return this.webReqService.post('clients/create', client);
  }

  loginUser(user:any =null) {
  
    //We want to send a web request to login a user
    // return this.webReqService.post('users/login', user);
    return this.webReqService.post('users/login', user);
  }

  createUser(user:any = null) {
    // We want to send a web request to create a user
    return this.webReqService.post('users/signup', user);
  }

  editClient(client:any = null) {
    console.log(client)
    // We want to a send a web request to edit the existing clients
    return this.webReqService.patch(`clients/edit/${client.id}`, client)
  }

  editUser(user:any = null) {
    console.log(user)
    // We want to send a web request to edit the existing users
    return this.webReqService.patch(`users/edit/${user.id}`, user)
  }

  displayClient() {
    //We want to send a web request to display the existing clients on to a table
    return this.webReqService.get('clients/display');
  }

  displayUser() {
    //We want to send a web request to display the existing users on to a table
    return this.webReqService.get('users/display');
  }

  displayUserInfo(id:any){

    return this.webReqService.get(`users/display/:${id}`)
  }

  deleteClient(id:any): Observable<any> {
    return this.webReqService.delete(`clients/delete/${id}`);
  }

  deleteUser(id:any): Observable<any> {
    return this.webReqService.delete(`users/delete/${id}`);
  }

}
