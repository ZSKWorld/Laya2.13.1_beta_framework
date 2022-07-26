import { IViewCtrl_Class, IView_Class } from "./interfaces";
import { ViewID } from "./ViewID";
type ReadOnlyView = ReadOnlyObject<IView_Class> & { readonly [key in ViewID]: IView_Class };
type ReadOnlyViewCtrl = ReadOnlyObject<IViewCtrl_Class> & { readonly [key in ViewID]: IViewCtrl_Class };
export const ViewClass: ReadOnlyView = {} as any;
export const CtrlClass: ReadOnlyViewCtrl = {} as any;