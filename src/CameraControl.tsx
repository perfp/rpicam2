import * as React from 'react';
// import styled from 'styled-components';

import ToggleButton from './ToggleButton';

interface ICameraControlProps {
    cameraEnabled: boolean,
    onCameraEnabled: (state:boolean) => void;
}



export default class CameraControl extends React.Component<ICameraControlProps> {
    
    constructor(props:ICameraControlProps){
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }

    public render(){    
        return (
            <ToggleButton onToggle={this.onToggle} checked={this.props.cameraEnabled} />
        )
    }
    
    private onToggle(checked: boolean){
       this.props.onCameraEnabled(checked);
    }
}