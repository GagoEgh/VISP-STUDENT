import { inject, Injectable, WritableSignal } from "@angular/core";
import { DatabaseService } from "./datebase";
import { StudentItnerface } from "../types/student.interface";

@Injectable({
    providedIn:'root'
})
export class StudentDataService{
    private db = inject(DatabaseService);
    constructor(){}

    public getStudent(student:WritableSignal<StudentItnerface|null>):void{
        this.db.getStudent()
        .then((result)=>{
          student.set(result);
        })
        .catch((erore)=>{
          console.log('Error',erore);
        })
    }

    public updateStudentDate(student:WritableSignal<StudentItnerface|null>,studentData:any,key:string){
        student.update((currentState:StudentItnerface|null)=>{
          if (!currentState) {
            return null; 
          }
          return{
            ...currentState,
            [key]:studentData
          }
        })
    
        this.db.updateStudentInfo(student()!);
        this.getStudent(student)
      }
}