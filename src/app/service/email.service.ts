import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  // Points to the serverless API proxy
  private apiUrl = '/api/send-email';

  constructor(private http: HttpClient) {}

  sendContactEmail(formData: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
