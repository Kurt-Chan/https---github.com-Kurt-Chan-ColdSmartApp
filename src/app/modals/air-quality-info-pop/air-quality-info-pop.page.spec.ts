import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AirQualityInfoPopPage } from './air-quality-info-pop.page';

describe('AirQualityInfoPopPage', () => {
  let component: AirQualityInfoPopPage;
  let fixture: ComponentFixture<AirQualityInfoPopPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AirQualityInfoPopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AirQualityInfoPopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
