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
export class ProfileComponent implements OnInit{
  @Input()
  public studentId: number = 0

  public fullName: string = 'Adela Joldić'
  public email: string = 'adela.joldic@stu.ssst.edu.ba'
  public profileImage: string = ''
  public shortBio: string = localStorage.getItem('shortBio') || 'Enter short bio...';
  public notes: string = localStorage.getItem('notes') || 'Enter notes...';
  public universityName: string = 'Sarajevo School Of Science and Technology'
  public universityYear: number = 0
  public gpa: number = 0
  public linkedinUrl: string = ''
  public certificates: string = ''
  public tasks: Task[] = [];
  // Flags to track editing status
  public editingShortBio: boolean = false;
  public editingTasks: boolean = false;
  public editingNotes: boolean = false;


  constructor(public dialog: MatDialog, private router: Router/*, private _snackBar: MatSnackBar, private userService: UserService*/) {
  }

  ngOnInit(): void {}

  // Enable editing for the specified field
  enableEditing(field: string): void {
    switch (field) {
      case 'shortBio':
        this.editingShortBio = true;
        break;
      case 'tasks':
        this.editingTasks = true;
        break;
      case 'notes':
        this.editingNotes = true;
        break;
    }
  }

  // Disable editing for the specified field
  disableEditing(field: string): void {
    switch (field) {
      case 'shortBio':
        this.editingShortBio = false;
        localStorage.setItem('shortBio', this.shortBio);
        break;
      case 'tasks':
        this.editingTasks = false;
        // Save tasks to localStorage or a backend service if needed
        break;
      case 'notes':
        this.editingNotes = false;
        localStorage.setItem('notes', this.notes);
        break;
    }
  }

  // Add a new task to the list
  addTask(): void {
    this.tasks.push({ name: '', completed: false });
  }

  // Remove a task from the list
  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  // Open the notes dialog
  openNotesDialog(): void {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      width: '400px',
      data: { notes: this.notes },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notes = result;
        localStorage.setItem('notes', this.notes);
      }
    });
  }
//
//   ngOnInit(): void {}
//
//   // ngOnInit(): void {
//
//    /* if(this.studentId){
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
//   }*/
//
// // }
}
