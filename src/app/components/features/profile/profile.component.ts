import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

interface Task {
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input()
  public studentId: number = 0
  public fullName: string = 'Adela Joldić'
  public email: string = 'adela.joldic@stu.ssst.edu.ba'
  public gender: string = 'Female'
  public age: number = 23
  public profileImage: string = ''
  public shortBio: string = localStorage.getItem('shortBio') || 'Enter short bio...';
  public universityName: string = 'Sarajevo School Of Science and Technology'
  public universityYear: number = 4
  public department: string = 'Computer Science'



 constructor(private router: Router
             // , private _snackBar: MatSnackBar, private userService: UserService
 ) {
  }

//
//   // ngOnInit(): void {
//
//    /!* if(this.studentId){
//       this.userService.getStudentProfile(this.studentId).subscribe((data: any) => {
//         console.log(data)
//         this.fullName = data.user.fullName
//         this.email = data.user.email
//         this.profileImage = data.onboarding.profileImage
//         this.shortBio = data.onboarding.shortBio
//         this.universityName = data.onboarding.universityName
//         this.universityYear = data.onboarding.universityYear
//         this.gpa = data.onboarding.gpa
//         this.linkedinUrl = data.onboarding.linkedinUrl
//         this.certificates = data.onboarding.certificates
//       }, error => {
//         this._snackBar.open("Failed to fetch profile", '', {
//           duration: 1000
//         })
//       })
//     } else {
//       this.userService.getProfile().subscribe((data: any) => {
//         console.log(data)
//         this.fullName = data.user.fullName
//         this.email = data.user.email
//         this.profileImage = data.onboarding.profileImage
//         this.shortBio = data.onboarding.shortBio
//         this.universityName = data.onboarding.universityName
//         this.universityYear = data.onboarding.universityYear
//         this.gpa = data.onboarding.gpa
//         this.linkedinUrl = data.onboarding.linkedinUrl
//         this.certificates = data.onboarding.certificates
//       }, error => {
//         this._snackBar.open("Failed to fetch profile", '', {
//           duration: 1000
//         })
//       })
//     }
//
//
//   }
//
//   public openLinkedin(url: string){
//     window.open(url)
//   }
//   navigateToOnboarding(): void {
//     const path = "onboarding"
//     this.router.navigate([path])
//   }*!/
//
// }
}
