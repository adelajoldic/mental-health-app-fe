import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-listening',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit{
  // public intro: string = "Explore powerful video narratives of individuals navigating mental health challenges." +
  //   " Gain insights and practical strategies for coping as they share personal experiences, offering support" +
  //   " and guidance on the journey to improved mental well-being. Discover resilience, find relatable stories," +
  //   " and access resources to help navigate your own path towards mental health. 📺 #VideoTherapy";
  public intro: string = " Explore a compassionate space " +
    "dedicated to empowering minds and fostering well-being. Discover practical tips, evidence-based strategies, " +
    "and uplifting stories to nurture your mental resilience. Let's break down stigmas, build a supportive community," +
    " and embark on a journey towards mental wellness together. 💚📚 #MindMatters #EducateEmpowerThrive";
public closing: string = "Your experiences matter, your struggles are acknowledged, and your journey is significant." +
  " As you navigate through these videos, hold onto the realization that you're not alone. " +
  "Embrace the power of connection, find solace in the shared narratives, and remember, your well-being is crucial. " +
  "Keep moving forward, and may your path be illuminated by the stories that resonate with your own. ";
    videos: any[] = [
    {
      title: 'Why you should take a break: Prioritizing mental health in schools',
      speaker: 'Hailey Hardcastle | TED Talk',
      description: 'One of the best ways to end the stigma surrounding mental health is' +
        ' by spreading the idea that it is always ok to take a break for your mental wellbeing,' +
        ' especially for teens and students.',
      embedUrl: 'https://www.youtube.com/embed/vD0w_gOEbUI?si=XKsOuI-BSAFGxO0J'
    },
    {
      title: 'What Nobody Tells You About Your Twenties',
      speaker: 'Livi Redden | TED Talk',
      description: '\n' +
        'In her talk, Livi explains that a few mindset shifts and some intentional emotional development ' +
        'can eradicate so much of that unease and help young adults build the joyful, fulfilling future they ' +
        'deserve.',
      embedUrl: 'https://www.youtube.com/embed/O9pD6LTF4Bk?si=eWlNs1cHXP3FpWHZ'
    },
    {
      title: 'How to talk to the worst parts of yourself',
      speaker: 'Karen Faith | TED Talk',
      description: 'People researcher and empathy trainer Karen Faith found it easier to welcome strangers than the ' +
        'strange parts of herself, until a breakthrough moment changed that for good. In this honest and funny talk, ' +
        'she shares the story for everyone who struggles with self-acceptance. ',
      embedUrl: 'https://www.youtube.com/embed/gUV5DJb6KGs?si=a_ez1QGgridp4LMC'
    },
    {
      title: 'How to cope with anxiety ',
      speaker: 'Olivia Remes | TED Talk',
      description: 'Anxiety can lead up to conditions such as depression, increased risk for suicide, ' +
        'disability and requirement of high health services, very few people who often need treatment actually ' +
        'receive it. In her talk “How to cope with anxiety”, Olivia Remes will ' +
        'share her vision on anxiety and will ' +
        'unravel ways to treat and manage this health disorder.',
      embedUrl: 'https://www.youtube.com/embed/WWloIAQpMcQ?si=IliFIkIJMf4KYLxv'
    },
    {
      title: 'Stress: Its Impact on Teens ',
      speaker: 'Arturo Williams | TED Talk',
      description: 'Arturo Williams is using personal experiences as well as those of his peers to inform a' +
        ' larger audience in "Stress: how it impacts teens." ',
      embedUrl: 'https://www.youtube.com/embed/RtRdnog8eMc?si=_7jTv8ba5pG7Ix1H'
    },
    {
      title: 'Overcoming Anxiety ',
      speaker: 'Jonas Kolker | TED Talk',
      description: 'Jonas Kolker is a 15-year-old in the ninth grade. From grades three through eight, he dealt with ' +
        'severe anxiety attacks that were triggered by his school environment. Jonas had to learn techniques and ' +
        'strategies that would help him manage and control his ideas as he progressed through his school career.',
      embedUrl: 'https://www.youtube.com/embed/A1anXJhVamc?si=lerwgnbAAOQReRxv'
    },
    {
      title: 'This could be why you\'re depressed or anxious',
      speaker: 'Johann Hari | TED Talk',
      description: 'In a moving talk, journalist Johann Hari shares fresh insights on the causes of depression and' +
        ' anxiety from experts around the world -- as well as some exciting emerging solutions. "If you\'re depressed' +
        ' or anxious, you\'re not weak and you\'re not crazy -- you\'re a human being with unmet needs," Hari says.',
      embedUrl: 'https://www.youtube.com/embed/MB5IX-np5fE?si=Z1Pa3ua9T3cGcEjR'
    },
    {
      title: 'Learning to Live with Clinical Depression',
      speaker: 'Angelica Galluzzo | TED Talk',
      description: 'Angelica shares how living with depression has impacted her life. Angelica Galluzzo is a mental ' +
        'health advocate, largely motivated by her own struggles with mental illness. After battling depression and ' +
        'suicidal ideation for many years, she became passionate about making an impact, using her voice to create ' +
        'positive change, and normalizing the struggles that many of us go through. ',
      embedUrl: 'https://www.youtube.com/embed/Izy1TgMe-tI?si=yaGMkrBu4_xIfLlx'
    },
    {
      title: 'The Secret of Becoming Mentally Strong',
      speaker: 'Amy Morin | TED Talk',
      description: 'We spend a lot of time talking about physical strength and physical health, but much less time ' +
        'on mental strength and mental health. \n' +
        'We can choose to perform exercises that will help us learn to regulate our thoughts, manage our emotions,' +
        ' and behave productively despite our circumstances - the 3 basic factors of mental strength. No matter what' +
        ' your goals are, building mental strength is the key to reaching your greatest potential.',
      embedUrl: 'https://www.youtube.com/embed/TFbv757kup4?si=2x2pMRMORkR0gkES'
    },
    // Add more videos as needed
  ];
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.videos.forEach(video => {
      video.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.embedUrl) as SafeResourceUrl;
    });
  }

  toggleDescription(video: any): void {
    video.isExpanded = !video.isExpanded;
  }

}
