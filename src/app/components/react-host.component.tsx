import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactCounter from './ReactCounter';

@Component({
  selector: 'app-react-host',
  template: `<div #reactRoot></div>`,
  standalone: true
})
export class ReactHostComponent implements AfterViewInit, OnDestroy {
  @ViewChild('reactRoot', { static: true }) reactRoot!: ElementRef<HTMLDivElement>;
  @Input() initialCount = 0;

  private root: ReturnType<typeof createRoot> | null = null;

  ngAfterViewInit() {
    this.root = createRoot(this.reactRoot.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    this.root?.unmount();
  }

  render() {
    if (this.root) {
      this.root.render(React.createElement(ReactCounter, { initialCount: this.initialCount }));
    }
  }
} 