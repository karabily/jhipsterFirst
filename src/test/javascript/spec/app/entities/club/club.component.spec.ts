/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyFirstJHipsterTestModule } from '../../../test.module';
import { ClubComponent } from '../../../../../../main/webapp/app/entities/club/club.component';
import { ClubService } from '../../../../../../main/webapp/app/entities/club/club.service';
import { Club } from '../../../../../../main/webapp/app/entities/club/club.model';

describe('Component Tests', () => {

    describe('Club Management Component', () => {
        let comp: ClubComponent;
        let fixture: ComponentFixture<ClubComponent>;
        let service: ClubService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyFirstJHipsterTestModule],
                declarations: [ClubComponent],
                providers: [
                    ClubService
                ]
            })
            .overrideTemplate(ClubComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClubComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClubService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Club(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clubs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
