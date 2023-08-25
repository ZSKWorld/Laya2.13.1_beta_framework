import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { ChatMsg, RenderChatMsgView } from "../../view/PkgMain/Renders/RenderChatMsgView";
import { RenderFriendView } from "../../view/PkgMain/Renders/RenderFriendView";
import { UIChatMsg, UIChatView } from "../../view/PkgMain/UIChatView";

export interface UIChatData {

}

export class UIChatCtrl extends BaseViewCtrl<UIChatView, UIChatData>{
  private _msgs: ChatMsg[] = [];

  override onAwake(): void {
    this.addMessage(UIChatMsg.OnBtnSendClick, this.onBtnSendClick);
    this.addMessage(UIChatMsg.OnBtnBackClick, this.onBtnBackClick);

    UIUtility.SetList(this.view.ListFriend, true, this, this.onFriendListRenderer, this.onFriendListClick);
    UIUtility.SetList(this.view.ListMsg, true, this, this.onMsgListRenderer);
  }

  override onEnable(): void {
    this.refreshFriendList();
    this.refreshMsgList();
  }

  override onDisable(): void {

  }

  override onDestroy(): void {

  }

  refreshFriendList() {
    this.view.ListFriend.numItems = userData.friends.length;
  }

  refreshMsgList() {
    this.view.ListMsg.numItems = this._msgs.length;
  }

  private onFriendListRenderer(index: number, item: RenderFriendView) {
    item.refresh(userData.friends[ index ]);
  }

  private onFriendListClick(item: RenderFriendView, _, index: number) {
    this.view.setState(1);
  }

  private onMsgListRenderer(index: number, item: RenderChatMsgView) {
    if (index % 2 == 0) this._msgs[ index ].uid = userData.uid;
    item.refresh(this._msgs[ index ]);
  }

  private onBtnSendClick(): void {
    const str = "sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5";
    const temp = str.substring(0, (Math.random() * str.length) << 0);
    if (!temp) return;
    this._msgs.push({ uid: "", text: temp });
    this.refreshMsgList();
    this.view.ListMsg.scrollToView(this._msgs.length - 1, true);
  }

  private onBtnBackClick(): void {
    this.removeSelf();
  }

}