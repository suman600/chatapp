import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup
  regexName:string = "^[A-Za-z\\s]{2,25}$";
  regexPass:string = "^(?=.*[A-Z!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,25}$";
  constructor(private fb: FormBuilder) {
    this.loginForm =  this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.regexName)]],
      password: ['', [Validators.required, Validators.pattern(this.regexPass)]]
    })
  }

  ngOnInit() {

  }


  onSubmit(form:FormGroup){
    console.log(form.invalid);
  }
}
