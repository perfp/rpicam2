import * as React from 'react';
import styled from 'styled-components';


const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;    
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;

    ::before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      &.round {
        border-radius: 34px;
      }
      
      &.round::before {
        border-radius: 50%;
      }
`;

const Input = styled.input`
    opacity: 0;
    width: 20px;
    height: 20px;

    &:focus + ${Slider}{
        box-shadow: #2196F3;
    }

    &:checked + ${Slider} {
        background-color: #2196F3;
    }
    &:checked + ${Slider}::before {
        transform: translateX(26px);
    }

  `;

  const Caption = styled.span`
    position: absolute;
    top: 10px;
    left: 70px;
  `;

interface IToggleButtonProps {
    onToggle: (checked: boolean) => void;
    checked : boolean;
}

interface IToggleButtonState {
    checked: boolean;
}

export default class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState> {

    constructor(props:IToggleButtonProps){
        super(props);

        this.state = {
            checked: props.checked
        }
        this.onChange = this.onChange.bind(this);
    }

    public render(){
        return (
            <Switch>
                <Input type="checkbox" onChange={this.onChange} checked={this.props.checked} />
                <Slider className="round" />
                <Caption>Camera</Caption>
            </Switch>
        )
    }

    private onChange(){
        this.setState({checked: !this.state.checked})
        this.props.onToggle(this.state.checked);
    }
}