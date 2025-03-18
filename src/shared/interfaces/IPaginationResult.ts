export interface IPaginationResult<T> {
  currentPageFirstRecord: number;
  currentPageLastRecord: number;
  currentRecords: T[];
}
