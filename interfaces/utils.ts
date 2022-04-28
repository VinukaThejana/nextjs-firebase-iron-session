/**
 * @description Interface for the user selected file
 */
export interface IFile {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
}
