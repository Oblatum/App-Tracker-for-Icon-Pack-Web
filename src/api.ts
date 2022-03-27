interface fetchOptions {
  query?: apiQuery;
  body?: Object;
  path?: apiPath;
}

enum httpMethods {
  get = "GET",
  post = "POST",
  patch = "PATCH",
  delete = "DELETE",
}

interface apiPath {
  signature?: string;
}
interface apiQuery {
  q?: string;
  regex?: string;
  per?: string;
  page?: string;
  appId?: string;
}

interface apiBody {}

class API {
  baseurl = "https://bot.k2t3k.tk/api";
  url: string;
  opts: fetchOptions;

  constructor(url: string, opts: fetchOptions) {
    this.url = url;
    this.opts = opts;
  }
  async request(opts: fetchOptions = {}, method = httpMethods.get) {
    let { query, body, path } = opts;
    let url = this.baseurl + this.url;
    let code: number;
    if (this.opts.path) {
      const pathRegex = /\{(.*?)}/;
      url.match(pathRegex)?.forEach((k) => {
        url = url.replace(`{${k}}`, (path as apiPath)[k as keyof typeof path]);
      });
    }

    if (this.opts.query) {
      let usp = new URLSearchParams();
      let uspStr: string;
      let defaultQuery = this.opts.query as apiQuery;
      let realQuery: string = "?";
      let iterator = Object.entries(defaultQuery);
      iterator.forEach((kv) => {
        usp.append(kv[0], kv[1]);
      });
      if (query as apiQuery) {
        query = query as apiQuery;
        let iterator = Object.entries(query);
        iterator.forEach((kv) => {
          if (usp.has(kv[0])) {
            usp.set(kv[0], kv[1]);
          } else {
            usp.append(kv[0], kv[1]);
          }
        });
      }
      uspStr = usp.toString();
      realQuery = uspStr === "" ? uspStr : realQuery + uspStr;
      url += realQuery;
    }

    return await fetch(url, {
      method
    })
  }
}

let appInfoApi = new API("/appInfo", {
  query: {
    q: "app-tracker",
    per: "2147483647",
    page: "1",
  },
});

let getallApi = new API("/appInfo", {
  query: {
    per: "2147483647",
    page: "1",
  },
});

let regexApi = new API("/appInfo", {
  query: {
    regex: "app-tracker",
    per: "2147483647",
    page: "1",
  },
});

// 尚未开放关键词搜索
let signatureAppInfoApi = new API("/{signature}/appInfo", {
  query: {
    per: "2147483647",
    page: "1",
  },
  path: {
    signature: "app-tracker",
  },
});

let appIconApi = new API("/icon", {
  query: {
    appId: "",
  },
});

export {
  appInfoApi,
  getallApi,
  regexApi,
  appIconApi,
  signatureAppInfoApi,
  httpMethods,
};
