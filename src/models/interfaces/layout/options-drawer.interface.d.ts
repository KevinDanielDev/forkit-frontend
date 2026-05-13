interface IMenuOption {
  icon: string;
  label: string;
  route: string;
  action?: string;
}

export interface IMenuGroup {
  title: string;
  items: IMenuOption[];
}
