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
          url:"http://api.douban.com/v2/movie/in_theaters",
          header:{
              'Content-Type':'application/json'
          },
          success:function(res){
              var subjects = res.data.subjects;
              page.processSubjects(subjects);
              page.setData({movies:subjects,loadingHidden:true});
          }
      });
  },
  processSubjects(subjects){
      subjects.forEach(function(item,index){
          var title = item.title; //电影标题
          var directorArray = item.directors; //导演
          var director = "";
          directorArray.forEach(function(obj,i){
              director += obj.name+" / ";
          });
          if(director !== ""){
              director = director.slice(0,-2); 
          }
          var castsArray = item.casts;
          var casts = ""; //主演
          castsArray.forEach(function(obj,j){
              casts += obj.name+" / ";
          });
          if(casts !== ""){
              casts = casts.slice(0,-2); 
          }
          var genres = item.genres.join(" / "); //剧情
          var year = item.year;
          //导演：休息休息\n主演：休息休息 / ssss / ssss\n类型：剧情 / 爱情\n 上映年份：2016
          var text = `名称：${title}\n导演：${director}\n主演：${casts}\n类型：${genres}\n 上映年份：${year}（中国大陆）`;
          item.text = text;
      });
  }
})