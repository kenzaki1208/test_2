import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-test-04',
    templateUrl: './test_04.component.html',
    styleUrls: ['./test_04.component.scss']
})
export class Test04Component {
    @ViewChild('buttonContainer') buttonContainer!: ElementRef;

    constructor(private renderer: Renderer2) { }

    eventResults: { eventType: string, result: string, timestamp1: string, timestamp2: string } [] = [];
    message = '';
    name: string = '';
    title4 = 'Geeks';
    isMouseMoveBlocked = false;
    private specialChars = ['@', '#', '$', '%', 'Shift'];
    private blockedKeys = new Set<string>();
    private dynamicButtons: HTMLElement[] = [];


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

    addEventResult(eventType: string, result: string) {
        this.eventResults.push ({
            eventType,
            result,
            timestamp1: new Date().toLocaleDateString(),
            timestamp2: new Date().toLocaleTimeString()
        });
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

        if (this.isMouseMoveBlocked) {
            this.addEventResult('Right Click', 'Mouse Move blocked');
        } else {
            this.addEventResult('Right Click', 'Mouse Move enabled');
        }
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
            event.preventDefault(); // Chặn tất cả sự kiện sau
            event.stopPropagation(); // Đảm bảo chặn triệt để
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

    onKeyUp (event: KeyboardEvent) {
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

    Clickme (event: MouseEvent) {
        const alertMessage = this.name ? `Welcome ${this.name} to GreeksforGreeks` : 'Welcome to GreeksforGreeks';
        alert(alertMessage);
        this.addEventResult('Button Click', alertMessage);
    }

    clearResults() {
        this.eventResults = [];
        this.blockedKeys.clear();
    }

}