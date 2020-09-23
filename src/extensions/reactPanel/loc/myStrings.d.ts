declare interface IReactPanelCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ReactPanelCommandSetStrings' {
  const strings: IReactPanelCommandSetStrings;
  export = strings;
}
