import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

interface ParsedTaskResponse {
  title: string;
  duedate?: string;
  priority?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LlmService {
  private _baseUrl = `${environment.apiUrl}/api/llm`;
  constructor(private http: HttpClient) {}

  parseTask(text: string): Observable<ParsedTaskResponse> {
    const url = `${this._baseUrl}/create-task`;
    return this.http.post<ParsedTaskResponse>(url, { text });
  }
}
