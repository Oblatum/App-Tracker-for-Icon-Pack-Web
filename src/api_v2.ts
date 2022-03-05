import axios, { Method } from "axios";

axios.defaults.baseURL = "https://bot.k2t3k.tk/api"

declare module ApiOpts {

    interface Query_appinfo {
        q?: string;
        regex?: string;
        per?: string;
        page?: string;
    }

    interface Path_signature_appinfo {
        signature: string;
    }

    interface Query_icon {
        appId: string
    }

    interface Path {
    }

    export interface AppInfo {
        query?: Query_appinfo;
    }

    export interface SignatureAppInfo {
        query?: Query_appinfo,
        path: Path_signature_appinfo
    }

    export interface Icon {
        query: Query_icon
    }

}

class API {
    constructor(url: string, opts: ApiOpts.AppInfo | ApiOpts.SignatureAppInfo | ApiOpts.Icon) {
        this.url = url;
        this.opts = opts;
    }
    url: string
    opts: ApiOpts.AppInfo | ApiOpts.SignatureAppInfo | ApiOpts.Icon

    private urlParsePath(url: string, path: ApiOpts.Path_signature_appinfo) {
        const pathRegex = /\{(.*?)}/;
        let realUrl: string = "";
        url.match(pathRegex)?.forEach(k => {
            url = url.replace(`{${k}}`, path[k as keyof typeof path]);
        });
        realUrl = url;
        return realUrl;
    }

    private ParseQuery(query: ApiOpts.Query_appinfo | ApiOpts.Query_icon) {
        let usp = new URLSearchParams();
        let uspStr: string;
        let realQuery: string = "?";
        Object.keys(query).forEach(k => {
            usp.append(k, query[k as keyof typeof query]);
        });
        uspStr = usp.toString();
        realQuery =  uspStr === "" ? uspStr : realQuery + uspStr;
        return realQuery;
    }

    async fetch(opts: ApiOpts.AppInfo | ApiOpts.SignatureAppInfo | ApiOpts.Icon, method: string = "GET") {
        let url = "";
        let query: string = "";
        let path = (opts as ApiOpts.SignatureAppInfo).path;
        let realUrl: string;
        if(path) {
            url = this.urlParsePath(this.url, path);
        } else {
            url = this.url
        }
        if(opts.query) {
            query = this.ParseQuery(opts.query)
        }
        realUrl = url + query;
        return axios({
            url: realUrl,
            method: method as Method,
        });
    }
}

let appInfoApi = new API("/appInfo", {
    query: {
        q: "app-tracker",
        regex: undefined,
        per: "10",
        page: "1",
    }
});

let signatureAppInfoApi = new API("/{signature}/appInfo", {
    query: {
        q: "app-tracker",
        regex: undefined,
        per: "10",
        page: "1",
    },
    path: {
        signature: "app-tracker"
    }
});

let appIconApi = new API("/icon", {
    query: {
        appId: "com.tencent.mobileqq"
    }
});

export {
    appInfoApi,
    signatureAppInfoApi,
    appIconApi
}
