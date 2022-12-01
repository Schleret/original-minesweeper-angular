import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgMinesweeperComponent } from './og-minesweeper.component';

describe('OgMinesweeperComponent', () => {
  let component: OgMinesweeperComponent;
  let fixture: ComponentFixture<OgMinesweeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgMinesweeperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OgMinesweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
