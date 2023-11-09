import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup
  regexName:string = "^[A-Za-z\\s]{2,25}$";
  regexEmail:string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  regexPass:string = "^(?=.*[A-Z!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,25}$";


  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm =  this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
      password: ['', [Validators.required, Validators.pattern(this.regexPass)]]
    })
  }

  ngOnInit() {}

  onSubmit(form:FormGroup){
    console.log(form)
    let email:string = form.value.email;
    let password:string = form.value.password;
    this.authService.login(email, password);
  }

  googleAuth() {
    this.authService.googleAuth();
  }

}
