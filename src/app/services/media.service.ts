import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Media } from '../models/media';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediasUrl = 'http://www.basilachill.com/tstjson/getAllMedia.php';  // URL to web api
  private radioCatgorie = 'http://www.basilachill.com/tstjson/getMediaByCat.php';  // URL to web api
  private radioByNameId = "http://www.basilachill.com/tstjson/getMediaById.php";
  private topRadios = "http://www.basilachill.com/tstjson/getTopRadios.php";
  private topTvs = "http://www.basilachill.com/tstjson/getTopTvs.php";
  private tvs = "http://www.basilachill.com/tstjson/getTvs.php";
  private link: String = "http://localhost/complianceServer";

  constructor(private http: HttpClient) { }


  getMedia(id: string): Observable<Media> {
    if (!id.trim()) {
      // if not search term, return empty media array.
      return of();
    }

    return this.http.get<Media>(`${this.radioByNameId}/?id=${id}`).pipe(
      tap(_ => this.log(`found media matching "${id}"`)),
      catchError(this.handleError<Media>('media')) 
    );
  } 

  getTopRadios(type: string, amount: string): Observable<Media[]> {
    
    return this.http.get<Media[]>(`${this.topRadios}/?type=${type}&amount=${amount}`).pipe(
      tap(_ => this.log(`found media matching "${type}"`)),
      catchError(this.handleError<Media[]>('media'))
    );
  }   
      
  // getTvs() { 
  //   return this.http.get(`${this.tvs}`);
  // }

  getTvs(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.tvs}`).pipe(
      tap(_ => this.log(`found media matching`)),
      catchError(this.handleError<Media[]>('media'))
    );
  } 

  getTopTvs(amount: string): Observable<Media[]> {
    if (!amount.trim()) {
      // if not search term, return empty media array.
      return of();
    }

    return this.http.get<Media[]>(`${this.topTvs}/?amount=${amount}`).pipe(
      tap(_ => this.log(`tvs found: "${amount}" fetched`)),
      catchError(this.handleError<Media[]>('media'))
    );
  }


  getMediaByCategorie(cat: string): Observable<Media[]> {
    if (!cat.trim()) {
      // if not search term, return empty media array.
      return of([]);
    }

    return this.http.get<Media[]>(`${this.radioCatgorie}/?categorie=${cat}`).pipe(
      tap(_ => this.log(`found media categorie matching "${cat}"`)),
      catchError(this.handleError<Media[]>('mediaCategorie', []))
    );
  }


  searchMedias(data: string): any {
    return this.http.post(`${this.link}/search_user.php`, { data });

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`MediaService: ${message}`);
  }

}
