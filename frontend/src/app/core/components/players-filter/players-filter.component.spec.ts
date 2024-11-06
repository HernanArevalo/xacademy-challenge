import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFilterComponent } from './players-filter.component';

describe('PlayersFilterComponent', () => {
  let component: PlayersFilterComponent;
  let fixture: ComponentFixture<PlayersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
