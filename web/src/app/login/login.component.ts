import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl,Validators,FormBuilder, AbstractControl} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted= false;
  errorMessage :string="";
  isBtnDisabled = false;

 
  constructor(private fb: FormBuilder,private accountService:AccountService, private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9]{8,10}$")]],
    });

  }
  get g(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  Loginsub(){
    this.submitted = true;
    console.log("params....",this.loginForm.value);
    console.log("40",this.g['email'].value);
    if(this.g['email'].value!=null && this.g['password'].value!=null){
      this.accountService.login(this.g['email'].value, this.g['password'].value).subscribe((response:any)=>{
        if(response.status==1){
          this.errorMessage="Login Successfully"
          this.accountService.setDataInLocalStorage('token', response.token);
          console.log("Login Successful") 
           
          this.router.navigate(['/home'])
          
        }else if(response.status==2){
          this.errorMessage= "Wrong user details";
          console.log("Login failed")
        }
        else{
          console.log("Error")
        }   
      })
}
this.accountService.getuserdetailbyEMAIL(this.g['email'].value).subscribe((res:any)=>{
  this.accountService.setDataInLocalStorage("userData", JSON.stringify(res.data[0]))
})
  }
  }

