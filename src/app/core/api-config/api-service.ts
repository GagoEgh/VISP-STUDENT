import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HomePageDate } from "../types/homePage.interface";
import { HomeSchedule} from "../types/schedule.interface";



@Injectable({
    providedIn:'root'
})
export class ApiService{
    private http = inject(HttpClient);

    public getWeekday():Observable<string[]>{
        return this.http.get<HomePageDate>('json/home.json')
        .pipe(map((res)=>{
          return res.Home.days
        }))
    }

    public getSchedule(day="Monday"){
        return this.http.get<HomeSchedule>('json/schedule.json')
        .pipe(map((res:HomeSchedule)=>{
            return res.schedule.find((lesson)=>lesson.day === day)
          }))
    }

}