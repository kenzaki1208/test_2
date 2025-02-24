import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-test01',
  templateUrl: './test_01.component.html',
  styleUrls: ['./test_01.component.scss']
})
export class Test01Component implements OnInit {
  data: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data = this.dataService.getData();
    this.dataService.data$.subscribe(data => {
      this.data = data;
    });
  }
}
