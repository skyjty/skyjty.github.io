// Gamepad.js

class Gamepad {
    
    constructor() {
        this.$gamepad = $("#gamepad");//id = gamepad
        this.testmode = false;//测试模式，键鼠代替手柄
        this.gamepadIndex = null;//选择的gamepad，待扩展
        this.gamepads = {};//gamepad api存放
        this.triggersMeter = 1;//扳机样式控制
        this.mapping = {//按键，轴绑定
            buttons: [],
            axes: [],
        };
        this.rotateAngle = 30;//控制摇杆旋转角度
        this.detectSensitivity = 0.01//控制触发渲染行为的敏感度
        this.scanDelay = 1000/15;//刷新间隔

        this.setIntervalid = null;
        this.$gamepadInfo = $('#gamepad-info');//id = gamepad-info
        this.$buttonsContainer = $('#buttons');//id = buttons
        this.$axesContainer = $('#axes');//id = axes

        this.init();//初始化
    }
    init() {//初始化函数
        var test = this.getUrlParam("test");
        this.testmode = (test == "true")
        if(this.getUrlParam("angle")){
            this.rotateAngle = parseInt(this.getUrlParam("angle"));
        }

        if(window.location.origin == "file://"){}//是否为本地访问，本地访问不更新URL
        else{
            this.updateUrlParams(this.getUrlParams());
        }

        if(!this.testmode){
            this.$gamepad.hide();
            window.addEventListener('gamepadconnected', (e) => this.onGamepadConnect(e));//连接事件
            window.addEventListener('gamepaddisconnected', (e) => this.onGamepadDisconnect(e));//断开事件
        }
        else{
            
            this.test();
        }
    }

    onGamepadConnect(event) {//连接事件
        this.gamepadIndex = event.gamepad.index;
        this.gamepads[event.gamepad.index] = event.gamepad;//获取gamepad api
        this.loadGamepadMap(this.gamepads[this.gamepadIndex]);//加载按键映射
        this.$gamepad.show();
        
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
        else{
            return;
        }
        window.requestAnimationFrame(this.updateGamepadStatus.bind(this));
    }

