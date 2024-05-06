export interface Topic {
  name: string;
  id: number;
  terms: Term[];
  createdAt: string;
  modifiedAt: string;
  priority: string;
}

export interface Term {
  id: number;
  name: string;
  definition: string;
  nextShowDateTime: string;
}