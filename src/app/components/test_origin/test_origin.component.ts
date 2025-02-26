import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../test/data.service';
import { Router } from '@angular/router';
import * as wjcCore from '@grapecity/wijmo';
import { WjFlexGrid } from '@grapecity/wijmo.angular2.grid';

@Component({
  selector: 'app-test_origin',
  templateUrl: './test_origin.component.html',
  styleUrls: ['./test_origin.component.scss']
})
export class TestOriginComponent implements OnInit {
    data!: wjcCore.CollectionView;
    @ViewChild('flexGrid') flexGrid!: WjFlexGrid;

    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit(): void {
        this.data = new wjcCore.CollectionView(this.dataService.getData(), {
            trackChanges: true 
        });

        this.dataService.data$.subscribe(data => {
            this.data = new wjcCore.CollectionView(data, {
              trackChanges: true
            });
            if (this.flexGrid) {
                this.flexGrid.collectionView.refresh(); 
              }
          });
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
        console.log('Selected Row:', selectedRow); // Debug dòng được chọn
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
}
