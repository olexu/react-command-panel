import { assign } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { override } from "@microsoft/decorators";
import {
    BaseListViewCommandSet, Command, IListViewCommandSetExecuteEventParameters,
    IListViewCommandSetListViewUpdatedParameters,
} from "@microsoft/sp-listview-extensibility";

import CustomPanel, { ICustomPanelProps } from "../../components/CustomPanel";

export interface IReactPanelCommandSetProperties {
	sampleTextOne: string;
	sampleTextTwo: string;
}

export default class ReactPanelCommandSet extends BaseListViewCommandSet<IReactPanelCommandSetProperties> {
	private panelDomElement: HTMLDivElement;
	@override
	public onInit(): Promise<void> {
		this.panelDomElement = document.body.appendChild(document.createElement("div"));
		return Promise.resolve();
	}

	@override
	public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
		const compareOneCommand: Command = this.tryGetCommand("REACT_PANEL");
		if (compareOneCommand) {
			// This command should be hidden unless exactly one row is selected.
			compareOneCommand.visible = event.selectedRows.length === 1;
		}
	}

	@override
	public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
		switch (event.itemId) {
			case "REACT_PANEL":
				this._showPanel();
				break;
			default:
				throw new Error("Unknown command");
		}
	}

	private _showPanel() {
		this._renderPanelComponent({
			isOpen: true,
			onClose: this._dismissPanel
		});
	}

	private _dismissPanel = () => {
		this._renderPanelComponent({ isOpen: false });
	};

	private _renderPanelComponent = (props: any) => {
		const element: React.ReactElement<ICustomPanelProps> = React.createElement(
			CustomPanel,
			assign(
				{
					onClose: null,
					isOpen: false
				},
				props
			)
		);
		ReactDOM.render(element, this.panelDomElement);
	};
}
