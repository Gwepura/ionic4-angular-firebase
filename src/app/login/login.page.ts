import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor() { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.loginForm.valueChanges.subscribe(data => this.onFormValueChanged(data));
  }


  onFormValueChanged(data) {
    console.log('data', data);
    console.log('this.loginForm', this.loginForm);
  }
}
