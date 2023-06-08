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
  packageName?: string;
}

const mode = import.meta.env.MODE;

class API {
  baseurl = "/api";
  url: string;
  opts: fetchOptions;

  constructor(url: string, opts: fetchOptions) {
    this.url = url;
    this.opts = opts;

    if (mode === "development") {
      this.baseurl = "/api";
    } else {
      this.baseurl = import.meta.env.VITE_APP_BASE_API;
    }
  }
  async request({ query, path }: fetchOptions = {}, method = httpMethods.get) {
    let url = this.baseurl + this.url;
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
      method,
    });
  }
}

const getAppInfoApi = new API("/api/appinfo", {
  query: {
    per: "2147483647",
    page: "1",
  },
});

let appIconApi = new API("/api/icon/local", {
  query: {
    packageName: "",
  },
});

export { appIconApi, getAppInfoApi, httpMethods };
