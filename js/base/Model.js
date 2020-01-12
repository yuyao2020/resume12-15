window.Model = function(options){//此为模板
  let resourceName = options.resourceName
  return{
    init: function () {
      AV.init({
        appId: "p9LgDkA5IaryUPVsgstaje2t-gzGzoHsz",
        appKey: "7Xh7eC2DOTpHqBmSEUHDxzdI",
        serverURLs: "https://9lgdka5.lc-cn-n1-shared.com"
      })
    },
    fetch: function(){//从数据库获取数据
      var query = new AV.Query(resourceName);
      return query.find() // promise对象
    },
    save: function(object){//创建数据
      var X = AV.Object.extend(resourceName); //创建TestObject表
      var x = new X(); //在表中创建一行数据
      return x.save(object)
    }
  }
}