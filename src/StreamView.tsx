import * as React  from "react";
import styled from 'styled-components';
import {GetImage} from './CameraAPI';

const ImageFrame = styled.div` 
    width: 512px;
    height:288px;
    display: inline-block;
    text-align: center;
    box-shadow: 1px 1px 1px 1px #ccc;
`;

interface IStreamViewProps {
    baseUrl: string;
    cameraEnabled: boolean;
}
interface IStreamViewState {
    url: string;
    timerID?: NodeJS.Timeout
}

export default class StreamView extends React.Component<IStreamViewProps, IStreamViewState> {
    public state : IStreamViewState;    

    constructor(props : IStreamViewProps){
        super(props);

        this.state = {
             url: ""
        }
    }

    public componentDidMount(){
        const timerID = setInterval(this.updateTime.bind(this), 1000);

        this.setState({timerID});
        
    }

    public componentWillUnmount(){
        clearInterval(this.state.timerID!);
    }

    public render(){
        return (
            <ImageFrame>
                <img src={this.state.url} /> 
            </ImageFrame>
        );
    }

    private updateTime(){
        if (this.props.cameraEnabled){
            const time = new Date().getTime();
            GetImage(time, 40000).then(b =>             
                {
                    this.setState({
                        url: URL.createObjectURL(b)
                    });
                }
            );
        } else {
            this.setState({
                url: 'camera-off.svg'
            })
        }
    }
}