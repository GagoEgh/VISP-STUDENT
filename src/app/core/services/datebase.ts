import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StudentItnerface } from "../types/student.interface";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    private readonly router = inject(Router);
    private db: IDBDatabase | null = null;

    constructor() {
        this.ensureDbReady();
    }
  
    private async ensureDbReady(): Promise<IDBDatabase> {
        if (this.db) {
            return this.db;
        }

        return new Promise((resolve, reject) => {
            const openRequest = indexedDB.open('visp-db', 1);

            openRequest.onupgradeneeded = () => {
                const db = openRequest.result;
                if (!db.objectStoreNames.contains('visp-students')) {
                    db.createObjectStore('visp-students', { keyPath: 'password' });
                }

                if (!db.objectStoreNames.contains('pass')) {
                    db.createObjectStore('pass', {keyPath: 'id'});
                }
            };

            openRequest.onsuccess = () => {
                this.db = openRequest.result;
                resolve(this.db);
            };

            openRequest.onerror = () => {
                reject(openRequest.error);
            };
        });
    }

    private async createTransaction(): Promise<IDBObjectStore> {
        const db = await this.ensureDbReady();
        const transaction = db.transaction('visp-students', 'readwrite');
        return transaction.objectStore('visp-students');
    }

    private async createPasswordTransaction(): Promise<IDBObjectStore> {
        const db = await this.ensureDbReady();
        const transaction = db.transaction('pass', 'readwrite');
        return transaction.objectStore('pass');
    }

    private async putPassword(password:string){
        const store = await this.createPasswordTransaction()
        const data ={
            pass:password,
            id:0
        }
        const request = store.put(data);
        
        request.onsuccess = () => {
            console.log('success')
        };

        request.onerror = () => {
            console.log('Error')
        }
        
    }

    public async getPassword(): Promise<any> {
        const store = await this.createPasswordTransaction();
        return new Promise((resolve, reject) => {
        const request = store.get(0);
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
        });
    }

    public async getStudent(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const password = await this.getPassword();
                const store = await this.createTransaction();
                const request = store.get(password.pass);
    
                request.onsuccess = () => {
                    resolve(request.result);
                };
    
                request.onerror = () => {
                    reject(request.error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    public async addInDb(data: StudentItnerface): Promise<void> {
        try {
            const store = await this.createTransaction();
            const request = store.add(data);
            request.onsuccess = () => {
                this.putPassword(data['password']) 
            };

            request.onerror = () => {
                if (request.error!.name === "ConstraintError") {
                    this.putPassword(data['password'])
                    this.router.navigate(['home']);
                } else {
                    console.log("Error:", request.error);
                    this.router.navigate(['']);
                }
            };
        } catch (error) {
            console.error("Error adding to DB:", error);
        }
    }
}
