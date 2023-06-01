import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { MustMatch } from '../mustmatch.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  submitted = false
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

  
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      contact:['',[Validators.required,Validators.pattern("^[0-9]*$") ]],
      city:['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.warn(this.registerForm.value)
    if(this.registerForm.valid){
      this.accountService.register(this.registerForm.value).subscribe((response:any) => {
        this.router.navigate(['/login']);
        console.log("59.....",this.registerForm);
      })
    }
    //     let reqHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'})
    //     this.http.post(this.url,this.restoForm.value,{headers:reqHeaders,responseType: 'text'}).subscribe((response)=>{
    //     
    //   console.log(response)
    //       console.log(this.url)
    //     })
   
    // this.registerForm.reset()

  }
}
