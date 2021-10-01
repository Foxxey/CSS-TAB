let bi = 3;
let backgrounds = [];

let css = {
    KrunkerOG: {
        name: 'Krunker OG',
        creator: 'tae#4444'
    },
    YukiAim: {
        name: 'Yuki Aim',
        creator: 'tae#4444'
    },
    xCirno: {
        name: 'xCirno',
        creator: 'rei#0360'
    },
    Masu2: {
        name: 'Masu V2',
        creator: 'envy#9335'
    },
    Goldlux: {
        name: 'Goldlux',
        creator: 'unknown'
    },
    Reizu39e: {
        name: '39e',
        creator: 'rei#0360'
    },
    Omori: {
        name: 'Omori',
        creator: 'tae#4444'
    },
    v79: {
        name: 'v79',
        creator: 'Sparki#5962'
    },
    Monochrome: {
        name: 'MONOCHROME',
        creator: 'unknown'
    },
    KaterAlbatros: {
        name: 'KaterAlbatros',
        creator: 'rei#0360'
    },
    Msal: {
        name: 'Msal',
        creator: '青咲イロナではない人#8599'
    },
    Rose: {
        name: 'Rose',
        creator: 'unknown'
    }
};

let website = "https://foxxey.github.io/CSS-TAB/"
Object.entries(css).forEach((ID, val) => {eval(`if (!val["css"]) css.${ID[0]}.css = "${website}css/${ID[0]}.css"; if (!val["image"]) css.${ID[0]}.image = "${website}image/${ID[0]}.png"`)});
for(let i = 0; i < bi; i++) backgrounds.push(`${website}background/${i+1}.jpg`)

let cssarray = Object.entries(css);
var options = {default: "Krunker Default", random: "Random CSS"}; Object.entries(css).forEach((ID, val) => {let tempObj = new Object; eval(`tempObj.${ID[0]} = "${ID[1]["name"]}"`); Object.assign(options, tempObj)}); 
function rndScript() {let tempObj = []; Object.entries(css).splice(0).forEach((ID) => {tempObj.push(ID[1]["css"])});return tempObj[Math.floor(Math.random() * tempObj.length)];};

module.exports = {
    name: "CSS Loader",
    author: "Foxxey",
    locations: ["game"],
    settings: {
        CSSLoader: {
            name: 'CSS Loader',
            id: 'CSSLoader',
            cat: 'Interface',
            type: 'select',
            options,
            val: 'default',
            html: function () {
                return (window?.kpdUtil || window?.clientUtil).genCSettingsHTML(this);
            },
            set: (value) => {
                if (value=="random") document.getElementById('customcss').innerHTML = `@import url(${rndScript()});`;
                else document.getElementById('customcss').innerHTML = `@import url(${(css[value]?.["css"]) || ""})`;
            }
        }
    },
};

