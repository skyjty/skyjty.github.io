---
layout: post
title:  软件体系结构
date:   2024-12-05 12:00:00 +0800
last_change_date: 2024-12-05 12:00:00 +0800
categories: notes
# brief_introduction: 语法分析
tags: notes
---

- [1 绪论](#1-绪论)
  - [1.1 软件体系结构的发展史](#11-软件体系结构的发展史)
  - [1.2 软件体系结构定义](#12-软件体系结构定义)
  - [1.3 软件体系结构的作用](#13-软件体系结构的作用)
- [2 软件体系结构定位与构建](#2-软件体系结构定位与构建)
  - [2.1 软件生命周期中的软件体系结构](#21-软件生命周期中的软件体系结构)
  - [2.2 软件体系结构构建过程](#22-软件体系结构构建过程)
- [3 软件体系结构风格概述](#3-软件体系结构风格概述)
  - [3.1 数据流 Data Flow Style](#31-数据流-data-flow-style)
    - [特征](#特征)
    - [3.1.1 批处理 Batch Sequential Style](#311-批处理-batch-sequential-style)
      - [定义](#定义)
      - [优缺点](#优缺点)
    - [3.1.2 管道-过滤器 Pipe and Filter Style](#312-管道-过滤器-pipe-and-filter-style)
      - [定义](#定义-1)
      - [过滤器](#过滤器)
      - [管道](#管道)
      - [优缺点](#优缺点-1)
      - [批处理 VS 管道-过滤器](#批处理-vs-管道-过滤器)
    - [3.1.2 过程控制](#312-过程控制)
      - [适用场合](#适用场合)
  - [3.2 调用/返回 Call/Return Style](#32-调用返回-callreturn-style)
    - [特点](#特点)
    - [3.2.1 主程序-子过程(Main program and Subroutione Style)](#321-主程序-子过程main-program-and-subroutione-style)
      - [定义](#定义-2)
    - [3.2.2 面向对象 Object-oriented Style](#322-面向对象-object-oriented-style)
      - [定义](#定义-3)
      - [特点](#特点-1)
      - [优缺点](#优缺点-2)
    - [3.2.3 层次系统 Layered System Style](#323-层次系统-layered-system-style)
      - [定义](#定义-4)
      - [特点](#特点-2)
      - [层次系统的特例：客户端/服务器风格](#层次系统的特例客户端服务器风格)
  - [3.3 以数据为中心 Data-centered Style](#33-以数据为中心-data-centered-style)
    - [定义](#定义-5)
    - [3.3.1 仓库 Repository Style](#331-仓库-repository-style)
      - [优缺点](#优缺点-3)
    - [3.3.2 黑板 Blackboard Style](#332-黑板-blackboard-style)
      - [组成成分](#组成成分)
      - [优缺点](#优缺点-4)
  - [3.4 虚拟机 VirtualMachine Style](#34-虚拟机-virtualmachine-style)
    - [3.4.1 解释器 Interpreter Style](#341-解释器-interpreter-style)
      - [定义](#定义-6)
      - [优缺点](#优缺点-5)
    - [3.4.2 规则系 Rule-based System Style](#342-规则系-rule-based-system-style)
      - [定义](#定义-7)
      - [优缺点](#优缺点-6)
  - [3.5 独立构件 Independent Components Style](#35-独立构件-independent-components-style)
    - [3.5.1 进程通信 Communicating Process Style](#351-进程通信-communicating-process-style)
      - [定义](#定义-8)
    - [3.5.2 事件系统 Event System Styl](#352-事件系统-event-system-styl)
      - [定义](#定义-9)
      - [特点](#特点-3)
- [4 软件质量属性概念](#4-软件质量属性概念)
  - [4.1 质量属性概念](#41-质量属性概念)
    - [确定属性](#确定属性)
    - [权衡](#权衡)
  - [4.2 质量属性场景](#42-质量属性场景)
  - [4.3 可用性 Availability](#43-可用性-availability)
    - [4.3.1 含义](#431-含义)
    - [4.3.2 实现策略](#432-实现策略)
  - [4.4 可修改性 Modifiability](#44-可修改性-modifiability)
    - [4.4.1 含义](#441-含义)
    - [4.4.2 实现策略](#442-实现策略)
  - [4.5 性能 Performance](#45-性能-performance)
    - [4.5.1 含义](#451-含义)
    - [4.5.2 实现策略](#452-实现策略)
  - [4.6 安全性 Security](#46-安全性-security)
    - [4.6.1 含义](#461-含义)
    - [4.6.2 实现策略](#462-实现策略)
  - [4.7 可测试性 Testability](#47-可测试性-testability)
    - [4.7.1 定义](#471-定义)
    - [4.7.2 实现策略](#472-实现策略)
  - [4.8 易用性 Usability](#48-易用性-usability)
    - [4.8.1 定义](#481-定义)
    - [4.8.2 实现策略](#482-实现策略)
- [5 软件体系结构描述方法（UML）](#5-软件体系结构描述方法uml)
  - [5.1 软件体系结构描述](#51-软件体系结构描述)
  - [5.2 软件体系结构建模](#52-软件体系结构建模)
    - [5.2.1 用例图 Use Case](#521-用例图-use-case)
    - [5.2.2 类图 Class Diagram](#522-类图-class-diagram)
    - [5.2.3 对象图 Object Diagram](#523-对象图-object-diagram)
    - [5.2.4 状态图 State Diagram](#524-状态图-state-diagram)

## 1 绪论
### 1.1 软件体系结构的发展史
![图一]({{site.path}}/public/image/2024_12_05_1_1.png "软件体系结构的发展史")
### 1.2 软件体系结构定义
基于D Garlan, M Shaw的定义，我们可将软件体系结构的定义理解为：
```
软件体系结构 = 组件 + 连接件 + 约束
Software Architecture =   Components + Connectors + Constrains
```
- 组件：具有某种功能的可重用的软件模块单元，表示了系统中主要的计算单元和数据存储。
- 连接件：表示了组件之间的交互，简单的连接件有：管道（pipe）、过程调用（procedure-call）、事件广播（event broadcast）等。复杂的连接件有：客户－服务器（client-server）通信协议，数据库和应用之间SQL连接等。
- 约束：表示了组件和连接件的拓扑逻辑和约束（constraint）。

### 1.3 软件体系结构的作用
![图二]({{site.path}}/public/image/2024_12_05_1_2.png "软件生命周期中的作用")

Architecture is not about a system's function, but rather the system's properties.

软件体系结构的作用不是关于系统的功能，而是关于系统的属性。

## 2 软件体系结构定位与构建
### 2.1 软件生命周期中的软件体系结构

**软件生命周期** （softwarelifecycle）是指**软件从概念提出到软件结束使用的整个过程**。这个周期涵盖了软件的计划、开发、使用、维护和最终的废弃等多个阶段。软件生命周期的主要目的是帮助项目团队有效地管理和控制软件开发过程，确保软件产品能够按时、按质、按量地完成

**良好**的软件体系结构在以下关键环节：
- 在**设计和实现**阶段，降低系统**复杂性**，增强代码**可读性**和**可维护性**，为高效协作提供基础。
- 在**维护**阶段，使软件能够适应快速变化的需求和技术环境，减少长期**维护成本**。
- 在**软件退役**阶段，指导**数据迁移**和**资源回收**的有效执行。

* 规划和需求分析阶段
* 系统设计阶段
* 实现阶段
* 测试阶段
* 部署阶段
* 维护和迭代阶段
* 系统退役阶段

### 2.2 软件体系结构构建过程
软件体系结构的构建过程是一系列精细且系统化的步骤，关键在于**质量属性的精准捕获**、恰当的**体系结构设计**、严格的**体系结构评估**，以及灵活的**体系结构演化**。

- 软件体系结构分析
- 软件体系结构设计
  - 软件体系结构风格选择
  - 质量属性设计
- 软件体系结构评估
- 软件体系结构演化

## 3 软件体系结构风格概述
**软件体系结构风格** (software architecture)是描述特定领域中软件系统家族的*组织方式的惯用模式** (idiomatic paradigm)，反映了领域中众多系统所共有的**结构和语义特性**，并指导如何将各个模块和子系统有效地组织成一个完整的系统
分类：
![图三]({{site.path}}/public/image/2024_12_05_1_3.png "软件体系结构风格分类")

答卷要点：
1、为什么选择这个架构可以满足需求
2、为什么该架构的缺点是可容忍的

### 3.1 数据流 Data Flow Style
**数据流体系结构风格**（Data Flow Style）是一种数据到达即被激活，**无数据不工作**的软件架构设计思想，在该风格下，架构师基于系统对*数据的处理或计算需求*，设计相应的构件，构件间通过**数据的流动**实现交互连接。其核心组成包括构件和连接件，构件为数据处理，连接件为数据流。

#### 特征
- 数据的可用性决定着处理<计算单元>是否执行
  - 任何有输入的组件都可以处理它
  - 整体数据转换是各个转换的“功能组合”
- 系统结构由数据在各处理之间的有序移动决定
- 在纯数据流系统中，处理之间除了数据交换没有任何其他的交互

#### 3.1.1 批处理 Batch Sequential Style

**批处理体系结构风格**（Batch Sequential Style）为数据流体系结构风格的子风格。其**每个处理步骤是一个单独程序，每一步必须在前一步结束后才能开始，且数据必须完整，以整体的方式传递。**其构件为独立应用程序，连接件为某种类型的媒介。连接件定义相应数据流图，表达拓扑结构。

//类似于工厂使用多台机器同步完成工作。

##### 定义
- **基本构件：独立的应用程序**(Components: independent programs)
  - 每个步骤都要在下一步开始前运行完成
- **连接件：某种类型的媒质**(Connectors: media-traditionally tape )
  - 数据在步骤之间作为一个整体进行传输
- **拓扑结构**(Topology)
  - 连接件定义了相应的数据流图，表达拓扑结构
- **约束**(Constraint)
  - 独立应用程序构件必须是独立实体
  - 独立应用程序构件无需了解数据流的源头与去处

##### 优缺点

Advantage:
- 具有良好隐蔽性
- 高内聚、低耦合
- 支持功能模块的复用
- 支持吞吐量、死锁等属性分析
- 具有较强可维护性和可扩展性

Disadvantage:
- 无法支持并行执行
- 交互式处理能力弱
- 数据传输缺乏通用标准

#### 3.1.2 管道-过滤器 Pipe and Filter Style

**管道-过滤器体系结构风格**（PipeandFilterStyle）在数据原点产生数据之后，经过*管道*把数据运向不同的处理器，即*过滤器*，对数据进行处理之后，通过管道传输到下一个过滤器，直到数据完成所有的处理，并达到系统要求

//类似于净水器的多个过滤器以及管道的连接。

##### 定义
- **构件：过滤器，处理数据流**(Components: Filters —process data streams )
 - 一个过滤器封装了一个处理步骤(A filter encapsulates a processing step (algorithm or computation) )
 - 数据源点和数据终止点可以看作是特殊的过滤器(Data source and data end/sink are particular filters )
- **连接件：管道，连接一个源和目的过滤器**(Connectors: A pipe connects a source and a end filter )
 - 管道将数据从过滤器输出移动到过滤器输入( Pipes move data from a filter output to a filter input)
 - 数据可以是ASCII字符流( Data may be a stream of ASCII characters)
- **拓扑**(Topology)
 - 连接件定义数据流图(Connectors define data flow graph) 
- **约束**(Constraint)
 - 过滤器必须是独立实体
 - 过滤器无需了解数据流的源头与去处

##### 过滤器
特点：
- 目标：将源数据变换成目标数据(Incrementally transform some of the source data into sink data) 
- 从“数据流”→“数据流”的变换(Stream to stream transformation )
 - 无上下文信息(no context in processing streams )
 - 不保留状态(no state preservation between instantiations )
 - 对其他过滤器无任何了解(no knowledge of upstream/downstream filters )

五种变换类型：
- 通过计算和增加信息来丰富数据
- 通过浓缩和删减来精炼数据
- 通过改变数据表现方式来转化数据
- 将一个数据流分解为多个数据
- 将多个数据流合并为一个数据流

##### 管道
- **单向流** (One way flow from one data source to one data sink)
- 可能具有**缓冲区**(A pipe may implement a buffer)
- 管道形成传输图(Pipes form data transmission graph )
- 不同的管道中流动的数据流，可能具有不同的数据格式，数据在流过每一个过滤器时，被过滤器进行了丰富、精练、转换、融合、分解等操作，因而发生了变化。

##### 优缺点
Advantage:
- 具有良好隐蔽性、高内聚、低耦合
- 支持功能模块的复用
- 具有较强可维护性和可扩展性
- 支持吞吐量、死锁等属性分析
- 支持并行执行
Disadvantage:
- 不适合处理交互的应用
- 系统性能不高，编写过滤器的复杂性增加
 - 数据传输缺乏通用标准
 - 时间消耗在格式转换上
 - 不适用于需要大量共享数据的应用

##### 批处理 VS 管道-过滤器
相同点：
批处理体系结构风格和管道-过滤器体系结构风格都是把任务分解成为一系列固定顺序的计算单元，并且彼此间只通过数据传递交互。

不同点

|批处理(Batch Sequential)|管道-过滤器(Pipe-and-Filter)|
|-|-|
|整体传递数据 (total)|增量(incremental)|
|构件粒度较大(coarse grained)|构件粒度较小(fine grained)|
|延迟高，实时性差 (high latency)|实时性好 (results starts processing)|
|无并发(no concurrency)|可并发(concurrency possible)|

#### 3.1.2 过程控制
闭环控制有2种形式：反馈控制和前馈控制
- 反馈控制器根据受控变量的测量值来调整过程
- 前馈控制通过测量其他过程变量，来预计输入变量对被控变量将产生的影响。基于这些变量来调整过程，在实际中更有价值

反馈：开车上坡，眼睛紧盯速度表，根据车速的下降来加大油门
前馈：根据道路坡度变化，提前加速，使上坡顺利

##### 适用场合
当软件系统需要在外部干扰（软件不可见或不可控的力量或事件）下，控制持续过程
- 任务包含连续的动作、行为、状态的改变
- 不适合人参与（安全性、减少人力、工作效率等因素）
- 一般是软硬件结合的系统
- 开发此类软件通常需要熟悉领域知识

### 3.2 调用/返回 Call/Return Style
**调用/返回风格软件体系结构**是一种基于**消息传递**的软件架构，其中系统的各个组件通过相互**调用**和**返回**来协同工作。该体系结构提供了一种结构化的方式来处理组件之间的**通信**和**协作**。

- 每一个构件都有唯一的程序*执行起点*和程序*执行终点*
- 程序从执行起点开始执行该构件的代码，程序执行结束，将*控制返回*给程序调用构件
- 程序构件通常叫做*子程序*
- 从一个构件到另外一个构件的控制传递叫做*子程序调用*

//函数调用，但更复杂

#### 特点
调用和返回架构风格将系统视为一个主要实体，该实体可以**调用更小的子实体**来执行操作。
- **显式调用**:当程序需要执行某个任务时，它会调用一个函数或方法，将控制权从调用者转移到被调用者。
- **局部作用域**:一旦函数或方法被调用，它就会进入自己的执行环境，即局部作用域。这种局部性确保程序不同部分之间不会相互干扰。
- **同步执行**:整个调用/返回机制是同步执行的，调用者会等待函数或方法完成并返回结果，期间不会继续执行后续代码。
- **明确的结果返回**:当被调用者完成任务后，会通过返回语句将结果和控制权交还给调用者

#### 3.2.1 主程序-子过程(Main program and Subroutione Style)
**主程序/子过程体系结构风格**是一种经典的**面向过程**软件架构，通常采用**单线程控制**，将问题划分为多个步骤进行处理。这种架构风格强调**模块化**和**分层设计**思想。

本质：将大系统分解为若干模块（模块化），主程序调用这些模块实现完整的系统功能。

//类似在线购物系统

##### 定义
- 构件：**主程序**和**子程序**层次化地分解程序；显式可见数据。
- 拓扑结构：**逐层分解的结构**；层次结构
- 连接器：**调用-返回机制**中每个组件从其父组件获取控制和数据，并将其传递给子组件
- **显式数据共享**显式可见数据

#### 3.2.2 面向对象 Object-oriented Style
**面向对象体系结构风格**（Object-orientedStyle）是一种以对象为基础的系统设计思想方法，这种风格通过把系统分解成相对独立、可相互协作的对象集合，提高了系统的模块化程度。

##### 定义
- **构件**：面向对象体系结构风格中，类和对象是典型的构件 
  - 类：用于描述对象的属性和行为，它定义了对象的状态和方法
  - 对象：对象是类的实例，是构件的实体
  - 对象具有特定的状态，通过调用方法来执行特定的行为
- **连接件**：用于描述构件之间的通信和协作方式
  - 方法调用：对象之间通过调用方法进行通信
  - 消息传递：对象通过发送和接收消息进行通信
  - 对象之间通过数据库交互也是一种常见的模式
- **拓扑约束**：面向对象体系结构风格中，构件间遵循的约束
  - 封装性：封装要求将对象的内部状态和实现细节隐藏只通过对象的公共接口进行访问 
  - 继承性：类构件的设计和类构件间的继承关系需遵循单一职责原则

##### 特点
- 封装：限制对某些信息的访问
- 交互：通过过程调用或类似的协议
- 多态：在运行时选择具体的操作
- 继承：对共享的功能保持唯一的接口复用和维护：利用封装和聚合提高生产力

##### 优缺点
Advantage:
- 适合模拟现实世界
Disadvantage:
- 海量的对象需要额外的结构来容纳
- 单一的接口能力有限并且笨拙（”友元”可改善）
- 业务与对象是多对多关系，系统理解难度大

#### 3.2.3 层次系统 Layered System Style
**层次系统体系结构风格**（LayeredSystemStyle）是一种经典的软件架构风格，它通过将系统划分为不同的层次，**每个层次负责特定的功能**，从而实现了模块化和分层的设计。

层次系统体系结构风格（Layered SystemStyle）它将系统划分为三个主要层次：表示层（PresentationLayer）、业务逻辑层（BusinessLogicLayer）和数据存储层（DataStorageLayer）。

##### 定义
- **构件**：层次系统的每个层次都由一个构件表示
  - 表示层：负责用户界面的呈现和用户输入的处理 
  - 业务逻辑层：包含应用程序的核心业务规则和处理逻辑 
  - 数据存储层：管理数据的持久化和存储 
- **连接件**：用于支持不同层的通信和交互，通常这种交互是单向的，即高层次的构件可以调用低层次的构件，但反过来则不行。交互方式：接口调用、消息传递
- **拓扑约束**：各个层内部相互独立，高层次的层次不需要了解底层的实现细节，只需使用底层提供的服务

##### 特点
- 分层结构的主要特征是第N层的服务只被第N+1层使用，层之间没有进一步的依赖关系
  - 每层为上一层提供服务，使用下一层的服务，只能见到与自己邻接的层
    - 逐层调用，影响性能。有必要时可允许一定的越层操作
  - 大的问题分解为若干个渐进的小问题，逐步解决，隐藏了很多复杂度
  - 修改一层，最多影响两层，而通常只能影响上层。如接口稳固，则不影响其它层
  - 上层必须知道下层的身份，不能调整层次之间的顺序

/*        我附庸的附庸不是我的附庸         */
/*  Web应用程序、企业信息系统、物流网系统   */

##### 层次系统的特例：客户端/服务器风格
//PPT并未详细提及，暂时忽略

### 3.3 以数据为中心 Data-centered Style
**以数据为中心体系结构风格**中，系统中不同的**数据访问器**利用**中央数据结构**（共享的数据存储区域）来进行数据访问。

//与数据流不同的是强调数据的存储而非处理

#### 定义
- 基本构件
  - 中央数据结构(Components: Central Data Structure)
    - 用于系统中数据的集中存储和共享
    - 表示当前数据的状态
  - 数据访问器(Components: Data Accessor)
    - 相对独立，仅通过中央数据结构进行交互
    - 可以对中央数据结构进行操作（增/删/查/改）
- 连接件：数据流(Connectors: Data Flow)
  - 在中央数据结构和数据访问器之间传输数据

#### 3.3.1 仓库 Repository Style
**仓库体系结构风格**包含2类构件：存储和维护数据的*数据仓库*、若干独立的对数据进行操作的*独立构件*。

//类似于快递仓库

##### 优缺点
Advantage:
- 适合管理大量数据的应用场合
- 适用于复杂的逻辑系统
- 提高了数据的一致性和可靠性
- 由于构件具有独立性，系统容易适应变化和扩展。
Disadvantage:
- 数据结构、类型进行变化的难度高
- 单点故障问题

#### 3.3.2 黑板 Blackboard Style
**黑板体系结构风格**（BlackboardStyle）由*中央数据结构的当前状态*决定进行何种处理，可以认为它是仓库体系结构风格的特殊化。

黑板体系结构风格包含三类构件：**黑板**是中央数据中心，用于存储当前数据的状态；**知识源**（Knowledge Source）是可对黑板进行操作、计算的独立构件；**控制器**根据当前黑板状态来选择适合的知识源来继续解题。

//老师请学生到黑板上答题，知识源是学生，控制器是老师

黑板体系结构风格的连接件是黑板与知识源之间的交互；约束体现在黑板是主动的，知识源是被动的。

|连接件|约束|
|-|-|
|控制器读取黑板中的数据，决策出合适的知识源|知识源之间不存在直接交互和通信|
|知识源收到消息后，读取黑板中的数据进行计算，再将更新之后的数据写入黑板|黑板主动、知识源被动（与仓库体系结构风格相反）|

##### 组成成分
![图四]({{site.path}}/public/image/2024_12_05_1_4.png "黑板体系结构风格组成成分")

##### 优缺点
Advantage:
- 适用于处理涉及多个专业领域复杂的问题
- 可修改性高，系统易于维护和扩展
- 对分布式计算支持好
- 知识源具有可重用性
Disadvantage:
- 黑板的结构变化容易影响知识源
- 可能存在无解的情况
- 求近似最优解时，计算终止的条件难以决定

//数模C题都挺类似的

### 3.4 虚拟机 VirtualMachine Style
虚拟机体系结构风格（VirtualMachine Style）为某种符号、脚本语言或源程序语言提供一个仿真的运行环境。典型子风格包括解释器体系结构风格和规则系统体系结构风格。

#### 3.4.1 解释器 Interpreter Style
解释器体系结构风格（InterpreterStyle）适用于设计和实现解释性编程语言的执行环境，为目标机器执行环境和符号/脚本语言间建立了桥梁，使得这些符号/脚本语言能够在相应的环境中执行。

##### 定义
- 构件
  - 一个状态机：执行引擎
  - 三个存储器：正在被解释的程序、被解释的程序的状态、执行引擎的当前状态
- 连接件
  - 过程调用、直接存储器访问

##### 优缺点
Advantages:
- 能够仿真平台系统所不具备的功能和
环境
- 可扩展性强
- 可模拟极端条件下（如故障）的测试
- 通常具有较好的跨平台性
Disadvantages:
- 牺牲了性能
- 增加了测试的难度

#### 3.4.2 规则系 Rule-based System Style
**规则系统体系结构风格**（Rule-based System Style）是解释器体系结构风格的特例（需要被解释执行的是规则），适用于需要根据特定规则进行决策和操作的应用程序（推理系统、业务流程管理系统等）

##### 定义
- 构件：工作内存、规则/数据选择、知识库、规则解释器
- 连接件：过程调用、直接存储器访问

|工作内存|规则/数据选择|知识库|规则解释器|
|-|-|-|-|
|不断接受相关数据|核心组件（即规则引擎），负责规则的解析、评估、执行、管理<br>根据输入数据、规则和事实集合进行推理和匹配，然后触发相应的操作或决策。|规则集：存储和管理系统全部规则的条件和操作<br>事实集：存储事实数据（规则引擎执行时的输入数据）。<br>规则引擎从事实集中获取事实数据，并将其与规则库中的规则进行匹配和推理。|接收来自外部系统的输入→执行规则引擎生成的操作→将结果返回给外部系统|

##### 优缺点
Advantages:
- 规则具有可重用性（可在多个应用/平台中共享）
- 管理系统业务规则的难度降低（可由运营人员管理）
- 独立的规则库易于更新
Disadvantages:
- 系统复杂性高（规则可能会有冲突和遗漏）
- 可能导致性能问题
- 一致性和版本控制的挑战

### 3.5 独立构件 Independent Components Style
**独立构件风格**强调系统中的每个构件都是相对独立的个体，它们之间不直接通信，以降低耦合度，提升灵活性。

#### 3.5.1 进程通信 Communicating Process Style
**进程通信体系结构风格**（Communicating Process Style）将软件系统高层次的组成*看作一组不同的、独立的（计算应用程序）*，这些计算应用程序的执行是独立进行的。同时，计算应用程序需要在离散的时间点进行数据的协同或控制。并且这种协调和控制是通过*消息通信*实现的。

##### 定义
- 构件：独立的进程（计算应用程序），进程向明确的接受者发送消息，从明确的发送者接受消息。
- 连接件：与明确的通信双方进行的消息传递（但不是数据共享），消息传递的方式可以是点到点、异步方式、同步方式。
- 拓扑约束：每个进程都有自己的控制线程，可以暂停或继续。

//进程本身就是该风格

进程通信体系结构风格的变种主要在于特定通信模式的变化，例如通信网络的拓扑结构、同步/异步的需求，以及每个消息的接收方的数量。

#### 3.5.2 事件系统 Event System Styl
##### 定义
- 构件
  - **事件源** (Event Source) ：一个构件可以产生一些事件。
  - **事件处理器**(Event Handlers) ：系统中的其它构件可以注册自己感兴趣的事件，并将自己的某个行为过程的执行与相应的事件进行关联。
  - **事件管理器**（Event Manager）：当一个事件被发布，系统需要自动调用对该事件注册的所有过程。事件管理器用于管理事件如何分发、派遣给这些过程。
- 连接件
  - **事件-执行过程**的绑定(event-procedure bindings)

//Windows的事件系统？RSS订阅？

##### 特点

|特点|描述|
|-|-|
|分离的交互|事件发布者并不会意识到事件订阅者的存在|
||事件的触发者并不知道哪些构件会被这些事件影响|
|构件独立|各个构件之间彼此之间无连接关系，各自独立存在，通过对事件的发布和注册实现关联。|
|一对多通信|采用发布/订阅消息传递，一个特定事件可以影响多个订阅者。|
|基于事件的触发|由事件触发过程调用，不能假定构件的处理顺序，甚至不知道哪些过程会被调用。|
|异步|支持异步操作，一个事件正在处理，新的事件就产生了。|
|系统负载|可能存在全局性能和资源管理的问题|

## 4 软件质量属性概念
### 4.1 质量属性概念
指软件系统的**可用性**、**性能**、**安全性**等可度量、可测试的属性。

属于非功能性需求，并不被功能所决定。

#### 确定属性
一般需要综合考虑用户需求、成本、技术等确定软件应重点和优先关注的质量属性

- 在软件项目开发的初期，对质量属性的确定让后续工作更有针对性。
- 在项目开发的过程中，也应持续地进行质量属性的评估和调整。

#### 权衡
-  质量属性之间存在**抑制关系**，即在追求某一质量属性的最优时，可能会对其他质量属性产生的不利影响。
-  质量属性的权衡：在软件体系结构设计中，软件开发者需根据质量属性的**相互关系**对质量属性进行权衡。
-  可能的权衡方案：**确定优先级**、采用**折中**方案和**使用技术手段**等。


六个常见的质量属性

|属性|定义|
|-|-|
|[可用性（Availability）](#43-可用性-availability)|软件在特定环境下持续正常运行的能力。|
|[可修改性（Modifiability）](#44-可修改性-modifiability)|软件面对需求和环境变更时，能够方便被修改的能力。|
|[性能（Performance）](#45-性能-performance)|软件系统在执行任务时所表现出的效率和响应速度。|
|[安全性（Security）](#46-安全性-security)|软件确保数据等机密性、完整性和可用性的能力。|
|[可测试性（Testability）](#47-可测试性-testability)|软件被测试的难易程度。|
|[易用性（Usability）](#48-易用性-usability)|用户能够方便地使用软件系统的程度。|

### 4.2 质量属性场景
- 层次性：指在描述质量属性时需要准确理解和识别不同层次的属性，并权衡它们之间的关系和优先级。
- 隐蔽性：指质量属性可能在设计和开发阶段并不明显，或者在实际使用中难以察觉。

质量属性场景的6个组成部分

|组成部分|定义|
|-|-|
|刺激源（source）|谁造成的刺激。比如，用户请求、数据输入。|
|刺激（stimulus）|一个影响系统的情况。比如，请求响应时间。|
|制品（artifact）|系统被影响的部分。比如，系统整体。|
|环境（environment）|刺激发生时系统所处的状态。比如，系统处于正常状态。|
|响应（response）|刺激所产生的结果。比如，请求处理、结果生成。|
|响应衡量指标（response measure）|如何评估响应。比如，响应时间。|

### 4.3 可用性 Availability
**可用性**（Availability）可理解为软件系统能够在要求的时间内被正常使用的能力，强调了软件系统在面对各种故障时的*稳定性和可靠性*。对于支撑关键业务功能的软件系统而言，可用性是至关重要的质量属性。

#### 4.3.1 含义
关注点
- 是否发生了故障
- 故障的后果

**衡量指标**

|类型|具体指标|目的|
|-|-|-|
|度量系统可靠性|平均无故障时间、平均故障间隔时间|度量系统的稳定性和故障概率|
|度量系统可恢复性|平均恢复时间、恢复点目标、恢复时间目标|度量系统从故障中恢复的速度和数据恢复的准确性|
|度量可用性概率|可用性百分比|直观地表示系统可用性的程度|

**质量属性场景**

|刺激源|刺激|制品|环境|响应|响应度量
|-|-|-|-|-|-|
|故障的迹象（来自内部或外部）|系统出错<br>系统崩溃（反复出错）<br>给出结果不准时（早或晚）<br>给出错误结果|计算<br>存储<br>网络传输|正常状态<br>“亚健康”状态|记录日志（错误报告），回传给厂家<br>通知管理员或其他系统<br>关闭系统，系统在维修期间不可用|故障时间百分比<br>修复故障所需时间<br>平均无故障时间<br>...|


#### 4.3.2 实现策略

- 目标
  - 降低故障造成的影响
- 方向1：故障检测
  - 如何第一时间发现故障
    - Ping/Echo策略
    - Heartbeat（心跳）
    - Exceptions（异常）
- 方向2：故障恢复
  - 如何恢复正确的结果
    - 投票 /*EVA-MAGI*/ 
    - 主动/被动冗余 
    - 内测补丁 
    - 检查点/回滚
- 方向3：故障避免
  - 如何主动减少故障的发生 
    - 服务下线
    - 事务
    - 进程监控

### 4.4 可修改性 Modifiability
**可修改性**指软件系统在未来能够容易地进行修改的能力。
#### 4.4.1 含义
**修改**包括：
- 修正
  - 定位问题
  - 修正问题
  - 测试验证
- 改进
  - 调整代码
  - 优化算法
  - 重构系统
- 适应需求
  - 添加新功能
  - 重构系统
  - 修改现有功能
  - 调整系统的配置

**关注点**
软件系统利益相关方对于可修改性的关注点主要包括修改的**成本**、修改的**对象**、修改的发生**时间**、修改的**执行者**等四个方面。

**质量属性场景**

|刺激源|刺激|制品|环境|响应|响应度量
|-|-|-|-|-|-|
|设计人员<br>开发人员<br>终端用户<br>...|需求变更<br>出现缺陷/错误<br> 可修改性含义<br>进行优化或重构<br>...|用户界面<br>后台业务逻辑<br>和其他外部系统交互的接口<br>数据访问<br>...|设计期间<br>开发期间<br>运行期间|理解如何修改<br>进行修改<br>测试<br>重新部署上线|修改完成的时间<br>修改所花的人力<br>成本/经济成本<br>...|

#### 4.4.2 实现策略
- 目标
  - 降低修改的成本
- 方向1：限制修改范围
  - 让修改所影响的范围尽可能小
    - 模块高内聚低耦合
    - 考虑未来的修改
    - 使用通用化模块
    - 隐藏信息（私有变量）
    - 维持接口不变
    - 限制通信路径
    - 使用中介
    - 命名服务
- 方向2：延迟绑定时间
  - 让软件在运行期间仍可进行灵活修改
    - 配置文件
    - 发布/订阅模式
    - 多态
### 4.5 性能 Performance
**性能**指软件系统在给定条件下执行任务或提供服务时所展现的**效率或速度**。

#### 4.5.1 含义
**关注点**
性能的关注点是系统对事件的响应速度，它受到**事件数量**、**事件到达模式**和**系统处理能力**等因素的影响

**质量属性场景**

|刺激源|刺激|制品|环境|响应|响应度量
|-|-|-|-|-|-|
|用户请求<br>并发用户数<br>数据量增加<br>定时事件|点击按钮<br>提交数据<br>执行计算操作<br>请求数据查询<br>...|系统提供的服务<br>一个服务可能涉及软件系统中的多个组成部分|正常模式<br>超载模式<br>紧急模式<br>...|生成结果<br>返回数据<br>执行操作<br>显示界面<br>...|响应时间<br>吞吐量<br>并发用户数量<br>失败率<br>…|

#### 4.5.2 实现策略
- 目标
  - 在限定时间内响应事件
- 方向1：优化资源需求
  - 降低所需资源数量
    - 提高计算效率
    - 减少要处理的数据总量
    - 限制执行时间
    - 限制待处理事件队列长度
- 方向2：优化资源管理
  - 充分利用资源
    - 利用并发机制
    - 增加可用资源
- 方向3：优化资源仲裁
  - 高效分配资源
    - 先来先服务
    - 固定/动态优先级调度

### 4.6 安全性 Security
软件在**受到恶意攻击**的情况下仍然能够继续正确运行，并确保软件在**授权范围内**被合法使用的能力。

#### 4.6.1 含义
**关注点**
在遭受攻击时，系统应能够识别和阻止**恶意请求**，保持服务的正常响应，让**合法用户**不会因为系统受到攻击而无法使用系统。

**质量属性场景**

|刺激源|刺激|制品|环境|响应|响应度量|
|-|-|-|-|-|-|
|外部攻击者<br>内部员工|破坏系统的可用性<br>篡改数据<br>敏感数据泄露|系统对外提供的服务<br>数据|联网or未联网<br>在线or离线<br>在防火墙内or外|允许合法用户使用<br>拒绝非法用户使用的响应<br>尽量威慑攻击者|发起攻击的难度<br>从攻击中恢复的难度|

#### 4.6.2 实现策略

- 目标
  - 软件在被攻击时受到的影响尽量小
- 方向1：抵抗攻击
  - 系统的容错能力攻击
    - 验证用户身份 密码策略、强化身份验证、单点登录、社交登录
    - 验证用户权限
    - 维持数据保密性
    - 维持数据完整性
    - 减少暴露
    - 限制访问
- 方向2：检测攻击
  - 及时发现和应对攻击
    - 安全日志
    - 异常行为监测
- 方向3：从攻击中恢复
  - 让系统尽快恢复到正常状态
    - 恢复状态
    - 识别攻击者//铁拳来喽

### 4.7 可测试性 Testability
可测试性指软件系统为**设计测试**、**执行测试**提供支持的能力。

#### 4.7.1 定义
测试：发现故障->定位故障->设计测试->执行测试

**关注点**
可测试性的关注点包括问题的**易发现性**、软件与需求的**匹配度**、测试的**成本**等。

**质量属性场景**

|刺激源|刺激|制品|环境|响应|响应度量|
|-|-|-|-|-|-|
|用户对软件系统进行的操作<br>软件系统与外部系统进行交互|正常输入<br>异常输入|系统中的部分模块或组件<br>系统整体环境|正常的运行状态<br>异常的软件状态|正常的响应<br>错误的响应（warning,error）|功能正确性指标<br>白盒测试得覆盖率<br>未来发现bug的概率|

#### 4.7.2 实现策略
- 目标
  - 降低测试成本、提高缺陷在测试中暴露的可能性
- 方向1：黑盒测试
  - 给定输入，观察输出是否正确
    - 录制/回放
    - 分离接口和实现
    - 提供专用的测试路径
- 方向2：白盒测试
  - 验证软件系统的内部状态
    - 使用IDE内置调试工具
    - 使用外部工具
### 4.8 易用性 Usability
易用性指软件系统易于被用户**理解、学习、使用**的能力。

#### 4.8.1 定义
**关注点**
- 学习难度
  - 用户在初次接触软件时所需的学习成本
- 操作效率
  - 用户在完成特定任务时所需的时间和操作步骤
- 错误容忍
  - 及时纠正用户的操作错误或提供相应的警示和帮助
- 用户体验
  - 用户在使用软件过程中所获得的感受和满意度

**质量属性场景**

|刺激源|刺激|制品|环境|响应|响应度量|
|-|-|-|-|-|-|
|用户操作<br>系统事件<br>外部环境变化<br>...|点击按钮<br>输入数据<br>修改设置<br>...|系统整体|系统运行时<br>系统配置时|给出即时反馈<br>显示错误消息或警告<br>...|用户完成任务耗时<br>用户出错的次数<br>用户操作的成功率<br>用户满意度|

#### 4.8.2 实现策略
- 目标
  - 让用户在使用软件时感到舒适和满意
- 方向1：运行时策略
  - 通过软件运行时的交互和反馈实现易用性
    - 猜测任务
    - 适当反馈
    - 一致体验
    - 支持撤销
    - 操作引导
    - 简化操作
- 方向2：设计时策略
  - 软件设计阶段实现易用性
    - 用户界面独立

## 5 软件体系结构描述方法（UML）
软件体系结构由一定形式的结构化元素组成，即是**构件的集合**。包括处理构件、数据构件和连接构件。**处理构件**负责加工数据，**数据构件**代表被加工的信息，**连接构件**则负责组合连接不同的构件。

### 5.1 软件体系结构描述
建立描述文档的基本原则
1. 从读者的角度撰写
2. 避免不必要的重复
3. 避免歧义
4. 使用标准组织结构
5. 记录理由
6. 保持文档时效性
7. 审查文档是否符合需求

### 5.2 软件体系结构建模
视图:由系统相关者编写和读取的一组连贯的架构元素的表示

UML的优势主要体现在其通用性、标准化、工具支持和灵活性等方面

#### 5.2.1 用例图 Use Case
用例代表了系统的**外部视图**
用例与系统内部的类之间并非1对1关联
![图五]({{site.path}}/public/image/2024_12_05_1_5.png "用例图")

#### 5.2.2 类图 Class Diagram
类图表示系统中的类和类与类之间的关系，它是对**系统静态结构**的描述。
![图六]({{site.path}}/public/image/2024_12_05_1_6.png "类图")

#### 5.2.3 对象图 Object Diagram
对象图是某个时间点系统中对象的快照，因为它显示的是实例而不是类，所以通常称为实例图。
![图七]({{site.path}}/public/image/2024_12_05_1_7.png "对象图")

#### 5.2.4 状态图 State Diagram
//待补充
协作（通信）图 Communication Diagram
序列图 Sequence Diagram
活动图 Activity Diagram
包图 Package Diagram
组件图 Component Diagram
部署图 Deployment Diagram