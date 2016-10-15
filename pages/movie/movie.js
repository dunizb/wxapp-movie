var subjectsUtil = require("../../utils/subjectsUtil.js");
Page({
  data:{
    // text:"这是一个页面"
    ndicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls:[
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
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
          url:"https://api.douban.com/v2/movie/in_theaters",
          header:{
              'Content-Type':'application/json'
          },
          data:{count:50},
          success:function(res){
              var subjects = res.data.subjects;
              subjectsUtil.processSubjects(subjects);
              page.setData({"movies":subjects,"loadingHidden":true});
          }
      });
  }
})