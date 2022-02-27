import "./styles.scss";
import "./favicon.png";
import loadinggif from "./loading.gif"
import "@fortawesome/fontawesome-free/js/all.js";
import { searchAPI, regexAPI, allAPI, signatureAPI, iconAPI } from "./api";

function nowYear() {
  let dt = new Date();
  return dt.getFullYear();
}

function conTbTpl(data: SearchAPIResData.ResRootObject) {
  const template = `<p class="last-rlt">搜索结果: ${lastKw}</p><div class="rlt-tb"><table class="tb"><thead><tr><th>应用名</th><th>包名</th><th>启动项</th></tr></thead><tbody id="tbd">yrDlxhnzwWwd&^4=0f5/ltQl8555rbqclazz</tbody></table></div></div>`;
  let seasoning = "";
  let ripeTableHtml;
  data.items.forEach((v) => {
    seasoning += "<tr>";
    seasoning += `<td appid="${v.id}">${v.appName}</td>`;
    seasoning += `<td>${v.packageName}</td>`;
    seasoning += `<td>${v.activityName}</td>`;
    seasoning += "</tr>";
  });
  ripeTableHtml = template.replace(
    "yrDlxhnzwWwd&^4=0f5/ltQl8555rbqclazz",
    seasoning
  );

  return ripeTableHtml;
}

function conloadingIcon() {
  rltEl.innerHTML = '<div class="lds-dual-ring"></div>';
}

function concopyLine() {
  let copyTokenEl = document.getElementById("copy-token");
  let copyIdEl = document.getElementById("copy-id");
  copyTokenEl?.addEventListener("click", (e) => {
    
    let coim = e.target as HTMLDivElement;
    let comn = coim.parentElement as HTMLDivElement;
    let rowindex = comn.getAttribute("targetln") as string;
    let tbd = document.getElementById("tbd") as HTMLTableSectionElement;
    let el = tbd.children[parseInt(rowindex) - 1];
    let appName = el.children[0].textContent,
      packageName = el.children[1].textContent,
      activityName = el.children[2].textContent;
    let copyTpl = `<item component="ComponentInfo{${packageName}/${activityName}}" drawable="${appName}" />`;
    let p = navigator.clipboard.writeText(copyTpl);
    p.then(() => {
      console.log("复制 Token 成功");
    });
  });

  copyIdEl?.addEventListener("click", (e) => {
    let coim = e.target as HTMLDivElement;
    let comn = coim.parentElement as HTMLDivElement;
    let rowindex = comn.getAttribute("targetln") as string;
    let tbd = document.getElementById("tbd") as HTMLTableSectionElement;
    let el = tbd.children[parseInt(rowindex) - 1];
    let id = el.children[0].getAttribute("appid");
    let copyTpl = id;
    let p = navigator.clipboard.writeText(copyTpl as string);
    p.then(() => {
      console.log("复制 Id 成功");
    });
  });
}

function concoMenu() {
  let tbdEl = document.getElementById("tbd") as HTMLTableSectionElement;
  tbdEl.oncontextmenu = (e) => {
    e.preventDefault();

    let tdEl = e.target as HTMLTableCellElement;
    let trEl = tdEl.parentElement as HTMLTableRowElement
    
    const docEl = document.documentElement;
    let docTop = getComputedStyle(docEl).top,
      offsetY = parseInt(docTop);
    if (isNaN(offsetY)) {
      offsetY = 0;
    }
    let x = e.pageX;
    let y = e.pageY - offsetY;

    let rem = parseInt(getComputedStyle(document.documentElement).fontSize);
    let clientW = docEl.clientWidth;
    let clientH = docEl.clientHeight;
    let cox = 10 * rem;
    let coy = 8 * rem;

    if (clientW - x - cox < 0) {
      x -= cox;
      if (clientH - y - coy < 0) {
        y -= coy;
      }
    } else {
      if (clientH - y - coy < 0) {
        y -= coy;
        if (clientW - x - cox < 0) {
          x -= cox;
        }
      }
    }

    let packageName = trEl.children[1].textContent as string;
    let copyMenuEl = document.createElement("div");

    copyMenuEl.classList.add("copy-menu");
    copyMenuEl.innerHTML = `<div class="copy-item"><img id="app-icon" src="${loadinggif}"></div><div id="copy-token" class="copy-item"><i class="fa fa-copy"></i>&nbsp;复制 Token</div><div id="copy-id" class="copy-item"><i class="fa fa-copy"></i>&nbsp;复制 Id</div>`;
    copyMenuEl.setAttribute("targetln", trEl.rowIndex.toString());
    copyMenuEl.style.position = "absolute";
    copyMenuEl.style.left = x + "px";
    copyMenuEl.style.top = y + "px";
    iconAPI.get([packageName]).then(dt => {
    let appIconEl = document.getElementById("app-icon") as HTMLImageElement;
      if(appIconEl != null) {
        let img = new Image();
        img.src = dt.data.image;
        img.onload = () => {
          appIconEl.src = img.src
        }
      }
    });

    document.body.insertAdjacentElement("beforeend", copyMenuEl);

    concopyLine();

    document.onmousedown = (e) => {
      let cpEl = e.target as HTMLElement;
      if (!cpEl.classList.contains("copy-item")) {
        copyMenuEl.remove();
      } else {
        setTimeout(() => {
          copyMenuEl.remove();
        }, 1000);
      }
    };
  };
}

let lastKw = "";

let kwEl = document.getElementById("kw") as HTMLInputElement;
let yearEl = document.getElementById("year") as HTMLSpanElement;
let srtpEl = document.getElementById("srtp") as HTMLSelectElement;
let formEl = document.getElementById("form") as HTMLFormElement;
let rltEl = document.getElementsByClassName("rlt-area")[0] as HTMLDivElement;

yearEl.textContent = nowYear().toString();
srtpEl?.addEventListener("change", () => {
  switch (srtpEl.value) {
    case "1":
      kwEl.disabled = false;
      kwEl.placeholder = "关键词……";
      break;
    case "2":
      kwEl.disabled = false;
      kwEl.placeholder = "正则表达式……";
      break;
    case "3":
      kwEl.disabled = true;
      kwEl.placeholder = "打咩打咩！❌";
      break;
    case "4":
      kwEl.disabled = false;
      kwEl.placeholder = "Signature...";
      break;
    default:
      break;
  }
});
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (typeof kwEl.value != "undefined") {
    switch (srtpEl.value) {
      case "1":
        conloadingIcon();
        searchAPI.get([kwEl.value, "1", "2147483647"]).then((dt) => {
          lastKw = kwEl.value;
          rltEl.innerHTML = conTbTpl(dt.data);
          concoMenu();
        });
        break;
      case "2":
        conloadingIcon();
        regexAPI.get([kwEl.value, "1", "2147483647"]).then((dt) => {
          lastKw = kwEl.value;
          rltEl.innerHTML = conTbTpl(dt.data);
          concoMenu();
        });
        break;
      case "3":
        conloadingIcon();
        allAPI.get(["1", "2147483647"]).then((dt) => {
          lastKw = kwEl.value;
          rltEl.innerHTML = conTbTpl(dt.data);
          concoMenu();
        });
        break;
      case "4":
        conloadingIcon();
        signatureAPI.get(["1", "2147483647"], [kwEl.value]).then((dt) => {
          lastKw = kwEl.value;
          rltEl.innerHTML = conTbTpl(dt.data);
          concoMenu();
        });
        break;
      default:
        break;
    }
  }
});
