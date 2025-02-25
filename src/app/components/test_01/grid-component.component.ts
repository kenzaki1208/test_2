import { Component, OnInit } from '@angular/core';
import { DataService } from '../test/data.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.scss']
})
export class GridComponentComponent implements OnInit {
  data: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data = this.dataService.getData();
    this.dataService.data$.subscribe(data => {
      this.data = data;
    });
  }
  resetData() {
    this.dataService.clearData();
  }
}