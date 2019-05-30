import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

//import { sp } from "@pnp/sp";

import * as test from 'AppWebPartStrings';
import App from './components/App';
import { IAppProps } from './components/IAppProps';

export interface IAppWebPartProps {
  description: string;
  listName:string;
  siteUrl:string;
  spHttpClient:string;
}

export default class AppWebPart extends BaseClientSideWebPart<IAppWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(
      App,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        description: this.properties.description,
        listName:this.properties.listName  
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: test.PropertyPaneDescription            
          },
          groups: [
            {
              groupName: test.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: test.DescriptionFieldLabel,
                }),
                PropertyPaneTextField('listName', {                  
                  label:test.PropertyPaneListName
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
