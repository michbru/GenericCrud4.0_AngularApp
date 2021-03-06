import { Component, ViewChild, OnInit } from '@angular/core';

import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngxTable';
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;
 
  constructor(private toastrService: ToastrService) {}
  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }
  onClick() {
    this.toastrService.success('in div', "excellent", {timeOut: 2000});
  }
}


