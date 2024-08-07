---
layout: post
title:  面向对象程序设计课设（简单的网上购物模拟系统）
date:   2023-12-23 20:00:00 +0800
last_change_date: 2024-07-29 17:00:00 +0800
categories: C++
brief_introduction: 用C++简易实现一个购物系统
tags: 课设
# related_posts: Welcome to Jekyll!
---

>以下为课程设计报告原文，笔者仅作简单编辑以适配markdown语法，其中部分图片由于未被保存在本地而被忽略，本文仅作参考

- [1 实验环境](#1-实验环境)
- [2 实验内容](#2-实验内容)
	- [2.1 需求](#21-需求)
- [3 实验步骤](#3-实验步骤)
	- [3.1 为实现用户相关操作定义了User类以及User\_sum类：](#31-为实现用户相关操作定义了user类以及user_sum类)
	- [3.2 为实现管理员相关操作定义了Admin类：](#32-为实现管理员相关操作定义了admin类)
	- [3.3 为实现购物车，商店等相关操作定义了Good类以及Cart类：](#33-为实现购物车商店等相关操作定义了good类以及cart类)
	- [3.4 为实现折扣相关操作定义了Discount结构体以及Dis\_sum类；](#34-为实现折扣相关操作定义了discount结构体以及dis_sum类)
	- [3.5 为实现记录相关操作定义了Record结构体以及Record\_sum类；](#35-为实现记录相关操作定义了record结构体以及record_sum类)
	- [3.6 其他函数](#36-其他函数)
	- [3.7 为实现购物界面简易设计了主函数：](#37-为实现购物界面简易设计了主函数)
	- [3.8 需求详解](#38-需求详解)
- [4 实验结果](#4-实验结果)
- [5 实验总结](#5-实验总结)
- [6 补充](#6-补充)

## 1 实验环境
```
软件环境：
操作系统：Windows 11 家庭中文版
集成开发环境：Embarcadero Dev-C++ 6.3  //该编译器仅适用于简单程序的编写，同时也是
编译环境：TDM-GCC 9.2.0 64-bit Release

硬件环境：
处理器：12th Gen Intel(R) Core(TM) i7-12700H   2.70 GHz
```

## 2 实验内容

### 2.1 需求
第一次需求
>1.实现登录功能
管理员必须登录系统之后才能操作后台数据;顾客未登录系统时，可以查询商品信息若要购买商品，必须登录系统。
管理员和顾客通过账户名和密码登录系统。
管理员的账户和密码通过提前预设的方式指定。
顾客在首次登录系统时，需要先进行注册，注册成功后设置账户和密码(注册时需要提供的信息由你自行设计)。
2.管理顾客的信息
(1)保存顾客注册的信息和账户信息；
(2)顾客可以修改自己的密码。

第二次需求
>1.实现管理员的商品管理功能
(1) 能够根据管理员的输入，添加新的商品信息，包括商品的名称、单价、描述和库存等信息(可以自行添加你认为必要的信息);
(2) 能够删除指定商品的信息；
(3) 能够修改指定商品的信息；
2实现顾客查询商品信息的功能
(1) 能够根据用户给出的商品名称查询商品信息，并显示查询结果；
(2) 能够根据用户给出的关键字 (与商品名称不一致)，给用户推荐最接近的商品信息。
3实现购物车功能
(1) 为每个顾客创建购物车;
(2) 能够根据顾客的输入，向购物车中添加商品；
(3) 顾客能够查询购物车中的商品信息;
(4) 顾客能够删除购物车中的商品

第三次需求
>1顾客的购买功能
(1) 能够计算购物车中所有商品的总价，并将总价显示给用户;
(2) 顾客能够选择购物车中的商品进行结算，计算并显示结算商品的总价；
(3) 从购物车中删除已经结算的商品。
2.优惠与折扣
(1) 给顾客随机派送优惠券 (优惠券面值也可以随机)，顾客结算商品时可以输入优惠券码，对结算总价进行折扣计算。
(2) 活动折扣。特定优惠活动的折扣，结算时按折扣规则进行折扣计算。

第四次需求
>实现购物车持久化与恢复
保存购物车: 能够将购物车中的商品信息保存到文件中，以便下次运行程序时能够恢复之前的购物车数据。
恢复购物车：能够从文件中读取之前保存的购物车数据，以便在程序启动时能够加载之前的购物车信息。

第五次需求
>扩充购物车功能
(1) 购物历史：能够保存顾客的购物历史记录，包括购买的商品和购买时间
(2) 购物数据分析: 根据顾客选定的时间，按照所购买商品的种类展示购买的金额。

## 3 实验步骤
写出实验思路、关键数据结构定义和类的接口定义、主要算法流程以及遇到的问题和解决方案。
### 3.1 为实现用户相关操作定义了User类以及User_sum类：
User类中的函数实现了对单一用户的操作，包括对用户名name以及密码password的相关操作。
User_sum类的私有成员变量包含了一定数量的User类，当前用户总量user_sum，并实现了对用户数据的修改，从文件读取与保存到文件等操作。
此处说明部分成员函数：
load函数通过ifstream类实现文件流，利用getline函数实现按行读取，并利用size_t类型，substr函数以及find函数对每行数据进行拆分，数据处理，保存到程序中，并记录用户总数。
save函数则简单很多，利用ofstream类实现文件写入，设计好写入格式后按格式写入。
Cart类，Record类中的load函数以及save函数实现原理类似，仅在实现细节中由于数据的不同有所差距，此后不再赘述。

### 3.2 为实现管理员相关操作定义了Admin类：
Admin类私有成员变量password允许管理员进行登录操作并在后续进行对用户以及商店的各类操作。

### 3.3 为实现购物车，商店等相关操作定义了Good类以及Cart类：
Good类为单一商品类，私有成员变量有商品名称name，商品价格price，商品数量num，并实现了对以上变量的相关操作。
Cart类的私有成员变量包含了一定数量的Good类，当前商品种类总数cart_num，并实现了对商品数据的修改，从不同文件读取，保存到不同文件等操作。用户的id从0开始直到上限。
商品在程序中被视为一个反方向的购物车，其id为-1，避免与用户购物车冲突。当购物时，程序从商店购物车中减少一定数量的商品，加到用户购物车中。
此处说明部分成员函数：
add_good函数存在重载，包括利用直接加入Good类以及立体Good类的成员变量加入函数，便于在商店，购物车不同情况下加入商品；
buy_good函数将当前购物车中的商品删去，返回Good类变量。
Check函数为了实现折扣Dis_sum类，记录Record_sum类经过多次修改，将用户id，Record_sum类的地址，以及折扣传入，便于结账时计算折扣并记录。

### 3.4 为实现折扣相关操作定义了Discount结构体以及Dis_sum类；
在第二次上机后发现多个类嵌套的实现过于繁琐，因此在实现折扣类时用结构体代替类保存数据，便于修改。
Discount结构体包括了折扣值以及对应的兑换码。
Dis_sum类包含一定数量个Discount结构体以及折扣券数量，并实现了折扣值，兑换码的随机生成函数，以及使用折扣券的相关函数。
此处说明部分成员函数：
creat函数实现了折扣券的面值以及折扣码的随机生成，利用rand()产生随机数，按一定的对应法则生成大小写字母以及数字产生的随机序列randomString；


### 3.5 为实现记录相关操作定义了Record结构体以及Record_sum类；
Record结构体利用字符记录用户操作，多个整型变量记录用户uid，商品gid，商品数量g_num，以及代表时间的字符串time_s。
此处说明部分成员函数：
add_rec函数存在重载，主要为区别从文件中读取以及用户操作时记录的时间是否为当前时间；
Display函数存在重载，其中一个通过输入用户id，开始，结束时间字符串为用户提供搜索结果。

### 3.6 其他函数
(1).int compare_str(string a,string b);
通过回溯算法计算字符串距离，即从a到b通过改，增，删字符的最短路径，用于Cart类中实现用户搜索商品时寻找类似商品。
(2).string time2str(time_t t_);
将时间变量转换为string并返回，用于Record类中记录操作时间。
(3).int compare_date(string s1,string s2);
比较字符串表示的时间大小并返回，用于Record类中用户搜索记录。

### 3.7 为实现购物界面简易设计了主函数：
 
此图简易的展示了主函数的运行逻辑。多数界面通过while，switch，system("cls")函数实现简单的界面。
### 3.8 需求详解
(1).第一次需求
登录功能在用户登录以及管理员登录界面实现；
管理用户信息在管理员登录-->选择编辑用户实现。
(2).第二次需求
管理员的商品管理功能在管理员登录-->选择编辑商品实现；
顾客查询商品信息在用户登录-->访问商店实现；
购物车功能在整个商店界面实现；
(3).第三次需求
顾客的购买功能在商品界面-->付款中实现；
优惠与折扣同样在付款界面实现；
(4).第四次需求
购物车的持久化与恢复在购物车类的save与load函数中实现；
(5).第五次需求
购物历史在用户登录-->展示购物历史以及管理员登录-->展示所有购物记录中实现；

## 4 实验结果
针对不同输入，该程序都存在哪几类可能出现的情况，你的测试数据要完全覆盖了你所想到的这些情况，并给出测试结果。
(1).模式选择：
若正常输入，进入下一个界面或进行操作：

若输入错误，返回Input error并重新选择：

(2).密码验证

若正确输入密码，则正常进入下一界面：
I.用户
II.管理员
若错误输入密码，返回上一级
(3).加入商品
若正确输入，将商品加入购物车：
若错误输入，返回错误：
(4).减少商品数量
若正确输入，删除：
若错误输入，返回错误
(5).折扣设置
若正确输入，结算时折扣改变：
若错误输入，重新输入：
(6).记录查询
若正确输入，正确输出：
若错误输入，返回空表：

## 5 实验总结
通过本次实验，我初步了解了C++语言中面向对象程序设计范式的相关机制。我成功地运用这些机制完成了一个模拟网上购物系统。这个实验让我更深入地理解了类的使用，扩展了我在上学期通过学习java语言对面向对象程序设计范式的了解。同时，通过比较这两种语言的异同点，我进一步加深了对它们的理解。我认为这个实验对我的学习带来了很大的帮助，也增强了我在面向对象程序设计的技能。


附录 C++源码 （[跳过代码](#6-补充)）
```cpp
#include<iostream>//输入输出流
#include<string>//字符串
#include<time.h>//随机数生成
#include<fstream>//文件读写流
#include<sstream>//字符串读写流
#include<vector>//字符串比较
#include<algorithm>//字符串比较
#define MAX_VALUE 10//用户最大数量
#define MAX_CODE_LEN 10//优惠券长度
#define MAX_DIS_NUM 10//优惠券数量
#define MAX_RECORD 100//记录数量
using namespace std;//使用标准命名空间

/*类声明*/
class User;//用户类
class User_sum;//用户总类
class Admin;//管理员类
class Good;//商品类
class Cart;//购物车类
class Dis_sum;//优惠券汇总类
class Record_sum;//记录总类

class User{//用户类
	private://私有成员变量
		string name;//名称
		string password;//密码
	public:
		User(){;}//无参构造，便于用户总类初始化
		User(string name,string password){//构造函数
			this->name = name;//用户名
			this->password = password;//密码
		}
		void set_user(string name,string password);//初始化函数
		string get_name();//获取名称
		string get_pass();//获取密码
		void change_name(string name);//更改名称
		void change_pass(string password);//更改密码
};

class User_sum{//用户表单类
	private://私有成员
		User user[MAX_VALUE];//所有用户数组
		int user_num;//表单中的用户数量
	public://公有成员
		User_sum(){this->user_num = 0;}//构造函数
		~User_sum(){}//析构函数
		void load();//从文件读取
		void save();//保存到文件
		int get_num();//获取用户数量
		bool add_user(string name,string pass);//增加用户
		User get_user(int i);//获取用户对象
		void change_name(int i,string name);//获取用户名称
		void change_pass(int i,string pass);//获取用户密码
		bool confirm_pass(int i,string pass);//验证密码
		void show_user();//展示所有用户
};

class Admin{//管理员类
	private:
		string password;
	public:
		Admin(string password){this->password = password;}//构造函数
		void change_password(string password);//修改密码
		string get_pass();//获取密码
};

class Good{//商品类
	private://私有成员
		string name;//商品名称
		int price;//商品价格
		int num;//商品数量
	public://公有成员
		Good(){this->name = "";this->num = 0;this->price = 0;};//无参构造函数
		Good(string name,int price,int num){//含参构造函数
			this->name = name;//名称
			this->price = price;//价格
			this->num = num;//数量
		};
		bool good(string name,int price,int num);//修改函数
		bool assign(Good good);//修改函数
		string get_name();//读取名称
		int get_price();//读取价格
		int get_num();//获取数量
		void add_num(int add);//增加数量
		void minus_num(int minus);//减少数量
};

class Cart{//购物车/商店类
	private://私有成员
		Good goods[MAX_VALUE];//商品数组
		int cart_num;//商品数量
	public://公共成员
		Cart(){this->cart_num = 0;}//构造函数
		bool add_good(string name,int price,int num);//加入新商品
		bool add_good(Good good);//加入商品
		bool del_good(int id);//删除商品
		int get_num(int id);//获取商品数量
		int get_price(int id);
		void minus_good(int id,int num);//减少商品数量
		void empty_good(int id);
		void add_num(int id,int num);//增加商品数量
		Good buy_good(int id,int num);//购买商品
		Good get_good(int id);//获取商品
		int get_sum();//获取总价
		void Display();//展示所有商品
		void Display(int id);//展示某一商品
		bool Check(int id,Record_sum &rec,double discount,double hol_dis);//结账
		void Find(string name);//寻找函数
		void load(int id);//加载函数
		void save(int id);//保存函数
		void change_name(int id,string name);//修改商品名称
		void change_price(int id,int price);//修改商品价格
		void change_num(int id,int num);//修改商品数量
};

struct Discount{//折扣券结构体
	double discount;//折扣值
	string code;//兑换码
};

class Dis_sum{//折扣券类
	private://私有成员
		Discount dis[MAX_DIS_NUM];//折扣券总数
		int dis_num;//折扣券数量
	public://公有成员
		Dis_sum(){//构造函数
			this->dis_num = 0;//折扣券数量置零
			this->creat();//折扣券类初始化
		};
		Discount draw();//抽取折扣券
		void creat();//初始化折扣券
		double use(string in);//使用折扣券
		void Display();//全部展示
		void Display(int id);//展示
		string get_code(int id);//获取兑换码
		double get_discount(int id);//获取折扣
};

struct Record{//记录结构体
	char ope;//字符代表操作
	int uid;//用户id
	int gid;//商品id
	int g_num;//商品数量
	string time_s;//时间字符串
	Record(){//构造函数，便于判空
		this->uid = -1;
		this->gid = -1;
		this->g_num = -1;//判空记录
//		this->time_s = string("");
	}
	void initialize(){//重置为空函数
		this->uid = -1;
		this->gid = -1;
		this->g_num = -1;
	}
	bool is_empty(){//判断是否为空
		return g_num == -1;//只有初始化与置空的商品数量为-1
	};
};

class Record_sum{//记录类
	private://私有成员变量
		Record rec[MAX_RECORD];//记录数组
		int re_num;//记录数量
	public:
		Record_sum(){this->re_num = 0;};//构造函数
		bool add_rec(Record re);//加入记录
		bool add_rec(char c,int uid,int gid,int gnum);//读取文件时加入记录
		bool add_rec(string time,char c,int uid,int gid,int gnum);//用户操作时加入记录
		Record get_rec(int id);//获取记录
		int get_uid(int id);//获取用户id
		string get_tim(int id);//获取记录时间
		void Display();//展示所有记录
		void Display(int id);//展示第id个记录
		void Display(int user,Cart cart,string intim,string outtime);//用户搜索记录函数
		void save();//保存到文件
		void load();//从文件读取
};
/*全局函数*/


int compare_str(string a,string b){//回溯算法计算字符串距离，操作分别为改，增，删，返回a到b操作数最少的操作
	int n = (int)a.size(), m = (int)b.size();//记录string大小
	vector<vector<int>>dp(n + 1, vector<int>(m + 1, 0));
	dp[0][0] = 0;//dp[x][y]代表将a字符串前x个字符修改成b字符串前y个字符
	for (int i = 1; i <= m; ++i) 
		dp[0][i] = i;
	for (int i = 1; i <= n; ++i) 
		dp[i][0] = i;
	for (int i = 1; i <= n; ++i){
		for (int j = 1; j <= m; ++j) 
		{
			int one = dp[i - 1][j] + 1, two = dp[i][j - 1] + 1, three = dp[i - 1][j - 1];
			if (a[i - 1] != b[j - 1]) 
				three += 1;
			dp[i][j] = min(min(one, two), three);
		}
	}
	return dp[n][m];
}

//time_t str2time(string str){//string类到time_t类型，由于实现错误更换思路
//	tm tm_;
//	int yy,mm,dd,hh,mi,ss;
//	sscanf(str.c_str(),"%d-%d-%d %d:%d:%d",&yy,&mm,&dd,&hh,&mi,&ss);
//	tm_.tm_year = yy - 1900;
//	tm_.tm_mon = mm - 1;
//	tm_.tm_mday = dd;
//	tm_.tm_hour = hh;
//	tm_.tm_min = mi;
//	tm_.tm_sec = ss;
//	tm_.tm_isdst = 0;
//	time_t t_ = mktime(&tm_);
//	return t_;
//}

string time2str(time_t t_){//time_t类型到string类函数
	char buf[64];
	time_t t,t1;
	tm* local;
	tm* gmt;
	t = time(NULL);
	local = localtime(&t);
	strftime(buf ,64 ,"%Y-%m-%d %H:%M:%S", local);//格式读取函数
	string str = buf;
	return str;
}

int compare_date(string s1,string s2){//比较string表示的时间先后
	int re = 0;
	int yy1,mm1,dd1,hh1,mi1,ss1;
	int yy2,mm2,dd2,hh2,mi2,ss2;
	sscanf(s1.c_str(),"%d-%d-%d %d:%d:%d",&yy1,&mm1,&dd1,&hh1,&mi1,&ss1);
	sscanf(s2.c_str(),"%d-%d-%d %d:%d:%d",&yy2,&mm2,&dd2,&hh2,&mi2,&ss2);
	if(yy1 == yy2){
		if(mm1 == mm2){
			if(dd1 == dd2){
				if(hh1 == hh2){
					if(mi1 == mi2){
						if(ss1 == ss2){re = 0;}
						else if(ss1>ss2){re = 1;}
						else{re = -1;} 
					}
					else if(mi1>mi2){re = 1;}
					else{re = -1;}
				}
				else if(hh1>hh2){re = 1;}
				else{re = -1;}
			}
			else if(dd1>dd2){re = 1;}
			else{re = -1;}
		}
		else if(mm1>mm2){re = 1;}
		else{re = -1;}
	}
	else if(yy1>yy2){re = 1;}
	else{re = -1;}
	return re;
}

/*类函数*/

/*User*/
void User::set_user(string name,string password){//初始化/重置函数
	this->name = name;//名称
	this->password = password;//密码
}

string User::get_name(){return this->name;}//读取名称

string User::get_pass(){return this->password;}//读取密码

void User::change_name(string name){this->name = name;}//修改名称

void User::change_pass(string pass){this->password = pass;}//修改密码



/*User_sum*/
int User_sum::get_num(){//获取用户总数
	return this->user_num;
}

void User_sum::load(){//从文件中读取到程序
	ifstream fin;
	fin.open("User.txt",ios::in);//初始化读入流
	this->user_num = 0;//每次读取都初始化用户数量
	string line,s,name,pass;//暂存变量
	size_t pos;//String流需要位置变量
	for(int i=0;i<MAX_VALUE;i++){//循环输入用户表单
		if(getline(fin,line)){//输入流读取每一行
			pos = line.find(" ");//标记空格位置
			name = line.substr(0,pos);//读取名字
			pass = line.substr(pos+1);//读取密码
			this->user[i].set_user(name,pass);//保存到表单中
			this->user_num++;//用户数量增加
		}
		else{break;}//读取完毕
	}
	fin.close();//关闭文件流
}

void User_sum::save(){//从程序中保存到文件
	ofstream fout;//写入流
	fout.open("User.txt",ios::out);//初始化写入流
	string name,pass;//暂存变量
	for(int i=0;i<this->user_num;i++){//循环写入
		name = this->user[i].get_name();//写入名称
		pass = this->user[i].get_pass();//写入密码
		fout<<name<<" "<<pass<<endl;//写入
	}
	fout.close();//关闭
}

bool User_sum::add_user(string name,string password){//增加用户数量
	if(this->user_num >= MAX_VALUE){//如果用户数量过多
		return false;//返回增加失败
	}
	else{//用户输入
		this->user[user_num].set_user(name,password);//设置用户名称与密码
		this->user_num++;//增加用户数量
		return true;
	}	
}

User User_sum::get_user(int i){//获取用户对象
	return this->user[i];
}

void User_sum::change_name(int i,string name){//修改用户名称
	this->user[i].change_name(name);
}

void User_sum::change_pass(int i,string pass){//修改用户密码
	this->user[i].change_pass(pass);
}

bool User_sum::confirm_pass(int i,string pass){//用户密码确认
	return this->user[i].get_pass() == pass;
}

void User_sum::show_user(){//循环输出
	for(int i = 0;i < this->get_num();i++){
		cout<<i+1<<"-"<<this->get_user(i).get_name()<<endl;//展示
	}
}



/*Admin*/
void Admin::change_password(string password){
	this->password = password;
}

string Admin::get_pass(){
	return this->password;
}



/*Good*/
bool Good::good(string name,int price,int num){//修改对象
	this->name = name;
	this->price = price;
	this->num = num;
	return true;
}

bool Good::assign(Good good){//修改对象
	this->name = good.get_name();
	this->price = good.get_price();
	this->num = good.get_num();
	return true;
}

string Good::get_name(){//获取名称
	return this->name;
}

int Good::get_price(){//获取价格
	return this->price;
}

int Good::get_num(){//获取数量
	return this->num;
}

void Good::add_num(int add){this->num+=add;}//数量增加

void Good::minus_num(int minus){this->num-=minus;}//数量减少



/*Cart*/
bool Cart::add_good(string name,int price,int num){//加入购物车
	int flag = 0;//标记
	for(int i = 0;i < MAX_VALUE;i++){//循环查找
		if(this->goods[i].get_name() == name){//如果购物车中已存在
			this->goods[i].add_num(num);//给已存在的商品增加数量
			flag = -1;//添加标记
			break;
		}
		else if(this->goods[i].get_num() == 0){//如果不存在，标记第一个空位商品
			flag = i;//添加标记
			break;
		}
	}
	if(flag > 0){//如果不存在，直接添加商品
		this->goods[flag].good(name,price,num);
		this->cart_num++;
	}
	else if(flag == 0){//如果未成功添加
		return false;
	}
	return true;
}

bool Cart::add_good(Good good){//加入购物车
	string name = good.get_name();
	int price = good.get_price();
	int num = good.get_num();
	int flag = 0;
	for(int i = 0;i < MAX_VALUE;i++){
		if(this->goods[i].get_name() == name){//如果购物车中已存在
			this->goods[i].add_num(num);
			flag = -1;//添加标记
			break;
		}
		else if(this->goods[i].get_num() == 0){//如果不存在，标记第一个空位商品
			flag = i;//添加标记
			break;
		}
	}
	if(flag > 0){//如果不存在，添加商品
		this->goods[flag].good(name,price,num);
		this->cart_num++;
	}
	else if(flag == 0){//如果未成功添加
		return false;
	}
	return true;
}

bool Cart::del_good(int id){//删除商品
	int flag = 0;//标记
	for(int i = 0;i < MAX_VALUE;i++){
		if(i == id){
			for(int j = id;j < MAX_VALUE - 1;j++){//将后一位前移，顶掉前一位
				this->goods[j].assign(this->goods[j+1]);
			}
//			this->cart_num--;//减少商品数量
			flag = 1;//标记已操作
			break;
		}
	}
	if(flag){
		return true;
	}
	else{
		return false;
	}
}

int Cart::get_num(int id){//获取数量
	return this->goods[id].get_num();
}

int Cart::get_price(int id){
	return this->goods[id].get_price();
}

void Cart::minus_good(int id,int num){//减少数量
	this->goods[id].minus_num(num);
}

void Cart::empty_good(int id){
	int num = this->goods[id].get_num();
	this->goods[id].minus_num(num);
}

void Cart::add_num(int id,int num){//增加数量
	this->goods[id].add_num(num);
}

Good Cart::buy_good(int id,int num){//卖出商品
	Good good = Good();
	good.good(this->goods[id].get_name(),this->goods[id].get_price(),num);
	this->goods[id].minus_num(num);
	return good;
}

Good Cart::get_good(int id){//获取商品信息
	return this->goods[id];
}

int Cart::get_sum(){//计算商品总价
	int sum = 0;
	for(int i = 0;i < MAX_VALUE;i++){
		if(this->goods[i].get_num()>0){
//			cout<<this.goods[i].get_name()<<"\t\t\t"<<this.goods[i].get_price()<<"\t"<<this.goods[i].get_num()<<endl;
			sum += this->goods[i].get_num() * this->goods[i].get_price();
		}
	}
	return sum;
}

void Cart::Display(){//展示所有商品
	cout<<"ID\tItems\t\t\tPrice\tNum"<<endl;
	for(int i = 0;i < this->cart_num;i++){
		if(this->goods[i].get_num()>0){
			Display(i);
		}
	}
//	cout<<"总价为："<<this->get_sum()<<endl;
}

void Cart::Display(int id){//展示某一商品
	cout<<id<<"\t"<<this->goods[id].get_name()<<"\t\t\t"
	<<this->goods[id].get_price()<<"\t"<<this->goods[id].get_num()<<endl;
}

bool Cart::Check(int uid,Record_sum &rec,double discount,double hol_dis){//按折扣消费
	cout<<"Total price:"<<this->get_sum()<<endl;
	if(this->get_sum() - discount < 0){
		cout<<"Price after discount: 0"<<endl;
	}
	if(discount >0){//折扣展示
		if(hol_dis > 0){
			cout<<"Price after discount:("<<this->get_sum()<<" - "<<discount<<")"<<" * "<<hol_dis<<" = "<<(this->get_sum() - discount) * hol_dis<<endl;
		}else{
			cout<<"Price after discount:"<<this->get_sum()<<" - "<<discount<<" = "<<this->get_sum() - discount<<endl;
		}
	}else{
		if(hol_dis > 0){
			cout<<"Price after discount:"<<this->get_sum()<<" * "<<hol_dis<<" = "<<this->get_sum() * hol_dis<<endl;
		}
	}
	int gnum;
	string gname;
//	/*
	for(int i = 0;i < this->cart_num;i++){
		gnum = this->get_num(i);
		if(gnum > 0){
			rec.add_rec('#',uid,i,gnum);
			this->empty_good(i);
		}
	}
	this->cart_num = 0;
//	*/
	return true;
}

void Cart::Find(string name){//寻找函数
	int find_res = -1;
	int res = INT_MAX;
	cout<<endl<<"S E A R C H   R E S U L T"<<endl<<endl;
	for(int i = 0;i < MAX_VALUE;i++){
		if(compare_str(this->goods[i].get_name(),name) < res){//寻找距离最小的字符串
			res = compare_str(this->goods[i].get_name(),name);
			find_res = i;
		}
	}
	if(find_res == -1){//如果没找到
		cout<<"NOT FOUND"<<endl;
	}
	else{
		this->Display(find_res);
	}
}

void Cart::load(int id){//从文件中加载
	string path = "Cart/";
	path.append(to_string(id));
	path.append(".txt");
	
	ifstream fin;
	fin.open(path,ios::in);//读入流
	this->cart_num = 0;//每次读取都初始化用户数量
	string line,s,name;//暂存变量
	int price,num;
	size_t pos1,pos2;//String流需要位置变量
//	istringstream is(line);//创建String流
	for(int i=0;i<MAX_VALUE;i++){//循环输入用户表单
		if(getline(fin,line)){//输入流读取每一行
			pos1 = line.find_first_of(" ");//标记前一个空格位置
			pos2 = line.find_last_of(" ");//标记后一个空格位置
			name = line.substr(0,pos1);//读取名字
			price = atoi(line.substr(pos1+1,pos2).c_str());//读取价格
			num = atoi(line.substr(pos2).c_str());//读取数量
			if(price > 0){
				this->goods[i].good(name,price,num);//保存到购物车中
				this->cart_num++;//商品种类增加
			}
		}
		else{
			break;
		}
	}
	
	fin.close();//关闭文件流
}

void Cart::save(int id){//从程序中保存到文件
	string path = "Cart/";
	path.append(to_string(id));
	path.append(".txt");
	
	ofstream fout;
	fout.open(path,ios::out);//写入流
	string name;
	int price,num;//暂存变量
	for(int i = 0;i < this->cart_num;i++){//循环写入
		if(this->goods[i].get_price() > 0){
			name = this->goods[i].get_name();
			price = this->goods[i].get_price();
			num = this->goods[i].get_num();
			fout<<name<<" "<<price<<" "<<num<<endl;//写入
		}
	}
	fout.close();//关闭
}

void Cart::change_name(int id,string name){
	this->goods[id].good(name,this->goods[id].get_price(),this->goods[id].get_num());
}

void Cart::change_price(int id,int price){
	this->goods[id].good(this->goods[id].get_name(),price,this->goods[id].get_num());
}

void Cart::change_num(int id,int num){
	this->goods[id].good(this->goods[id].get_name(),this->goods[id].get_price(),num);
}



/*Discount*/
void Dis_sum::creat(){//初始化折扣券
	int n = 10;//控制折扣最高值
   	time_t t;
	srand((unsigned) time(&t));
	
    string randomString;
    for(int j = 0;j < MAX_DIS_NUM;j++){
    	this->dis[j].discount = (rand()%100/(double)100) * n + 0.01;
   		for (int i = 0; i < MAX_CODE_LEN; ++i) {
			int randomCharType = rand() % 3; // 0 for uppercase, 1 for lowercase, 2 for digit
			if (randomCharType == 0) {
    	       	randomString += 'A' + rand() % 26; // Uppercase letter
   	    	} else if (randomCharType == 1) {
				randomString += 'a' + rand() % 26; // Lowercase letter
			} else {
				randomString += '0' + rand() % 10; // Digit
			}
		}
		this->dis[j].code = randomString;
		randomString.clear();
		this->dis_num++;
	}
}

Discount Dis_sum::draw(){//抽取折扣券
	srand(time(0));
	int pro = 10;
	return dis[rand()%10];
}

double Dis_sum::use(string in){//使用折扣券
	int flag = -1;
	for(int i = 0;i < this->dis_num;i++){//寻找符合的兑换码
		if(in == this->dis[i].code){
			flag = i;
			break;
		}
	}
	if(flag == -1){//如果没找到，返回0
		return 0.0;
	}
	else{
		return this->get_discount(flag);
	}
}

void Dis_sum::Display(){//展示
	cout<<"ID\tCode\t\t\t\tDiscount"<<endl;
	for(int i = 0;i < this->dis_num;i++){
		if(this->dis[i].discount>0.0){
			Display(i);
		}
	}
}

void Dis_sum::Display(int id){
	cout<<id<<"\t"<<this->get_code(id)<<"\t\t\t"<<this->get_discount(id)<<endl;
}

string Dis_sum::get_code(int id){
	return this->dis[id].code;
}

double Dis_sum::get_discount(int id){
	return this->dis[id].discount;
}


/*Record_sum*/
bool Record_sum::add_rec(Record re){
	int flag = -1;
	for(int i = 0;i < MAX_RECORD;i++){
		if(this->rec[i].is_empty()){
			flag = i;
			break;
		}
	}
	if(flag == -1){
		return 0;
	}
	else{
		this->rec[flag] = re;
		this->re_num++;
//		this->save();
		return 1;
	}
};

bool Record_sum::add_rec(char c,int uid,int gid,int gnum){
	Record re;
	re.ope = c;
	re.uid = uid;
	re.gid = gid;
	re.g_num = gnum;
	re.time_s = time2str(time(NULL));
	return add_rec(re);
};

bool Record_sum::add_rec(string time_s,char c,int uid,int gid,int gnum){
	Record re;
	re.ope = c;
	re.uid = uid;
	re.gid = gid;
	re.g_num = gnum;
	re.time_s = time_s;
	return add_rec(re);
};

Record Record_sum::get_rec(int id){
	return this->rec[id];
};

int Record_sum::get_uid(int id){
	return this->rec[id].uid;
};

string Record_sum::get_tim(int id){
	return this->rec[id].time_s;
};

void Record_sum::Display(int id){
	Record re;
	re = this->rec[id];
	cout<<re.time_s<<"\t"<<re.ope<<"\t\t"<<re.uid<<"\t"<<re.gid<<"\t"<<re.g_num<<endl;
};

void Record_sum::Display(){
	cout<<"TIME\t\t\tOperation\tUID\tGID\tNUM"<<endl;
	for(int i = 0;i < this->re_num;i++){
		if(!this->rec[i].is_empty()){
			Display(i);
		}
	}
	cout<<"Tips: '+' means plus, '-' means minus, '#' means check."<<endl;
};

void Record_sum::Display(int user,Cart cart,string intim,string outtime){
	Record temp;
	cout<<"TIME\t\t\tOperation\tUID\tGID\tNum\tPrice"<<endl;
	for(int i = 0;i < this->re_num;i++){
		temp = this->rec[i];
		if(temp.uid == user&&compare_date(temp.time_s,intim) >= 0&&compare_date(outtime,temp.time_s) >= 0){
			cout<<temp.time_s<<"\t"<<temp.ope<<"\t\t"<<temp.uid<<"\t"<<temp.gid<<"\t"<<temp.g_num<<"\t"<<cart.get_price(temp.gid)<<endl;
		}
	}
	cout<<"Tips: '+' means plus, '-' means minus, '#' means check."<<endl;
};

void Record_sum::save(){
	string path = "History.txt";
	ofstream fout;
	fout.open(path,ios::out);//写入流
	char ope;
	int uid;
	int gid;
	int g_num;
	string time_s;
	Record temp;//暂存变量
	for(int i = 0;i < this->re_num;i++){//循环写入
		temp = this->rec[i];
		if(!temp.is_empty()){
			time_s = temp.time_s;
			ope = temp.ope;
			uid = temp.uid;
			gid = temp.gid;
			g_num = temp.g_num;
			fout<<time_s<<" "<<ope<<" "<<uid<<" "<<gid<<" "<<g_num<<endl;//写入
		}
	}
	fout.close();//关闭
};

void Record_sum::load(){//从文件中加载
	string path = "History.txt";
	
	ifstream fin;
	fin.open(path,ios::in);//读入流
	
	this->re_num = 0;//每次读取都初始化用户数量
	string line,s1,time_s;
	char c;
	int uid,gid,gnum;//暂存变量
	
	size_t pos1,pos2,pos3,pose;//处理String需要位置变量
	
	for(int i=0;i<MAX_RECORD;i++){//循环读入记录
		if(getline(fin,line)){//输入流读取每一行
			pos1 = line.find_last_of(":");
			pose = line.find_last_of(" ");
			pos2 = line.substr(pos1+6).find_first_of(" ");
			pos3 = line.substr(pos1+6).find_last_of(" ");
			
			time_s = line.substr(0,pos1+3);
			s1 = line.substr(pos1+6);
			
			uid = atoi(s1.substr(0,pos2).c_str());
			gid = atoi(s1.substr(pos2+1,pos3-2).c_str());
			c = line.substr(pos1+4).c_str()[0];
			gnum = atoi(line.substr(pose).c_str());
			//对每一行进行处理读取数据
			if(gnum > 0){
				this->add_rec(time_s,c,uid,gid,gnum);//保存到记录中
				this->re_num++;//记录数量增加
			}
		}
		else{
			break;//退出
		}
	}
	
	fin.close();//关闭文件流
};

//int main(){
//	Record_sum rec = Record_sum();
//	rec.load();
//	rec.Display();
//	Cart cart = Cart();
//	cart.load(1);
////	cout<<rec.add_rec("2023-12-17 11:42:01",'+',1,1,10)<<endl;
//	rec.Display(1,cart,"2023-12-17 11:42:20","2023-12-17 14:00:52");
//	rec.Display();
//	rec.save();
//}

///*
int main(){
	int mode = 1,usermode = 1,admmode = 1,shopmode = 1,editmode = 1,YON = 1;//循环模式控制
	int id = 0;//当前使用用户
	int gid = 0;//当前商品
	int goodnum = 0;//商品数量
	double hol_dis = 0.9;//节日折扣
	double discount = 0.0;
	string password,name,change_pass,change_name,in,intime,outtime,s1,s2;//读内容
	int change_price,change_num;
	User_sum alluser;//初始化用户列表
//	alluser.load();//从文件读取
	Dis_sum all_dis = Dis_sum();
	Record_sum rec = Record_sum();
	Cart cart = Cart();
	Cart shop = Cart();
	rec.load();
	shop.load(-1);
	srand(time(0));
	Admin adm("123");//管理员密码
	
	while(mode){//主菜单
		mode = 1;//主菜单模式选择
		cout<<"Who are you?"<<endl;
		cout<<"0-Quit"<<endl;//退出程序
		cout<<"1-Customer Log in"<<endl;//用户登录
		cout<<"2-Customer Register"<<endl;//用户注册
		cout<<"3-Admin"<<endl;//管理员登录
		cin>>mode;//读取模式
		alluser.load();//加载用户表单
		switch(mode){//加载模式
			case 0:system("cls");break;//退出程序
			case 1:{//顾客登录
				cout<<"Input your ID:"<<endl;
				cin>>id;//读取ID
				cout<<"Input your password:"<<endl;
				cin>>password;//读取密码
				if(alluser.confirm_pass(id,password)){//验证密码
					cout<<"Login successful"<<endl;
					usermode = 1;
					while(usermode){//顾客界面
						usermode = 1;
						cout<<"What do you want to do,"<<alluser.get_user(id).get_name()<<"?"<<endl;
						cout<<"0-Quit"<<endl;
						cout<<"1-Go to shop"<<endl;//购物车功能
						cout<<"2-Log out"<<endl;//登出，返回上一级
						cout<<"3-Change password"<<endl;//修改密码
						cout<<"4-Change name"<<endl;//修改名称
						cout<<"5-Check shopping histroy"<<endl;
						cin>>usermode;
						switch(usermode){
							case 0:{//退出程序
								system("cls");
								break;
							}
							case 1:{//访问商店
//								cout<<"Sorry,System Maintaining."<<endl;
								system("cls");
								cart.load(id);
								shopmode = 1;
								while(shopmode){
									cart.load(id);//加载顾客购物车
									cout<<endl<<"S H O P"<<endl<<endl;
									shop.Display();//展示商店
									cout<<endl<<"C A R T"<<endl<<endl;
									cart.Display();//展示购物车
									shopmode = 1;
									cout<<"\nWhat do you want to do,"<<alluser.get_user(id).get_name()<<"?"<<endl;
									cout<<"0-Quit"<<endl;
									cout<<"1-Add to cart"<<endl;
									cout<<"2-Delete good"<<endl;
									cout<<"3-Minus good"<<endl;
									cout<<"4-Find good"<<endl;
									cout<<"5-Check"<<endl;
									cin>>shopmode;
									switch(shopmode){//商店界面
										case 0:system("cls");break;
										case 1:{//加入商品
											goodnum = 0;
											cout<<"Input ID (in shop) of the good to add:"<<endl;
											cin>>gid;
											cout<<"Input amount u want:"<<endl;
											cin>>goodnum;
											if(shop.get_num(gid) >= goodnum){
												cart.add_good(shop.buy_good(gid,goodnum));
												cout<<"Trade successful."<<endl;
												cout<<endl;
												cart.save(id);
												shop.save(-1);
												
												rec.add_rec('+',id,gid,goodnum);
											}
											else{
												cout<<"Input error."<<endl;
											}
											break;
										}
										case 2:{//删除商品
											cout<<"Input ID (in cart) of the good to delete:"<<endl;
											cin>>gid;
											Good curgood = Good();
											curgood.assign(cart.get_good(gid));
											goodnum = cart.get_num(gid);
											if(cart.del_good(gid)){
												cout<<"Delete successful."<<endl;
												cout<<endl;
												shop.add_good(curgood);
												cart.save(id);
												shop.save(-1);
												
												rec.add_rec('-',id,gid,goodnum);
											}
											else{
												cout<<"Input error."<<endl;
											}
											break;
										}
										case 3:{//减少商品
											goodnum = 0;
											cout<<"Input ID (in cart) of the good to minus:"<<endl;
											cin>>gid;
											cout<<"Input amount to minus:"<<endl;
											cin>>goodnum;
											if(cart.get_num(gid) >= goodnum){
												shop.add_good(cart.buy_good(gid,goodnum));
												cout<<"Minus successful."<<endl;
												cout<<endl;
												cart.save(id);
												shop.save(-1);
												
												rec.add_rec('-',id,gid,goodnum);
											}
											else{
												cout<<"Input error."<<endl;
											}
											break;
										}
										case 4:{//搜索商品
											cout<<"Input name of the good to search:"<<endl;
											cin>>name;
											shop.Find(name);
											break;
										}
										case 5:{//付款
											if(rand()%10 == 0){
												cout<<"You get a discount!"<<endl;
												cout<<"ID\tCode\t\t\t\tDiscount"<<endl;
												all_dis.Display(rand()%10);
												cout<<"Remember it and use it next time."<<endl;
											}
											cout<<"Do you have discount code?"<<endl;
											cout<<"1-Yes"<<endl;
											cout<<"2-No"<<endl;
											cin>>YON;
											if(YON == 1){
												cout<<"Input the discount code:"<<endl;
												cin>>in;
												discount = all_dis.use(in);
											}
											if(cart.Check(id,rec,discount,hol_dis)){
												cart.save(id);
												cout<<"Pay successful"<<endl;
											}
											else{
												cout<<"Pay failed"<<endl;
											}
											break;
										}
									}
									rec.save();
								}
								break;
							}
							case 2:{//登出，返回上一级
								usermode = 0;
//								mode = 1;
								break;
							}
							case 3:{//修改密码
								cout<<"Input your new password:"<<endl;
								cin>>change_pass;
								alluser.change_pass(id,change_pass);
								alluser.save();//保存修改
								cout<<"Change successful."<<endl;
								usermode = 0;
								break;
							}
							case 4:{//修改密码
								cout<<"Input your new name:"<<endl;
								cin>>name;
								alluser.change_name(id,name);
								alluser.save();//保存修改
								cout<<"Change successful."<<endl;
								break;
							}
							case 5:{//查询历史
								cout<<"Input the beginning time(like 1970-01-01 00:00:00):"<<endl;//输入开始时间
								cin>>s1;//日期
								cin>>s2;//时刻
								intime = s1.append(" " + s2);//合成时间
								cout<<"Input the ending time(like 1970-01-01 00:00:00):"<<endl;//输入结束时间
								cin>>s1;//日期
								cin>>s2;//时刻
								outtime = s1.append(" " + s2);//合成时间
								cart.load(id);//读取购物车
								rec.Display(id,cart,intime,outtime);//按时间输出
								break;
							}
							default:{
								cout<<"Input error."<<endl;//错误输入
								break;
							}
						}
					}
				}
				else{
					cout<<"Password error,Login failed."<<endl;//密码错误
				}
				break;
			}
			case 2:{//用户注册
				cout<<"Input your name:"<<endl;
				cin>>name;
				cout<<"Input your password:"<<endl;
				cin>>password;
				if(alluser.add_user(name,password)){//增加用户
					alluser.save();//保存修改
					cout<<"Register successful, your id is "<<alluser.get_num() - 1<<" ."<<endl;//输出ID
				}
				else{
					cout<<"Register failed."<<endl;//注册失败
				}
				break;
			}
			case 3:{//管理员登录
				cout<<"Hi, sky, Input password:"<<endl;
				cin>>password;
				if(adm.get_pass() == password){
					cout<<"Login successful"<<endl;
					admmode = 1;
					while(admmode){//管理员面板
						system("cls");
						cout<<"What do you want to do, Sky?"<<endl;
						cout<<"0-Quit"<<endl;//返回上一级
						cout<<"1-Edit user"<<endl;//编辑用户
						cout<<"2-Edit shop"<<endl;//编辑商店
						cout<<"3-Edit discount"<<endl;//编辑折扣
						cout<<"4-View record"<<endl;//展示购物记录
						cin>>admmode;
						switch(admmode){
							case 0:{//返回上一级
								system("cls");
								admmode = 0;
								break;
							}
							case 1:{//编辑用户
								editmode = 1;//初始化防止异常退出
								while(editmode){//账户编辑界面
									cout<<"Which account do you want to edit, Sky?"<<endl;
									for(int i = 0;i < alluser.get_num();i++){
										cout<<i+1<<"-"<<alluser.get_user(i).get_name()<<endl;//展示用户信息
									}
									cin>>id;
									cout<<"What do you want to edit, Sky?"<<endl;
									cout<<"0-Quit"<<endl;//返回上一级
									cout<<"1-Password"<<endl;//修改密码
									cout<<"2-Name"<<endl;//修改名字
									cin>>editmode;
									switch(editmode){
										case 0:{//返回上一级
											system("cls");
											editmode = 0;
											break;
										}
										case 1:{//修改密码
											cout<<"Input "<<alluser.get_user(id).get_name()<<"\'s new password:"<<endl;
											cin>>change_pass;
											alluser.change_pass(id,change_pass);
											alluser.save();
											cout<<"Change successful."<<endl;
											break;
										}
										case 2:{//修改名字
											cout<<"Input "<<alluser.get_user(id).get_name()<<"\'s new name:"<<endl;
											cin>>change_name;
											alluser.change_name(id,change_name);
											alluser.save();
											cout<<"Change successful."<<endl;
											break;
										}
										default:{
											cout<<"Input error."<<endl;
											break;
										}
									}
									break;
								}
								break;
							}
							case 2:{//编辑商店
								editmode = 1;//初始化防止异常退出
								while(editmode){//商品编辑界面
									cout<<"What do you want to edit, Sky?"<<endl;
									cout<<"0-Quit"<<endl;//返回上一级
									cout<<"1-Name"<<endl;//修改名称
									cout<<"2-Price"<<endl;//修改价格
									cout<<"3-Amount"<<endl;//修改数量
									cout<<"4-Delete"<<endl;//删除商品
									cout<<"5-Add"<<endl;//增加商品
									cin>>editmode;//读入模式
									if(editmode != 5){
										cout<<"Which item do you want to edit, Sky?"<<endl;
										shop.Display();
										cin>>gid;
									}
									switch(editmode){
										case 0:{
											system("cls");
											editmode = 0;
											break;
										}
										case 1:{//修改名字
											cout<<"Input "<<shop.get_good(gid).get_name()<<"\'s new name:"<<endl;
											cin>>change_name;
											shop.change_name(id,change_name);
											shop.save(-1);
											cout<<"Change successful."<<endl;//成功修改
											break;
										}
										case 2:{//修改价格
											cout<<"Input "<<shop.get_good(gid).get_name()<<"\'s new price:"<<endl;
											cin>>change_price;
											shop.change_price(id,change_price);
											shop.save(-1);
											cout<<"Change successful."<<endl;//成功修改
											break;
										}
										case 3:{//修改数量
											cout<<"Input "<<shop.get_good(gid).get_name()<<"\'s new number:"<<endl;
											cin>>change_num;
											shop.change_num(id,change_num);
											shop.save(-1);
											cout<<"Change successful."<<endl;//成功修改
											break;
										}
										case 4:{//删除商品
											shop.del_good(id);
											shop.save(-1);
											cout<<"Delete successful."<<endl;//成功删除
											break;
										}
										case 5:{
											cout<<"Input name:"<<endl;//输入名称
											cin>>name;
											cout<<"Input price:"<<endl;//输入价格
											cin>>change_price;
											cout<<"Input number:"<<endl;//输入数量
											cin>>change_num;
											shop.add_good(name,change_price,change_num);//加入商店
											shop.save(-1);
											cout<<"Add successful."<<endl;
											break;
										}
										default:{
											cout<<"Input error."<<endl;
											break;
										}
									}
								}	
							}
							case 3:{//编辑优惠折扣
								all_dis.Display();//展示所有优惠券
								editmode = 1;
								while(editmode){//折扣编辑模式
									cout<<"What do you want to edit, Sky?"<<endl;
									cout<<"0-Quit"<<endl;//返回上一级
									cout<<"1-Edit holiday discount"<<endl;//编辑折扣
									cin>>editmode;//读入编辑模式
									switch(editmode){//编辑模式
										case 0:{
											system("cls");
											editmode = 0;
											break;
										}
										case 1:{//修改节日数值
											cout<<"Tnput holiday discount:"<<endl;
											cin>>hol_dis;//读入折扣
											if(hol_dis >= 0 && hol_dis < 100){cout<<"Edit successful."<<endl;}//输入成功
											else{cout<<"Input error."<<endl;}//返回错误
											break;
										}
										default:{
											cout<<"Input error."<<endl;//返回错误
											break;
										}
									}
								}
								break;
							}
							case 4:{//展示购物记录
								rec.Display();//展示全部记录
								system("pause");//暂停，等待输入
								break;
							}
							default:{//错误输入
								cout<<"Input error."<<endl;//返回错误
								break;
							}
						}
					}
				}
				break;
			}
			default:{//错误输入
				cout<<"Input error."<<endl;//返回错误
				break;
			}
		}
	}
	exit(0);
	system("exit");
}
//*/
```
## 6 补充
>使用代码时注意文件读取，写入相关代码，代码本身并不检测是否已经创建相关文件；
开始时数据结构是想用类变量实现数据存取，后来发现结构体可以少写大部分函数，所以只有商品对象是类实现的；
主循环逻辑参考了游戏界面刷新逻辑，是我比较满意的部分，但是大部分内容都放在的主函数中，这是个可以改进的部分；
数据存在本地的txt文件中，原因是笔者不熟悉使用c艹对其他文件的读取的操作，而且txt文件便于查看与调试；
在一个文件中编写系统需要熟悉代码内容，同时笔者在最后才发现Dev-C++有书签内容......
总之这是一个仅仅使用简单的代码拼凑着实现的过于简单的系统，往里面细看实现仿佛观测克苏鲁古神真容我直呼不可名状，东拼西凑的函数往往只是为了实现某个小功能而添加的大段代码......
如果你能读到这里，希望我的代码能对你有所帮助，也希望你能对我提出的以上问题做出一定的解决。