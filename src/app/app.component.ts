import { Component, OnInit } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { IJobs } from './models/IJob';
import { FilterService } from './services/filter.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'static-job-listings';
  public jobs: IJobs[] = [];
  public tags: string[] = [];
  public loading: boolean = false;
  public errorMessage: string = '';

  constructor(
    private josService: JobsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService
      .getTags()
      .pipe(
        switchMap((tags: string[]) => {
          this.tags = tags;
          this.loading = true;
          return this.josService.getAllJobs();
        }),
        map((data: IJobs[]) => {
          if (this.tags.length) {
            return data.filter((item: IJobs) =>
              this.tags.every((tag: string) =>
                [...item.tools, ...item.languages, item.level].includes(tag)
              )
            );
          } else {
            return data;
          }
        })
      )
      .subscribe(
        (data: IJobs[]) => {
          this.jobs = data;
          this.loading = false;
        },
        (error: string) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }
}
