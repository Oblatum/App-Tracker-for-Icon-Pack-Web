/***
 * API 定义
 * ***/

const server_url = "https://bot.k2t3k.tk/api";
const api_list = {
  search: "/search",
  all: "/getAll",
  sig: "/getAll/",
};

axios.defaults.baseURL = server_url;

/***
 * DOM 定义
 * ***/

const selectorEl = document.getElementById("selector"),
  formEl = document.getElementById("form"),
  keywordEl = document.getElementById("keyword"),
  sigEl = document.getElementById("sig"),
  resultEl = document.getElementById("result-area"),
  trEls = document.getElementsByClassName("data-line");

/***
 * DOM 监听
 * ***/

selectorEl.addEventListener("change", (ev) => {
  const vl = ev.target.value;
  if (vl === "sig") {
    sigEl.hidden = false;
  } else {
    sigEl.hidden = true;
  }
});

formEl.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const todo = selectorEl.value;
  switch (todo) {
    case "search":
      params = `?q=${keywordEl.value}&per=2147483647`;
      fetchAPI(todo, params).then((body) => {
        constructTb(body.data);
      });
      break;
    case "all":
      break;
    case "sig":
      break;
    default:
      break;
  }
});

/***
 * Functions
 * ***/

function constructTb(data) {
  const rawTableHtml = `<table class="border-collapse border-blue-600 border-2 table-fixed w-full text-xs sm:text-base"><thead class="bg-blue-200"><tr><th class="own-th">应用名</th><th class="own-th">包名</th><th class="own-th">启动项名</th></tr></thead><tbody>?</tbody></table>`;
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
  ripeTableHtml = rawTableHtml.replace("?", seasoning);
  const newtbEl = document.createElement("table");
  resultEl.replaceChildren(newtbEl);
  newtbEl.outerHTML = ripeTableHtml;
  concopyLine();
  return total;
}

function fetchAPI(api, params) {
  if (api in api_list) return axios.get(api_list[api] + params);
  else console.error("您请求的 Url 有误。");
}

function concopyLine() {
  for (const it of trEls) {
    it.addEventListener("click", () => {
      const datas = it.getElementsByTagName("td");
      let appName = datas[0].textContent,
        packageName = datas[1].textContent,
        activityName = datas[2].textContent;
      let copyTpl = `<item component="ComponentInfo{${packageName}/${activityName}}" drawable="${appName}" />`;
      let p = navigator.clipboard.writeText(copyTpl);
      p.then(() => {
        console.log("已复制到剪贴板");
      });
    });
  }
}

/***
 * Execute
 * ***/
