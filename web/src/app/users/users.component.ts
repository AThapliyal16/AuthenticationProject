import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  submitted = false;
  sub: any;
  registerForm: FormGroup = new FormGroup({
   title: new FormControl(''),
   firstName: new FormControl(''),
   lastName: new FormControl(''),
   dob: new FormControl(''),
   contact: new FormControl(''),
   city: new FormControl(''),
   email: new FormControl(''),
   password: new FormControl(''),
   confirmPassword: new FormControl(''),
   acceptTerms: new FormControl(false),
 });
  userid: any;
  userData: any;
  userdob:any;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private account:AccountService, private router:Router) { }

  ngOnInit(): void {

  this.sub = this.route.params.subscribe(params => {
    this.userid = params['id'];
    this.account.getuserdetailbyID(this.userid).subscribe((data:any) =>{
        this.userData =  data.data[0];
        
        // this.userdob = this.userData.DOB.slice(0, 10);
        this.userData.DOB=moment(this.userData.DOB).format('YYYY-MM-DD');
        console.log("DOB final!!!!.....",this.userData.DOB);
        console.log('User data values.......',this.userData);
    });
  });
  }
  editSubmit(){
    console.log('line 38',this.userData);
    this.account.Updateuser(this.userData).subscribe((data: any) => {
      console.log('updated ');
      console.log(data);
       this.router.navigate(['/home'])      
    },)
    alert('data update successfully');
        
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

}
