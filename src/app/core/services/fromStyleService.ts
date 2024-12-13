import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class FromStyleService{
    private isOpen:WritableSignal<boolean> = signal(false);

    public updateIsOpen(open:boolean):void {
        this.isOpen.update(value=> value = open); 
    }

    public getIsOpen():WritableSignal<boolean> {
        return this.isOpen
    }
}