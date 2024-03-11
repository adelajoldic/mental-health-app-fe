import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent {
  public intro: string = " Engage in empowering workouts and calming practices to uplift your spirits and cultivate a" +
    " positive mindset. Let these mindful movements be your daily companion on the path to emotional resilience and " +
    "inner balance. Take a step towards a healthier, happier you! #ExerciseForMentalHealth #MindBodyBalance 🏋️‍♀️🤸";
  videos: any[] = [
    {
      title: '30 Minute Relaxing Yoga For Mental Health | All Levels - Slow Seated Flow',
      embedUrl: 'https://www.youtube.com/embed/COp7BR_Dvps?si=w8tgfcF5AbRyDsaH'
    },
    {
      title: 'Breathing Exercises for Anxiety and Depression',
      embedUrl: 'https://www.youtube.com/embed/ybl3Cou9pTc?si=bDp9N-K9E8YKX_rZ'
    },
    {
      title: '30 Min Mood Boost & Anxiety Release Cardio Workout',
      embedUrl: 'https://www.youtube.com/embed/0X6qRWrnIEE?si=20hydzzpMsnmvoa-'
    },
    {
      title: 'How Wild Swimming Helped My Mental Health | BBC The Social',
      embedUrl: 'https://www.youtube.com/embed/LxiJe2XCyjo?si=SIgNwQmSeOOz9PYb'
    },
    {
      title: '30 minute No Repeat Full Body Strength Training',
      embedUrl: 'https://www.youtube.com/embed/tj0o8aH9vJw?si=Y7dZHfW4Z1z2Gadj'
    },
    {
      title: '5K Indoor Running Intervals | 5000 Steps Cardio Workout',
      embedUrl: 'https://www.youtube.com/embed/VUU603OAGjA?si=8bdhetlId3IMqOBr'
    }
  ];

  descriptions: any[] = [
    {
      title: '🧘 Yoga',
      text: 'Yoga plays a crucial role in promoting mental health by fostering a profound connection between ' +
        'the mind and body. Through its practice, individuals experience improved mood, enhanced cognitive function, ' +
        'and a reduction in symptoms related to anxiety, PTSD, anger, and depression. The focus on breathwork and ' +
        'mindfulness in yoga cultivates self-awareness, aiding emotional regulation and stress management. Serving as a ' +
        'therapeutic outlet, yoga provides a space for individuals to navigate their mental well-being, fostering' +
        ' relaxation, resilience, and an overall sense of calm. Beyond its physical aspects, yoga stands as a valuable ' +
        'tool for enhancing mental health and emotional balance.',
    },
    {
      title: '😌 Breathing Exercises',
      text: 'Breathing exercises significantly impact mental health by leveraging the brain\'s respiratory center.' +
        ' Deliberate breath control, found in practices like yoga, effectively manages stress. ' +
        'The interplay between breathing and stress involves the diaphragm and rib muscles, crucial for lung function. ' +
        'Controlled breathing induces physiological changes, lowering blood pressure and stress hormones, ' +
        'improving immune function. This intentional shift promotes calm, enhances well-being, and boosts physical ' +
        'energy. Alternative relaxation methods may suit those sensitive to breath focus. Abdominal breathing, ' +
        'a key technique, fosters physical relaxation and mental serenity within a quiet environment.'
    },
    {
      title: '💃 Dancing',
      text: 'Considering ways to combat depression and anxiety, one might not immediately think of dancing as ' +
        'an exercise, but its health benefits should not be underestimated.' +
        'Dance encompasses various forms, and the more energetic styles can provide an excellent physical workout. ' +
        'Beyond its aerobic aspect, dancing is enjoyable, whether done with a partner or in a group setting, ' +
        'accompanied by favorite songs. Engaging in dance also allows for personal growth by learning new styles and mastering new moves. ' +
        'The sense of accomplishment derived from such challenges can contribute to building confidence and ' +
        'effectively addressing symptoms of anxiety and depression.'
    },
    {
      title: '🏊 Swimming',
      text: 'Engaging in swimming stands out as an excellent exercise method and a potent tool to combat symptoms of ' +
        'depression and anxiety. Particularly beneficial in warm-weather climates during the summer, it encourages' +
        ' deeper breathing and activates various muscles, both large and small, seldom utilized outside the water.' +
        ' Unlike high-impact exercises like running, swimming offers resistance without placing strain on joints, ' +
        'aiding in maintaining flexibility without risking damage to bones and joints. Embracing pool exercises not ' +
        'only helps alleviate anxiety and depression but also contributes to enhancing aerobic health.'
    },
    {
      title: '🏋️ Weightlifting',
      text: 'Participating in weightlifting not only enhances your physical appearance but also contributes to ' +
        'improving your mental well-being. Instances of depression, whether triggered by age-related weight gain or ' +
        'traumatic events, can find relief through the physical challenges weightlifting offers. ' +
        'Lifting weights serves as a constructive outlet for releasing pent-up emotions, such as anger or ' +
        'aggression, providing valuable support, especially after demanding and stressful days at home or work.'
    },
    {
      title: '🏃 Running',
      text: 'Running serves as a beneficial practice to clear your mind, reduce stress, and mitigate anxiety ' +
        'and depression. You don\'t have to cover extensive distances; even a moderate run allows you to break ' +
        'from routine and concentrate on self-care. The act of running for at least 30 minutes redirects your ' +
        'attention from daily worries, offering a valuable respite and contributing to improved mental well-being.'
    }
    ];
  constructor(private sanitizer: DomSanitizer) {}
  timeLeft: number = this.getRandomTime(); // Initial timer value between 5 and 15 minutes
  interval: any;
  isBreathing: boolean = false;
  isTimeUp: boolean = false;
  instructions: string[] = [
    'Sit or lie down 🧘🏼‍♀️ in a comfortable position',
    'Close your eyes 👁 and count to 7 to relax',
    'Inhale deeply through your nose 👃🏼 for a count of 4',
    'Hold your breath ⌛ for a count of 7',
    'Exhale 🗣️ slowly and completely through your mouth for a count of 8',
    'Repeat 🔁 this cycle for the duration of the exercise'
  ];
  currentInstructionIndex: number = 0;
  currentInstruction: string = this.instructions[0];

  ngOnInit() {
    this.startInstructionInterval();
    this.videos.forEach(video => {
      video.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.embedUrl) as SafeResourceUrl;
    });

  }

  startBreathingExercise() {
    this.isBreathing = true;
    this.isTimeUp = false;
    this.resetInstructionIndex();
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopBreathingExercise();
        this.isTimeUp = true;
      }
    }, 1000);
  }

  stopBreathingExercise() {
    this.isBreathing = false;
    clearInterval(this.interval);
    this.timeLeft = this.getRandomTime(); // Reset time to a random value between 5 and 15 minutes
    this.resetInstructionIndex(); // Reset the instruction index
  }

  getRandomTime(): number {
    return Math.floor(Math.random() * (15 - 5 + 1) + 5) * 60; // Convert minutes to seconds
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${this.padNumber(minutes)}:${this.padNumber(remainingSeconds)}`;
    return formattedTime;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  resetInstructionIndex() {
    this.currentInstructionIndex = 0;
    this.currentInstruction = this.instructions[0];
  }

  startInstructionInterval() {
    setInterval(() => {
      if (this.isBreathing) {
        this.showNextInstruction();
      }
    }, 10000); // Change instruction every 10 seconds
  }
  showNextInstruction() {
    this.currentInstructionIndex = (this.currentInstructionIndex + 1) % this.instructions.length;
    this.currentInstruction = this.instructions[this.currentInstructionIndex];
  }

  ngOnDestroy() {
    // Ensure the interval is cleared when the component is destroyed
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  toggleDescription(video: any): void {
    video.isExpanded = !video.isExpanded;
  }
}
