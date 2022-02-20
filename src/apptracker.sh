#!/usr/bin/env bash

server_url="https://bot.k2t3k.tk/api"

api_suffix=(
    "/search"
    "/getAll"
    "/getAll/"
)


# function

table=""
function setRow(){
    value=$*
    table=${table}"|${value// /#|}#|\n"
}

function splitLine(){
    local num=`expr $1 + 2`
    split=`seq -s '+#' $num | sed 's/[0-9]//g'`    # 生成连续个的+#
    table=${table}"${split}\n"
}

function setTable(){
    echo -e $1|column -s "#" -t|awk '{if($0 ~ /^+/){gsub(" ","-",$0);print $0}else{print $0}}'
}

while getopts "s:a" opt; do
    case $opt in
        s)
            kw=$OPTARG
            json=`curl -s "$server_url${api_suffix[0]}?q=$kw&per=2147483647"`
            items=`echo $json | jq '.["items"]'`
            len=`echo $json | jq '.["metadata"]["total"]'`
            
            table=""
            splitLine 3
            setRow "应用ID" "包名" "启动项名"
            for (( i=0; i<len; i=i+1 )); do
                appName=`echo $items | jq ".[$i][\"appName\"]"`
                id=`echo $items | jq ".[$i][\"id\"]"`
                packageName=`echo $items | jq ".[$i][\"packageName\"]"`
                activityName=`echo $items | jq ".[$i][\"activityName\"]"`
                splitLine 3
                setRow $id $packageName $activityName
            done
            splitLine 3
            setTable ${table}
            
        ;;
    esac
done