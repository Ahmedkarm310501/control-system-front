import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  liDisplay!: string;

  toggleDisplay(event: any) {
    let target = event.target.id;
    let liId = target.replace('chevron', 'li');
    this.liDisplay = liId;
  }
  constructor() {}

  // write this code without jquery

  // anchorClicked(event: MouseEvent) {
  //   let target = event.srcElement.id;

  //   let $li = $("#" + target.replace("chevron", "li")).parent();

  //   if ($li.is(".active")) {
  //     $li.removeClass("active active-sm");
  //     $("ul:first", $li).slideUp(function() {});
  //   } else {
  //     // prevent closing menu if we are on child menu
  //     if (!$li.parent().is(".child_menu")) {
  //       $("#sidebar-menu")
  //         .find("li")
  //         .removeClass("active active-sm");
  //       $("#sidebar-menu")
  //         .find("li ul")
  //         .slideUp();
  //     }

  //     $li.addClass("active");

  //     $("ul:first", $li).slideDown(function() {});
  //   }
  // }

  anchorClicked(event: MouseEvent) {
    let target = event;
    console.log(target);
  }
}
