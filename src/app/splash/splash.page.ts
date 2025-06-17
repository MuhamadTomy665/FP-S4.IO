import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: false,
})
export class SplashPage implements OnInit {
  fadeOut = false;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.fadeOut = true;
    }, 4000);

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }

  ionViewDidLeave() {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.blur === 'function') {
      activeEl.blur();
    }
  }
}
