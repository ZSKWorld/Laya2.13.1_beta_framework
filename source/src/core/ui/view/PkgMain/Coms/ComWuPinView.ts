import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComWuPin from "../../../ui/PkgMain/ComWuPin";
import { ResPath } from "../../../../common/ResPath";

export const enum ComWuPinMsg {
	OnBtnShouCangClick = "ComWuPin_OnBtnShouCangClick",
	OnBtnEquipClick = "ComWuPin_OnBtnEquipClick",
	OnBtnPropClick = "ComWuPin_OnBtnPropClick",
	OnBtnGemClick = "ComWuPin_OnBtnGemClick",
	OnBtnMaterialClick = "ComWuPin_OnBtnMaterialClick",
	OnBtnBookClick = "ComWuPin_OnBtnBookClick",
	OnBtnOtherClick = "ComWuPin_OnBtnOtherClick",
	OnBtnQualityUpClick = "ComWuPin_OnBtnQualityUpClick",
	OnBtnQualityDownClick = "ComWuPin_OnBtnQualityDownClick",
	OnBtnTypeUpClick = "ComWuPin_OnBtnTypeUpClick",
	OnBtnTypeDownClick = "ComWuPin_OnBtnTypeDownClick",
	OnBtnScoreUpClick = "ComWuPin_OnBtnScoreUpClick",
	OnBtnScoreDownClick = "ComWuPin_OnBtnScoreDownClick",
}

export class ComWuPinView extends ExtensionClass<ViewExtension, ComWuPin>(ComWuPin) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { BtnShouCang, BtnEquip, BtnProp, BtnGem, BtnMaterial, BtnBook, BtnOther, BtnQualityUp, BtnQualityDown, BtnTypeUp, BtnTypeDown, BtnScoreUp, BtnScoreDown } = this;
	    BtnShouCang.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnShouCangClick ]);
	    BtnEquip.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnEquipClick ]);
	    BtnProp.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnPropClick ]);
	    BtnGem.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnGemClick ]);
	    BtnMaterial.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnMaterialClick ]);
	    BtnBook.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnBookClick ]);
	    BtnOther.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnOtherClick ]);
	    BtnQualityUp.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnQualityUpClick ]);
	    BtnQualityDown.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnQualityDownClick ]);
	    BtnTypeUp.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnTypeUpClick ]);
	    BtnTypeDown.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnTypeDownClick ]);
	    BtnScoreUp.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnScoreUpClick ]);
	    BtnScoreDown.onClick(this, this.sendMessage, [ ComWuPinMsg.OnBtnScoreDownClick ]);
    }

}
