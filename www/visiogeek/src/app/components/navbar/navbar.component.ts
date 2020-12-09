import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterModalComponent} from "../modal/register-modal/register-modal.component";

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

  constructor() { }

  ngOnInit(): void {
  }


  handleClick(type: string, state: boolean): void {
    this.modal[type] = state
  }

}
