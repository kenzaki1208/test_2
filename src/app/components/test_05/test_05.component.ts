import { Component } from '@angular/core';

@Component({
    selector: 'app-test-05',
    templateUrl: './test_05.component.html',
    styleUrls: ['./test_05.component.scss']
})
export class Test05Component {

    //Mảng mẫu
    numbers: number[] = [1, 2, 3, 4, 5];

    //Biến lưu kết quả từ vòng lặp
    forBasicResult: string[] = [];
    forOfResult: string[] = [];
    forInResult: string[] = [];
    forEachResult: string[] = [];
    whileResult: string[] = [];
    doWhileResult: string[] = [];

    constructor() {
        this.runForBasic();
        this.runForOf();
        this.runForIn();
        this.runForEach();
        this.runWhile();
        this.runDoWhile();
    }

    //Vòng lặp for cơ bản
    runForBasic() {
        for (let i = 0; i < this.numbers.length; i++) {
            this.forBasicResult.push(`Số nhân đôi: ${this.numbers[i] * 2}`);
        }
    }

    //Vòng lặp for...of
    runForOf() {
        for (let num of this.numbers) {
            this.forOfResult.push(`Item: ${num}`);
        }
    }

    //Vòng lặp for...in
    runForIn() {
        for (let i in this.numbers) {
            this.forInResult.push(`Chỉ số ${i} có giá trị: ${this.numbers[i]}`);
        }
    }

    //Vòng lặp forEach
    runForEach() {
        this.numbers.forEach((num, index) => {
            this.forEachResult.push(`Bình phương: ${num * num}`);
        })
    }

    //Vòng lặp While
    runWhile() {
        let i = 0;
        while (i < this.numbers.length) {
            this.whileResult.push(`Cộng 10: ${this.numbers[i] + 10}`);
            i++;
        }
    }

    //Vòng lặp do ...While
    runDoWhile() {
        let i = 0;
        do {
            this.doWhileResult.push(`Chia đôi: ${this.numbers[i] / 2}`);
            i++;
        } while (i < this.numbers.length);
    }
}