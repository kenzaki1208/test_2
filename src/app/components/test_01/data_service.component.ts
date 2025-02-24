import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = []; // Mảng lưu trữ dữ liệu

  getData(): any[] {
    return this.data;
  }

  addData(item: any): void {
    this.data.push(item);
  }

  clearData(): void {
    this.data = [];
  }
}