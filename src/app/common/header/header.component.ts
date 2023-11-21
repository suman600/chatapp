import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnChanges{
  currentUser:any;
  @Input() currentUerId:string = '';
  constructor(private service:AuthService) {

  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.service.getUserById(this.currentUerId).subscribe(user=>{
      this.currentUser = user
    })
    this.currentUerId = changes['currentUerId']['currentValue']
  }
}