    updateGamepadInfo() {
        if (this.gamepadIndex !== null) {
            const gamepad = this.gamepads[this.gamepadIndex];
            // this.$gamepadInfo.text(`Connected: ${gamepad.id}`);
            this.updateButtons(gamepad);
            this.updateAxes(gamepad);
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
        const previousValue = parseFloat($button.attr("data-value")) || 0;
        if ($button.attr("data-pressed") !== button.pressed || $button.attr("data-value") !== button.value) {//判断变量是否不同
            if($button.is(".trigger")){//如果是R2、L2，检测是否需要重新渲染
                if(Math.abs(previousValue - button.value) > this.detectSensitivity  //比较是否超出阈值
                 || ($button.attr("data-pressed") === "true") !== button.pressed){  //是否按下
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
                    $button.attr("data-pressed", button.pressed);
                    $button.attr("data-value", button.value);
                }
            }
            else{//普通按钮直接更新
                $button.attr("data-pressed", button.pressed);
                $button.attr("data-value", button.value);
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
    }

    updateAxis($axis) {//to be edit
        const axisX = $axis.attr("data-value-x");
        const axisY = $axis.attr("data-value-y");

        if ($axis.is(".stick.left")) {
            $axis.css({
                "margin-top": axisY * 25,
                "margin-left": axisX * 25,
                transform: `rotateX(${-parseFloat(
                    axisY * this.rotateAngle,
                    16
                )}deg) rotateY(${parseFloat(axisX * this.rotateAngle, 16)}deg)`,
            });
        }else if ($axis.is(".stick.right")) {
            $axis.css({
                "margin-bottom": axisY * -25,
                "margin-right": axisX * -25,
                transform: `rotateX(${-parseFloat(
                    axisY * this.rotateAngle,
                    16
                )}deg) rotateY(${parseFloat(axisX * this.rotateAngle, 16)}deg)`,
            });
        }
    }

    /**
     * 读取 URL 中的搜索参数
     *
     * @param {*} name - 要获取的参数名
     */
    getUrlParam(name) {
        let matches = new RegExp("[?&]" + name + "(=([^&#]*))?") // 创建一个正则表达式，用于查找 URL 中的参数
            .exec(window.location.search); // 在当前 URL 的搜索字符串中执行正则表达式
        return matches ? decodeURIComponent(matches[2] || true) || true : null; // 返回解码后的参数值，或如果没有值则返回 true
    }

    /**
     * 读取 URL 设置并生成一个键/值对象
     */
    getUrlParams() {
        const settingsArr = window.location.search // 获取 URL 中的搜索字符串
            .replace("?", "") // 移除开头的 "?" 字符
            .split("&") // 将搜索字符串拆分为键值对
            .map((param) => param.split("=")); // 将每个对拆分为键和值
        const settings = {}; // 初始化一个空对象，用于存储参数
        Object.keys(settingsArr).forEach((key) => { // 遍历键值对数组
            const [k, v] = settingsArr[key]; // 解构出键和值
            settings[k] = v; // 将值赋给对应的键
        });
        return settings; // 返回 settings 对象
    }

    /**
     * 清除所有 URL 设置
     */
    clearUrlParams() {
        this.updateUrlParams({
            type: undefined, // 清除 type 参数
            color: undefined, // 清除 color 参数
            debug: undefined, // 清除 debug 参数
            triggers: undefined, // 清除 triggers 参数
            zoom: undefined, // 清除 zoom 参数
        });
    }

    /**
     * 使用新设置更新 URL 哈希
     *
     * @param {*} newParams - 新的 URL 参数
     */
    updateUrlParams(newParams) {
        const params = Object.assign(this.getUrlParams(), newParams); // 合并当前 URL 参数和新的参数
        const query = Object.entries(params) // 将参数对象转换为键值对数组
            .filter(([, value]) => value !== undefined && value !== null) // 过滤掉值为 undefined 或 null 的参数
            .map(([key, value]) => `${key}=${value}`) // 将每个键值对转换为字符串
            .join("&"); // 将所有键值对连接成一个字符串
        window.history.replaceState({}, document.title, `/?${query}`); // 更新 URL，但不刷新页面
    }

    test(){
        this.$gamepad.show();
        // var test="test";
        // console.log(this.getUrlParam(test));
        $(document).ready(function() {
            // 监听按下键盘按键的事件
            $(document).on('keydown', function(event) {
                var flag = true;
                var Leftstick = true;
                var keypressed = event.key;
                console.log(keypressed+" pressed");
                if(keypressed === "s"){
                    $(`[data-button="${0}"]`).attr("data-pressed",flag);//a
                }
                else if(keypressed === "d"){
                    $(`[data-button="${1}"]`).attr("data-pressed",flag);//b
                }
                else if(keypressed === "a"){
                    $(`[data-button="${2}"]`).attr("data-pressed",flag);//x
                }
                else if(keypressed === "w"){
                    $(`[data-button="${3}"]`).attr("data-pressed",flag);//y
                }
                else if(keypressed === "Q"){
                    $(`[data-button="${4}"]`).attr("data-pressed",flag);//bumper left
                }
                else if(keypressed === "E"){
                    $(`[data-button="${5}"]`).attr("data-pressed",flag);//bumper right
                }
                
                else if(keypressed === "x"||keypressed === "c"
                    ||keypressed === "X"||keypressed === "C"){
                        var index;
                        if(keypressed === "x"||keypressed === "c"){
                            index = 6;
                        }else{
                            index = 7;
                        }

                        var $button = $(`[data-button="${index}"]`);
                        if(keypressed === "x"||keypressed === "X"){
                            var value = (parseFloat($button.attr("data-value"))-0.01).toString();
                        }else if(keypressed === "c"||keypressed === "C"){
                            var value = (parseFloat($button.attr("data-value"))+0.01).toString();
                        }

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
                            // $button.attr("data-pressed", button.pressed); 
                            $button.attr("data-value", value);
                }

                else if(keypressed === "q"){
                    $(`[data-button="${8}"]`).attr("data-pressed",flag);//select
                }
                else if(keypressed === "e"){
                    $(`[data-button="${9}"]`).attr("data-pressed",flag);//start
                }
                else if(keypressed === "1"){
                    $(`[data-button="${10}"]`).attr("data-pressed",flag);//stick left
                }
                else if(keypressed === "3"){
                    $(`[data-button="${11}"]`).attr("data-pressed",flag);//stick right
                }
                else if(keypressed === "ArrowUp"){
                    $(`[data-button="${12}"]`).attr("data-pressed",flag);//face up
                }
                else if(keypressed === "ArrowDown"){
                    $(`[data-button="${13}"]`).attr("data-pressed",flag);//face down
                }
                else if(keypressed === "ArrowLeft") {
                    $(`[data-button="${14}"]`).attr("data-pressed",flag);//face left
                }
                else if(keypressed === "ArrowRight"){
                    $(`[data-button="${15}"]`).attr("data-pressed",flag);//face right
                }

                else if(keypressed === "2"){
                    $(`[data-button="${16}"]`).attr("data-pressed",flag);//meta xbox sign? to be tested
                }

                else if(keypressed === "i"||keypressed === "m"
                    ||keypressed === "j"||keypressed === "k"
                    ||keypressed === "I"||keypressed === "M"
                    ||keypressed === "J"||keypressed === "K"){
                    var index = 0;
                    if(keypressed === "i"||keypressed === "m"){
                        index = 0;
                    }else if(keypressed === "j"||keypressed === "k"){
                        index = 1;
                    }else if(keypressed === "I"||keypressed === "M"){
                        index = 2;
                    }else if(keypressed === "J"||keypressed === "K"){
                        index = 3;
                    }

                    var $axis = $(
                        `[data-axis="${index}"], [data-axis-x="${index}"], [data-axis-y="${index}"], [data-axis-z="${index}"]`
                    );

                    if(keypressed === "i"||keypressed === "I"){
                        var axis = (parseFloat($axis.attr("data-value-y"))-0.1).toString();
                        $axis.attr("data-value-y", axis);
                    }
                    else if(keypressed === "m"||keypressed === "M"){
                        var axis = (parseFloat($axis.attr("data-value-y"))+0.1).toString();
                        $axis.attr("data-value-y", axis);
                    }
                    else if(keypressed === "j"||keypressed === "J"){
                        var axis = (parseFloat($axis.attr("data-value-x"))-0.1).toString();
                        $axis.attr("data-value-x", axis);
                    }
                    else if(keypressed === "k"||keypressed === "K"){
                        var axis = (parseFloat($axis.attr("data-value-x"))+0.1).toString();
                        $axis.attr("data-value-x", axis);
                    }

                    // console.log(this);
                    const axisX = $axis.attr("data-value-x");
                    const axisY = $axis.attr("data-value-y");

                    if ($axis.is(".stick.left")) {
                        $axis.css({
                            "margin-top": axisY * 25,
                            "margin-left": axisX * 25,
                            transform: `rotateX(${-parseFloat(
                                axisY * 30,
                                8
                            )}deg) rotateY(${parseFloat(axisX * 30, 8)}deg)`,
                        });
                    }
                    else{
                        $axis.css({
                            "margin-bottom": axisY * -25,
                            "margin-right": axisX * -25,
                            transform: `rotateX(${-parseFloat(
                                axisY * 30,
                                8
                            )}deg) rotateY(${parseFloat(axisX * 30, 8)}deg)`,
                        });
                    }
                }
            });
        
            // 监听释放键盘按键的事件
            $(document).on('keyup', function(event) {
                var flag = false;
                var keypressed = event.key;
                console.log(event.key+" released");
                if(keypressed === "s"){
                    $(`[data-button="${0}"]`).attr("data-pressed",flag);//a
                }
                else if(keypressed === "d"){
                    $(`[data-button="${1}"]`).attr("data-pressed",flag);//b
                }
                else if(keypressed === "a"){
                    $(`[data-button="${2}"]`).attr("data-pressed",flag);//x
                }
                else if(keypressed === "w"){
                    $(`[data-button="${3}"]`).attr("data-pressed",flag);//y
                }
                else if(keypressed === "Q"){
                    $(`[data-button="${4}"]`).attr("data-pressed",flag);//bumper left
                }
                else if(keypressed === "E"){
                    $(`[data-button="${5}"]`).attr("data-pressed",flag);//bumper right
                }

                else if(keypressed === "q"){
                    $(`[data-button="${8}"]`).attr("data-pressed",flag);//select
                }
                else if(keypressed === "e"){
                    $(`[data-button="${9}"]`).attr("data-pressed",flag);//start
                }
                else if(keypressed === "1"){
                    $(`[data-button="${10}"]`).attr("data-pressed",flag);//stick left
                }
                else if(keypressed === "3"){
                    $(`[data-button="${11}"]`).attr("data-pressed",flag);//stick right
                }
                else if(keypressed === "ArrowUp"){
                    $(`[data-button="${12}"]`).attr("data-pressed",flag);//face up
                }
                else if(keypressed === "ArrowDown"){
                    $(`[data-button="${13}"]`).attr("data-pressed",flag);//face down
                }
                else if(keypressed === "ArrowLeft") {
                    $(`[data-button="${14}"]`).attr("data-pressed",flag);//face left
                }
                else if(keypressed === "ArrowRight"){
                    $(`[data-button="${15}"]`).attr("data-pressed",flag);//face right
                }

                else if(keypressed === "2"){
                    $(`[data-button="${16}"]`).attr("data-pressed",flag);//meta xbox sign? to be tested
                }
            });
        });
    }
}

window.gamepad = new Gamepad();