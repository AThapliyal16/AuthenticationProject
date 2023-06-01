import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import{userinfo} from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
errorMessage :string="";
  constructor( private router: Router,
    private http: HttpClient) { }

register(user:any) {
      return this.http.post('http://localhost:3000/users/newuser', user);
    }
login(Email: any, Password: any) {
  return this.http.post("http://localhost:3000/users/validateuser", { Email, Password })
}
getuserdetials(){
  return this.http.get("http://localhost:3000/users/getusers")
}
getuserdetailbyEMAIL(email:any){
  return this.http.get("http://localhost:3000/users/getusers/"+ email);
}
getuserdetailbyID(id:any){
  return this.http.get("http://localhost:3000/users/getusersbyid/"+id);
}
Updateuser(data:any){
  return this.http.post("http://localhost:3000/users/updateuser", data);
}


Deleteuser(id:any){
return this.http.delete("http://localhost:3000/users/deleteuser/"+id);
}


setToken(token: string): void {
  localStorage.setItem('token', token);
}
setDataInLocalStorage(variableName: string, data: string) {
  localStorage.setItem(variableName, data);
}
getToken(): string | null {
  return localStorage.getItem('token');
}

isLoggedIn() {
  return this.getToken() !== null;
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['login']);
}

}
