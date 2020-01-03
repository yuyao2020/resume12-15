!function(){
  var person = {
    name: 'frank',
    age: 18
  }
  //函数使用了前面的变量，这种现象称为闭包，闭包可以对数据保密，隐藏细节。
  window.frankGrowUp = function(){
    person.age += 1
    return person.age
  }
}.call()
/*
1.立即执行函数使得person无法被外部访问
2.闭包使得匿名函数可以操作·person
3.window.frankGrowUp 保存了匿名函数的地址
4.任何地方都可以使用window.frankGrowlUp
 =>任何地方都可以使用window.frankGrowup操作 person，但是不能直接访问 person
*/


