import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactHostComponent } from './components/react-host.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactHostComponent],
  template: `
    <div class="container">
      <app-react-host [initialCount]="5"></app-react-host>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'cicd';
}
