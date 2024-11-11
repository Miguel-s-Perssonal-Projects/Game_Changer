import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowPlayGamesComponent } from './now-play-games.component';

describe('NowPlayGamesComponent', () => {
  let component: NowPlayGamesComponent;
  let fixture: ComponentFixture<NowPlayGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NowPlayGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowPlayGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
