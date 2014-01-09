/**
 * Created with JetBrains WebStorm.
 * User: WanXing
 * Date: 14-1-5
 * Time: 上午10:43
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var Wax=function(str,dom){
            return new Wax.byId(str);
        },
        WAX={
            ver:"wax version v0.0.1",
            getVersion:function(){
                return WAX.ver;
            },
            //根据id查找dom
            byId:function(str){
                //WAX.NodeList.push(document.getElementById(str));
                return new WAX.NodeList(str);
            },
            //根据class查找dom
            byClass:function(){},
            //组合查询
            nodes:function(str){
                if(str.indexOf("#")==0){

                };
                return {};
            },
            //设置属性
            attr:function(){},
            //设置样式
            css:function(){},
            //扩展方法,将新方法放置到wax的原型里
            /////////////////////////////////////////////工具类
            trim:function(){

            },
            //格式化成json对象
            parseJson:function(data){
                if(window.JSON && window.JSON.parse) return window.JSON.parse( data );
                if(data===null) return data;
                if(typeof data==="string"){
                    return (new Function("return "+data))();
                    // Make sure leading/trailing whitespace is removed (IE can't handle it)
//                    data = jQuery.trim( data );
//                    if ( data ) {
//                        // Make sure the incoming data is actual JSON
//                        // Logic borrowed from http://json.org/json2.js
//                        if ( rvalidchars.test( data.replace( rvalidescape, "@" )
//                            .replace( rvalidtokens, "]" )
//                            .replace( rvalidbraces, "")) ) {
//                            return ( new Function( "return " + data ) )();
//                        }
//                    }
                }
                jQuery.error( "Invalid JSON: " + data );
            },
            /////////////////////////////////////////////扩展开发类
            ext:function(fns,name){
                if(name && name instanceof String){
                    this[name]=fns;
                }
                else if(fns instanceof Object){
                    for(i in fns){
                        this[i]=fns[i];
                    }
                }
            },
            //确定依赖关系
            define:function(){},
            //声明一个类
            declare:function(require,type,obj){},
            error:function(string){console.log("wax error:"+string);}
        };

    WAX.NodeList=function(str){
        var obj=this.find(str);
        this.list=[];
        if(obj){
            if(obj instanceof NodeList){
                this.list=obj;
            }
            else{
                this.list.push(obj);
            }
        }
    }

    WAX.NodeList.prototype=NodeFunction={
        find:function(str){
            if(str.indexOf("#")==0){
                var dom=document.getElementById(str.substr(1));
                return dom;
            }
            if(str.indexOf(".")==0){
                var dom=document.getElementsByClassName(str.substr(1));
                return dom;
            }
        },
        forEach:function(Fn){
            var i,list=this.list,len=list.length;
            for(i=0;i<len;i++){
                Fn(list[i]);
            }
        },
        onlyDom:function(){
            return this.list[0];
        }
    };

    //////////////////////////////////////  XHR-XMLHttpRequest   ////////////////////////////////////

    var XHR=function(){
        if(typeof XMLHttpRequest!="undefined"){
            return new XMLHttpRequest();
        }
        else if(typeof ActiveXObject!="undefined"){
            if(typeof arguments.callee.activeXString!="string"){
                var i,
                    versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                    len=versions.length;
                for(i=0;i<len;i++){
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString=version[i];
                        break;
                    }catch(ex){}
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
        else{
            throw new Error("No XHR Object available.");
        }
    };

    WAX.ext({
        xhrVersion:1,
        xhr:new XHR(),
        request:function(url,data,mode,success,fail){
            var xhr=WAX.xhr;
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    //成功
                    if((xhr.status>=200 && xhr.status<=300) || xhr.status==304){
                        if(success) success(xhr.responseText);
                    }
                    //失败
                    else{
                        if(fail) fail(xhr.status);
                    }
                }
            };
            xhr.open(mode,url,false);
            xhr.send(null);
        },
        ajax:function(url,data,mode,type,success,fail){
            WAX.request(url,data,mode,function(response){
                if(type=="json"){
                    success(WAX.parseJson(response));
                }
                else if(type=="xml"){

                }
                else{
                    success(response);
                }
            },fail);
        },
        get:function(url,data,type,success,fail){},
        getJson:function(){},
        post:function(){}
    });

    var extend=function(obj1,obj2){
        var i;
        for(i in obj1){
            obj2[i]=obj1[i];
        }
    }

    extend(WAX,Wax);

    window.wax=Wax;

})();