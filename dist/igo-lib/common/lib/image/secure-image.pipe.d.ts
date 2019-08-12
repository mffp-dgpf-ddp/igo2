import { PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class SecureImagePipe implements PipeTransform {
    private http;
    constructor(http: HttpClient);
    transform(url: string): Observable<{}>;
}
