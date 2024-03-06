import { Component } from '@angular/core';
import { cilList, cilPencil} from '@coreui/icons';

@Component({
  selector: 'app-pencil',
  templateUrl: './pencil.component.html',
  styleUrls: ['./pencil.component.css']
})
export class PencilComponent {
  icons = {cilList, cilPencil}
}
