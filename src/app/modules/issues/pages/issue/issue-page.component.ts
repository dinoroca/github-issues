import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [RouterLink, IssueCommentComponent],
  templateUrl: './issue-page.component.html'
})
export default class IssuePageComponent {
  route = inject(ActivatedRoute);
  issuService = inject(IssueService);

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((number) => this.issuService.setIssueNumber(number))
    )
  );

  issueQuery = this.issuService.issueQuery;
  issueCommentsQuery = this.issuService.issueCommentsQuery;

}
