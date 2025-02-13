import { inject } from "@angular/core";
import { CanActivateChildFn } from "@angular/router";
import { DatabaseService } from "../../services/datebase";

export const authGuard:CanActivateChildFn = async():Promise<boolean>=>{
    const db = inject(DatabaseService);
    const student = await db.getStudent();
    return !!student 
}