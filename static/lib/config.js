
var lib = "../lib/";
var apis = "../lib/apis/"
var components = "../lib/components/"
var requireList = "../lib/require/"

requirejs.config({
    "baseUrl": "",
    "shim": {
    },
    "paths": {
        "SZXJ": apis + 'vueHttp',
        "Vue": lib + "vue",
        "PathList": apis+ "conf"
    }
});


