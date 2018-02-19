import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Club } from './club.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Club>;

@Injectable()
export class ClubService {

    private resourceUrl =  SERVER_API_URL + 'api/clubs';

    constructor(private http: HttpClient) { }

    create(club: Club): Observable<EntityResponseType> {
        const copy = this.convert(club);
        return this.http.post<Club>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(club: Club): Observable<EntityResponseType> {
        const copy = this.convert(club);
        return this.http.put<Club>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Club>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Club[]>> {
        const options = createRequestOption(req);
        return this.http.get<Club[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Club[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Club = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Club[]>): HttpResponse<Club[]> {
        const jsonResponse: Club[] = res.body;
        const body: Club[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Club.
     */
    private convertItemFromServer(club: Club): Club {
        const copy: Club = Object.assign({}, club);
        return copy;
    }

    /**
     * Convert a Club to a JSON which can be sent to the server.
     */
    private convert(club: Club): Club {
        const copy: Club = Object.assign({}, club);
        return copy;
    }
}
