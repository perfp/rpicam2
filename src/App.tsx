import * as React from 'react';
import './App.css';
import {CameraOff, CameraOn, CheckStatus} from './CameraAPI';
import CameraControl from './CameraControl';
import logo from './logo.svg';
import StreamView from './StreamView';


interface IAppState {
  cameraEnabled: boolean
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any){
    super(props);

    this.state = {
      cameraEnabled: false
    }

    this.onCameraEnabled = this.onCameraEnabled.bind(this);
  }

  public componentDidMount(){
    CheckStatus("halted").then(
      status => {
        if (status === "ready"){
          this.setState({cameraEnabled: true});
        }
      }
    );
  
  }

  public render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">RPi cam 2</h1>
        </div>
        <div className="App-controls">
          <StreamView baseUrl="" cameraEnabled={this.state.cameraEnabled} />
          <div style={{textAlign: "center"}}>
            <div style={{textAlign: "left",display: "inline-block", width: "512px", marginTop: "30px"}}>
              <CameraControl 
                cameraEnabled={this.state.cameraEnabled }
                onCameraEnabled={this.onCameraEnabled} 
                />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onCameraEnabled(state:boolean){
    if (state){
      CameraOff().then(() => this.setState({cameraEnabled: false}));
    } else {
      CameraOn().then(() => this.setState({cameraEnabled: true}));
    }
    
  }
}

export default App;
