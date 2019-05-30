import { SPHttpClient } from '@microsoft/sp-http'; 

export interface IAppProps {
  description: string;
  listName:string;
  siteUrl:string;
  spHttpClient:SPHttpClient;
}
