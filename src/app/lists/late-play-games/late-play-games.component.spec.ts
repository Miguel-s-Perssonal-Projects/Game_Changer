import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatePlayGamesComponent } from './late-play-games.component';

describe('LatePlayGamesComponent', () => {
  let component: LatePlayGamesComponent;
  let fixture: ComponentFixture<LatePlayGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatePlayGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatePlayGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
