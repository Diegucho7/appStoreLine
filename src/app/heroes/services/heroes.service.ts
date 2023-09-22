import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';
import { query } from '@angular/animations';

@Injectable({providedIn: 'root'})
export class HeroesService {
    
    private baseUrl: string = environments.baseUrl;

    constructor(private httpClient: HttpClient) { }
    
    getHeroes(): Observable<Hero[]>{
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById(id: string): Observable<Hero|undefined>{

        return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError(error => of(undefined))
            );

    }
    getSuggestions(query:string): Observable<Hero[]>{
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
    }


    addHero(hero: Hero) : Observable<Hero>{
        return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`,hero);
    }

    updateHero(hero: Hero) : Observable<Hero>{
        if(!hero.id) throw Error ('Hero id is required');
        return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
    }

    deleteHeroById(id: string) : Observable<boolean>{
      
        return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError(err => of(false)),
            map(resp => true)
        );
    }

}