import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  getData(): any[] {
    return this.dataSubject.getValue();
  }

  addData(item: any): void {
    const currentData = this.dataSubject.getValue();
    currentData.push(item);
    this.dataSubject.next(currentData);
  }

  clearData(): void {
    this.dataSubject.next([]);
  }
}