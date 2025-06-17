import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName: string = 'Pasien';

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userName = userData?.name || 'Pasien';
  }
}
