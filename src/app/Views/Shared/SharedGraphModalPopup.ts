import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TemplateRef } from '@angular/core';

export class SharedGraphModalPopup {
    modalRef: BsModalRef;
    constructor(protected modalService: BsModalService) { }

    openShowRelationships(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
      this.modalRef.hide();
    }
  }
