import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AntrianPage } from './antrian.page';

describe('AntrianPage', () => {
  let component: AntrianPage;
  let fixture: ComponentFixture<AntrianPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AntrianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
