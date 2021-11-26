import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCovidDataComponent } from './show-covid-data.component';

describe('ShowCovidDataComponent', () => {
  let component: ShowCovidDataComponent;
  let fixture: ComponentFixture<ShowCovidDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCovidDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCovidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
