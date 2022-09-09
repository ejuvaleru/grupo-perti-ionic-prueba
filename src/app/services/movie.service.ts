import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShowAPIQueryResponse, ShowAPIResponse } from '../interfaces/movieApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<ShowAPIResponse[]> {
    return this.http.get<ShowAPIResponse[]>(environment.movieApi + 'shows');
  }

  getMoviesByQuery(query: string): Observable<ShowAPIQueryResponse[]> {
    return this.http.get<ShowAPIQueryResponse[]>(environment.movieApi + 'search/shows?q=' + query);
  }
}