document.addEventListener('DOMContentLoaded', () => {
    let customcss = document.createElement('style');
    customcss.setAttribute("id", "customcss")
    document.body.appendChild(Object.assign(customcss));

    let basecss = document.createElement('style');
    basecss.setAttribute("id", "basecss")
    document.body.appendChild(Object.assign(basecss));
    document.getElementById("basecss").innerHTML = `.CSSBtn{text-align:center;display:inline-block;cursor:pointer;font-size:17px;padding:4px 8px;margin-left:8px;float:right;border-radius:4px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.CSSBox2{color:#fff!important;text-shadow:-1px -1px 0 #202020,1px -1px 0 #202020,-1px 1px 0 #202020,1px 1px 0 #202020,-2px -2px 0 #202020,2px -2px 0 #202020,-2px 2px 0 #202020,2px 2px 0 #202020,-3px -3px 0 #202020,3px -3px 0 #202020,-3px 3px 0 #202020,3px 3px 0 #202020;border:4px solid rgba(255,255,255,.5);vertical-align:top;position:relative;display:inline-block;background-color:rgba(0,0,0,.4);text-align:center;height:15vw!important;min-height:213px;min-width:213px;width:calc(25% - 18px);line-height:500px;cursor:pointer;border-radius:6px;font-size:23px;margin:5px;background-size:cover;background-position:center;background-repeat:no-repeat}.CSSBox2:hover{opacity:.8;border:4px solid #fff}.CSSBox2:hover .CSSIH{display:block}.CSSBox{border:4px solid rgba(255,255,255,.5);vertical-align:top;position:relative;display:inline-block;background-color:rgba(0,0,0,.4);text-align:center;height:165px;line-height:200px;cursor:pointer;border-radius:6px;font-size:23px;}.CSSBox:hover{opacity:.8;border:4px solid #fff}.CSSBox:hover .CSSIH{display:block}.CSSIH{display:none;background-color:rgba(0,0,0,.85);position:absolute;height:100%;top:0;width:100%}.CSSInf{position:absolute;top:50%;transform:translate(-50%,-50%);left:50%;line-height:initial;font-size:27px}#loadingBg{background-image:url("${backgrounds[Math.floor(Math.random() * backgrounds.length)]}");background-size:1920px 1080px;background-repeat:no-repeat;background-attachment:fixed;background-position:center;background-origin:border-box}#initLoader{display:none}#instructions>*>.lds-ring{width:unset;height:unset}#endUI,#instructions,#instructions>*>.lds-ring>*,#vignette,canvas{display:none!important}#instructionHolder{background-color:#0000!important}#instructionsUpdate{border-radius:20px!important;background-color:#000000d4;backdrop-filter:blur(10px);text-align:center;box-shadow:0 0 0 3pt #fff}`
    document.body.appendChild(document.getElementById('instructionsUpdate'));
    let windowsObserver = new MutationObserver(() => {
        windowsObserver.disconnect();
        document.getElementById("basecss").innerHTML = document.getElementById("basecss").innerHTML.replace("#endUI,#instructions,#instructions>*>.lds-ring>*,#vignette,canvas{display:none!important}","");
        settingsWindow = window.windows[0];
        // Patch getSettings to fix custom tab bug
        let origGetSettings = settingsWindow.getSettings;
        settingsWindow.getSettings = (...args) => origGetSettings.call(settingsWindow, ...args).replace(/^<\/div>/, '') + generate();
        
        let clientTabIndex = settingsWindow.tabs.push({ name: 'CSS', categories: [] });
        function generate() {
            if (settingsWindow.settingSearch || clientTabIndex != settingsWindow.tabIndex + 1 && !settingsWindow.settingSearch) return '';
            let tempHTML = `<div style="position: absolute; z-index:1"><div class="CSSBtn" style="background-color:#ff3232">Default</div><div class="CSSBtn" style="background-color:#00c4ff">Random</div></div><div style="padding-top: 40px;">`;
            cssarray.forEach(([ID, val]) => {
                tempHTML +=`<div class='CSSBox2' ID='${ID}' style='background-image: url(${val["image"]});'>${val['name']}<div class='CSSIH'><div class='CSSInf'>by ${val['creator']}</div></div></div>`;
            });
            return tempHTML + "</div>";
        };

        document.body.addEventListener("click", (e) => {
            let tempArr = e.path.filter(value => [...document?.getElementsByClassName("CSSBox2") || "ඞ"].includes(value));
            if (tempArr.length) {
                let tempId = tempArr[0].id;
                document.getElementById('customcss').innerHTML = `@import url(${css[tempId]['css']})`; (window?.kpdUtil || window?.clientUtil).setCSetting("CSSLoader", tempId);
                document.getElementById('customcss').setAttribute("value",tempId);
            } else if (e.path.includes(document?.getElementsByClassName("CSSBtn")[1])) {
                document.getElementById('customcss').innerHTML = `@import url(${rndScript()});`; (window?.kpdUtil || window?.clientUtil).setCSetting("CSSLoader", "random");
            } else if (e.path.includes(document?.getElementsByClassName("CSSBtn")[0])) {
                document.getElementById('customcss').innerHTML=''; (window?.kpdUtil || window?.clientUtil).setCSetting("CSSLoader", "default");
            } else if (e.path.includes(document?.getElementsByClassName("settingTab")[8])) {
                (window?.kpdUtil || window?.clientUtil).setCSetting("CSSLoader", document.getElementById('customcss').getAttribute("value"));
            }
        });
    });

    windowsObserver.observe(document.getElementById('instructions'), { childList: true });
});