import { Component } from '@angular/core';

@Component({
    selector: 'app-test-04',
    templateUrl: './test_04.component.html',
    styleUrls: ['./test_04.component.scss']
})
export class Test04Component {
    constructor() { }

    eventResults: { eventType: string, result: string, timestamp1: string, timestamp2: string } [] = [];
    message = '';
    name: string = '';
    title4 = 'Geeks';

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
        const position = `X: ${event.clientX}, Y: ${event.clientY}`;
        this.addEventResult('Mouse Move', position);
    }

    onDoubleClick(event: MouseEvent) {
        this.addEventResult('Double Click', 'Section double-clicked');
    }

    onRightClick(event: MouseEvent) {
        event.preventDefault();
        this.addEventResult('Right Click', 'Right-click detected on section');
    }

    onInputChange(event: any) {
        const inputValue = event.target.value;
        this.addEventResult('Input Change', `You typed: ${inputValue}`);
    }

    onKeyDown(event: KeyboardEvent) {
        const key = event.key;
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
    }
}