import { Component } from '@angular/core';
import { HttpClientModule,HttpErrorResponse,HttpResponse,HttpEventType  } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uploadFile';

  fileToUpload: File | null = null;
  fileUploadResponse: any;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onUpload() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('image', this.fileToUpload, this.fileToUpload.name);

      this.http.post<any>('http://localhost:8080/file/upload', formData)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.fileUploadResponse = response.body;
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.fileUploadResponse = { fileName: null, message: 'Error occurred during file upload' };
          }
        );
    }
  }

}
