import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
  })
export class userService {

    key = 'user'

    constructor(private store: StorageService) { }
  
    user: any = null
    //recieving the set user info to be stored
    setUser (userdata: any) {
        this.user = userdata
        this.store.setItem(this.key, JSON.stringify(userdata))
        console.log(userdata)
    }
    //used to retrieve the user info from the storage of the web browser 
    getUser() {
        const user = this.store.getItem(this.key)
        return user? JSON.parse(user): null
        //return this.user
    }
    //to delete the current user info (this is for logging out)
    deleteKey () {
        this.store.remove(this.key)
    }
    




}