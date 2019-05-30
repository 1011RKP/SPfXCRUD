import * as React from 'react';
import styles from './App.module.scss';
import { IAppProps } from './IAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamMembersState } from "./IListState";
import { ITeamMembers } from './IListProps';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { SPComponentLoader } from "@microsoft/sp-loader";

export default class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps, state: ITeamMembersState) {
    super(props);
    this.state = {
      status: "Ready",
      items: []
    };
  }

  public render(): React.ReactElement<IAppProps> {
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);

    return (
      <div className="container">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h4>Team Members Using BootStrap React</h4>
          </div>
          <div className="panel-body">
          </div>
          <table className="table">
            <colgroup>
              <col className="col-md-1" />
              <col className="col-md-3" />
              <col className="col-md-3" />
              <col className="col-md-3" />
              <col className="col-md-2" />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Title</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.items.map(item =>
                  <tr>
                    <td>{item.ID}</td>
                    <td>{item.Full_x0020_Name}</td>
                    <td>{item.Title}</td>
                    <td>{item.Email}</td>
                    <td>{item.Phone_x0020_Number}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this._getTeamMembers();
    console.log(this.state);
  }
  private _getTeamMembers() {
    const requestUrl = `${this.props.siteUrl}/_api/web/lists/getbytitle('Team Members')/items?$select=Full_x0020_Name,Title,ID,Email,Job_x0020_Type,Phone_x0020_Number`;
    this.props.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          response.json().then((responseJSON) => {
            if (responseJSON != null && responseJSON.value != null) {
              console.log(responseJSON);
              this.setState({
                //items: this.state.items.concat(responseJSON.value)
                items: responseJSON.value
              });
            }
          });
        }
      });
  }
}


//// "cdnBasePath": "https://publiccdn.sharepointonline.com/incytedev.sharepoint.com/sites/CDN/CDN/Ratna/TeamMembers"
