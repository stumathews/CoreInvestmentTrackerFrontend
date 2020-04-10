import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { Region } from '../../Models/Region';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRequiredTextValidators, GetRequiredNumberValidators } from '../../Utilities';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-new-region',
  templateUrl: 'new-region.html',
  })

export class NewRegionComponent implements OnInit {
  form;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }
  errorMessage: string;

  @Output() CreatedRegionEvent = new EventEmitter<Region>();

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl('', GetRequiredTextValidators()),
        description: new FormControl('', GetRequiredTextValidators()),
    });
  }

  onSubmit(form: Region) {
    this.apiService.CreateRegion(form).pipe(finalize(() => {
      this.CreatedRegionEvent.emit(form);
    })).subscribe( (value) => {
      console.log('received response: ' + JSON.stringify(value));
      // this.router.navigate(['/Regions']);
      // this.goHome();
    });
  }

  goHome() {
    this.router.navigate(['']);
  }

}
