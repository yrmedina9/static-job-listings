import { Component, Input, OnInit } from '@angular/core';
import { IJobs } from 'src/app/models/IJob';
import { FilterService } from 'src/app/services/filter.service';
import { fadeInAnimation } from 'src/app/fade-in.animation';

@Component({
  selector: 'app-job-panel',
  templateUrl: './job-panel.component.html',
  styleUrls: ['./job-panel.component.scss'],
  animations: [fadeInAnimation],
})
export class JobPanelComponent implements OnInit {
  @Input() job: IJobs = {} as IJobs;
  public tools: string[] = [];
  public tags: string[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.tools = [...this.job.languages, ...this.job.tools, this.job.level];
    this.filterService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
  }

  pushFilterArr(lang: string) {
    this.tags = Array.from(new Set([...this.tags, lang]));
    this.filterService.addTag(lang);
  }
}
