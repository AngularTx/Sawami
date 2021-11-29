import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, public router: Router) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      type: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  submit() {
    if (this.form.valid) {
      sessionStorage.setItem("login", 'true');
      this.router.navigate(['/accounting/products']);
    }
  }

}
