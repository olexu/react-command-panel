import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "ReactPanelWebPartStrings";

import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import ReactPanel, { IReactPanelProps } from "./components/ReactPanel";

export interface IReactPanelWebPartProps {
	description: string;
}

export default class ReactPanelWebPart extends BaseClientSideWebPart<IReactPanelWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IReactPanelProps> = React.createElement(ReactPanel, {
			description: this.properties.description
		});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel
								})
							]
						}
					]
				}
			]
		};
	}
}
