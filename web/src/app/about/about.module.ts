import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [SharedModule],
  declarations: [AboutComponent],
})
export class AboutModule {}
