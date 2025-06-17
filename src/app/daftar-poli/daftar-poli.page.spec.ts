import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaftarPoliPage } from './daftar-poli.page';

describe('DaftarPoliPage', () => {
  let component: DaftarPoliPage;
  let fixture: ComponentFixture<DaftarPoliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarPoliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
