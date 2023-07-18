import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

import { fadeInAnimation } from 'src/app/fade-in.animation';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  animations: [fadeInAnimation],
})
export class FilterPanelComponent implements OnInit {
  public tags: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.tags = this.filterService.getTags();
  }

  deleteTag(tag: string) {
    this.filterService.removeTag(tag);
  }

  removeAll() {
    this.filterService.clearTags();
  }
}
