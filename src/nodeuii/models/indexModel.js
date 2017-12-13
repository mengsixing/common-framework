class IndexModel {
    getIndexInfo(){
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                resolve( '这是首页信息。zz');
            },1000)
        });
    }
}

export default IndexModel;