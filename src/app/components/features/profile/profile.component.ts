import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {interval, Subject, takeUntil} from "rxjs";

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
  quote: string = '';
  private destroy$ = new Subject<void>();



  constructor(private router: Router
             // , private _snackBar: MatSnackBar, private userService: UserService
 ) {}

  ngOnInit() {
    // Generate a random quote initially
    this.generateRandomQuote();

    // Generate a new random quote every 5 seconds (adjust as needed)
    interval(7000) // 5 seconds
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.generateRandomQuote();
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the interval when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }

  generateRandomQuote() {
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
      "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
      "It's okay not to be okay as long as you are not giving up. - Karen Salmansohn",
      "Your feelings are valid. You have the right to feel whatever you feel. You aren't exaggerating. You're not being too sensitive. You're responding exactly how you need to. - Daniell Koepke",
      "Don't believe everything you think. Thoughts are just that – thoughts. - Allan Lokos",
      "You are not a burden. You have worth. You are deserving of love and support. - Bryant McGill",
      "Your mental health is more important than the test, the interview, the lunch date, the meeting, the family dinner, and the grocery-run. Take care of yourself. - Unknown",
      "You are not alone. Reach out. Talk to someone. It's okay to ask for help. - Sian Ferguson"


      // Add more quotes as needed
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.quote = quotes[randomIndex];
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
