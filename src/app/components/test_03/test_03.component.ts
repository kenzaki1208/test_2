import { Component } from '@angular/core';

@Component({
  selector: 'app-test-03',
  templateUrl: './test_03.component.html',
  styleUrls: ['./test_03.component.scss'],
})
export class Test03Component {
  constructor() {}

  // --------------------------------Interpolation Binding----------------------------------
  city = 'Ha Noi'; 
  
  isLoggedIn = true; 
  
  user = [ 
    { id: 0, name: 'kenzaki', age: 23 },
    { id: 1, name: 'John Wick', age: 47 },
    { id: 2, name: 'havana', age: 36 },
    { id: 3, name: 'sherphed', age: 18 },
    { id: 4, name: 'Cailin', age: 24 },
    { id: 5, name: 'Ethan', age: 52 },
  ];

  users = [ 
    { id: 0, name: 'kenzaki', age: 23 },
    { id: 1, name: 'John Wick', age: 47 },
    { id: 2, name: 'havana', age: 36 },
    { id: 3, name: 'sherphed', age: 18 },
    { id: 4, name: 'Cailin', age: 24 },
    { id: 5, name: 'Ethan', age: 52 },
  ];

  trackById(index: number, userItem: { id: number; name: string }) {
    return userItem.id;
  }

  title5 = 'My Angular App'; 
  firstName = 'John'; 
  lastName = 'Doe'; 

  items = ['item 1', 'item 2', 'item 3'];


  // -------------------------------Property Binding-----------------------------------
  Geeks = 'GeeksforGeeks'; 
  image = 'https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-6.png'; 

  // -------------------------------Event Binding-----------------------------------
  message = ''; 
  onMouseOver() { 
    this.message = 'way to go';
  }

  name: string = ''; 
  title4 = 'Geeks'; 
  Clickme(event: any) {
    alert('Welcome to GeeksforGeeks');
  }

  // -------------------------------Two-way Binding-----------------------------------
  title = 'Danh mục đối tượng';
  title_color = '#e66465'; 

  table = 'Bảng danh sách'; 
  table_color = '#0011ff'; 

  message1 = 'Xin chào các bạn'; 

  title3 = 'Geeks';
  classtype = 'text-danger';


// ------------------------------fusion 4 types binding------------------------------------

  title6 = 'User Profile';
  username = 'John Doe';
  userAvatar = './Screenshot (1).png';

  updateProfile() {
    console.log('Profile updated for: ', this.username)
  }


}



// ------------------------------fusion 4 types binding------------------------------------

