import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = inject(QueryClient);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber !== null
  }));

  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber !== null
  }));

  setIssueNumber(number: string) {
    this.issueNumber.set(number);
  }

  prefetchIssue(number: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', number],
      queryFn: () => getIssueByNumber(number),
      staleTime: 1000 * 60
    });
  }
}
