import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-socremodal',
  templateUrl: './socremodal.component.html',
  // styleUrl: './socremodal.component.css'
})
export class SocremodalComponent {
@Input() score: number = 0;
@Input() topic: string = '';
@Input() totalQuestions: number = 0;
 
constructor(public activeModal: NgbActiveModal) {}
 
submitExam() {
this.activeModal.close('submit');
}

}
