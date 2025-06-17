import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaftarDokterPage } from './daftar-dokter.page';

describe('DaftarDokterPage', () => {
  let component: DaftarDokterPage;
  let fixture: ComponentFixture<DaftarDokterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarDokterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
