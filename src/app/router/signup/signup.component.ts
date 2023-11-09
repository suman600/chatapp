import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {User} from "../../modal/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  registerForm:FormGroup;
  regexName:string = "^[A-Za-z\\s]{2,25}$";
  regexEmail:string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  regexPass:string = "^(?=.*[A-Z!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,25}$";
// name: ['', [Validators.required, Validators.pattern(this.regexName)]],

  constructor(
    private fb:FormBuilder,
    private authService:AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
      password: ['', [Validators.required, Validators.pattern(this.regexPass)]]
    })
  }
  ngOnInit() {

  }

  onSubmit(form:FormGroup){
    let email:string = form.value.email;
    let password:string = form.value.password;
    this.authService.register(email, password);
  }

  googleAuth() {
    this.authService.googleAuth();
  }

}
