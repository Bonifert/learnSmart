export interface BasicTopic {
  name: string;
  terms: BasicTerm[];
}

export interface BasicTerm {
  name: string;
  definition: string;
}