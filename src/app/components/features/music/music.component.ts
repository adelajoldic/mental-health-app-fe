import {Component, ElementRef, ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-knowledge',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {
  public intro: string = "From mood modulation to stress relief, uncover the healing notes that resonate" +
    " within us. Join our community in celebrating the therapeutic magic of music" +
    " and harmonizing our mental landscapes. Let the rhythm guide you towards a symphony of well-being!" +
    " 🎧💖 #MusicHealsMind #SoundMindJourney";
  public closing: string = "It's crucial to acknowledge that, although music can offer emotional support to " +
    "individuals coping with depression, it should not be seen as a replacement for professional mental health care. " +
    "These songs can be a supplementary resource alongside therapy and medication in addressing depression and anxiety." +
    " Moreover, individual preferences and emotional reactions to music differ, so it's advisable for individuals to " +
    "select songs that personally connect with their experiences with mental illness.";
  videos: any[] = [
    {
      title: 'BTS - Answer : Love Myself',
      description: 'The song “Answer: Love Myself” by BTS talks about learning to love yourself and the ' +
        'struggles that go along with it. The lyrics have deep meanings and even though at first glance,' +
        ' it may seem confusing, this song wasn’t created to just be out there, it was made to help people ' +
        'who are learning self love. ',
      embedUrl: 'https://www.youtube.com/embed/9mwRYgMmSGE?si=PUA7TiwwwZJJK3Hy'
    },
    {
      title: 'Matchbox Twenty - Unwell',
      description: 'This song may mimic the thoughts and feelings of many people with depression and mental' +
        ' disorders. Most with these conditions have experienced what it’s like to be “headed for a breakdown,” and ' +
        'sometimes songs that talk about what we’re going through or have gone through help us feel like we aren’t alone.',
      embedUrl: 'https://www.youtube.com/embed/WziA88-n02k?si=gA1a_sZV0yhQniAR'
    },
    {
      title: 'Rachel Platten - Better Place ',
      description: 'The song opens up with the lyrics, “I\'ll tell the world, I\'ll sing a song. It\'s a better' +
        ' place since you came along,” and goes on to shed love and support to the listeners. “Better Place” is a' +
        ' reminder of how important and loved you are, and lines like “it\'s a better place since you came along” offer ' +
        'comfort to its listeners, reminding them that they are loved, they are important, and they are not alone.',
      embedUrl: 'https://www.youtube.com/embed/pvI9PuGorwI?si=7p78Lfhzvab7EzHr'
    },
    {
      title: 'Twenty One Pilots - Screen',
      description: 'This song describes the person as having a screen on their chest that displays their thoughts and ' +
        'emotions, making it impossible for them to hide their feelings from others. With lyrics like, “there\'s some' +
        ' people and I who have a really tough time getting through this life,” and “we’re broken people,” the song ' +
        'also acts as an anthem of support for those who feel this way, too.',
      embedUrl: 'https://www.youtube.com/embed/NK7WWbXlkj4?si=iySK5OyZuu8a3VeG'
    },
    {
      title: 'Paramore - Last Hope',
      description: '“Last Hope” is a song about depression that hits the nail on the head for many people when it comes ' +
        'to describing what having depression is like. It describes the ebb and flow of depression symptoms that many' +
        ' can relate to, starting with the idea of needing to let go of control, hitting a good place, and then ' +
        'experiencing another low.',
      embedUrl: 'https://www.youtube.com/embed/yBatuRGZAmA?si=Omvw5zMeRYiV5Olh'
    },
    {
      title: 'Linkin Park - Heavy',
      description: 'Among their many other songs about depression and anxiety, “Heavy” is one of those Linkin Park' +
        ' songs that accurately describe the loss of control, sadness, overthinking, and confusion caused by depression.' +
        ' It’s another song that people with depression can relate to and find comfort in the fact that they aren’t alone ' +
        'in how they feel.',
      embedUrl: 'https://www.youtube.com/embed/5dmQ3QWpy1Q?si=15UNOw-GrtS16zCX'
    },
    {
      title: 'Lady Gaga - Million Reasons',
      description: '“Million Reasons” is a powerful song about the power of one good reason over the millions of ' +
        'reasons for feeling doubtful, discouraged, and hopeless. The song encourages listeners to find the light ' +
        'at the end of the tunnel, to find that one good reason to keep fighting when there are a million other ' +
        'reasons to quit.',
      embedUrl: 'https://www.youtube.com/embed/en2D_5TzXCA?si=c0LNt1CJOdSc4j1D'
    },
    {
      title: 'David Guetta - Titanium ft. Sia',
      description: 'With song lyrics like, “You shoot me down, but I won\'t fall. I am titanium,” Sia encourages ' +
        'her listeners to think of themselves as titanium, invincible against inner and outer forces that threaten to' +
        ' harm them. Whether it’s depression or any other mental illness, the idea of being “stone-hard as bulletproof' +
        ' glass” can be a much-needed boost of confidence in tough times.',
      embedUrl: 'https://www.youtube.com/embed/JRfuAukYTKg?si=6GMWk2b85NXQnRAf'
    },
    {
      title: 'BTS - Life Goes On',
      description: '"Life Goes On" is a heartfelt anthem that goes beyond the stage, offering a candid portrayal of' +
        ' people in their twenties navigating daily life. Conceived to uplift spirits and showcase a more carefree side, ' +
        'the song takes a personal turn as Jungkook expresses the longing and sadness resulting from canceled tours due ' +
        'to COVID-19. With a unique blend of gravity and power, the track delivers a gentle and authentic message of comfort.',
      embedUrl: 'https://www.youtube.com/embed/-5q5mZbe3V8?si=BSMA2GfWur3jcrXE'
    },
  ];

  // Reference to the video element
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  videoWatched: boolean = false;
  showSkipButton: boolean = false;
  showPlayButton: boolean = true;

  constructor(private sanitizer: DomSanitizer, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.videos.forEach(video => {
      video.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.embedUrl) as SafeResourceUrl;
    });
  }

  toggleDescription(video: any): void {
    video.isExpanded = !video.isExpanded;
  }

  // Variable to track whether the content is unlocked
  contentUnlocked: boolean = false;

  // Function to unlock content when user watches a video
  unlockContent() {
    // This function is called when the video ends
    this.videoWatched = true;

    // Hide the video
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.style.display = 'none';
  }
  // Function to track video playback progress
  trackVideoProgress() {
    const videoElement = this.videoPlayer.nativeElement;
      videoElement.addEventListener('timeupdate', () => {
        if (videoElement.currentTime >= 10) {
          this.showSkipButton = true;
        }
    });
  }

  playVideo() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.play();
  }

  skipVideo() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.currentTime = videoElement.duration;
    this.unlockContent();
  }

  hidePlayButton() {
    this.showPlayButton = false;
  }
}
