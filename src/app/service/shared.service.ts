import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    blogTitle = 'My Fancy Blog';
    baseUrl: BehaviorSubject<string> = new BehaviorSubject('http://localhost:4200/');

    constructor() {}

    concatTitle(title: string): BehaviorSubject<string> {
        return new BehaviorSubject(`${title} - ${this.blogTitle}`);
    }
}