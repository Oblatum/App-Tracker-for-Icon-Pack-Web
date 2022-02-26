import "./styles.scss";
import "./favicon.png";
import axios from "axios";
import * as $ from "jquery";
import "@fortawesome/fontawesome-free/js/all.js";

function nowYear() {
  let dt = new Date();
  return dt.getFullYear();
}

async function testReq() {
  let data = await axios.get(
    "https://bot.k2t3k.tk/api/getAll?page=1&per=2147483647"
  );
  return data;
}

function conTbTpl(data: SearchAPIResData.ResRootObject) {
  const template = `<div class="rlt-area"><p class="last-rlt">搜索结果: 应用市场</p><div class="rlt-tb"><table class="tb"><thead><tr><th>应用名</th><th>包名</th><th>启动项</th></tr></thead><tbody>yrDlxhnzwWwd&^4=0f5/ltQl8555rbqclazz</tbody></table></div></div>`;
  let seasoning = "";
  let ripeTableHtml;
  data.items.forEach((v) => {
    seasoning += '<tr>';
    seasoning += `<td>${v.appName}</td>`;
    seasoning += `<td>${v.packageName}</td>`;
    seasoning += `<td>${v.activityName}</td>`;
    seasoning += "</tr>";
  });
  ripeTableHtml = template.replace("yrDlxhnzwWwd&^4=0f5/ltQl8555rbqclazz", seasoning);
  return ripeTableHtml;
}

$(() => {
  $("#year").text(nowYear());
  $("#form").on("submit", (e) => {
    e.preventDefault();
    testReq().then((data) => {
      conTbTpl(data.data);
    });
  });
});
