import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.min(6), Validators.max(16)]],
    });
  }

  public submit(): void {
    if (!this.loginForm.valid) {
      this._snackBar.open("Input is not valid", '', {
        duration: 1000
      })
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((data:any) => {
      console.log(this.loginForm.value);
      console.log(JSON.stringify(data));

      localStorage.setItem('userId', data.id)

      this.router.navigate(["education"]);

    }, error => {
      this._snackBar.open("Unable to log in account", '', {
        duration: 1000
      })
    })
  }
}
