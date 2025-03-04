import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { DatabaseService } from "./datebase";
import { StudentItnerface } from "../types/student.interface";

@Injectable({
    providedIn:'root'
})
export class StudentDataService{
    private db = inject(DatabaseService);
    student:WritableSignal<StudentItnerface|null> = signal(null);

    public async LogStudent(data:StudentItnerface):Promise<StudentItnerface>{
      const students = await this.db.getAllStudent();
      return students.find((student:StudentItnerface)=> student.email===data.email && student.password === data.password)
    }

    public getStudent():void{
        this.db.getStudent()
        .then((result)=>{
          this.student.set(result);
        })
        .catch((erore)=>{
          console.log('Error',erore);
          this.db.isError.set(true)
        })
    }

    public updateStudentDate(studentData:any,key:string){
      this.student.update((currentState:StudentItnerface|null)=>{
        if (!currentState) {
          return null; 
        }
        return{
          ...currentState,
          [key]:studentData
        }
      })
      this.db.updateStudentInfo(this.student()!);
      this.getStudent()
    }

   public async updatePersonalInfo(){
     await this.db.updateStudentInfo(this.student()!);
      this.getStudent();
    }
}