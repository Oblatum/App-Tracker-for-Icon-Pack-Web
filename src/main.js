/***
 * API 定义
 * ***/

const server_url = "https://bot.k2t3k.tk/api";
const api_list = {
  search: "/search",
  regex: "/search/regex",
  all: "/getAll",
  sig: "/getAll/",
};

axios.defaults.baseURL = server_url;

/***
 * 变量
 * ***/

let lastRsp = null;

/***
 * DOM 定义
 * ***/

const selectorEl = document.getElementById("selector"),
  formEl = document.getElementById("form"),
  keywordEl = document.getElementById("keyword"),
  resultEl = document.getElementById("result-area"),
  trEls = document.getElementsByClassName("data-line"),
  rsThEls = document.getElementsByClassName("own-th");

/***
 * DOM 监听
 * ***/

selectorEl.addEventListener("change", (ev) => {
  const vl = ev.target.value;
  switch (vl) {
    case "search":
      keywordEl.hidden = false;
      keywordEl.required = true;
      keywordEl.value = "";
      keywordEl.placeholder = "关键词……";
      break;
    case "regex":
      keywordEl.hidden = false;
      keywordEl.required = true;
      keywordEl.value = "";
      keywordEl.placeholder = "正则表达式……";
      break;
    case "all":
      keywordEl.hidden = true;
      keywordEl.required = false;
      keywordEl.value = "";
      break;
    case "sig":
      keywordEl.hidden = false;
      keywordEl.required = true;
      keywordEl.value = "";
      keywordEl.placeholder = "Signature...";
      break;
    default:
      break;
  }
});

formEl.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const todo = selectorEl.value;
  switch (todo) {
    case "search":
      params = `?q=${encodeURIComponent(keywordEl.value)}&per=2147483647`;
      conloadingIcon();
      fetchAPI(todo, params).then((body) => {
        lastRsp = body;
        constructTb(body.data);
      });
      break;
    case "regex":
      params = `?q=${encodeURIComponent(keywordEl.value)}&per=2147483647`;
      conloadingIcon();
      fetchAPI(todo, params).then((body) => {
        lastRsp = body;
        constructTb(body.data);
      });
      break;
    case "all":
      params = "?per=2147483647";
      conloadingIcon();
      fetchAPI(todo, params).then((body) => {
        lastRsp = body;
        constructTb(body.data);
      });
      break;
    case "sig":
      params = `${encodeURIComponent(keywordEl.value)}?per=2147483647`;
      conloadingIcon();
      fetchAPI(todo, params).then((body) => {
        lastRsp = body;
        constructTb(body.data);
      });
      break;
    default:
      break;
  }
});

/***
 * Functions
 * ***/

function constructTb(data) {
  const rawTableHtml = `<div class="kwmsg w-full text-blue-600 sm:text-base text-xs flex justify-between my-1"><span class="inline-block py-2">搜索结果：${keywordEl.value}</span><div class="space-x-3"><span id="switch-name" class="p-2 inline-block bg-slate-50 rounded-md hover:shadow cursor-pointer text-blue-600 underline">name</span><span id="switch-id" class="p-2 inline-block bg-slate-50 rounded-md hover:shadow cursor-pointer">id</span></div></div><table class="border-collapse border-blue-600 border-2 table-fixed w-full text-xs sm:text-base"><thead class="bg-blue-200"><tr><th class="own-th">应用名</th><th class="own-th">包名</th><th class="own-th">启动项名</th></tr></thead><tbody>yanrentql1145141919810</tbody></table>`;
  let total = data.metadata.total;
  let seasoning = "";
  let ripeTableHtml;
  data.items.forEach((v) => {
    seasoning += '<tr class="data-line cursor-pointer">';
    seasoning += `<td class="own-td">${v.appName}</td>`;
    seasoning += `<td class="own-td">${v.packageName}</td>`;
    seasoning += `<td class="own-td">${v.activityName}</td>`;
    seasoning += "</tr>";
  });
  ripeTableHtml = rawTableHtml.replace("yanrentql1145141919810", seasoning);
  const newtbEl = document.createElement("table");
  resultEl.replaceChildren(newtbEl);
  newtbEl.outerHTML = ripeTableHtml;
  concopyLine();

  const switchNameEl = document.getElementById("switch-name"),
    switchIdEl = document.getElementById("switch-id");

  switchNameEl.addEventListener("click", () => {
    switchNameEl.classList.add("underline");
    switchIdEl.classList.remove("underline");
    replaceAppName();
  });

  switchIdEl.addEventListener("click", () => {
    switchIdEl.classList.add("underline");
    switchNameEl.classList.remove("underline");
    replaceAppId();
  });
  return total;
}

function fetchAPI(api, params) {
  if (api in api_list) return axios.get(api_list[api] + params);
  else console.error("您请求的 Url 有误。");
}

function conloadingIcon() {
  resultEl.innerHTML =
    '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
}

function replaceAppId() {
  rsThEls[0].textContent = "应用ID";
  for (let k = 0; k < trEls.length; k++) {
    const it = trEls[k];
    const nametd = it.getElementsByTagName("td")[0];
    let id = lastRsp.data.items[k].id;
    nametd.textContent = id;
  }
}

function replaceAppName() {
  rsThEls[0].textContent = "应用名";
  for (let k = 0; k < trEls.length; k++) {
    const it = trEls[k];
    const nametd = it.getElementsByTagName("td")[0];
    let appName = lastRsp.data.items[k].appName;
    nametd.textContent = appName;
  }
}

function concopyLine() {
  for (const it of trEls) {
    it.addEventListener("click", (ev) => {
      const datas = it.getElementsByTagName("td");
      let appName = datas[0].textContent,
        packageName = datas[1].textContent,
        activityName = datas[2].textContent;
      let copyTpl = "";
      if ((rsThEls[0].textContent === "应用名"))
        copyTpl = `<item component="ComponentInfo{${packageName}/${activityName}}" drawable="${appName}" />`;
      else copyTpl = appName;
      let p = navigator.clipboard.writeText(copyTpl);
      p.then(() => {
        const x = ev.pageX,
          y = ev.pageY;
          console.log(ev.pageY);
          console.log(ev.offsetY);
          console.log(ev);
        conmsgTag(x, y);
      });
    });
  }
}

function conmsgTag(x, y) {
  const msgTagEl = document.createElement("span");
  msgTagEl.textContent = "复制成功！";
  document.body.appendChild(msgTagEl);
  msgTagEl.style.position = "absolute";
  msgTagEl.style.left = x + "px";
  msgTagEl.style.top = y + "px";
  msgTagEl.className =
    "clipboard text-xs sm:text-base text-white p-1 rounded-sm bg-gradient-to-br from-gray-700 to-gray-500 shadow";
  setTimeout(() => {
    msgTagEl.remove();
  }, 2100);
}

/***
 * Execute
 * ***/
