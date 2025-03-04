import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { StudentItnerface } from "../types/student.interface";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    private readonly router = inject(Router);
    
    private db: IDBDatabase | null = null;
    public isSuccess = signal(false);
    public isError = signal(false);

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
            this.isSuccess.set(true);
        };

        request.onerror = () => {
            console.log('Error');
            this.isError.set(true);
        }
        
    }

    public async studentLogOut(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const password = await this.getPassword();
                const store = await this.createPasswordTransaction();
                const request =  store.delete(password.id);
    
                request.onsuccess = () => {
                    resolve(request.result);
                    this.router.navigate(['login']);
                };
    
                request.onerror = () => {
                    reject(request.error);
                };
            } catch (error) {
                reject(error);
            }
        });
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

    public async updateStudentInfo(student:StudentItnerface){
        const store = await this.createTransaction();
        const request = store.put(student);
        request.onsuccess = () => {
            this.isSuccess.set(true);
            setTimeout(()=>{
                this.isSuccess.set(false);
            },3000)
        };

        request.onerror = () => {
            console.log('Error');
            this.isError.set(true)
        }
    }

    public async getStudent(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const password = await this.getPassword();
            if(password){
                const store = await this.createTransaction();
                const request = store.get(password.pass);
        
                request.onsuccess = () => {
                    resolve(request.result);
                };
        
                request.onerror = () => {
                    reject(request.error);
                };
            }else{
                this.router.navigate(['login'])
            }
        });
    }

    public async getAllStudent(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const store = await this.createTransaction();
                const request = store.getAll()
    
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
                this.router.navigate(['home']);
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
