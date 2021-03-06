export default interface event {
  id: string;
  title: string;
  start: string;
  end?: string;
  libraryId: string;
  hasContacted: boolean;
  dateCreated: string;
  dateUpdated: string;
}

export interface TrimmedEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
}
