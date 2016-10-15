var subjectsUtil = require("../../utils/subjectsUtil.js");
Page({
  data:{
    // text:"这是一个页面"
    inputVal:"",
    movies:[],
    loadingHidden:true,
    modalHidden:true,
    tip:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindKeyInput(event){
      this.setData({inputVal:event.detail.value});
  },
  search(){
      var page = this;
      var queryStr = page.data.inputVal;
      if(queryStr == ""){
          this.setData({"tip":"输入内容不能为空"});
          this.setData({"modalHidden":false});
      }else{
          page.setData({loadingHidden:false});
          wx.request({
            url:"https://api.douban.com/v2/movie/search?q="+queryStr,
            header:{
                "Content-Type":"application/json"
            },
            data:{count:50},
            success:function(res){
                var subjects = res.data.subjects;
                page.setData({inputVal:res.data.title+"，共”"+ res.data.total +"”调记录"});
                subjectsUtil.processSubjects(subjects);
                page.setData({"movies":subjects,"loadingHidden":true});
            }
        });
      }
      
  },
  modalChange(){
      this.setData({"modalHidden":true});
  }
})