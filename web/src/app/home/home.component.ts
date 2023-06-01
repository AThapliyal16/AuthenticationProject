import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 allDetails:any;

  constructor(private router:Router,private accountService:AccountService) { }

  ngOnInit(): void {
   
    this.accountService.getuserdetials().subscribe(data=>{
      this.allDetails=data;
      console.log(data);
    })
 
  }
  
// logout(){
//   localStorage.clear();
//   this.router.navigate(['/login']);
// }

// Editfield(id:any){
//   console.log("EDIT.........",id);
// this.accountService.EditUser(this.allDetails.ID).subscribe(res=>{
//   console.log(res);
// })
// }


Delete(id:any){
  console.log("DELETE........",id);
  this.accountService.Deleteuser(id).subscribe((data: any) => {
    console.log(data);
    this.accountService.getuserdetials().subscribe(data=>{
      this.allDetails=data;
      console.log(data);
    })
  })  
}
}
