! function () {
  var view = document.querySelector('section.message')//负责看得见的东西
  var model = {//负责数据相关
    fetch: function(){//从数据库获取数据
      var query = new AV.Query('message');
      return query.find() // promise对象
    },
    save: function(name, content){//创建数据
      var Message = AV.Object.extend('message'); //创建TestObject表
      var message = new Message(); //在表中创建一行数据
      return message.save({
        'name': name,
        'content': content
      })
    }
  }
  var controller = {
    model: null,
    view: null,
    messageList: null,
    init: function (view) {
      this.model = model
      this.view = view
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.initAV()
      this.loadMessages()
      this.bindEvents()
    },
    initAV: function () {
      AV.init({
        appId: "p9LgDkA5IaryUPVsgstaje2t-gzGzoHsz",
        appKey: "7Xh7eC2DOTpHqBmSEUHDxzdI",
        serverURLs: "https://9lgdka5.lc-cn-n1-shared.com"
      })
    },
    loadMessages: function (){
      this.model.fetch().then((messages) => {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
          let li = document.createElement('li')
          li.innerText = `${item.name}: ${item.content}`
          this.messageList.appendChild(li)
        })
      })
      /*.then(()=>{}, (error)=>{
          console.log(error)
        });
        代码出错不保，手动报错
        */
    },
    bindEvents: function (){
      this.form.addEventListener('submit', function (e) {
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function(){
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        myForm.querySelector('input[name=name]').value = ''
        console.log(object)
      })
    }
  }
  controller.init(view, model)
}.call()