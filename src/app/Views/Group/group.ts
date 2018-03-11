import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../apiservice.service';
import { InvestmentGroup } from '../../Models/InvestmentGroup';
import { EntityTypes  } from '../../Utilities';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.html'
})
export class GroupComponent implements OnInit {
  @Input() Groups: InvestmentGroup[];
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  errorMessage: string;
  ngOnInit(): void {
    this.apiService.GetGroups()
        .subscribe(groups => this.Groups = groups,
                   error => this.errorMessage = <any>error);
  }
  public delete(id: string) {
    console.log('deleting id=' + id);
    this.apiService.DeleteEntity(EntityTypes.InvestmentGroup, +id)
                   .finally(() => {
                     this.ngOnInit();
                   })
                   .subscribe(entity => console.log(JSON.stringify(entity)),
                    error => this.errorMessage = <any>error);
  }
}
