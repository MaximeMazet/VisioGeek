import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'vg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public modal : {[index: string]: boolean} = {
    register: false,
    connection: false
  }

  flash_message_display: boolean = false
  flash_message: string = ""

  constructor() { }

  ngOnInit(): void {
  }


  handleClick(type: string, state: boolean, $event?): void {
    this.modal[type] = state

    if ($event !== undefined) {
      this.flash_message = $event
      this.flash_message_display = true
      setTimeout(() => {
        this.flash_message_display = false
      }, 1500)
    }
  }

}
