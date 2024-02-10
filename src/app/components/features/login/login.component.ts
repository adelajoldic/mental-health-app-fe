import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup
  constructor(private router:Router, private formBuilder: FormBuilder/*, private authService: AuthService, private _snackBar: MatSnackBar*/) {}

  navigateToHome() {
    const path = "home"
    this.router.navigate([path])
  }
  ngOnInit(): void {
    if(localStorage.getItem("authToken")){
      this.router.navigate(["/home"])
    }

      this.loginForm = this.formBuilder.group({
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.min(6), Validators.max(16)]],
    });
  }

  public submit(): void {
   if (!this.loginForm.valid) {
   /*    this._snackBar.open("Input is not valid", '', {
        duration: 1000
      })*/
      return;
    }

    /* this.authService.login(this.loginForm.value).subscribe((data: any) => {
       localStorage.setItem("authToken", data.token)
       localStorage.setItem("isOrg", data.user.organization)
       localStorage.setItem("currentId", data.user.id)

       this.router.navigate(["/home"])
     }/*, error => {
       if(error.status == 401){
         this._snackBar.open(`Invalid credentials`, '', {
           duration: 1000,
         })
       } else {
         this._snackBar.open(`Invalid login - ${error.message}`, '', {
           duration: 1000
         })
       }
     })*/
  }
}
