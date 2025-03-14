import { Component, ElementRef, Renderer2, ViewChild, OnInit, HostListener } from '@angular/core';
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
    @ViewChild('mainContainer') mainContainer!: ElementRef;
    @ViewChild('tableContainer') tableContainer!: ElementRef;

    eventResults: { eventType: string, result: string, timestamp1: string, timestamp2: string }[] = [];
    gridData: wjCore.CollectionView;

    message = '';
    name: string = '';
    title4 = 'Geeks';
    isMouseMoveBlocked = false;
    private specialChars = ['@', '#', '$', '%', 'Shift'];
    private blockedKeys = new Set<string>();
    private dynamicButtons: HTMLElement[] = [];

    private eventStyles: { [key: string]: string } = {
        'Mouse Over': 'mouse-over',
        'Mouse Out': 'mouse-out',
        'Mouse Move': 'mouse-move',
        'Double Click': 'double-click',
        'Right Click': 'right-click',
        'Input Change': 'input-change',
        'Key Down': 'key-down',
        'Key Press': 'key-press',
        'Key Up': 'key-up',
        'Button Click': 'button-click',
        'Custom Button': 'custom-button'
    };

    constructor(private renderer: Renderer2, private dataService: DataService, private router: Router) {
        this.gridData = new wjCore.CollectionView(this.eventResults, {
            trackChanges: true
        });
    }

    ngOnInit(): void {
        this.gridData.sourceCollection = this.eventResults;
    }

    ngAfterViewInit(): void {
        if (this.flexGrid) {
            const flexGridControl = (this.flexGrid as any).control;
            this.initializeGrid(flexGridControl);
            this.adjustGridHeight();
        } else {
            console.warn('FlexGrid is not initialized');
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.adjustGridHeight();
    }

    adjustGridHeight() {
        if (!this.mainContainer || !this.tableContainer || !this.flexGrid) return;

        const mainContainerHeight = this.mainContainer.nativeElement.offsetHeight;
        let otherElementsHeight = 0;

        Array.from<HTMLElement>(this.mainContainer.nativeElement.children).forEach((child) => {
            if (child instanceof HTMLElement && child !== this.tableContainer.nativeElement) {
                otherElementsHeight += child.offsetHeight;
            }
        });

        const remainingHeight = mainContainerHeight - otherElementsHeight;
        this.renderer.setStyle(this.tableContainer.nativeElement, 'height', `${remainingHeight}px`);

        const flexGridControl = (this.flexGrid as any).control;
        if (flexGridControl) {
            flexGridControl.refresh();
        }
    }

    initializeGrid(grid: any) {
        if (!grid) return;

        grid.columns.forEach((col: any) => {
            col.width = '*';
        });

        grid.formatItem.addHandler((s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) => {
            this.handleFormatItem(s, e);
        });

        grid.selectionChanged.addHandler((s: wjGrid.FlexGrid, e: wjCore.EventArgs) => {
            this.onSelectionChanged(s);
        });
    }

    private handleFormatItem(s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
        if (e.panel !== s.cells) return;

        const row = e.row;
        const col = e.col;

        if (row < 0 || row >= s.rows.length) return;
        const data = s.rows[row].dataItem;
        if (!data) return;

        e.cell.classList.remove(
            'wj-cell-highlight',
            'highlight',
            'mouse-over',
            'mouse-out',
            'mouse-move',
            'double-click',
            'right-click',
            'input-change',
            'key-down',
            'key-press',
            'key-up',
            'button-click'
        );

        this.applyRowStyle(e, data);

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

    }

    private applyRowStyle(e: wjGrid.FormatItemEventArgs, data: any) {
        if (data && data.eventType) {
            const styleClass = this.eventStyles[data.eventType];
            if (styleClass) {
                e.cell.classList.add(styleClass);
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
            this.addEventResult('Custom Button', `${buttonName} clicked!`);
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

    clickMe(event: MouseEvent) {
        const alertMessage = this.name ? `Welcome ${this.name} to GeeksforGeeks` : 'Welcome to GeeksforGeeks';
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