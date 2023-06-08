import "./style.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { appIconApi, getAppInfoApi } from "./api";
import { appInfoJSON } from "./types";
import { registerSW } from "virtual:pwa-register";
if ("serviceWorker" in navigator) {
  registerSW();
}

enum SearchType {
  Keyword = 0,
  Regex = 1,
}

let yearEl = document.getElementById("year")!;
let xqEls = document.getElementsByClassName("xq")!;
let formEl = document.getElementById("form") as HTMLFormElement;
let keywordEl = document.getElementById("keyword") as HTMLInputElement;
let searchTypeEl = document.getElementById("search-type") as HTMLSelectElement;
let resultAreaEl = document.getElementsByClassName("result-area")[0]!;
let searchTypeAttrs = [
  {
    placeholder: "关键词……",
    disabled: false,
    api: getAppInfoApi,
  },
  {
    placeholder: "正则表达式……",
    disabled: false,
    api: getAppInfoApi,
  },
];

enum ImageMineType {
  "image/svg+xml" = "svg",
  "image/png" = "png",
  "image/jpeg" = "jpg",
  "image/webp" = "webp",
  "image/gif" = "gif",
}

// 自定义事件：DOM 更新
const domUpdateEvent = new CustomEvent("domupdate");
document.addEventListener("domupdate", async () => {
  conConMenu();
  setSelectItem();
  unlockScroll();
});

// 立即执行
// 当前年份
yearEl.textContent = new Date().getFullYear().toString();

/**
 * 监听
 * **/

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
    case SearchType.Keyword:
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
    case SearchType.Regex:
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

// isIOS
function isIOS() {
  let uaRegex = /(iPad|iPhone); CPU (iPad|iPhone) OS 1\d_.* like Mac OS X/gm;
  let pfRegex = /iPad|iPhone/gm;
  return pfRegex.test(navigator.platform) || uaRegex.test(navigator.userAgent);
}
// 选择文本
function selectText(el: HTMLElement) {
  window.getSelection()?.removeAllRanges();
  let selection = getSelection();
  let range = document.createRange();
  let selectedContent: string;
  range.selectNodeContents(el);
  selection?.addRange(range);
  selectedContent = selection?.toString()!;
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
  let contextMenuEl = document.getElementById("td-context-menu")!;
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
            <td id="xq">
                <i class="fa fa-xmark"></i>
              </td>
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

// 注册双击选择区域
function setSelectItem() {
  let tbodyEl = document.getElementById("tbody")!;
  if (tbodyEl) {
    let tdEls = tbodyEl.getElementsByTagName("td")!;
    for (let index = 0; index < tdEls.length; index++) {
      tdEls[index].addEventListener("dblclick", (ev) => {
        let tdEl = ev.target as HTMLTableCellElement;
        let cev = ev as PointerEvent;
        if (cev.pointerType != "mouse" && "ontouchstart" in window) {
        } else {
          selectText(tdEl);
        }
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
    let p = new Promise((resolve, reject) => {
      fetch(url)
        .catch((error) => {
          console.log("跨域了，但是没关系");
          let a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.download = fileName + "." + "png";
          a.click();
          a.remove();
          reject(error);
        })
        .then((response) => {
          resolve(response);
        });
    });
    let response = await p;
    if (response instanceof Response) {
      if (response.ok) {
        let contextType = response.headers.get("content-type");
        let blob = await response.blob();
        let objectUrl = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = objectUrl;
        a.download =
          fileName +
            "." +
            ImageMineType[contextType as keyof typeof ImageMineType] ?? "png";
        a.click();
        a.remove();
        resolve();
      } else {
        console.log("未知错误");
        reject();
      }
    } else {
      console.log("网络挂了");
      reject();
    }
  });
}

// unlock height

function unlockScroll() {
  let brEl = document.getElementsByClassName("breadcrumb-item")[0]!;
  brEl.addEventListener("click", () => {
    let tableEl = document.getElementById("result-table") as HTMLElement;
    tableEl.classList.add("expanded");
  });
  let xqEl = document.getElementById("xq") as HTMLElement;
  xqEl.addEventListener("click", () => {
    let tableEl = document.getElementById("result-table") as HTMLElement;
    tableEl.classList.remove("expanded");
  });
}

// 生成上下文菜单
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
  let tbodyEl = document.getElementById("tbody")!;
  if (tbodyEl) {
    let trEls = tbodyEl.children!;
    for (let index = 0; index < trEls.length; index++) {
      if (isIOS()) {
        let timer: ReturnType<typeof setTimeout>;
        trEls[index].addEventListener("touchstart", (ev) => {
          timer = setTimeout(() => {
            let cev = ev as PointerEvent;
            const iosContextMenu = new PointerEvent("contextmenu", {
              clientX: cev.pageX,
              clientY: cev.pageY,
            });
            trEls[index].dispatchEvent(iosContextMenu);
          }, 350);
        });

        document.addEventListener("touchstart", (ev) => {
          if (ev.composedPath().includes(tbodyEl)) {
            document.body.classList.add("disabled");
          } else document.body.classList.remove("disabled");
        });
        document.addEventListener("touchmove", (ev) => {
          if (ev.composedPath().includes(trEls[index])) {
            if (timer != undefined) {
              clearTimeout(timer);
            }
          }
        });
        document.addEventListener("touchend", (ev) => {
          if (ev.composedPath().includes(trEls[index])) {
            if (timer != undefined) {
              clearTimeout(timer);
            }
          }
        });
        document.addEventListener("touchcancel", (ev) => {
          if (ev.composedPath().includes(trEls[index])) {
            if (timer != undefined) {
              clearTimeout(timer);
            }
          }
        });
      }

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
        let appName = el.children[0].textContent!;
        let appPackageName = el.children[1].textContent!;
        let appActivity = el.children[2].textContent!;
        let appId = el.children[0].getAttribute("appid")!;
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
              packageName: encodeURIComponent(appPackageName.trim()),
            },
          })
          .then((response) => {
            return response.blob();
          })
          .then((icon) => {
            const url = URL.createObjectURL(icon);
            iconEl.src = url;
            iconEl.onload = () => {
              appIconWrapEl.replaceChildren(iconEl);
              iconEl.addEventListener("click", () => {
                downloadFile(iconEl.src, appPackageName)
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

        copyAppFilterEl.addEventListener("click", () => {
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
        copyAppNameEl.addEventListener("click", () => {
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
        copyAppPackageNameEl.addEventListener("click", () => {
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
        copyAppActivityEl.addEventListener("click", () => {
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
        copyAppIdEl.addEventListener("click", () => {
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
