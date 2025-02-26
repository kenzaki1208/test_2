import { Component, OnInit } from '@angular/core';
import { DataService } from '../test/data.service';
import { Router } from '@angular/router';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.scss']
})
export class GridComponentComponent implements OnInit {
  data: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.data = this.dataService.getData();
    this.dataService.data$.subscribe(data => {
      this.data = data;
    });
  }
  resetData() {
    this.dataService.clearData();
  }
  goBack() {
    this.router.navigate(['/test']);
  }

  formatItem(flexGird: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
    if (e.panel == flexGird.cells) {
        const columnBinding = flexGird.columns[e.col].binding;

        if (columnBinding === 'datacode') {
            wjCore.toggleClass(e.cell, 'code', true); 
        }
        else if (columnBinding === 'uName') {
            wjCore.toggleClass(e.cell, 'name', true); 
        }
    }
}
}