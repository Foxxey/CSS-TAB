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
    },
    Mof1: {
        name: 'Mof1',
        creator: 'epicX67'
    }
};

let cssarray = Object.entries(css);

let website = "https://foxxey.github.io/CSS-TAB/"
cssarray.forEach((ID, val) => {eval(`if (!val["css"]) css.${ID[0]}.css = "${website}css/${ID[0]}.css"; if (!val["image"]) css.${ID[0]}.image = "${website}image/${ID[0]}.png"`)});
for(let i = 0; i < bi; i++) backgrounds.push(`${website}background/${i+1}.jpg`)

var options = {default: "Krunker Default", random: "Random CSS"}; cssarray.forEach((ID, val) => {let tempObj = new Object; eval(`tempObj.${ID[0]} = "${ID[1]["name"]}"`); Object.assign(options, tempObj)}); 
function rndScript() {let tempObj = []; cssarray.splice(0).forEach((ID) => {tempObj.push(ID[1]["css"])});return tempObj[Math.floor(Math.random() * tempObj.length)];};

this.meta = {
    name: "CSS Loader",
    version: "1.2",
    author: "Foxxey",
    description: "A visual krunker css loader"
};

this.config = {
    apiversion: "1.0",
    locations: ["all"],
    platforms: ["all"],
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
    document.getElementById("basecss").innerHTML = `@import url(${website}css/CSS-TAB.css)`
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