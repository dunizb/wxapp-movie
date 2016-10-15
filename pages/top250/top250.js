var subjectsUtil = require("../../utils/subjectsUtil.js");
Page({
  data:{
    // text:"这是一个页面"
    movies:[],
    loadingHidden:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadMovie();
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
  loadMovie(){
      var page = this;
      wx.request({
          url:"https://api.douban.com/v2/movie/top250",
          header:{
              'Content-Type':'application/json'
          },
          success:function(res){
              var subjects = res.data.subjects;
              subjectsUtil.processSubjects(subjects);
              page.setData({movies:subjects,loadingHidden:true});
          }
      });
  }
})