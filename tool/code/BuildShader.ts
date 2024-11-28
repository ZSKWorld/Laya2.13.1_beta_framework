/**
 * Tips:
 * 1.暂不支持带骨骼的shader转换
 * 2.记得更换unityProjectPath项目文件夹路径
 * 3.~~~~
 */
const fs = require("fs");
const path = require("path");
//unity项目文件夹
const unityProjectPath = "E:/work_SVN/art/V2cat/Cat_Project/";
//本地unity编译后glsl文件夹，这个文件夹是临时文件夹，需要打开unity才会生成，选择
//需要导出的shader然后点击compileCode生成.shader文件后在执行该脚本进行转换
const unityCompiledShadrDir = `${ unityProjectPath }Temp`;
//unity 导出shader脚本文件夹
const unityExportShaderDir = `${ unityProjectPath }Assets/Editor/ExportShaders`;
//unity exportFactory文件路径
const unityExportFactoryPath = `${ unityExportShaderDir }/ExportShaderFactory.cs`;
//unity ExportShader模板文件路径
const unityExportShaderTemplatePath = path.resolve(__dirname, "./template/ExportShaderTemplate.txt");

//material模板文件路径
const materialTemplatePath = path.resolve(__dirname, "./template/MaterialTemplate.txt");
//materialFactory模板文件路径
const materialFactoryTemplatePath = path.resolve(__dirname, "./template/MaterialFactoryTemplate.txt");
//shader转换后存放文件夹
const allShaderDir = path.resolve(__dirname, "../../src/script/game/3d/shaders");
//ShaderControl路径
const shaderControlPath = path.resolve(__dirname, "../../src/script/game/3d/common/ShaderControl.ts");

const RenderType = {
    Opaque: "this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;",
    Transparent: "this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;",
};

const UniformValueType = {
    float: ": number;\n",
    sampler2D: ": string;\n",
    vec4: ": FixedLengthArray<number, 4>;\n",
    vec3: ": FixedLengthArray<number, 3>;\n",
};

const UniformType = {
    float: "float",
    sampler2D: "sampler2D",
    vec4: "vec4",
    vec3: "vec3",
};
const LayaMapDefine = {
    u_WorldMat: "            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,\n",
    u_ViewProjection: "            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,\n",
    u_View: "            u_View: Laya.Shader3D.PERIOD_CAMERA,\n",
    u_CameraPos: "            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,\n",
    u_Time: "            u_Time: Laya.Shader3D.PERIOD_SCENE,\n",
    u_MvpMatrix: "            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,\n",
    a_Color: "            a_Color: Laya.VertexMesh.MESH_COLOR0,\n",
    a_Normal: "            a_Normal: Laya.VertexMesh.MESH_NORMAL0,\n",
    a_Position: "            a_Position: Laya.VertexMesh.MESH_POSITION0,\n",
    a_Texcoord0: "            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,\n",
    a_Texcoord1: "            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,\n",
};
const Replaces = [
    { regFirst: "_glesVertex", regSecond: "g", replace: "a_Position" },
    { regFirst: "_glesColor", regSecond: "g", replace: "a_Color" },
    { regFirst: "_glesNormal", regSecond: "g", replace: "a_Normal" },
    { regFirst: "_glesMultiTexCoord0", regSecond: "g", replace: "a_Texcoord0" },
    { regFirst: "_glesMultiTexCoord1", regSecond: "g", replace: "a_Texcoord1" },
    { regFirst: "unity_ObjectToWorld", regSecond: "g", replace: "u_WorldMat" },
    { regFirst: "uniform highp mat4 unity_WorldToObject;", regSecond: "g", replace: "//unity_WorldToObject;" },
    { regFirst: "unity_MatrixVP", regSecond: "g", replace: "u_ViewProjection" },
    { regFirst: "unity_MatrixV", regSecond: "g", replace: "u_View" },
    { regFirst: "_WorldSpaceCameraPos", regSecond: "g", replace: "u_CameraPos" },
    { regFirst: "uniform highp vec4 _Time;", regSecond: "g", replace: "uniform highp float u_Time;" },
    { regFirst: /gl_Position.*;/, regSecond: undefined, replace: "gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));" },
    { regFirst: /gl_FragData\[0\]/, regSecond: "g", replace: "gl_FragColor" },
];
class CreateShader {
    start() {
        const compiledShaderDirExist = fs.existsSync(unityCompiledShadrDir) == false;
        const materialTemplateExist = fs.existsSync(materialTemplatePath) == false;
        const materialFactoryTemplateExist = fs.existsSync(materialFactoryTemplatePath) == false;
        console.log("-----------------------------------------------------------------------");
        console.log("-----------------------------------------------------------------------");
        if (compiledShaderDirExist) return console.log("unity编译后的shader文件夹./Temp不存在");
        if (materialTemplateExist) return console.log("材质类模板文件不存在");
        if (materialFactoryTemplateExist) return console.log("材质工厂类模板文件不存在");

        this.converetUnity2Laya();
        console.log("转换完毕");
        console.log("-----------------------------------------------------------------------");
        console.log("-----------------------------------------------------------------------");
    }

