import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Club } from './club.model';
import { ClubService } from './club.service';

@Component({
    selector: 'jhi-club-detail',
    templateUrl: './club-detail.component.html'
})
export class ClubDetailComponent implements OnInit, OnDestroy {

    club: Club;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clubService: ClubService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClubs();
    }

    load(id) {
        this.clubService.find(id)
            .subscribe((clubResponse: HttpResponse<Club>) => {
                this.club = clubResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClubs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clubListModification',
            (response) => this.load(this.club.id)
        );
    }
}
