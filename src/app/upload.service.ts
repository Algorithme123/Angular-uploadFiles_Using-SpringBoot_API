import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {



  private baseUrl = 'http://localhost:8080/file/images';

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}`);
  }
}
