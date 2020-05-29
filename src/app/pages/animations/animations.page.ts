import { Component, OnInit} from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.page.html',
  styleUrls: ['./animations.page.scss'],
})
export class AnimationsPage implements OnInit {

  isLoading = false;

  constructor(
    public sidebar: SidebarService,
    ) { }

    ngOnInit() {
      this.isLoading = true;
    }

}
