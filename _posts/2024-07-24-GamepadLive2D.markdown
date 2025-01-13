---
layout: post
title:  手柄控制显示
date:   2024-07-24 09:00:00 +0800
last_change_date: 2024-08-07 14:20:00 +0800
categories: web
brief_introduction: 基于jQuery的手柄控制显示
tags: web
project: GamepadLive2D
# related_posts: Welcome to Jekyll!
---

- [0 概述](#0-概述)
  - [0.1 需求分析](#01-需求分析)
- [1 gamepad.e7d.io解析](#1-gamepade7dio解析)
  - [1.1 Gamepad类（gamepad.js）解析](#11-gamepad类gamepadjs解析)
    - [1.1.1 数据结构](#111-数据结构)
  - [1.2 template.js解析](#12-templatejs解析)
- [2 开始编写](#2-开始编写)
  - [2.1 初步（监控）类](#21-初步监控类)
  - [2.2 图形化与简单的渲染相关优化](#22-图形化与简单的渲染相关优化)
    - [2.2.1 更新渲染判断](#221-更新渲染判断)
    - [2.2.2 离屏优化(to be done)](#222-离屏优化to-be-done)
  - [2.3 svg编辑](#23-svg编辑)
    - [2.3.1 工具使用](#231-工具使用)
    - [2.3.2 位置编辑](#232-位置编辑)
- [3 本地部署](#3-本地部署)
  - [3.1 拉取项目](#31-拉取项目)
  - [3.2 配置obs](#32-配置obs)
- [4 部署到Jekyll中](#4-部署到jekyll中)
  - [4.1 兼容性问题](#41-兼容性问题)

## 0 概述

笔者于2022年生日前购买了xbox one手柄作为自己的生日礼物，之后就用于游玩艾尔登法环，Apex，泰坦陨落2等游戏。通过obs录制相关实况时，笔者希望观众能够看到笔者的操作，故在利用[gamepadviewer](https://gamepadviewer.com/)在画面中添加了手柄按键显示，效果较好。但由于服务器不在国内，有时候不能正常显示；同时有时候笔者忘记切换obs导致画面中出现手柄未连接的图像，故后更换为国内类似的产品，但总是出现不同的问题，同时笔者需要一个练手的前端项目，学习jQuery，故准备在博客或本地部署使用。

![图一]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_1.png "未连接手柄时截取的内容")

由于笔者使用过的[gamepadviewer](https://gamepadviewer.com/)并没有在Github上开源且找不到源代码，笔者参考了另一个类似的项目[gamepad.e7d.io](https://gamepad.e7d.io/)（以下称原项目或e7d项目）。

编写代码的参考文档包括:
- [jQuery](https://api.jqueryjs.cn/)
- [MDN](https://developer.mozilla.org/zh-CN/)
- [w3c gamepad api文档](https://w3c.github.io/gamepad/)

### 0.1 需求分析

笔者希望这个项目能实现以下功能

```
+ 实时显示手柄按键，轴等操作
+ 在没有手柄连接时显示为空白（透明度0），连接后显示
+ 矢量图皮肤设置
+ 自定义的样式
+ 便于使用，通过链接中的参数控制样式，方便obs中使用
+ 本地部署，使用`file://`协议同样能够运行
```

相比于参考的项目笔者需要修改的内容：
```
- 删除按键修改（固定后在obs内设置）
- 删除背景更改选择（固定为空或绿色）
- 删除多个手柄链接显示（没有第二个手柄）
- 原项目过于庞大，功能繁琐
- 手柄显示时存在黑边
- 删除异步函数，保证脱离服务器运行
```

未来可能的扩展：
```
* 低占用
* 多种手柄兼容（笔者暂时只有一个xbox one，ps或任系手柄只能参考别人的代码）
* 对部分游戏实现特殊效果，例如在泰坦陨落2中使用技能后手柄颜色同步变化（进入相位？）
* 实现飞行摇杆的类似功能
* 根据手柄或者键盘的输入做出不同的反应，比如一个live2D？
```

如果你是来使用该项目而不关心项目是如何实现的，可以跳转到[这里](#3-本地部署)查看如何在obs中部署本项目。

## 1 gamepad.e7d.io解析

先来看目录（忽略了不重要的内容）:

```
├── css
|   ├── main.css                //渲染主界面
|   ├── normalize.css           //提前加载，使得该项目在各个浏览器的显示效果一致
|   └── transparent-bg.png      //在gamepad.js中被引用，设置方格背景的样式(?)
├── js
|   ├── gamepad.js              //Gamepad类，基于jQuery编写，大部分控制函数的位置，监控了主界面键盘与手柄的输入
|   └── jquery.min.js           //jQery库函数，文档可以参考https://www.runoob.com/manual/jquery/ 或 https://api.jqueryjs.cn/
├── templates                   //模板文件夹，大多类似，此处仅展示xbox的
|   ├── debug
|   ├── ds4
|   └── xbox-one
|       ├── ***.svg             //手柄皮肤的矢量图形文件
|       ├── template.css        //xbox显示渲染
|       ├── template.html       //显示内容
|       └── template.js         //按钮与轴更新函数
├── docker-compose.ylm          //docker镜像的配置文件，部署nginx用于本地测试(猜测)
├── favicon.icon                //网站图标
├── favicon.png                 //同上
└── index.html                  //主界面
```

### 1.1 Gamepad类（gamepad.js）解析

笔者是js新手，此处记录一些内容供自己参考，若有一定基础则可以跳过该部分。
```javascript
//'$'指代使用jQuery的对象或方法；

this.$body = $("body"); //指创建一个对象body指向html中的body类，类似于css中的 body{};

this.$instructions = $("#instructions"); //创建一个指向#instructions标签的对象，类似于css中的 #instruction{};

this.$colorOverlay = this.$overlay.find("#color"); //find()函数搜索overlay对象的#color，并将colorOverlay变量指向#color；

中括号创建数组对象;

this.assertGamepadAPI(); //声明函数对象

this.gamepads = {}; //大括号声明了一组键值对

id: /045e|xinput|XInput/, //id被声明为了一个正则表达式，用以匹配设备id（045e代表xbox-one？），该部分用于给手柄发送震动指令；

this.onGamepadDisconnect.bind(this); //前一个this表示Gaempad类，bind(this)则是让该函数被执行时保证this表示的时Gamepad类而不是window类；

() => navigator.getGamepads(); //箭头函数，简化的函数写法，此处表示执行无参数的getGamepads方法；

this.haveEvents = "GamepadEvent" in window; //in返回是否存在该方法

```

#### 1.1.1 数据结构

```javascript
//对应的标签
this.$body = $("body");
this.$instructions = $("#instructions");
this.$placeholder = $("#placeholder");
this.$gamepad = $("#gamepad");
this.$overlay = $("#overlay");

//皮肤选择列表
this.$skinSelect = $("select[name=skin]");

//背景选择列表
this.$backgroundSelect = $("select[name=background]");

//标签对应的属性
this.$colorOverlay = this.$overlay.find("#color");
this.$colorSelect = this.$colorOverlay.find("select[name=color]");
this.$triggersOverlay = this.$overlay.find("#triggers");
this.$triggersSelect = this.$triggersOverlay.find(
    "select[name=triggers]"
);

//标签
this.$helpPopout = $("#help-popout");
this.$gamepadList = $("#gamepad-list");

//背景设置数组
this.backgroundStyle = [
    "transparent",
    "checkered",
    "dimgrey",
    "black",
    "white",
    "lime",
    "magenta",
];

//文字设置数组
this.textColors = [
    "black",
    "black",
    "black",
    "white",
    "black",
    "black",
    "black",
];
```

接下来，我们看看类具体做了什么，以下函数根据构造方法`constructor()`中关键函数的调用顺序排列：

```javascript
//查看浏览器中gamepad的api是否可用，可用则给getNavigatorGamepads该方法
assertGamepadAPI();

//初始化皮肤，背景，颜色，扳机样式选择函数
initOverlaySelectors();

//下面是添加一些监听器
//手柄连接，可能是手柄刚刚接上，也有可能是是手柄刚刚被浏览器检测到
window.addEventListener(
  "gamepadconnected",
  this.onGamepadConnect.bind(this)
);
//或者监测手柄断开连接，同上
window.addEventListener(
  "gamepaddisconnected",
  this.onGamepadDisconnect.bind(this)
);

// listen for mouse move events
window.addEventListener("mousemove", this.onMouseMove.bind(this));
// listen for keyboard events
window.addEventListener("keydown", this.onKeyDown.bind(this));
// listen for keyboard events(窗口调整事件，疑似注释错误)
window.addEventListener("resize", this.onResize.bind(this));

// bind a gamepads scan 在每个scanDelay后执行scan
window.setInterval(this.scan.bind(this), this.scanDelay);
//scan()方法首先检测是否有手柄连接，如果没有利用pollGmaepad检测是否有手柄存在，disconnectedIndex表示上一个断开连接的手柄，通过循环判断正在使用的手柄，对选中的手柄发出振动即vibrationActuator，scanDelay默认为200ms，即检测刷新率为5Hz；

//通过网页传入参数设置皮肤与背景
const skin = this.getUrlParam("type");
/* ... */
const background = this.getUrlParam("background");

//显示帮助页面
this.displayPlaceholder();
```

在构造函数执行后，此时界面上有4个监听器和一个循环执行的检测器，监听器分别是：检测手柄连接/断连事件`gamepad(dis)connected`，检测鼠标移动事件`mousemove`，检测键盘输入事件`keydown`，检测窗口放缩事件`resize`。
最主要的手柄检测则通过`scan`-`map`-`loadTemplat`-`pollStatus`调用顺序更新手柄输入。


### 1.2 template.js解析

```javascript
gamepad.updateButton = function ($button) {
    const value = parseFloat($button.attr("data-value"), 10); //button的data-value变量

    if ($button.is(".trigger")) {
        $button.css(
            gamepad.triggersMeter
                ? {
                      opacity: 1,
                      "clip-path": `inset(${(1 - value) * 100}% 0px 0px 0pc)`,
                  }
                : {
                      opacity: `${value * 100}%`,
                      "clip-path": "none",
                  }
        );
    }
};

gamepad.updateAxis = function ($axis) {
    const axisX = $axis.attr("data-value-x");
    const axisY = $axis.attr("data-value-y");

    if ($axis.is(".stick")) {
        $axis.css({
            "margin-top": axisY * 25,
            "margin-left": axisX * 25,
            transform: `rotateX(${-parseFloat(
                axisY * 30,
                8
            )}deg) rotateY(${parseFloat(axisX * 30, 8)}deg)`,
        });
    }
};
```

分别表示单个按钮与轴的更新。

## 2 开始编写

笔者先简要编写了一个监控代码，主要实现gamepad api的检测。

### 2.1 初步（监控）类
```js
// Gamepad.js
// 参考GPT给出的代码
class Gamepad {
    constructor() {
        this.$gamepad = $("#gamepad");//id = gamepad

        this.gamepadIndex = null;//选择的gamepad，待扩展
        this.gamepads = {};//gamepad api存放
        this.triggersMeter = false;//扳机样式控制
        this.mapping = {//按键，轴绑定
            buttons: [],
            axes: [],
        };
        
        this.scanDelay = 50;//刷新间隔

        this.$gamepadInfo = $('#gamepad-info');//id = gamepad-info
        this.$buttonsContainer = $('#buttons');//id = buttons
        this.$axesContainer = $('#axes');//id = axes

        this.init();//初始化
    }

    init() {//初始化函数
        window.addEventListener('gamepadconnected', (e) => this.onGamepadConnect(e));//连接事件
        window.addEventListener('gamepaddisconnected', (e) => this.onGamepadDisconnect(e));//断开事件
        window.setInterval(this.updateGamepadStatus.bind(this), this.scanDelay);//刷新
    }

    onGamepadConnect(event) {//连接事件
        this.gamepadIndex = event.gamepad.index;
        this.gamepads[event.gamepad.index] = event.gamepad;//获取gamepad api
        this.$gamepad.hide();
        this.loadGamepadMap(this.gamepads[this.gamepadIndex]);//加载按键映射
        this.updateGamepadInfo();//更新测试信息
        this.$gamepad.fadeIn();
    }
    //以下省略内容
    loadGamepadMap(gamepad);
    onGamepadDisconnect();
    updateGamepadStatus();
    updateGamepadInfo();
    updateButtons(gamepad);
    updateButton(button, index);
    updateAxes(gamepad);
    updateAxis(axis, index);
}

// 直接实例化类
window.gamepad = new Gamepad();
```

测试完成后，笔者初步构建了文字显示版的css与html文件，初步测试了gamepad api。

### 2.2 图形化与简单的渲染相关优化

>查阅[相关资料](https://obsproject.com/kb/browser-source)后笔者发现obs内置的浏览器源基于 Chrome 嵌入式框架，故笔者在EDGE浏览器上利用vscode的Live Server进行调试，不保证该项目在其他浏览器上的可用性。
测试时先使用参考项目中的svg与css文件进行测试，保证程序运行，之后会对其进行修改和替换。

以下是第一个测试版本：
```js
// Gamepad.js

class Gamepad {
    constructor() {
        this
        this.$gamepad = $("#gamepad");//id = gamepad
        this.testmode = false;
        this.gamepadIndex = null;//选择的gamepad，待扩展
        this.gamepads = {};//gamepad api存放
        this.triggersMeter = 1;//扳机样式控制
        this.mapping = {//按键，轴绑定
            buttons: [],
            axes: [],
        };
        
        this.scanDelay = 1000/15;//刷新间隔

        this.setIntervalid = null;
        this.$gamepadInfo = $('#gamepad-info');//id = gamepad-info
        this.$buttonsContainer = $('#buttons');//id = buttons
        this.$axesContainer = $('#axes');//id = axes

        this.init();//初始化
    }

    init() {//初始化函数
        this.$gamepad.hide();
        window.addEventListener('gamepadconnected', (e) => this.onGamepadConnect(e));//连接事件
        window.addEventListener('gamepaddisconnected', (e) => this.onGamepadDisconnect(e));//断开事件
    }

    onGamepadConnect(event) {//连接事件
        this.gamepadIndex = event.gamepad.index;
        this.gamepads[event.gamepad.index] = event.gamepad;//获取gamepad api

        this.$gamepad.show();
        this.loadGamepadMap(this.gamepads[this.gamepadIndex]);//加载按键映射
        // this.updateGamepadInfo();//更新测试信息

        // this.setIntervalid = window.setInterval(this.updateGamepadStatus.bind(this), this.scanDelay);//刷新
        
        this.updateGamepadStatus();
    }

    loadGamepadMap(gamepad){
        this.mapping.buttons = [];
        for (let index = 0; index < gamepad.buttons.length; index++) {
            this.mapping.buttons[index] = $(`[data-button="${index}"]`);
        }
        this.mapping.axes = [];
        for (let index = 0; index < gamepad.axes.length; index++) {
            this.mapping.axes[index] = $(
                `[data-axis="${index}"], [data-axis-x="${index}"], [data-axis-y="${index}"], [data-axis-z="${index}"]`
            );
        }
    }

    onGamepadDisconnect(event) {
        if(this.setIntervalid !== null){
            window.clearInterval(this.setIntervalid);
        }
        this.$gamepad.hide();
        delete this.gamepads[event.gamepad.index];
        this.gamepadIndex = null;
        this.updateGamepadInfo();

        this.setIntervalid = null;
    }
    
    updateGamepadStatus() {
        if (this.gamepadIndex !== null) {
            const gamepad = navigator.getGamepads()[this.gamepadIndex];
            if (gamepad) {
                this.updateButtons(gamepad);
                this.updateAxes(gamepad);
            }
        }
        window.requestAnimationFrame(this.updateGamepadStatus.bind(this));
    }

    updateGamepadInfo() {
        if(this.testmode){
            // if (this.gamepadIndex === null) {
            //     this.$gamepadInfo.text('No gamepad connected');
            //     this.$buttonsContainer.html('');
            //     this.$axesContainer.html('');
            // } else {
            //     const gamepad = this.gamepads[this.gamepadIndex];
            //     this.$gamepadInfo.text(`Connected: ${gamepad.id}`);
            //     this.updateButtons(gamepad);
            //     this.updateAxes(gamepad);
            // }
        }
        else{
            if (this.gamepadIndex !== null) {
                const gamepad = this.gamepads[this.gamepadIndex];
                // this.$gamepadInfo.text(`Connected: ${gamepad.id}`);
                this.updateButtons(gamepad);
                this.updateAxes(gamepad);
            }
        }
    }

    updateButtons(gamepad) {
        // this.$buttonsContainer.html('');
        for (let index = 0; index < gamepad.buttons.length; index++) {
            const $button = this.mapping.buttons[index];
            if (!$button) {
                break;
            }
            const button = gamepad.buttons[index];
            
            this.updateButton($button, button);
        }
    }

    updateButton($button, button) {//to be edit
        $button.attr("data-pressed", button.pressed);
        $button.attr("data-value", button.value);
        if($button.is(".trigger")){
            $button.css(
                gamepad.triggersMeter
                    ? {
                          opacity: 1,
                          "clip-path": `inset(${(1 - button.value) * 100}% 0px 0px 0pc)`,
                      }
                    : {
                          opacity: `${button.value * 100}%`,
                          "clip-path": "none",
                      }
            );
        }
    }

    updateAxes(gamepad) {
        // this.$axesContainer.html('');
        for (let index = 0; index < gamepad.axes.length; index++) {
            const $axis = this.mapping.axes[index];
            if (!$axis) {
                break;
            }
            const axis = gamepad.axes[index];
            if ($axis.is("[data-axis=" + index + "]")) {
                $axis.attr("data-value", axis);
            }
            if ($axis.is("[data-axis-x=" + index + "]")) {
                $axis.attr("data-value-x", axis);
            }
            if ($axis.is("[data-axis-y=" + index + "]")) {
                $axis.attr("data-value-y", axis);
            }
            if ($axis.is("[data-axis-z=" + index + "]")) {
                $axis.attr("data-value-z", axis);
            }
            if ("function" === typeof this.updateAxis) {
                this.updateAxis($axis);
            }
        }
    }

    updateAxis($axis) {//to be edit
        const axisX = $axis.attr("data-value-x");
        const axisY = $axis.attr("data-value-y");

        if ($axis.is(".stick")) {
            $axis.css({
                "margin-top": axisY * 25,
                "margin-left": axisX * 25,
                transform: `rotateX(${-parseFloat(
                    axisY * 30,
                    8
                )}deg) rotateY(${parseFloat(axisX * 30, 8)}deg)`,
            });
        }
    }
}

window.gamepad = new Gamepad();
```

在这个测试版本中笔者直接将原项目中的异步加载函数删除，结果发现一段时间之后浏览器的内存被完全占用，帧数较原版低的多，显示如下图：

![图二]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_2.png "浏览器内存占用查看")

笔者在阅读代码后发现原项目中主要负责刷新的函数`pollStatus()`中存在`window.requestAnimationFrame`方法，该方法告知浏览器准备下一帧的刷新，在本次渲染结束后调用传给该方法的参数。该方法没有控制刷新速度的参数，基本采用大部分网页的默认渲染速度60Hz，而运行自定义渲染速度的方法`window.setInterval`不能保证回调函数在屏幕每一次刷新间隔中只被执行一次，由于js不允许用户自己进行内存管理，故笔者将渲染交给`window.requestAnimationFrame`管理。继续阅读发现原项目将上述两个方法嵌套使用，即每200ms调用一次`pollStatus()`，该函数递归调用`window.requestAnimationFrame`方法，造成多个递归函数同时运行，短时间内就占满了内存。这可能由于笔者删去了异步相关代码引起的。此处笔者将`window.setInterval`删去，单独调用递归函数进行渲染。


笔者发现该渲染方法与游戏的帧数控制相类似，查阅资料后发现还有以下两个可以优化的方法，笔者实现了其中的的一个：
#### 2.2.1 更新渲染判断

在原来的脚本中，每一次渲染都要全部加载所有的元素，但笔者发现在渲染前判断每次比较渲染前后发生变化的元素，只更新不一样的元素就可以了。
gamepad api对于每一个按钮包含两个参数，分别是pressed(bool)与value(double)，对于axby、dpad、R1、L1等只有按下与不按下的区别的按键来说，两者都是0，1的变化，而对于R2、L2以及轴的每个方向来说，value则是在0.0到1.0之间变化，笔者的解决方案是对更新前后的双精度浮点数作差，添加变量`this.detectSensitivity`，只有作差结果大于该值之后程序才会产生渲染。由于摇杆在中点附近与远离中点的精度不同，之后会对逻辑判断进行修改使其更好的进行渲染。

相关修改如下：

```js
    updateButtons(gamepad);
    updateButton($button, button) {//to be edit
        const previousValue = parseFloat($button.attr("data-value")) || 0;//改变前的变量
        if ($button.attr("data-pressed") !== button.pressed || $button.attr("data-value") !== button.value) {//判断变量是否不同
            if($button.is(".trigger")){//如果是R2、L2，检测是否需要重新渲染
                if(Math.abs(previousValue - button.value) > this.detectSensitivity  //比较是否超出阈值
                 || ($button.attr("data-pressed") === "true") !== button.pressed){  //是否按下
                    ...
                }
            }
            else{//普通按钮直接更新
                ...
            }
        }
    }

    updateAxes(gamepad) {
        // this.$axesContainer.html('');
        for (let index = 0; index < gamepad.axes.length; index++) {
            const $axis = this.mapping.axes[index];
            if (!$axis) {
                break;
            }
            const axis = gamepad.axes[index];
            const previousValue = parseFloat($axis.attr("data-value")) || 0;
            if (Math.abs(previousValue - axis) > this.detectSensitivity){//轴是否需要更新，to be edit
                ...
            }
        }
    }
    updateAxis($axis);
```

经过测试，在一般情况下扳机在60帧下变化仅仅持续3~4帧，显然摇杆变化的时间会更短，为了减少渲染压力，笔者将发生变化的阈值设置为0.01。

优化后的内存占用：

![图三]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_3.png "EDGE浏览器内存占用查看")
![图四]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_4.png "Chrome浏览器内存占用查看")

Edge中500ms中渲染了33帧画面，基本上满足60帧的渲染速度，而Chrome中100ms达到了惊人的20帧，可以满足200帧左右的渲染速度（这就是谷歌工程师头发的结晶吗）。
以下是随机选取的100ms左右的渲染调用：
![图五]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_5.png "EDGE浏览器内存占用查看")
Edge:89ms,5frame
![图六]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_6.png "Chrome浏览器内存占用查看")
Chrome:94ms,20frame

内存占用Chrome比Edge高一些，前者最高6MB，后者最高4MB，占用都比较低。作为对比，bilibili主页加载的占用最高大概在30MB到50MB。

#### 2.2.2 离屏优化(to be done)
该优化来源于对游戏渲染的学习，简单来说添加相关参数后程序不再只渲染下一帧而是对之后的多帧进行后台渲染，保证了帧数的连贯性。但笔者认为相关函数可能占用有些大，背离了笔者对该项目低占用，少功能的希望，故在此处仅仅提出改进方向。
可能的参考：https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas

### 2.3 svg编辑
使用xml代码方式编辑图片学习成本较高，缺少直观的显示方式，此处只需要对svg的viewbox属性等控制图片大小的属性有初步的了解即可将自己的svg正常显示。笔者此处使用两个软件，分别是Adobe Illustrator（下称AI）与Autodesk fusion（下称Fusion）。笔者准备使用以上工具制作xbox的星空。
#### 2.3.1 工具使用
笔者在高中有使用Autodesk Inventor（下称Invntor）进行3D建模的经历，对其中的草图编辑方式有初步的了解，十分喜欢这种精确的编辑线条的方式，对AI中匮乏的精确位置编辑方式十分不习惯，故采用扩展性强与功能全面的Fusion，其相对于Inventor唯一的缺点是服务器在国内访问较慢，可能需要工具辅助，而且文件基本保存在云端。对于学生用户，Autodesk公司对能提供证明的学生提供教育版许可证，有效期一年，一年后可以续期。笔者高中时申请的账号已经过期，且没有续期，于是笔者使用大学的邮箱重新进行注册，与客服交流后几天就通过了审核。这个审核比较宽松，基本上国内的大部分学校都能使用。

![图七]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_7.png "Fusion使用界面")

笔者搜索（[参考](https://www.youtube.com/watch?v=x4CR3nXSN-A)）后在Fusion的插件商店中找到了[Shaper Utilities](https://apps.autodesk.com/FUSION/en/Detail/Index?id=3662665235866169729)，该插件允许你将Fusion中的草图或者对象的二维平面导出为svg格式的图像，但导出的质量一般，可自定义的内容不多，后期需要在AI中进一步编辑。由于笔者不习惯使用AI，大部分后期修改内容也都是在Fusion中完成后导出的，AI仅仅起到一个上色与预览效果的作用。以下为效果预览：

![图八]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_8.png "AI 未按下预览")
![图⑨]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_9.png "AI 按下预览")

需要注意的是在AI中导入svg文件进行编辑前需要创建文件单位为毫米，之后修改为像素(px)。如果直接导入的话可能会产生下图中的情况：

![图拾]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_10.png "导入错误？")

这个错误也有可能是光栅效果中的高ppi导致的（检查了一下并不是），总之记得先设置为毫米单位。

背景图层为不需要变动的内容，而上面的图层则是各个按钮按下的效果，偷懒了只做了一边，其中按钮的描边特意调整为1.1px，比背景的描边稍大一些，不会违和又能完全遮住背景按钮，防止出现漏背景图的情况（虽然在obs中基本看不见）。

导出每个组件为单独的svg，为方便在obs中进行导入，设置大小在800×600以内。由于与原图片设置不同，笔者需要修改css与html，为保证调试的方便，编写`test() `函数监控键盘事件代替gamepad api。

#### 2.3.2 位置编辑

位置编辑较为麻烦，需要注意的以下几点：

- 从AI中读出的数据并不代表所在的位置，通过AI的标注输获得的数据大部分仍需测试修改，造成这种现象可能的的原因是在AI中导出图片时会将线的宽度计算在图片大小中，而AI测量只能对线，点进行测量，没有考虑线宽；也有可能是AI存在一定误差，总之位置需要修改。

![图十一]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_11.png "数据差距")

- 路径填充的部分可能会存在一定的渲染问题。在外面将图片缩小后有可能浏览器为了节省资源而将曲线修改成了连续的直线段，当这种情况发生在两个色块的交界处时可能会将背景显示出来。有两种解决方法，一是将两者的交集的区域加大，减少露出背景的可能，二是将背景设置为某个颜色，露出与不露出的结果差距不大，三是“鸵鸟策略（虽然鸵鸟并不会这么做）”，直接放弃修改，理由是缩小后露出的背景较为均匀，看上去像是故意添加的描边，同时过小也不易察觉。

![图十二]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_12.png "漏背景举例")

- 为了调试方便，可以直接在浏览器控制台中对数值进行修改，再将数据填写到css中，不过要及时记好数值，否则修改文件后网页刷新，测试修改的内容都会重置。

![图十三]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_13.png "直接修改css")

测试与调整花了我2天的时间，最后的结果差强人意，之后的扩展可能比较麻烦，留给未来的自己吧。

## 3 本地部署

笔者调整完成后将项目上传到了github中，可能你只是来使用本项目而不是来看如何编写本项目的，这部分内容就是为你准备的。

### 3.1 拉取项目

访问项目的[github网页](https://github.com/skyjty/MyGamepadViewer)（可能需要魔法），点击Code-Download ZIP：
![图十四]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_14.png "下载文件")

或者点击[这里](https://github.com/skyjty/MyGamepadViewer/archive/refs/heads/main.zip)下载，两者都是github的源。
将文件解压到某个文件夹中，项目就下载到本地了。
![图十五]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_15.png "下载文件")

记得点击资源管理器的地址复制一下项目位置，方便在obs中插入。

### 3.2 配置obs

如果你还没有安装obs建议到steam中下载，steam会自动保持在最新版，使用也方便。
在obs中的来源下点击加号-浏览器：
![图十六]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_16.png "添加浏览器源")

随便设置一个名字，在之后的设置中按下图进行调整：
![图十七]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_17.png "浏览器源设置")

动一动你的手柄，此时便会出现在你的录制窗口中；如果拔出手柄，手柄会从屏幕中消失：
![图十八]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_18.png "obs预览")

你可以对浏览器源的位置与大小进行一些调整以适应录制的画面。

到这里，本地部署已经完成了，在笔者的计算机上该项目可以完美地地运行在obs中，在概述中的基本目的达到了，接下来是一些扩展。

## 4 部署到Jekyll中

众所周知，Jekyll是一个“静态”网站生成项目，但这不是说网站本身与静态的pdf相似。这个静态指的是网站文件是静态的，不能通过用户在前端的输入改变后台的文件，数据等，但是可以通过前端三件套实现一些动画效果。
但Jekyll本身基本上只是为文章编写做了相关优化，而对单独的前端项目缺少支持，笔者之后本地运行的过程中出现过访问本项目时出现。部署在Jekyll后可以直接利用链接导入obs中，但可能由于网络问题无法加载。
总之这只是一次测试Jekyll部署前端项目的能力，为之后对其他项目部署的铺垫。

相关内容会在之后关于Jekyll的下一篇文章中进行总结与补充，但本项目的本地使用与网络使用区别并不大，故此处省略。

以下记录一些发现的问题。

### 4.1 兼容性问题

这是笔者不主要考虑的问题，因为笔者仅仅在windows平台下有使用obs录制的需求，但由于笔者测试Jekyll的平台构建在Linux下，在此记录一些问题：
- 在本地测试时，链接发生重置，指向了原本的主页，刷新后加载主页，需要重新进入
- 在linux下的edge浏览器发生字体错误的情况，以后更新的svg应该会将字体作为图片导出避免字体导致的问题。
![图十九]({{site.path}}/public/image/2024-07-24-GamepadLive2D/2024_07_24_1_19.png "字体错误")
- 相比于windows，本项目在linux中的位置有些错位，可能是小数点像素导致了，以后最好使用整数进行编辑。

<!-- url传递参数 completed!-->
<!-- svg编辑研究 completed!-->
<!-- Live2D初步探究 -->
<!-- 键盘编辑（简单得多）（需要吗？） completed!-->