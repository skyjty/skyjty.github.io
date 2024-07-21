(function(document) {
  // 选择页面中的元素
  var toggle = document.querySelector('.sidebar-toggle');       // 侧边栏切换按钮
  var sidebar = document.querySelector('#sidebar');             // 侧边栏
  var checkbox = document.querySelector('#sidebar-checkbox');   // 用于控制侧边栏显示状态的复选框
  // 给整个文档添加点击事件监听器
  document.addEventListener('click', function(e) {
    var target = e.target;    // 获取点击事件的目标元素
    // 如果复选框未选中，或者点击发生在侧边栏内部，或者点击发生在切换按钮或复选框上，则返回，不执行关闭操作
    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;
    // 如果点击发生在侧边栏外部且复选框为选中状态，则取消选中复选框，关闭侧边栏
    checkbox.checked = false;
  }, false);
})(document);
