import {Injectable} from '@angular/core';
import { ApiService } from '../coreModule/services/api.service';
import { Observable, Observer } from 'rxjs';

Injectable()
export class AuthorsService {
    authors:Array<Object> = [];
    constructor(private api: ApiService){}

    getAuthors(force:boolean = false){
        if (this.authors.length && !force){
            return Observable.create((observer: Observer<Array<Object>>)=>{
                observer.next(this.authors);
                observer.complete();
            })
            .do(authors=>console.log(authors, this.authors));
        }
        return this.api.get(`/authors`)
                .map(response=>response.items)
                .do(authors=>this.authors = authors)
                .do(authors=>console.log(authors, this.authors));
    }
}