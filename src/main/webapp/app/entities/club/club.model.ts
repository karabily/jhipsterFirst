import { BaseEntity } from './../../shared';

export class Club implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public email?: string,
        public numberPhone1?: string,
        public numberPhone2?: string,
        public city?: string,
        public country?: string,
    ) {
    }
}
