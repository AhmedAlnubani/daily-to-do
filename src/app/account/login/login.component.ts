import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errMsg: any = [];
  loginForm: FormGroup;
  msgError: boolean = false;
  constructor(fb: FormBuilder,
    private loginServ: LoginService,
    private route: Router
  ) {

  }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errMsg = [];
      if (!this.loginForm.get('username')?.valid) {
        this.errMsg.push('required User name');
      }
      if (!this.loginForm.get('password')?.valid) {
        this.errMsg.push('required password');
      }
    } else {
      this.loginServ.login({
        "userName": this.loginForm.get('username')?.value,
        "password": this.loginForm.get('password')?.value
      }).subscribe((res: any) => {
        if (res.token == 'Unothraization') {
          this.msgError = true;
          return
        }
        sessionStorage.setItem('token', res.token);
        this.route.navigate(['/daily-tasks']);

      }, (error) => {
        this.msgError = true;
        this.errMsg;
      }
      )
    }
  }
}
