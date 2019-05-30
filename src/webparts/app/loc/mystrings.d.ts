declare interface IAppWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  PropertyPaneListName:string;
}

declare module 'AppWebPartStrings' {
  const strings: IAppWebPartStrings;
  export = strings;
}
