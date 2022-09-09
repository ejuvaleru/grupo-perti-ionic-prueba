import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAPIResponse } from '../interfaces/userApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getRandomUserInfo(): Observable<UserAPIResponse> {
      return this.http.get<UserAPIResponse>(environment.userApi);
  }
}
