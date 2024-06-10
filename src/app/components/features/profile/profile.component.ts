import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {interval, Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {UserModel} from "../../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input()
  public id: number = 0
  public fullName: string = ''
  public email: string = ''
  public gender: string = ''
  public age: number = 0
  quote: string = '';
  private destroy$ = new Subject<void>();
  public user: UserModel | null = null;

  constructor(private router: Router, private authService: AuthService) {
  }

  // user: User | undefined;

  ngOnInit() {
    // Generate a random quote initially
    this.generateRandomQuote();

    // Generate a new random quote every 5 seconds (adjust as needed)
    interval(7000) // 5 seconds
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.generateRandomQuote();
      });

    // Load user profile data
    this.loadUserProfile();
  }

  loadUserProfile() {
    console.log('Loading user profile...');
    this.user = this.authService.getUserProfileData();
    console.log('User profile loaded:', this.user);
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
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.quote = quotes[randomIndex];
  }

  logout(): void {
    this.authService.logout();
  }

}

