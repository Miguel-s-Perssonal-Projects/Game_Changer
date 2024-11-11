import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGamesComponent } from './finished-games.component';

describe('FinishedGamesComponent', () => {
  let component: FinishedGamesComponent;
  let fixture: ComponentFixture<FinishedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
