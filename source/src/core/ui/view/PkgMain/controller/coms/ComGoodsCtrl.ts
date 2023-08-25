import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComGoodsMsg, ComGoodsView } from "../../view/coms/ComGoodsView";

export interface ComGoodsData {

}

export class ComGoodsCtrl extends BaseViewCtrl<ComGoodsView, ComGoodsData>{

    override onAdded() {
		this.addMessage(ComGoodsMsg.OnBtnShouCangClick, this.onBtnShouCangClick);
		this.addMessage(ComGoodsMsg.OnBtnEquipClick, this.onBtnEquipClick);
		this.addMessage(ComGoodsMsg.OnBtnPropClick, this.onBtnPropClick);
		this.addMessage(ComGoodsMsg.OnBtnGemClick, this.onBtnGemClick);
		this.addMessage(ComGoodsMsg.OnBtnMaterialClick, this.onBtnMaterialClick);
		this.addMessage(ComGoodsMsg.OnBtnBookClick, this.onBtnBookClick);
		this.addMessage(ComGoodsMsg.OnBtnOtherClick, this.onBtnOtherClick);
		this.addMessage(ComGoodsMsg.OnBtnQualityUpClick, this.onBtnQualityUpClick);
		this.addMessage(ComGoodsMsg.OnBtnQualityDownClick, this.onBtnQualityDownClick);
		this.addMessage(ComGoodsMsg.OnBtnTypeUpClick, this.onBtnTypeUpClick);
		this.addMessage(ComGoodsMsg.OnBtnTypeDownClick, this.onBtnTypeDownClick);
		this.addMessage(ComGoodsMsg.OnBtnScoreUpClick, this.onBtnScoreUpClick);
		this.addMessage(ComGoodsMsg.OnBtnScoreDownClick, this.onBtnScoreDownClick);
    }

	private onBtnShouCangClick() {
	
	}

	private onBtnEquipClick() {
	
	}

	private onBtnPropClick() {
	
	}

	private onBtnGemClick() {
	
	}

	private onBtnMaterialClick() {
	
	}

	private onBtnBookClick() {
	
	}

	private onBtnOtherClick() {
	
	}

	private onBtnQualityUpClick() {
	
	}

	private onBtnQualityDownClick() {
	
	}

	private onBtnTypeUpClick() {
	
	}

	private onBtnTypeDownClick() {
	
	}

	private onBtnScoreUpClick() {
	
	}

	private onBtnScoreDownClick() {
	
	}

}