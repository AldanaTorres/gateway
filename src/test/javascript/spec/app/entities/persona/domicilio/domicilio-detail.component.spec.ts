import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DomicilioDetailComponent } from 'app/entities/persona/domicilio/domicilio-detail.component';
import { Domicilio } from 'app/shared/model/persona/domicilio.model';

describe('Component Tests', () => {
  describe('Domicilio Management Detail Component', () => {
    let comp: DomicilioDetailComponent;
    let fixture: ComponentFixture<DomicilioDetailComponent>;
    const route = ({ data: of({ domicilio: new Domicilio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DomicilioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DomicilioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DomicilioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load domicilio on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.domicilio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
