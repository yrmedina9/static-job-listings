import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private tags = new BehaviorSubject<string[]>([]);

  constructor() {}

  getTags() {
    return this.tags;
  }

  addTag(tag: string) {
    const currentTags = this.tags.getValue();
    const updatedTags = [...currentTags, tag];
    this.tags.next(updatedTags);
  }

  removeTag(tag: string) {
    const currentTags = this.tags.getValue();
    const updatedTags = currentTags.filter((t) => t !== tag);
    this.tags.next(updatedTags);
  }

  clearTags() {
    this.tags.next([]);
  }
}
