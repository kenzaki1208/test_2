import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import { WjFlexGrid } from '@grapecity/wijmo.angular2.grid';
import { DataService } from '../test/data.service';

@Component({
    selector: 'app-test-04',
    templateUrl: './test_04.component.html',
    styleUrls: ['./test_04.component.scss']
})
export class Test04Component implements OnInit {
    @ViewChild('flexGrid') flexGrid!: WjFlexGrid;
    @ViewChild('buttonContainer') buttonContainer!: ElementRef;

    eventResults: { eventType: string, result: string, timestamp1: string, timestamp2: string }[] = [];
    gridData: wjCore.CollectionView;

    message = '';
    name: string = '';
    title4 = 'Geeks';
    isMouseMoveBlocked = false;
    private specialChars = ['@', '#', '$', '%', 'Shift'];
    private blockedKeys = new Set<string>();
    private dynamicButtons: HTMLElement[] = [];

    constructor(private renderer: Renderer2, private dataService: DataService, private router: Router) {
        this.gridData = new wjCore.CollectionView(this.eventResults, {
            trackChanges: true
        });
    }

    ngOnInit(): void {
        this.gridData.sourceCollection = this.eventResults;
        this.initializeGrid(this.flexGrid);
    }

    ngAfterViewInit(): void {
        const flexGridControl = (this.flexGrid as any).control;
        this.initializeGrid(flexGridControl);
    }

    initializeGrid(grid: any) {
        if (grid) {
            grid.columns.forEach((col: any) => {
                col.width = '*';
            });

            grid.formatItem.addHandler((s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) => {
                this.formatItem(s, e);
            });

            grid.selectionChanged.addHandler((s: wjGrid.FlexGrid, e: wjCore.EventArgs) => {
                this.onSelectionChanged(s);
            });
        }
    }

    formatItem(s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
        if (e.panel === s.cells) {
            const row = e.row;
            const col = e.col;
            const data = s.rows[row].dataItem;

            // Xóa class highlight cũ trước khi áp dụng mới
            e.cell.classList.remove('wj-cell-highlight', 'highlight');

            // Kiểm tra cột eventType và trạng thái chọn
            if (col === s.columns.indexOf('eventType')) {
                if (s.selection.contains(row, col)) { // Kiểm tra ô có được chọn không
                    e.cell.style.backgroundColor = '#ffeb3b'; // Màu vàng khi chọn
                    e.cell.style.color = 'black';
                    e.cell.style.fontWeight = 'bold';
                } else {
                    e.cell.style.backgroundColor = '#e6f3ff'; // Màu xanh nhạt khi không chọn
                    e.cell.style.color = '#0066cc';
                    e.cell.style.fontWeight = 'bold';
                }
            }

            // Các điều kiện highlight khác
            if (col === s.columns.indexOf('eventType') && data.eventType === 'Mouse Over') {
                e.cell.classList.add('wj-cell-highlight');
            }

            if (col === s.columns.indexOf('result') && data.result && data.result.includes('clicked')) {
                e.cell.classList.add('wj-cell-highlight');
            }

            const today = new Date().toLocaleDateString();
            if (col === s.columns.indexOf('timestamp1') && data.timestamp1 === today) {
                e.cell.classList.add('wj-cell-highlight');
            }

            if (col === s.columns.indexOf('timestamp2') && data.timestamp2) {
                const time = data.timestamp2;
                const hour = parseInt(time.split(':')[0], 10);
                if (hour < 12) {
                    e.cell.classList.add('highlight');
                }
            }

            // Tô màu xen kẽ cho các cột khác
            if (col !== s.columns.indexOf('eventType')) {
                e.cell.style.backgroundColor = row % 2 === 0 ? '#f9f9f9' : '#fff';
            }
        }
    }

    onSelectionChanged(grid: any) {
        const selectedItems = grid.selectedItems[0];
        if (selectedItems) {
            console.log('Selected:', selectedItems);
        }
    }

