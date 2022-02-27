import axios from "axios";

axios.defaults.baseURL = "https://bot.k2t3k.tk/api"

class Api {
  url: string;
  usparams: string[];
  pathparams: string[];
  constructor(url: string, usparams: string[], pathparams: string[]) {
    this.url = url;
    this.usparams = usparams;
    this.pathparams = pathparams;
  }
}

class ApiUtil extends Api {
  constructor(url: string, usparams: string[], pathparams: string[]) {
    super(url, usparams, pathparams);
  }
  async get(usparams?: string[], pathparams?: string[]) {

    let searchParam = new URLSearchParams();
    let pathParam = ''

    if(usparams != null) {
        usparams.forEach((p, i) => {
            searchParam.append(this.usparams[i],p);
        });
    }

    if(pathparams != null) {
        for(let i = 0; i < this.pathparams.length; i++) {
            pathParam += `/${pathparams[i]}`;
        }
    }

    return await axios({
        method: "GET",
        url: `${this.url}${pathParam}?${searchParam}`,
      });
  }
}

let searchAPI = new ApiUtil("/search", ['q', 'page', 'per'], []);
let regexAPI = new ApiUtil("/search/regex", ['q', 'page', 'per'], []);
let allAPI = new ApiUtil("/getAll", ['page', 'per'], []);
let signatureAPI = new ApiUtil("/getAll", ['page', 'per'], ['signature']);
let iconAPI = new ApiUtil("/icon", ['appId'], []);

export {
    ApiUtil,
    searchAPI,
    regexAPI,
    allAPI,
    signatureAPI,
    iconAPI
};
