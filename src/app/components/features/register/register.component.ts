import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup
  public arrowImageUrl = 'assets/Move_light.png';

  constructor(private router: Router, private formBuilder: FormBuilder) {}


  navigateToHome() {
    const path = "home"
    this.router.navigate([path])
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'gender': ['', Validators.required],
      'age': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.min(6), Validators.max(16)]],
    });
  }
  // ngOnInit(): void {
  //   this.registerForm = this.formBuilder.group({
  //     'email': ['', [Validators.required, Validators.email]],
  //     'password': ['', [Validators.required, Validators.min(6), Validators.max(16)]],
  //     'fullName': ['', [Validators.required]],
  //     'phoneNumber': ['', [Validators.required]],
  //   });
  // }

  public submit(): void {
    // if (!this.registerForm.valid) {
    //   this._snackBar.open("Input is not valid", '', {
    //     duration: 1000
    //   })
    //   return;
    }

  //   this.authService.register(this.registerForm.value).subscribe((data: any) => {
  //     localStorage.setItem("authToken", data.token)
  //     localStorage.setItem("isOrg", data.user.organization)
  //     localStorage.setItem("currentId", data.user.id)
  //
  //     // this._snackBar.open("Account created, please log in", '', {
  //     //   duration: 1000
  //     // })
  //     this.router.navigate(["/onboarding"])
  //
  //   }, error => {
  //     this._snackBar.open("Unable to register account", '', {
  //       duration: 1000
  //     })
  //   })
  // }

}