    addEventResult(eventType: string, result: string) {
        this.eventResults.push({
            eventType,
            result,
            timestamp1: new Date().toLocaleDateString(),
            timestamp2: new Date().toLocaleTimeString()
        });
        this.gridData.refresh();
    }

    addNewButton() {
        const newButton = this.renderer.createElement('button');
        const buttonCount = this.dynamicButtons.length + 1;
        const buttonName = `Button ${buttonCount}`;

        this.renderer.setProperty(newButton, 'innerText', buttonName);
        this.renderer.addClass(newButton, 'custom-btn');

        this.renderer.listen(newButton, 'click', () => {
            this.addEventResult(buttonName, `${buttonName} clicked!`);
        });

        this.renderer.appendChild(this.buttonContainer.nativeElement, newButton);
        this.dynamicButtons.push(newButton);
    }

    removeLastButton() {
        if (this.dynamicButtons.length > 0) {
            const lastButton = this.dynamicButtons.pop();
            if (lastButton) {
                this.renderer.removeChild(this.buttonContainer.nativeElement, lastButton);
            }
        }
    }

    onMouseOver() {
        this.message = 'way to go';
        this.addEventResult('Mouse Over', this.message);
    }

    onMouseOut() {
        this.message = '';
        this.addEventResult('Mouse Out', 'Message Cleared');
    }

    onMouseMove(event: MouseEvent) {
        if (!this.isMouseMoveBlocked) {
            const position = `X: ${event.clientX}, Y: ${event.clientY}`;
            this.addEventResult('Mouse Move', position);
        }
    }

    onDoubleClick(event: MouseEvent) {
        this.addEventResult('Double Click', 'Section double-clicked');
    }

    onRightClick(event: MouseEvent) {
        event.preventDefault();
        this.isMouseMoveBlocked = !this.isMouseMoveBlocked;
        this.addEventResult('Right Click', this.isMouseMoveBlocked ? 'Mouse Move Blocked' : 'Mouse Move Unblocked');
    }

    onInputChange(event: any) {
        const inputValue = event.target.value;
        this.addEventResult('Input Change', `You typed: ${inputValue}`);
    }

    onKeyDown(event: KeyboardEvent) {
        const key = event.key;
        if (this.specialChars.includes(key)) {
            if (!this.blockedKeys.has(key)) {
                this.addEventResult('Key Down', `Special char: ${key} - Stopped`);
                this.blockedKeys.add(key);
            }
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (key === 'Enter' && this.name) {
            this.addEventResult('Key Down', `Enter pressed: Hello ${this.name}`);
        } else if (key === 'Escape') {
            this.name = '';
            event.preventDefault();
            this.addEventResult('Key Down', 'Escape pressed: Input cleared');
        } else {
            this.addEventResult('Key Down', `Key pressed: ${key}`);
        }
    }

    onKeyPress(event: KeyboardEvent) {
        const char = event.key;
        if (/[a-zA-Z0-9]/.test(char)) {
            this.addEventResult('Key Press', `Character pressed: ${char}`);
        }
    }

    onKeyUp(event: KeyboardEvent) {
        const key = event.key;
        if (this.blockedKeys.has(key)) {
            return;
        }
        if (key === 'Enter' && this.name) {
            this.addEventResult('Key Up', `Enter released: confirmed ${this.name}`);
        } else {
            this.addEventResult('Key Up', `Key released: ${key}`);
        }
    }

    Clickme(event: MouseEvent) {
        const alertMessage = this.name ? `Welcome ${this.name} to GreeksforGreeks` : 'Welcome to GreeksforGreeks';
        alert(alertMessage);
        this.addEventResult('Button Click', alertMessage);
    }

    clearResults() {
        this.eventResults = [];
        this.blockedKeys.clear();
        this.gridData.sourceCollection = this.eventResults;
        this.gridData.refresh();
    }
}