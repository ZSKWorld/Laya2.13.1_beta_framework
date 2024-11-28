import { BuildConfig } from "./BuildConfig";
import { GetTemplateContent } from "./Utils";

export class BuildServerConfig extends BuildConfig {
    cfgMgrTemplate = GetTemplateContent("ServerCfgMgr");
}
