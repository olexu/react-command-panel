import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";

import CustomPanel from "../../../components/CustomPanel";

export interface IReactPanelProps {
	description: string;
}

export interface IReactPanelState {
	isOpen: boolean;
}

export default class ReactPanel extends React.Component<IReactPanelProps, IReactPanelState> {
	public constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	private _onClick = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	public render(): React.ReactElement<IReactPanelProps> {
		if (this.state.isOpen) {
			return <CustomPanel isOpen={this.state.isOpen} onClose={this._onClick} />;
		}
		return <PrimaryButton onClick={this._onClick}>Click to Search</PrimaryButton>;
	}
}
