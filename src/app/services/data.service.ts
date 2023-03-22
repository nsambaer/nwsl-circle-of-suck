import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CircleService } from './circle.service';
import { default as games } from '../data/games.json';
import { default as teams } from '../data/teams.json';


@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor(private http: HttpClient, private circleService: CircleService ) {}

    

    getData() {
        return this.http.get('');
    }

    getStaticData() {
        return this.circleService.getCircle(teams, games);
    }

}