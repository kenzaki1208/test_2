import { Component } from '@angular/core';

@Component({
  selector: 'app-test-03',
  templateUrl: './test_03.component.html',
  styleUrls: ['./test_03.component.scss'],
})
export class Test03Component {
  constructor() {}

  city = 'Ha Noi';

  isLoggedIn = true;

  user = [
    {id: 0, name: 'kenzaki'},
    {id: 1, name: 'John Wick'},
    {id: 2, name: 'havana'},
    {id: 3, name: 'sherphed'},
    {id: 4, name: 'Cailin'},
    {id: 5, name: 'Ethan'},
  ];

  trackById(index: number, userItem: {id: number, name: string}) {
    return userItem.id;
  }

  title3 = "Geeks";
  classtype = "text-danger";
  Geeks = "GeeksforGeeks";
  image = "https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-6.png"; 

  message = '';
  onMouseOver() {
    this.message = 'way to go';
  }

  name: string = '';

    title4 = "Geeks"; 
    Clickme(event: any) { 
        alert("Welcome to GeeksforGeeks"); 
    }

    
    title = "Danh mục đối tượng";
    title_color = "#e66465";

    table = "Bảng danh sách";
    table_color = "#0011ff"

    message1 = "Xin chào các bạn";


}