    converetUnity2Laya() {
        const unityShaders = fs.readdirSync(unityCompiledShadrDir).filter((value) => value.endsWith(".shader"));
        if (!unityShaders.length) {
            console.log("-----------------------------------------------------------------------");
            console.log("unityCompiledShaders 文件夹中没有可转换的.shader文件");
            console.log("-----------------------------------------------------------------------");
            return;
        }
        unityShaders.forEach((value) => {
            const filePath = path.resolve(unityCompiledShadrDir, value);
            const unityShaderStr = fs.readFileSync(filePath).toString();
            let name = value.substring(value.lastIndexOf("-") + 1, value.lastIndexOf("."));
            name = name[0].toUpperCase() + name.substring(1);
            const shaderStrArr = this.getVS_FS(unityShaderStr, name);
            shaderStrArr.forEach((shader) => {
                this.setAttributeUniform(shader);
                this.createFile(shader, unityShaderStr);
            });
        });
    }

    getVS_FS(codeStr, fileName) {
        const result = [];
        if (!codeStr) {
            return result;
        }
        const vsArr = codeStr.match(new RegExp(/#ifdef VERTEX(.|\n)*?#endif/, "g"))
            .map((value) => value.match(new RegExp(/\n(.|\n)*\n/, "g"))[0].trim());
        const fsArr = codeStr.match(new RegExp(/#ifdef FRAGMENT(.|\n)*?#endif/, "g"))
            .map((value) => value.match(new RegExp(/\n(.|\n)*\n/, "g"))[0].trim());
        const tags = codeStr.match(new RegExp(/Tags \{.*\}/, "g")).map((value) => {
            const valueArr = value.match(new RegExp(/"RenderType"=".*?"/, "g"))[0].split("=");
            const lastStr = valueArr[valueArr.length - 1];
            return lastStr.substring(1, lastStr.length - 1);
        });
        if (vsArr.length != fsArr.length) {
            throw new Error("顶点着色器和片元着色器数量不一样");
        } else {
            const shaderArr = [];
            vsArr.forEach((value, index) => {
                const vs = this.replaceUnity2Laya(value);
                const fs = this.replaceUnity2Laya(fsArr[index]);
                const name = fileName + (index ? `_${ index }` : "");
                shaderArr.push({
                    vs, fs, name, renderType: tags[index + 1]
                });
            });
            result.push({
                shaderInfo: shaderArr, shaderName: fileName, attribute: null, uniform: null, renderType: tags[0]
            });
            return result;
        }
    }

    replaceUnity2Laya(codeStr) {
        let result = codeStr;
        Replaces.forEach((value) => {
            result = result.replace(new RegExp(value.regFirst, value.regSecond), value.replace);
        });
        let topStr = "";
        let mainStr = "void main()\n{\n";
        if (result.indexOf("u_Time") != -1) {
            mainStr += "  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);\n";
        }
        if (result.indexOf("unity_WorldToObject") != -1) {
            if (result.indexOf("ShaderTool") == -1) {
                topStr += "#include \"ShaderTool.glsl\";\n";
            }
            if (result.indexOf("u_WorldMat") == -1) {
                topStr += "uniform mat4 u_WorldMat;\n";
            }
            mainStr += "  mat4 unity_WorldToObject = invert(u_WorldMat);\n";
        }

        result = topStr + result;
        result = result.replace(new RegExp(/void main(.|\n)*?{/, "g"), mainStr);
        return result;
    }

    setAttributeUniform(shader) {
        let allAttribute = [];
        let allUniform = [];
        shader.shaderInfo.forEach((infoValue) => {
            const vsAttribute = (infoValue.vs.match(new RegExp(/attribute.*;/, "g")) || []).map((value) => value.replace(";", ""));
            const vsUniform = (infoValue.vs.match(new RegExp(/uniform.*;/, "g")) || []).map((value) => value.replace(";", ""));
            const fsUniform = (infoValue.fs.match(new RegExp(/uniform.*;/, "g")) || []).map((value) => value.replace(";", ""));
            allAttribute = allAttribute.concat(vsAttribute);
            allUniform = allUniform.concat(vsUniform).concat(fsUniform);
        });

        shader.attribute = Array.from(new Set(allAttribute)).map((value) => {
            const valueArr = value.split(" ");
            const arrLength = valueArr.length;
            const attributeName = valueArr[arrLength - 1];
            return attributeName;
        });

        shader.uniform = Array.from(new Set(allUniform)).map((value) => {
            const valueArr = value.split(" ");
            const arrLength = valueArr.length;
            const uniName = valueArr[arrLength - 1];
            const uniType = valueArr[arrLength - 2];
            if (!LayaMapDefine[uniName]) {
                return { type: UniformType[uniType], name: uniName };
            } else {
                return { type: null, name: uniName };
            }
        });
    }

    /** 生成文件 */
    createFile(shader, codeStr) {
        if (fs.existsSync(allShaderDir) == false) {
            fs.mkdirSync(allShaderDir);
        }
        const shaderDir = `${ allShaderDir }/${ shader.shaderName.toLowerCase() }`;
        if (fs.existsSync(shaderDir) == false) {
            fs.mkdirSync(shaderDir);
        }
        this.createVSFS(shader, shaderDir);
        this.createMaterial(shader, shaderDir);
        this.createMaterialFactory(shader, shaderDir);
        this.addToShaderControl(shader);
        this.createUnityExportShader(shader);
        this.addToUnityExportFactory(shader, codeStr);
    }

    /** 生成.vs,.fs文件 */
    createVSFS(shader, shaderDir) {
        const { shaderInfo } = shader;
        const precise = "precision highp float;\n";
        const lighting = "#include \"Lighting.glsl\";\n";
        for (let i = 0; i < shaderInfo.length; i++) {
            const element = shaderInfo[i];
            const name = element.name.replace(/_/g, "");

            fs.writeFileSync(`${ shaderDir }/${ name }.vs`, lighting + element.vs);
            fs.writeFileSync(`${ shaderDir }/${ name }.fs`, precise + lighting + element.fs);
        }
    }

    /** 生成material文件 */
    createMaterial(shader, shaderDir) {
        let materialContent = fs.readFileSync(materialTemplatePath).toString();
        const shaderName = shader.shaderName.replace(/_/g, "");
        //处理shader name
        materialContent = materialContent.replace(/#MATERIALNAME#/g, shaderName);

        //处理rendertype
        materialContent = materialContent.replace(/#RENDERTYPE#/g, (RenderType[shader.renderType] || ""));
        // materialContent = materialContent.replace(/#RENDERTYPE#/g, "");

        const { shaderInfo, attribute, uniform } = shader;

        //处理import,shaderpass
        let importStr = "";
        let shaderPassStr = "";
        for (let i = 0; i < shaderInfo.length; i++) {
            const info = shaderInfo[i];
            const temp = (i || "");
            const name = info.name.replace(/_/g, "");
            importStr += `import fs${ temp } from "./${ name }.fs";\n`;
            importStr += `import vs${ temp } from "./${ name }.vs";\n`;
            shaderPassStr += `        subShader.addShaderPass(vs${ temp }, fs${ temp }, stateMap);\n`;
        }
        materialContent = materialContent.replace(/#IMPORTS#/g, importStr);
        materialContent = materialContent.replace(/#SHADERPASS#/g, shaderPassStr.trimEnd());

        //处理LayaMap-attribute,uniform
        let attributeStr = "";
        let uniformStr = "";
        for (const key in LayaMapDefine) {
            const mapDefine = LayaMapDefine[key];
            if (attribute.indexOf(key) != -1) {
                attributeStr += mapDefine;
            }
            for (let j = uniform.length - 1; j >= 0; j--) {
                const uni = uniform[j];
                if (uni.name == key) {
                    uniformStr += mapDefine;
                    uniform.splice(j, 1);
                    break;
                }
            }
        }
        //处理自定义uniformMap,shaderNameID,getter,setter,cloneTo
        let shaderNameID = "";
        let getterSetter = "";
        let cloneToStr = "";
        for (let i = 0; i < uniform.length; i++) {
            const element = uniform[i];
            const { name } = element;
            if (element.type) {
                uniformStr += `            ${ name }: Laya.Shader3D.PERIOD_MATERIAL,\n`;
                shaderNameID += `const ${ name } = Laya.Shader3D.propertyNameToID("${ name }");\n`;
                getterSetter += "\n";
                cloneToStr += `        destMaterial.${ name } = this.${ name };\n`;
                switch (element.type) {
                    case UniformType.float:
                        getterSetter
                            += `    public get ${ name }(): number {\n`
                            + `        return this._shaderValues.getNumber(${ name });\n`
                            + "    }\n"
                            + "\n"
                            + `    public set ${ name }(v: number) {\n`
                            + `        this._shaderValues.setNumber(${ name }, v);\n`
                            + "    }\n";
                        break;
                    case UniformType.sampler2D:
                        getterSetter
                            += `    public get ${ name }() {\n`
                            + `        return this._shaderValues.getTexture(${ name });\n`
                            + "    }\n"
                            + "\n"
                            + `    public set ${ name }(v: Laya.BaseTexture) {\n`
                            + `        this._shaderValues.setTexture(${ name }, v);\n`
                            + "    }\n";
                        break;
                    case UniformType.vec4:
                        getterSetter
                            += `    public get ${ name }() {\n`
                            + `        return this._shaderValues.getVector(${ name });\n`
                            + "    }\n"
                            + "\n"
                            + `    public set ${ name }(v: Laya.Vector4) {\n`
                            + `        this._shaderValues.setVector(${ name }, v);\n`
                            + "    }\n";
                        break;
                    case UniformType.vec3:
                        getterSetter
                            += `    public get ${ name }() {\n`
                            + `        return this._shaderValues.getVector3(${ name });\n`
                            + "    }\n"
                            + "\n"
                            + `    public set ${ name }(v: Laya.Vector3) {\n`
                            + `        this._shaderValues.setVector3(${ name }, v);\n`
                            + "    }\n";
                        break;

                    default: console.log("未知的uniform类型111=>   ", element.type, name); break;
                }
            } else {
                console.log("未知的uniform类型222=>   ", element.type, name);
            }
        }
        materialContent = materialContent.replace(/#ATTRIBUTE#/g, attributeStr);
        materialContent = materialContent.replace(/#UNIFORM#/g, uniformStr);
        materialContent = materialContent.replace(/#SHADERNAMEID#/g, shaderNameID);
        materialContent = materialContent.replace(/#GETTERSETTER#/g, getterSetter);
        materialContent = materialContent.replace(/#CLONETO#/g, cloneToStr.trimEnd());

        fs.writeFileSync(`${ shaderDir }/Material${ shaderName }.ts`, materialContent);
    }

    /** 生成materialFactory文件 */
    createMaterialFactory(shader, shaderDir) {
        let materialFactoryContent = fs.readFileSync(materialFactoryTemplatePath).toString();
        const shaderName = shader.shaderName.replace(/_/g, "");
        //处理shader name
        materialFactoryContent = materialFactoryContent.replace(/#MATERIALNAME#/g, shaderName);

        const { uniform } = shader;
        let materialConfigStr = "";
        const materialTextureArr = [];
        let materialTextureConfigStr = "";
        let materialValue = "";
        //类型分类
        for (let i = 0; i < uniform.length; i++) {
            const element = uniform[i];
            const { name } = element;
            const { type } = element;
            const no_name = name.replace("_", "");
            const lowerName = no_name[0].toLowerCase() + no_name.substr(1);
            if (type) {
                materialConfigStr += `    ${ lowerName }${ UniformValueType[type] }`;
                switch (type) {
                    case UniformType.float:
                        materialValue += `        shader.${ name } = item.${ lowerName };\n`;
                        break;
                    case UniformType.sampler2D:
                        materialValue += `        shader.${ name } = ${ lowerName };\n`;
                        materialTextureArr.push(lowerName);
                        materialTextureConfigStr += `            item.${ lowerName },\n`;
                        break;
                    case UniformType.vec4:
                        materialValue += `        shader.${ name } = new Laya.Vector4(...item.${ lowerName });\n`;
                        break;
                    case UniformType.vec3:
                        materialValue += `        shader.${ name } = new Laya.Vector3(...item.${ lowerName });\n`;
                        break;
                    default: console.log("未知的uniform类型333=>   ", type, name); break;
                }
            } else {
                console.log("未知的uniform类型444=>   ", type, name);
            }
        }
        materialFactoryContent = materialFactoryContent.replace(/#MATERIALCONFIG#/g, materialConfigStr);
        materialFactoryContent = materialFactoryContent.replace(/#MATERIALTEXTURE#/g, materialTextureArr.join(", "));
        materialFactoryContent = materialFactoryContent.replace(/#MATERIALTEXTURECONFIG#/g, materialTextureConfigStr);
        materialFactoryContent = materialFactoryContent.replace(/#MATERIALVALUE#/g, materialValue);
        fs.writeFileSync(`${ shaderDir }/MaterialFactory${ shaderName }.ts`, materialFactoryContent);
    }

    //在shaderControl注册shader
    addToShaderControl(shader) {
        const shaderName = shader.shaderName.replace(/_/g, "");
        let shaderControlContent = fs.readFileSync(shaderControlPath).toString();

        const content = `this.registerMaterialFactory\\(\\"${ shaderName }\\".*?;`;
        const str = shaderControlContent.match(new RegExp(content));
        if (!str) {
            const controlStr = `this.registerMaterialFactory("${ shaderName }", MaterialFactory${ shaderName });\r\n`
                + "\t\t//### 该行为批量转换shader定位行，不可进行任何删除或修改 ###//";
            shaderControlContent = shaderControlContent.replace(/\/\/##.*##\/\//g, controlStr);
            fs.writeFileSync(shaderControlPath, shaderControlContent);
        }
    }

    //创建unity导出自定义shader脚本文件
    createUnityExportShader(shader) {
        const shaderName = shader.shaderName.replace(/_/g, "");
        const { uniform } = shader;

        let unityExportShaderContent = fs.readFileSync(unityExportShaderTemplatePath).toString();

        //处理shader name
        unityExportShaderContent = unityExportShaderContent.replace(/#MATERIALNAME#/g, shaderName);

        let exportConfigStr = "";
        for (let i = 0; i < uniform.length; i++) {
            const { type, name } = uniform[i];
            switch (type) {
                case UniformType.float:
                    exportConfigStr += `\t\t\tnew ShaderExportConfig("${ name }", ShaderValueType.FLOAT),\n`;
                    break;
                case UniformType.sampler2D:
                    exportConfigStr += `\t\t\tnew ShaderExportConfig("${ name }", ShaderValueType.TEXTURE),\n`;
                    break;
                case UniformType.vec4:
                    exportConfigStr += `\t\t\tnew ShaderExportConfig("${ name }", ShaderValueType.VECTOR),\n`;
                    break;
                case UniformType.vec3:
                    exportConfigStr += `\t\t\tnew ShaderExportConfig("${ name }", ShaderValueType.VECTOR),\n`;
                    break;
                default: console.log("未知的uniform类型555=>   ", type, name); break;
            }
        }
        unityExportShaderContent = unityExportShaderContent.replace(/#EXPORTCONFIG#/g, exportConfigStr);

        const filePath = `${ unityExportShaderDir }/ExportShader${ shaderName }.cs`;
        fs.writeFileSync(filePath, unityExportShaderContent);
    }

    //在unity ExportShaderFactory中添加shader导出
    addToUnityExportFactory(shader, codeStr) {
        const switchKey = codeStr.match(new RegExp(/".*?"/))[0];
        const shaderName = shader.shaderName.replace(/_/g, "");

        let unityExportFactoryContent = fs.readFileSync(unityExportFactoryPath).toString();
        if (unityExportFactoryContent.indexOf(switchKey) != -1) {
            console.log(`unity factory中【${ switchKey }】已存在，请手动检查新老shader导出类名是否一致`);
            return;
        }
        const unityFactoryStr = `case ${ switchKey }:\n\t\t\t\treturn new ExportShader${ shaderName }();\n`
            + "\t\t\t//### 该行为批量添加shader导出配置定位行，不可进行任何删除或修改 ###//";
        unityExportFactoryContent = unityExportFactoryContent.replace(/\/\/###.*###\/\//g, unityFactoryStr);
        fs.writeFileSync(unityExportFactoryPath, unityExportFactoryContent);
    }
}

new CreateShader().start();
