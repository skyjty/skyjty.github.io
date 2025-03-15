"use strict";
function v2p(baseV) {
    return {
        x: Math.cos(baseV.r) * baseV.l,
        y: Math.sin(baseV.r) * baseV.l
    };
}
function p2v(basep) {
    var v_r;
    if (basep.x != 0) {
        v_r = Math.atan2(basep.y, basep.x);
    }
    else {
        v_r = PI / 2;
    }
    return {
        r: v_r,
        l: Math.sqrt(basep.x * basep.x + basep.y * basep.y)
    };
}
// 计算两极坐标点的差
function vDiff(v1, v2) {
    const p1 = v2p(v1);
    const p2 = v2p(v2);
    const res = p2v({ x: p1.x - p2.x, y: p1.y - p2.y });
    return res;
}
const { log } = console;
const { PI } = Math;
class Spring {
    // 新增属性
    constructor(springBoxID, in_pos_x, in_pos_y, in_width, in_height, in_pic_width, in_pic_height, Length, stiffness_l, stiffness_r, damping_l, damping_r) {
        this.isDragging = false; // 是否正在拖动
        this.dragOffset = { r: 0, l: 0 }; // 修改属性类型为 Vector
        this.springBox = document.querySelector('.springbox');
        // this.springBox.innerHTML = '<div class="spring_bed"><canvas id = "Spring"></canvas><div class="spring_pic"></div></div>'
        this.canvas = document.getElementById('spring_canvas');
        this.pic = document.querySelector('.spring_pic');
        // 初始化变量
        this.width = in_width;
        this.height = in_height;
        this.springBox.style.width = in_width + 'px';
        this.springBox.style.height = in_height + 'px';
        this.pos_x = in_pos_x;
        this.pos_y = in_pos_y;
        // this.springBox.style.left = in_pos_x - in_width + 'px';
        // this.springBox.style.top = in_pos_y - in_height + 'px';
        this.pic_height = in_pic_height;
        this.pic_width = in_pic_width;
        this.pic.style.width = in_pic_width + 'px';
        this.pic.style.height = in_pic_height + 'px';
        this.endPoint = { r: 0, l: Length }; // 初始质量块位置
        this.controlpoint = { r: 0, l: Length / 2 }; // 初始控制点位置
        const dpr = window.devicePixelRatio || 1;
        // 根据设备像素比调整 Canvas 尺寸
        this.canvas.width = in_width * dpr;
        this.canvas.height = in_height * dpr;
        this.canvas.style.width = in_width + 'px';
        this.canvas.style.height = in_height + 'px';
        this.ctx = this.canvas.getContext("2d");
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.length = Length;
        this.stiffness = { r: stiffness_r, l: stiffness_l };
        this.damping = { r: damping_r, l: damping_l };
        this.velocity = { r: 0, l: 0 };
        this.setupMouseEvents();
        this.draw();
        this.animate();
    }
    draw() {
        // const circle_r = 20;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        const pic_pos = v2p({ r: this.endPoint.r - PI / 2, l: this.endPoint.l + 10 });
        const end_pos = v2p({ r: this.endPoint.r - PI / 2, l: this.endPoint.l });
        const con_pos = v2p({ r: this.controlpoint.r - PI / 2, l: this.controlpoint.l });
        // 绘制弹簧
        ctx.beginPath();
        ctx.moveTo(this.pos_x, this.pos_y);
        ctx.quadraticCurveTo(this.pos_x + con_pos.x, this.pos_y + con_pos.y, this.pos_x + end_pos.x, this.pos_y + end_pos.y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.stroke();
        // 绘制起点
        // ctx.beginPath();
        // ctx.arc(this.pos_x, this.pos_y, circle_r, 0, Math.PI * 2);
        // ctx.fillStyle = "green";
        // ctx.fill();
        // 绘制控制点
        // ctx.beginPath();
        // ctx.arc(this.pos_x + con_pos.x,
        // 	this.pos_y + con_pos.y,
        // 	circle_r, 0, Math.PI * 2);
        // ctx.fillStyle = "black";
        // ctx.fill();
        // 绘制终点
        // ctx.beginPath();
        // ctx.arc(this.pos_x + end_pos.x,
        // 	this.pos_y + end_pos.y,
        // 	circle_r, 0, Math.PI * 2);
        // ctx.fillStyle = "red";
        // ctx.fill();
        // 绘制图片
        // this.pic.style.left = this.pos_x/2 - this.pic_width/2 + 2 * end_pos.x + 'px';
        this.pic.style.right = -this.pos_x - this.pic_width / 2 + this.width - end_pos.x + 'px';
        // this.pic.style.top = this.pos_y/2 + this.pic_height + end_pos.y + 'px
        this.pic.style.bottom = this.pos_y / 2 - 2 * this.pic_height + 40 - end_pos.y + 'px';
        this.pic.style.rotate = vDiff(this.endPoint, this.controlpoint).r + 'rad';
    }
    // 更新弹簧状态
    update() {
        if (!this.isDragging) {
            // 计算与固定点的位移
            const dr = (this.endPoint.r + PI) % (2 * PI) - PI; // 角向位移,映射到[-PI,PI]
            const dl = this.endPoint.l - this.length;
            // 计算弹簧力和阻尼力
            // const springForceR = -this.stiffness * dr; // 角向弹簧力
            // const dampingForceR = -this.damping * this.velocity.r; // 角向阻尼力
            // const springForceL = -this.stiffness * dl; // 径向弹簧力
            // const dampingForceL = -this.damping * this.velocity.l; // 径向阻尼力
            // 合力
            const FR = -this.stiffness.r * dr - this.damping.r * this.velocity.r; // 角向合力
            const FL = -this.stiffness.l * dl - this.damping.l * this.velocity.l; // 径向合力
            // 更新速度
            this.velocity.r += FR; // 假设质量为 1
            this.velocity.l += FL;
            // 更新位置
            this.endPoint.r += this.velocity.r;
            this.endPoint.l += this.velocity.l;
        }
    }
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate.bind(this));
    }
    setupMouseEvents() {
        let offsetX;
        let offsetY;
        let mouse_pos;
        const onMouseMove = (event) => {
            if (this.isDragging) {
                const rect = this.canvas.getBoundingClientRect();
                mouse_pos = { x: event.clientX - rect.left - this.pos_x, y: event.clientY - rect.top - this.pos_y };
                const con_pos = v2p({ r: this.controlpoint.r + PI / 2, l: this.controlpoint.l });
                const click_pos = { x: mouse_pos.x - con_pos.x, y: mouse_pos.y - con_pos.y };
                const rotate_angle = p2v(click_pos).r - this.dragOffset.r;
                const ratio = p2v(click_pos).l / this.dragOffset.l;
                const last_endPoint = this.endPoint;
                this.endPoint = { r: last_endPoint.r + rotate_angle, l: last_endPoint.l * ratio };
                this.dragOffset = p2v(click_pos);
            }
        };
        const onMouseUp = () => {
            this.isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        this.pic.addEventListener("mousedown", (event) => {
            this.isDragging = true;
            const rect = this.canvas.getBoundingClientRect();
            offsetX = event.clientX - rect.left - this.pos_x;
            offsetY = event.clientY - rect.top - this.pos_y;
            // 计算鼠标按下时相对于图片的位置
            const con_pos = v2p({ r: this.controlpoint.r + PI / 2, l: this.controlpoint.l });
            const click_pos = { x: offsetX - con_pos.x, y: offsetY - con_pos.y };
            this.dragOffset = p2v(click_pos);
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
        const onTouchMove = (event) => {
            if (this.isDragging) {
                const rect = this.canvas.getBoundingClientRect();
                const touch = event.touches[0];
                mouse_pos = { x: touch.clientX - rect.left - this.pos_x, y: touch.clientY - rect.top - this.pos_y };
                const con_pos = v2p({ r: this.controlpoint.r + PI / 2, l: this.controlpoint.l });
                const click_pos = { x: mouse_pos.x - con_pos.x, y: mouse_pos.y - con_pos.y };
                const rotate_angle = p2v(click_pos).r - this.dragOffset.r;
                const ratio = p2v(click_pos).l / this.dragOffset.l;
                const last_endPoint = this.endPoint;
                this.endPoint = { r: last_endPoint.r + rotate_angle, l: last_endPoint.l * ratio };
                this.dragOffset = p2v(click_pos);
            }
        };
        const onTouchEnd = () => {
            this.isDragging = false;
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        };
        this.pic.addEventListener("touchstart", (event) => {
            this.isDragging = true;
            const rect = this.canvas.getBoundingClientRect();
            const touch = event.touches[0];
            offsetX = touch.clientX - rect.left - this.pos_x;
            offsetY = touch.clientY - rect.top - this.pos_y;
            // 计算触摸开始时相对于图片的位置
            const con_pos = v2p({ r: this.controlpoint.r + PI / 2, l: this.controlpoint.l });
            const click_pos = { x: offsetX - con_pos.x, y: offsetY - con_pos.y };
            this.dragOffset = p2v(click_pos);
            document.addEventListener("touchmove", onTouchMove);
            document.addEventListener("touchend", onTouchEnd);
        });
    }
}
const spring = new Spring('springbox', 150, // 位置x轴
400, // 位置y轴
300, // 大小x轴
400, // 大小y轴
196, // 图片大小x轴
120, // 图片大小y轴
100, // 弹簧长度
.01, // 径向劲度系数
.1, // 轴向劲度系数
.025, // 径向阻尼系数
.01); // 轴向阻尼系数
