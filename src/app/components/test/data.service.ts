import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.loadDataFromLocalStorage());
  data$: Observable<any[]> = this.dataSource.asObservable();
  dataService: any;

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'gridData') {
        this.dataSource.next(this.loadDataFromLocalStorage());
      }
    });
  }

  private loadDataFromLocalStorage(): any[] {
    const storedData = localStorage.getItem('gridData');
    return storedData ? JSON.parse(storedData) : [];
  }

  private saveDataToLocalStorage(data: any[]) {
    localStorage.setItem('gridData', JSON.stringify(data));
  }

  addData(newData: any) {
    const currentData = this.dataSource.getValue();
    const updatedData = [...currentData, newData];
    this.dataSource.next(updatedData);
    this.saveDataToLocalStorage(updatedData); 
  }

  getData(): any[] {
    return this.dataSource.getValue();
  }

  clearData() {
    this.dataSource.next([]); 
    this.saveDataToLocalStorage([]); 
  }

  onTabChange(event: any) {
    if (event.index === 0) { 
      this.dataService.getData(); 
    }
  }

  updateData(newData: any[]) {
    this.dataSource.next(newData);
    this.saveDataToLocalStorage(newData);
  }
}