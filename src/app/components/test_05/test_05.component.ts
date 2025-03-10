import { Component } from '@angular/core';

@Component({
    selector: 'app-test-05',
    templateUrl: './test_05.component.html',
    styleUrls: ['./test_05.component.scss']
})
export class Test05Component {

    // Thay mảng items bằng Map
    items: Map<number, string> = new Map([
        [1, "kenzaki"],
        [2, "Cailin"],
        [3, "John Wick"],
        [4, "Obama"],
        [5, "Sunsui"]
    ]);

    // Biến lưu kết quả từ vòng lặp
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

    // Vòng lặp for cơ bản
    runForBasic() {
        let pairCount = 0;
        const entries = Array.from(this.items.entries());
        for (let i = 0; i < entries.length - 1; i += 2) {
            const name1 = entries[i][1];
            const name2 = entries[i + 1][1];
            const totalLength = name1.length + name2.length;

            if (totalLength > 10) {
                this.forBasicResult.push(`Cặp: ${name1} + ${name2} (Tổng độ dài: ${totalLength})`);
                pairCount++;
                if (pairCount === 2) break;
            }
        }
    }

    // Vòng lặp for...of
    runForOf() {
        const connectors = ["và", "gặp", "đánh bại", "giúp đỡ"];
        let story = "";
        let connectorIndex = 0;

        for (let [, name] of this.items) { // Dùng destructuring để lấy value (name)
            if (story === "") {
                story = name;
            } else {
                const connector = connectors[connectorIndex % connectors.length];
                story += ` ${connector} ${name}`;
                connectorIndex++;
            }
        }
        this.forOfResult.push(`Câu truyện: ${story}`);
    }

    // Vòng lặp for...in
    runForIn() {
        const lengthGroups: { [key: string]: number } = {
            "Dưới 6": 0,
            "6 - 8": 0,
            "Trên 8": 0
        };

        // Chuyển Map thành array để dùng for...in hoặc dùng for...of
        const entries = Array.from(this.items.entries());
        for (let i in entries) {
            const nameLength = entries[i][1].length; // Lấy name từ value
            if (nameLength < 6) {
                lengthGroups["Dưới 6"]++;
            } else if (nameLength <= 8) {
                lengthGroups["6 - 8"]++;
            } else {
                lengthGroups["Trên 8"]++;
            }
        }

        for (let group in lengthGroups) {
            if (lengthGroups[group] > 0) {
                this.forInResult.push(`Nhóm ${group} ký tự: ${lengthGroups[group]} tên`);
            }
        }
    }

    // Vòng lặp forEach
    runForEach() {
        this.items.forEach((name, id) => { // name là value, id là key
            const nameLength = name.length;
            const fameBase = nameLength * 2;
            const fameAdjustment = id < 0 ? -5 : 3;
            const fameScore = fameBase + fameAdjustment;

            this.forEachResult.push(`${name}: Điểm nổi tiếng = ${fameScore}`);
        });
    }

    // Vòng lặp While
    runWhile() {
        let i = 0;
        let idSum = 0;
        let matchCount = 0;
        const entries = Array.from(this.items.entries());

        while (i < entries.length) {
            const [id, name] = entries[i]; // Destructuring để lấy id và name
            idSum += id;
            const nameLength = name.length;

            if (nameLength > 5 || id > 3) {
                this.whileResult.push(`Tên: ${name}, Tổng ID đến đây: ${idSum}`);
                matchCount++;
            }
            i++;
        }

        if (matchCount === 0) {
            this.whileResult.push("Không tìm thấy tên nào thỏa mãn!");
        }
    }

    // Vòng lặp do ...While
    runDoWhile() {
        let i = 0;
        let encodeString = " ";
        let matchCount = 0;
        const entries = Array.from(this.items.entries());

        do {
            const [, currentName] = entries[i]; // Lấy name từ value
            const firstChar = currentName[0];
            const randomIndex = Math.floor(Math.random() * currentName.length);
            const randomChar = currentName[randomIndex];

            encodeString += firstChar + randomChar;

            if (encodeString.length > 3) {
                this.doWhileResult.push(`Chuỗi mã hóa: ${encodeString}`);
                matchCount++;
                encodeString = " ";
            }
            i++;
        } while (i < entries.length && matchCount < 2);

        if (matchCount === 0) {
            this.doWhileResult.push("Không tạo được chuỗi mã hóa nào dài hơn 3 kí tự!");
        }
    }
}