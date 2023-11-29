import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories = ['Kategoria1','Kategoria2','Kategoria3','Kategoria4','Kategoria5']

  constructor() { }

  ngOnInit(): void {
  }

}
