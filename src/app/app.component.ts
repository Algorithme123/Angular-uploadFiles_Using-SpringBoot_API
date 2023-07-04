import { Component } from '@angular/core';
import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uploadFile';

  fileToUpload: File | null = null;
  fileUploadResponse: any;
  imageNames: string[] = [];

  constructor(
    private http: HttpClient,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.uploadService.getAllImages().subscribe(
      (imageNames: string[]) => {
        this.imageNames = imageNames;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onUpload() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('image', this.fileToUpload, this.fileToUpload.name);

      this.http.post<any>('http://localhost:8080/file/upload', formData, { observe: 'response' })
        .subscribe(
          (response: HttpResponse<any>) => {
            this.fileUploadResponse = {
              fileName: response.body.fileName,
              message: response.body.message
            };
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.fileUploadResponse = { fileName: null, message: 'Error occurred during file upload' };
          }
        );
    }
  }

  formulaire: boolean = true;

  changerb() {
    this.formulaire = false;
  }

  getImageUrl(fileName: string): string {
    return `http://localhost:8080/images/${fileName}`;
  }
}
