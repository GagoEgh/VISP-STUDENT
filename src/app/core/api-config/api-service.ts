import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HomePageDate } from "../types/homePage.interface";
import { HomeSchedule} from "../types/schedule.interface";
import { toSignal } from "@angular/core/rxjs-interop";



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
            console.log('res',res.schedule.find((lesson)=>lesson.day === day))
            return res.schedule.find((lesson)=>lesson.day === day)
          }))

        // return   toSignal(
        //     this.http.get<HomeSchedule>('json/schedule.json').pipe(
        //       map((res: HomeSchedule) => {
        //         const lesson = res.schedule.find((lesson) => lesson.day === day);
        //         console.log('Lesson:', lesson);
        //         return lesson;
        //       })
        //     ),
        //     { initialValue: null }
        // );
    }

    public schedule = toSignal(
        this.http.get<HomeSchedule>('json/schedule.json').pipe(
          map((res: HomeSchedule) => {
            const lesson = res.schedule.find((lesson) => lesson.day === "Monday");
            console.log('Lesson:', lesson);
            return lesson;
          })
        ),
        { initialValue: null }
    );
    
}