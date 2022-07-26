import { LangCode } from "../../table/LangCode";
import { IPlatform } from "./IPlatform";
import { PlatDev } from "./PlatDev";
import { PlatWX } from "./PlatWX";

export enum PlatformType {
	Dev,
	WX,
}

class Platform implements IPlatform {
	private platform: IPlatform;

	init(platType: PlatformType) {
		switch ( platType ) {
			case PlatformType.Dev:
				this.platform = new PlatDev();
				break;
			case PlatformType.WX:
				this.platform = new PlatWX();
				break;
			default:
				break;
		}
	}

	login(account: string, password: string): Promise<LangCode> {
		return this.platform.login(account, password);
	}

	register(account: string, password: string, nickName: string): Promise<LangCode> {
		return this.platform.register(account, password, nickName);
	}

	confirm(msg: string, confirmText: string, showCancel: boolean, success?: Function, fail?: Function): void {
		this.platform.confirm(msg, confirmText, showCancel, success, fail);
	}
}

export const platform = new Platform();