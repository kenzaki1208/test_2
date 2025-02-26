import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../test/data.service';
import { Router } from '@angular/router';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import { WjFlexGrid } from '@mescius/wijmo.angular2.grid';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.scss']
})
export class GridComponentComponent implements OnInit {
  data!: wjCore.CollectionView;
  @ViewChild('flexGrid') flexGrid!: WjFlexGrid;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.data = new wjCore.CollectionView(this.dataService.getData());
    this.dataService.data$.subscribe(data => {
      this.data = new wjCore.CollectionView(data);
    });
  }
  resetData() {
    this.dataService.clearData();
  }
  goBack() {
    this.router.navigate(['/test']);
  }

  deleterow() {
    if (!this.flexGrid) {
      console.error('FlexGrid is not initialized');
      return;
    }
    const selectedRow = this.flexGrid.selectedItems[0];
    console.log('Selected Row:', selectedRow); 
    if (selectedRow) {
      this.data.remove(selectedRow);
      this.flexGrid.collectionView.refresh();
      this.dataService.updateData([...this.data.sourceCollection]);
    } else {
      alert('Vui lòng chọn một dòng để xóa!');
    }
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