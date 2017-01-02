import { Injectable } from '@angular/core';
import { ApiService } from '../coreModule/services/api.service';
import { Observable, Observer } from 'rxjs';

export interface Author {
    id: string,
    name: string,
}

@Injectable()
export class AuthorsService {
    authors: Array<Author> = [];
    authorsObservable: Observable<Array<Author>>;
    authorsObserver: Observer<Array<Author>>;
    constructor(private api: ApiService) {
        this.authorsObservable = Observable.create(observer => this.authorsObserver = observer);
    }

    getAuthorsObservable() {
        return this.authorsObservable;
    }

    getAuthors(force: boolean = false) {
        if (this.authors.length && !force) {
            return Observable.create((observer: Observer<Array<Author>>) => {
                observer.next(this.authors);
                this.authorsObserver.next(this.authors);
                observer.complete();
            })
                .do(authors => console.log(authors, this.authors));
        }
        return this.api.get(`/authors`)
            .map(response => response.items)
            .do(authors => this.authors = authors)
            .do(authors => this.authorsObserver.next(this.authors))
            .do(authors => console.log(authors, this.authors));
    }
}