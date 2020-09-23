import {
    DefaultButton, DetailsList, DetailsListLayoutMode, DialogFooter, IColumn, Panel, PanelType, PrimaryButton,
    Selection,
} from "office-ui-fabric-react";
import * as React from "react";

export interface ICustomPanelState {
	items: any[];
}

export interface ICustomPanelProps {
	onClose: () => void;
	isOpen: boolean;
}

export default class CustomPanel extends React.Component<ICustomPanelProps, ICustomPanelState> {
	private _selection: Selection;

	constructor(props: ICustomPanelProps) {
		super(props);
		this._selection = new Selection();
		this.state = {
			items: []
		};
	}

	private _onCancel = () => {
		this.props.onClose();
	};

	private _onApply = () => {
		this.setState({
			items: [{ Name: "First" }, { Name: "Second" }]
		});
	};

	private _onRenderFooterContent = (): JSX.Element => {
		return (
			<DialogFooter>
				<PrimaryButton onClick={this._onApply} style={{ marginRight: "8px" }}>
					Click to Search
				</PrimaryButton>
				<DefaultButton onClick={this._onCancel}>Cancel</DefaultButton>
			</DialogFooter>
		);
	};

	public render(): React.ReactElement<ICustomPanelProps> {
		let { isOpen } = this.props;

		let _columns: IColumn[] = [{ key: "column1", name: "Name", fieldName: "Name", minWidth: 100, isResizable: true }];

		return (
			<Panel isOpen={isOpen} type={PanelType.medium} onRenderFooterContent={this._onRenderFooterContent}>
				<h2>An example of DetailsList</h2>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-md6" style={{ textAlign: "center" }}></div>
					<div className="ms-Grid-col ms-sm12 ms-md6">
						<DetailsList
							compact={true}
							items={this.state.items}
							columns={_columns}
							setKey={"set"}
							selection={this._selection}
							layoutMode={DetailsListLayoutMode.justified}
							selectionPreservedOnEmptyClick={true}
						/>
					</div>
				</div>
			</Panel>
		);
	}
}
