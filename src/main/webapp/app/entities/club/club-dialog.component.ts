import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Club } from './club.model';
import { ClubPopupService } from './club-popup.service';
import { ClubService } from './club.service';

@Component({
    selector: 'jhi-club-dialog',
    templateUrl: './club-dialog.component.html'
})
export class ClubDialogComponent implements OnInit {

    club: Club;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private clubService: ClubService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.club.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clubService.update(this.club));
        } else {
            this.subscribeToSaveResponse(
                this.clubService.create(this.club));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Club>>) {
        result.subscribe((res: HttpResponse<Club>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Club) {
        this.eventManager.broadcast({ name: 'clubListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-club-popup',
    template: ''
})
export class ClubPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clubPopupService: ClubPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clubPopupService
                    .open(ClubDialogComponent as Component, params['id']);
            } else {
                this.clubPopupService
                    .open(ClubDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
