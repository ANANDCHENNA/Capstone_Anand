import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  IsLoggin: any = false;
  roleName: string | null;

  // Mobile Navigation
  isMobileNavOpen: boolean = false;
  isDropdownOpen: boolean = false;

  // Hero Slider
  currentSlideIndex: number = 0;
  slidesArray: any[] = new Array(3); // To easily generate dots in *ngFor
  slideInterval: any;
  slideDuration: number = 8000; // 8 seconds per slide

  // Typing Effect
  // Use a template variable (#typingText) in HTML and query it
  @ViewChildren('typingText') typingTextElements!: QueryList<ElementRef>;
  phrases: string[][] = [
    ["Your Peace of Mind, Our Priority.", "Swift, Simple, Secure Claims.", "Protecting What Matters Most."],
    ["Fast Approvals, No Hassle.", "Seamless Online Claim Experience.", "Get What You Deserve, Quickly."],
    ["Dedicated Support, Every Step.", "Your Trusted Insurance Partner.", "Guidance When You Need It Most."]
  ];
  typedText: string[] = ['', '', '']; // Holds the currently displayed text for each slide
  private currentPhraseIndex: number = 0;
  private currentCharIndex: number = 0;
  private isTypingDirection: boolean = true; // true for typing, false for erasing
  private typingTimeout: any;

  readonly typeSpeed: number = 70; // Typing speed in ms
  readonly eraseSpeed: number = 40; // Erasing speed in ms
  readonly newPhraseDelay: number = 1500; // Delay before typing new phrase
  readonly endPhraseDelay: number = 2000; // Delay after typing a phrase

  // Statistics Counter
  @ViewChildren('counter') counterElements!: QueryList<ElementRef>;
  animatedCounters = {
    clients: 0,
    approvals: 0,
    support: 0,
    years: 0
  };
  private observer!: IntersectionObserver;

  // FAQ Accordion
  faqs = [
    { question: 'How do I file a claim?', answer: 'You can easily file a claim through our online portal by logging into your account. Alternatively, you can contact our claims department directly via phone or email, and our representatives will guide you through the process.', open: false },
    { question: 'What documents are required for a claim?', answer: 'Required documents vary by claim type. Generally, you\'ll need your policy number, incident details, and supporting evidence such as photos, police reports, or medical records. Our online portal will specify exactly what\'s needed for your particular claim.', open: false },
    { question: 'How long does it take to process a claim?', answer: 'We pride ourselves on efficient claim processing. Most straightforward claims are processed within 5-7 business days once all required documentation is received. More complex cases may take longer, but we keep you informed every step of the way.', open: false },
    { question: 'Can I track the status of my claim online?', answer: 'Yes! Once you\'ve filed a claim, you can log into your ClaimSafe account and use our claim tracker to monitor its real-time status, view updates, and communicate with your claims adjuster.', open: false }
  ];


  constructor(private authService: AuthService, private router: Router) {
    this.IsLoggin = authService.getLoginStatus;
    this.roleName = authService.getRole;

    if (this.IsLoggin === false) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit(): void {
    this.showSlide(0);
  }

  ngAfterViewInit(): void {
    // Set up Intersection Observer for counters
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of item is visible
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const targetValue = +(counter.getAttribute('data-target') || 0);
          const counterName = this.getCounterName(counter); // Determine which counter to animate
          this.animateCounter(counterName, targetValue);
          observer.unobserve(counter); // Stop observing once animated
        }
      });
    }, options);

    // Ensure counterElements are available before observing
    // Use a short timeout to ensure ViewChildren are rendered,
    // or if they are already there, observe them directly.
    // QueryList.changes is also an option for dynamic content.
    if (this.counterElements.length > 0) {
        this.counterElements.forEach(counter => {
            this.observer.observe(counter.nativeElement);
        });
    } else {
        // If elements are dynamically added later, subscribe to changes
        this.counterElements.changes.subscribe(() => {
            this.counterElements.forEach(counter => {
                this.observer.observe(counter.nativeElement);
            });
        });
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // --- Your Existing Methods ---
  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onSignUp(): void {
    this.router.navigate(['/registration']);
  }

  learnMore(insuranceId: number): void {
    this.router.navigate(['/insurance-details', insuranceId]);
  }

  claimNow(): void {
    this.router.navigate(['/claim-registration']);
  }

  getFloatingElements(): string[] {
    return ['shield', 'heart', 'home'];
  }

  getBannerContent(): { title: string; subtitle: string } {
    return {
      title: 'Ready to Experience Worry-Free Coverage?',
      subtitle: 'Join thousands of satisfied clients who trust us with their most important assets. Get a personalized quote today!'
    };
  }

  getLogoDetails(): { src: string; alt: string; title: string } {
    return {
      src: '../../assets/logo.png', // Assuming you have this image in your assets
      alt: 'ClaimSafe',
      title: 'ClaimSafe'
    };
  }

  // --- Mobile Navigation ---
  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  closeMobileNav(): void {
    this.isMobileNavOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // --- Hero Slider ---
  showSlide(index: number): void {
    clearInterval(this.slideInterval);
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.currentSlideIndex = index;
    this.resetTypingEffect(index); // Reset and start typing for the new slide
    this.startSlideTimer(); // Reset the auto-slide timer whenever slide changes
  }

  nextSlide(): void {
    this.showSlide((this.currentSlideIndex + 1) % this.slidesArray.length);
  }

  prevSlide(): void {
    this.showSlide((this.currentSlideIndex - 1 + this.slidesArray.length) % this.slidesArray.length);
  }

  startSlideTimer(): void {
    clearInterval(this.slideInterval);
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideDuration);
  }

  // --- Typing Effect Logic ---
  private resetTypingEffect(slideIndex: number): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.typedText[slideIndex] = ''; // Clear current text for the active slide
    this.currentPhraseIndex = 0;
    this.currentCharIndex = 0;
    this.isTypingDirection = true; // Start fresh, initially typing

    // Clear and restart animation for the specific typing element to reset cursor blink
    // Ensure the typingTextElements QueryList has populated before trying to access
    if (this.typingTextElements && this.typingTextElements.toArray().length > slideIndex) {
      const activeTypingElement = this.typingTextElements.toArray()[slideIndex]?.nativeElement;
      if (activeTypingElement) {
          activeTypingElement.style.animation = 'none'; // Temporarily disable cursor blink
          activeTypingElement.offsetHeight; // Trigger reflow
          activeTypingElement.style.animation = ''; // Re-enable cursor blink
      }
    }
    this.type(); // Start typing for the new slide
  }

  private type(): void {
    const currentSlidePhrases = this.phrases[this.currentSlideIndex];
    if (!currentSlidePhrases || currentSlidePhrases.length === 0) return;

    const currentPhrase = currentSlidePhrases[this.currentPhraseIndex];

    if (this.isTypingDirection) { // Typing
      if (this.currentCharIndex < currentPhrase.length) {
        // Create a new array reference to trigger change detection
        this.typedText = this.typedText.map((val, idx) =>
          idx === this.currentSlideIndex ? val + currentPhrase.charAt(this.currentCharIndex) : val
        );
        this.currentCharIndex++;
        this.typingTimeout = setTimeout(() => this.type(), this.typeSpeed);
      } else { // Finished typing a phrase
        this.isTypingDirection = false; // Switch to erasing mode
        this.typingTimeout = setTimeout(() => this.type(), this.endPhraseDelay); // Delay before erasing
      }
    } else { // Erasing
      if (this.currentCharIndex > 0) {
        // Create a new array reference to trigger change detection
        this.typedText = this.typedText.map((val, idx) =>
          idx === this.currentSlideIndex ? currentPhrase.substring(0, this.currentCharIndex - 1) : val
        );
        this.currentCharIndex--;
        this.typingTimeout = setTimeout(() => this.type(), this.eraseSpeed);
      } else { // Finished erasing
        this.isTypingDirection = true; // Switch to typing mode for next phrase
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % currentSlidePhrases.length; // Move to next phrase
        this.typingTimeout = setTimeout(() => this.type(), this.newPhraseDelay); // Delay before typing new phrase
      }
    }
  }

  // --- Statistics Counter ---
  private getCounterName(element: HTMLElement): keyof typeof this.animatedCounters {
    const parent = element.closest('.stat-item');
    if (parent?.querySelector('p')?.textContent?.includes('Clients')) return 'clients';
    if (parent?.querySelector('p')?.textContent?.includes('Approved')) return 'approvals';
    if (parent?.querySelector('p')?.textContent?.includes('Support')) return 'support';
    if (parent?.querySelector('p')?.textContent?.includes('Years')) return 'years';
    return 'clients'; // Default fallback
  }

  private animateCounter(counterName: keyof typeof this.animatedCounters, target: number): void {
    const duration = 2000; // Total duration for animation (2 seconds)
    const frames = 60; // Number of frames
    const frameDuration = duration / frames; // Duration per frame

    let start = 0;
    const increment = target / frames;

    const interval = setInterval(() => {
      start += increment;
      if (start < target) {
        this.animatedCounters[counterName] = Math.floor(start);
      } else {
        this.animatedCounters[counterName] = target; // Ensure it reaches the exact target
        clearInterval(interval);
      }
    }, frameDuration);
  }

  // --- FAQ Accordion ---
  toggleAccordion(index: number): void {
    this.faqs.forEach((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false; // Close other accordions
      }
    });
  }
}