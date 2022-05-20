import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    blogTitle = 'My Fancy Blog';

    constructor() {}

    concatTitle(title: string): string {
        return `${title} - ${this.blogTitle}`;
    }
}