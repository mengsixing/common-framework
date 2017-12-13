function addOne(x){
    return x+1;
}


describe("整体测试",function(){
    it('加一对不对',function(){
        expect(addOne(1)).toBe(2);
    })
})