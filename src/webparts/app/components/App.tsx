import * as React from 'react';
import styles from './App.module.scss';
import { IAppProps } from './IAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamMembersState } from "./IListState";
import { ITeamMembers } from './IListProps';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';

export default class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps, state: ITeamMembersState) {
    super(props);
    this.state = {
      status: "Ready",
      items: []
    };
  }

  public render(): React.ReactElement<IAppProps> {

    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={"ms-Grid"}>
                <div className={"ms-Grid-row"}>
                  {
                    this.state.items.map(item =>
                      <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg4"}>
                        <div className={styles.column}>
                          <label className="ms-Label ms-font-xxl">{item.ID}</label>
                          <label className="ms-Label">{item.Full_x0020_Name}</label>
                          <label className="ms-Label">{item.Title}</label>
                          <label className="ms-Label">{item.Email}</label>
                          <label className="ms-Label">{item.Phone_x0020_Number}</label>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
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
                items:responseJSON.value
            });
            }
          });
        }
      });
  }
}

// // return (
// //   <div className={ styles.app }>
// //     <div className={ styles.container }>
// //       <div className={ styles.row }>
// //         <div className={ styles.column }>
// //           <span className={ styles.title }>Welcome to SharePoint!</span>
// //           <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
// //           <p className={ styles.description }>{escape(this.props.description)}</p>
// //           <p className={ styles.description }>{escape(this.props.listName)}</p>
// //           <p className={ styles.description }>{escape(this.props.siteUrl)}</p>
// //           <a href="https://aka.ms/spfx" className={ styles.button }>
// //             <span className={ styles.label }>Learn more</span>
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // )