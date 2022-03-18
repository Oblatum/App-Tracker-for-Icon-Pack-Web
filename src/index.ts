import "./style.scss";
import "./favicon.png";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  appIconApi,
  appInfoApi,
  getallApi,
  regexApi,
  signatureAppInfoApi,
} from "./api";
import { appInfoJSON, IconJSON } from "./types";
let yearEl = document.getElementById("year") as HTMLElement;
let xqEls = document.getElementsByClassName("xq") as HTMLCollection;
let formEl = document.getElementById("form") as HTMLFormElement;
let keywordEl = document.getElementById("keyword") as HTMLInputElement;
let searchTypeEl = document.getElementById("search-type") as HTMLSelectElement;
let resultAreaEl = document.getElementsByClassName(
  "result-area"
)[0] as HTMLElement;
let hideNilEl = document.getElementById("hide-nil") as HTMLElement;
let searchTypeAttrs = [
  {
    placeholder: "关键词……",
    disabled: false,
    api: appInfoApi,
  },
  {
    placeholder: "正则表达式……",
    disabled: false,
    api: regexApi,
  },
  {
    placeholder: "打咩打咩！❌",
    disabled: true,
    api: getallApi,
  },
  {
    placeholder: "Signature...",
    disabled: false,
    api: signatureAppInfoApi,
  },
];

// 自定义事件：DOM 更新
const domUpdateEvent = new CustomEvent("domupdate");
document.addEventListener("domupdate", async () => {
  console.log("Dom 已更新");
  conConMenu();
  setSelectItem();
  if (hideNilEl.classList.contains("on")) {
    filterNil();
    localStorage.setItem("hideNil", "true");
  } else {
    filterNil(false);
    localStorage.removeItem("hideNil");
  }
});

// 立即执行
// 当前年份
yearEl.textContent = new Date().getFullYear().toString();

// 复原开关状态
if (localStorage.getItem("hideNil")) {
  hideNilEl.classList.add("on");
}

/**
 * 监听
 * **/

// 注册隐藏空白开关
hideNilEl.addEventListener("click", (ev) => {
  let el = ev.currentTarget as HTMLElement;
  el.classList.toggle("on");
  document.dispatchEvent(domUpdateEvent);
});

// 注册关闭按钮
for (let index = 0; index < xqEls.length; index++) {
  xqEls[index].addEventListener("click", (ev) => {
    const xqEl = ev.currentTarget as HTMLElement;
    const xqTargetEl = xqEl.parentNode as HTMLElement;
    xqTargetEl.remove();
  });
}

// 表单提交

formEl.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let typeIndex = +searchTypeEl.value;
  let api = searchTypeAttrs[typeIndex].api;
  switch (typeIndex) {
    case 0:
      setLoadingAn().then(() => {
        api
          .request({
            query: {
              q: keywordEl.value.trim(),
            },
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            conTable(json, "搜索").then((tb) => {
              resultAreaEl.innerHTML = tb;
              document.dispatchEvent(domUpdateEvent);
            });
          });
      });
      break;
    case 1:
      setLoadingAn().then(() => {
        api
          .request({
            query: {
              regex: keywordEl.value.trim(),
            },
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            conTable(json, "正则").then((tb) => {
              resultAreaEl.innerHTML = tb;
              document.dispatchEvent(domUpdateEvent);
            });
          });
      });
      break;
    case 2:
      setLoadingAn().then(() => {
        api
          .request({})
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            conTable(json, "浏览").then((tb) => {
              resultAreaEl.innerHTML = tb;
              document.dispatchEvent(domUpdateEvent);
            });
          });
      });
      break;
    case 3:
      setLoadingAn().then(() => {
        api
          .request({
            path: {
              signature: keywordEl.value.trim(),
            },
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            conTable(json, "来源").then((tb) => {
              resultAreaEl.innerHTML = tb;
              document.dispatchEvent(domUpdateEvent);
            });
          });
      });
      break;
    default:
      break;
  }
});

// 注册切换搜索类型
searchTypeEl.addEventListener("change", (ev) => {
  let selectEl = ev.currentTarget as HTMLSelectElement;
  let type = +selectEl.value;
  keywordEl.placeholder = searchTypeAttrs[type].placeholder;
  keywordEl.style.textDecorationLine =
    searchTypeAttrs[type].disabled && keywordEl.value ? "line-through" : "none";
  keywordEl.disabled = searchTypeAttrs[type].disabled;
});

// 选择文本
function selectText(el: HTMLElement) {
  window.getSelection()?.removeAllRanges();
  let selection = getSelection();
  let range = document.createRange();
  let selectedContent: string;
  range.selectNodeContents(el);
  selection?.addRange(range);
  selectedContent = selection?.toString() as string;
  return selectedContent;
}

// 复制操作
async function copyText(text: string) {
  let clipboard = navigator.clipboard;
  if (clipboard === undefined) {
    return new Promise(() => {
      let input = document.createElement("input");
      document.body.appendChild(input);
      input.value = text.trim();
      input.style.visibility = "hidden";
      input.select();
      document.execCommand("copy");
      input.remove();
    });
  }
  return await clipboard.writeText(text.trim());
}

// contextmenu 失焦
document.addEventListener("mousedown", (ev) => {
  let cev = ev as MouseEvent;
  let contextMenuEl = document.getElementById("td-context-menu") as HTMLElement;
  const path = ev.composedPath();
  if (contextMenuEl) {
    if (!path.includes(contextMenuEl)) {
      contextMenuEl.classList.add("activated");
      contextMenuEl.remove();
    }
  }
});

// 生成表格
async function conTable(json: appInfoJSON, type: string) {
  return await new Promise<string>((resolve) => {
    let items = json.items;
    let payload = "";
    let tbodyHtml = "";
    let tpl = `
    <div class="last-search breadcrumb">
          <span class="breadcrumb-item">搜索结果</span>
          <span class="breadcrumb-separator"><i class="fa fa-chevron-right"></i></span>
          <span class="breadcrumb-item">${type}</span>
          <span class="breadcrumb-separator"><i class="fa fa-chevron-right"></i></span>
          <span class="breadcrumb-item">${keywordEl.value.trim()}</span>
        </div>
        <table id="result-table" class="table">
          <thead>
            <tr>
              <th>应用名</th>
              <th>包名</th>
              <th>启动项</th>
            </tr>
          </thead>
          <tbody id="tbody">
            yrDlxhnzwWwd&^4=0f5/ltQl8555rbqclazz
          </tbody>
        </table>
    `;
    items.forEach((v) => {
      payload += "<tr>";
      payload += `<td appid="${v.id}">${v.appName}</td>`;
      payload += `<td>${v.packageName}</td>`;
      payload += `<td>${v.activityName}</td>`;
      payload += "</tr>";
    });
    tbodyHtml = tpl.replace("yrDlxhnzwWwd&^4=0f5/ltQl8555rbqclazz", payload);
    resolve(tbodyHtml);
  });
}

// 过滤空白应用名
function filterNil(yes = true) {
  let tbodyEl = document.getElementById("tbody") as HTMLTableSectionElement;
  if (tbodyEl) {
    let trEls = tbodyEl.children;
    if (yes) {
      for (let index = 0; index < trEls.length; index++) {
        if (trEls[index].children[0].textContent === "") {
          trEls[index].setAttribute("style", "display: none;");
        }
      }
    } else {
      for (let index = 0; index < trEls.length; index++) {
        trEls[index].removeAttribute("style");
      }
    }
  }
}

// 注册双击选择区域
function setSelectItem() {
  let tbodyEl = document.getElementById("tbody") as HTMLTableSectionElement;
  if (tbodyEl) {
    let tdEls = tbodyEl.getElementsByTagName("td") as HTMLCollection;
    for (let index = 0; index < tdEls.length; index++) {
      tdEls[index].addEventListener("dblclick", (ev) => {
        let tdEl = ev.target as HTMLTableCellElement;
        selectText(tdEl);
      });
    }
  }
}

// 设置加载动画
function setLoadingAn() {
  let ftHtml = `
  <div class="result-area">
        <div class="result-loading">
            <div class="lds-dual-ring"></div>
        </div>`;
  return new Promise<void>((resolve) => {
    resultAreaEl.innerHTML = ftHtml;
    resolve();
  });
}

// 下载文件
async function downloadFile(url: string, fileName: string) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      let response;
      response = await fetch(url);
      let blob = await response.blob();
      let objectUrl = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      a.click();
      a.remove();
      resolve();
    } catch (error) {
      reject();
    }
  });
}

// 生成右键菜单
function conConMenu() {
  let contextMenuEl =
    document.getElementById("td-context-menu") ?? document.createElement("div");
  contextMenuEl.id = "td-context-menu";
  contextMenuEl.classList.add("context-menu");
  let tpl = `
          <div class="context-menu-item disabled">
            <div class="lds-circle loading"><div></div></div>
          </div>
          <div class="context-menu-item">
            复制 appfilter.xml
          </div>
          <div class="context-menu-item">
            复制 应用名
          </div>
          <div class="context-menu-item">
            复制 包名
          </div>
          <div class="context-menu-item">
            复制 启动项
          </div>
          <div class="context-menu-item">
            复制 ID
          </div>`;
  let tbodyEl = document.getElementById("tbody") as HTMLTableSectionElement;
  if (tbodyEl) {
    let trEls = tbodyEl.children as HTMLCollection;
    for (let index = 0; index < trEls.length; index++) {
      trEls[index].addEventListener("contextmenu", (ev) => {
        ev.preventDefault();
        let cev = ev as PointerEvent;
        document.body.appendChild(contextMenuEl);
        contextMenuEl.innerHTML = tpl;
        contextMenuEl.oncontextmenu = (ev) => {
          ev.preventDefault();
        };
        let menuClientWidth = contextMenuEl.clientWidth;
        let menuClientHeight = contextMenuEl.clientHeight;
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        let pageX = cev.pageX;
        let pageY = cev.pageY;
        let x: number;
        let y: number;
        x = pageX;
        y = pageY;
        if (pageX + menuClientWidth > clientWidth) {
          x -= menuClientWidth;
          contextMenuEl.style.transformOrigin = `${menuClientWidth}px 0`;
          if (pageY + menuClientHeight > clientHeight) {
            y -= menuClientHeight;
            contextMenuEl.style.transformOrigin = `${menuClientWidth}px ${menuClientHeight}px`;
          }
        } else {
          contextMenuEl.style.transformOrigin = `0 0`;
          if (pageY + menuClientHeight > clientHeight) {
            y -= menuClientHeight;
            contextMenuEl.style.transformOrigin = `0 ${menuClientHeight}px`;
          }
        }
        contextMenuEl.style.left = x + "px";
        contextMenuEl.style.top = y + "px";
        contextMenuEl.classList.remove("activated");
        let el = ev.currentTarget as HTMLElement;
        let appName = el.children[0].textContent as string;
        let appPackageName = el.children[1].textContent as string;
        let appActivity = el.children[2].textContent as string;
        let appId = el.children[0].getAttribute("appid") as string;
        let appFilter = `<item component="ComponentInfo{${appPackageName}/${appActivity}}" drawable="${appName}" />`;
        let appIconWrapEl = contextMenuEl.children[0];
        let copyAppFilterEl = contextMenuEl.children[1];
        let copyAppNameEl = contextMenuEl.children[2];
        let copyAppPackageNameEl = contextMenuEl.children[3];
        let copyAppActivityEl = contextMenuEl.children[4];
        let copyAppIdEl = contextMenuEl.children[5];
        let iconEl = new Image();
        appIconApi
          .request({
            query: {
              appId: encodeURIComponent(appPackageName.trim()),
            },
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            let imageInfo = json as IconJSON;
            iconEl.src = imageInfo.image;
            iconEl.onload = () => {
              appIconWrapEl.replaceChildren(iconEl);
              iconEl.addEventListener("click", (ev) => {
                downloadFile(iconEl.src, `${appPackageName}.jpg`)
                  .then(() => {
                    contextMenuEl.classList.add("activated");
                    setTimeout(() => {
                      contextMenuEl.remove();
                    }, 500);
                    conMsgBanner(
                      document.createTextNode("图标下载成功！"),
                      "success"
                    );
                  })
                  .catch(() => {
                    conMsgBanner(
                      document.createTextNode("图标下载失败！"),
                      "error"
                    );
                  });
              });
            };
          });

        copyAppFilterEl.addEventListener("click", (ev) => {
          copyText(appFilter)
            .then(() => {
              contextMenuEl.classList.add("activated");
              setTimeout(() => {
                contextMenuEl.remove();
              }, 500);
              conMsgBanner(document.createTextNode("复制成功！"), "success");
            })
            .catch(() => {
              conMsgBanner(document.createTextNode("复制失败！"), "error");
            });
        });
        copyAppNameEl.addEventListener("click", (ev) => {
          copyText(appName)
            .then(() => {
              contextMenuEl.classList.add("activated");
              setTimeout(() => {
                contextMenuEl.remove();
              }, 500);
              conMsgBanner(document.createTextNode("复制成功！"), "success");
            })
            .catch(() => {
              conMsgBanner(document.createTextNode("复制失败！"), "error");
            });
        });
        copyAppPackageNameEl.addEventListener("click", (ev) => {
          copyText(appPackageName)
            .then(() => {
              contextMenuEl.classList.add("activated");
              setTimeout(() => {
                contextMenuEl.remove();
              }, 500);
              conMsgBanner(document.createTextNode("复制成功！"), "success");
            })
            .catch(() => {
              conMsgBanner(document.createTextNode("复制失败！"), "error");
            });
        });
        copyAppActivityEl.addEventListener("click", (ev) => {
          copyText(appActivity)
            .then(() => {
              contextMenuEl.classList.add("activated");
              setTimeout(() => {
                contextMenuEl.remove();
              }, 500);
              conMsgBanner(document.createTextNode("复制成功！"), "success");
            })
            .catch(() => {
              conMsgBanner(document.createTextNode("复制失败！"), "error");
            });
        });
        copyAppIdEl.addEventListener("click", (ev) => {
          copyText(appId)
            .then(() => {
              contextMenuEl.classList.add("activated");
              setTimeout(() => {
                contextMenuEl.remove();
              }, 500);
              conMsgBanner(document.createTextNode("复制成功！"), "success");
            })
            .catch(() => {
              conMsgBanner(document.createTextNode("复制失败！"), "error");
            });
        });
      });
    }
  }
}

// 生成提示
function conMsgBanner(el: Node, status: string) {
  let bannerEl = document.createElement("div");
  bannerEl.classList.add("fade-banner");
  bannerEl.classList.add(status);
  bannerEl.append(el);
  document.body.appendChild(bannerEl);
  setTimeout(() => {
    bannerEl.remove();
  }, 4000);
}
