import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HomePageDate } from "../types/homePage.interface";
import { HomeSchedule} from "../types/schedule.interface";
import { Attendance, AttendanceResponse } from "../types/attendance.interface";
import { Grades } from "../types/grades.interface";


@Injectable({
    providedIn:'root'
})
export class ApiService{
    private http = inject(HttpClient);

    public getWeekday():Observable<string[]>{
        return this.http.get<HomePageDate>('json/home.json')
        .pipe(map((res)=>res.Home.days))
    }

    public getSchedule(day="Monday"){
        return this.http.get<HomeSchedule>('json/schedule.json')
        .pipe(map((res:HomeSchedule)=> res.schedule.find((lesson)=>lesson.day === day)))
    }

    public getAttendance():Observable<AttendanceResponse>{
        return this.http.get<AttendanceResponse>('json/attendance.json')
        .pipe(map((subject:AttendanceResponse)=> subject))
    }

    public getGrades():Observable<Grades>{
        return this.http.get<Grades>('json/grades.json')
        .pipe(map((grades:Grades)=> grades))
    }
}