import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../test/data.service';
import { Router } from '@angular/router';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import { WjFlexGrid } from '@grapecity/wijmo.angular2.grid';
import { EditHighlighter } from './edit-highlighter';

@Component({
  selector: 'app-test_origin',
  templateUrl: './test_origin.component.html',
  styleUrls: ['./test_origin.component.scss']
})
export class TestOriginComponent implements OnInit {
    data!: wjCore.CollectionView;
    @ViewChild('flexGrid') flexGrid!: WjFlexGrid;

    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit(): void {
        this.data = new wjCore.CollectionView(this.dataService.getData(), {
            trackChanges: true 
        });

        this.dataService.data$.subscribe(data => {
            this.data = new wjCore.CollectionView(data, {
              trackChanges: true
            });
            if (this.flexGrid) {
                this.flexGrid.collectionView.refresh(); 
              }
          });
    }

    initializeGrid(grid: any) {
        new EditHighlighter(grid, 'cell-changed');
      }   

    addNewRow() {
        this.router.navigate(['/test']);
    }
    
    deleteSelectedRow() {
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

    Grid() {
        this.router.navigate(['/grid']);
    }

    formatItem(s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
        if (e.panel === s.cells) {
          const row = e.row;
          const col = e.col;
          const data = s.rows[row].dataItem;
    
          e.cell.classList.remove('wj-cell-highlight');
    
          if (col === s.columns.indexOf('uName') && data.uName) {
            e.cell.classList.add('wj-cell-highlight');
          }
          if (col === s.columns.indexOf('datacode') && !data.datacode) {
            e.cell.classList.add('wj-cell-highlight');
          }
          if (col === s.columns.indexOf('group') && (data.group === 'admin' || data.group === 'customer')) {
            e.cell.classList.add('wj-cell-highlight');
          }
          if (col === s.columns.indexOf('uphonenumber') && (!data.uphonenumber || data.uphonenumber.length !== 10)) {
            e.cell.classList.add('wj-cell-highlight');
          }
          if (col === s.columns.indexOf('yourphonenumber') && data.yourphonenumber) {
            e.cell.classList.add('yourphonenumber-highlight');
          }
        }
      }
    
      onSelectionChanged(s: wjGrid.FlexGrid) {
        s.rows.forEach(row => row.cssClass = '');
        const selectedRow = s.rows[s.selection.row];
        if (selectedRow) {
          selectedRow.cssClass = 'selected';
        }
      }

}
