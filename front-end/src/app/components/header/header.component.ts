import { Component, ViewEncapsulation} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/task.service';
import { Token } from '@angular/compiler';
import { userService } from 'src/app/allServices/user.service';
import { StorageService } from 'src/app/allServices/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  
  showAddClient: boolean = false;
  subscription!: Subscription;
  role!: boolean

  constructor(private uiService:UiService, public userService: userService,  private taskService: TaskService) {
    this.subscription = this.uiService.onToggle().subscribe
    (value => this.showAddClient = value)
  }

  toggleAddClient() {
    this.uiService.toggleAddClient();
  }
}


