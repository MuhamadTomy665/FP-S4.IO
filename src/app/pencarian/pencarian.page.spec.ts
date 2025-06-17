import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PencarianPage } from './pencarian.page';

describe('PencarianPage', () => {
  let component: PencarianPage;
  let fixture: ComponentFixture<PencarianPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PencarianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
