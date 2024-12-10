---
layout: post
title:  软件体系结构
date:   2024-12-05 12:00:00 +0800
last_change_date: 2024-12-08 14:00:00 +0800
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
    - [3.1.3 过程控制](#313-过程控制)
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
    - [3.4.2 规则系统 Rule-based System Style](#342-规则系统-rule-based-system-style)
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
    - [5.2.5 协作（通信）图 Communication Diagram](#525-协作通信图-communication-diagram)
    - [5.2.6 序列图 Sequence Diagram](#526-序列图-sequence-diagram)
    - [5.2.7 活动图 Activity Diagram](#527-活动图-activity-diagram)
    - [5.2.8 包图 Package Diagram](#528-包图-package-diagram)
    - [5.2.9 组件图 Component Diagram](#529-组件图-component-diagram)
    - [5.2.10 部署图 Deployment Diagram](#5210-部署图-deployment-diagram)
- [6 软件体系结构评估](#6-软件体系结构评估)
  - [6.1 体系结构评估](#61-体系结构评估)
  - [6.2 ATAM The Architecture Trade-Off Analysis Method](#62-atam-the-architecture-trade-off-analysis-method)
      - [目标](#目标)
      - [优点](#优点)
      - [人员](#人员)
    - [评估阶段](#评估阶段)
      - [Phase1](#phase1)
      - [Phase2](#phase2)
      - [Phase3](#phase3)
        - [**效用树 Utility Tree**](#效用树-utility-tree)
        - [敏感点、权衡点、风险、非风险](#敏感点权衡点风险非风险)
- [7 试卷名词总结](#7-试卷名词总结)
  - [7.1 tactic翻译](#71-tactic翻译)
    - [可用性 Availability](#可用性-availability)
    - [性能 Performance](#性能-performance)
    - [安全性 Security](#安全性-security)
    - [可测试性 Testability](#可测试性-testability)
    - [易用性 Usability](#易用性-usability)
  - [20年大题](#20年大题)
    - [1.Quality Attribute and Architecture Style (34 points)](#1quality-attribute-and-architecture-style-34-points)
    - [2. Utility Tree (16 points)](#2-utility-tree-16-points)
    - [3. Architecture Evaluation (20 points)](#3-architecture-evaluation-20-points)
  - [翻译](#翻译)
    - [1. 质量属性与架构风格（34分）](#1-质量属性与架构风格34分)
    - [2. 效用树（16分）](#2-效用树16分)
    - [3. 架构评估（20分）](#3-架构评估20分)

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

#### 3.1.3 过程控制
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

/\*        我附庸的附庸不是我的附庸         \*/
/\*  Web应用程序、企业信息系统、物流网系统   \*/

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

//数模中的题目都挺类似的

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
- 能够仿真平台系统所不具备的功能和环境
- 可扩展性强
- 可模拟极端条件下（如故障）的测试
- 通常具有较好的跨平台性
Disadvantages:
- 牺牲了性能
- 增加了测试的难度

#### 3.4.2 规则系统 Rule-based System Style
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
|分离的交互|事件发布者并不会意识到事件订阅者的存在<br>事件的触发者并不知道哪些构件会被这些事件影响|
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

|质量属性||
|-|-|
|刺激源|故障的迹象（来自内部或外部）|
|刺激|系统出错<br>系统崩溃（反复出错）<br>给出结果不准时（早或晚）<br>给出错误结果|
|制品|计算<br>存储<br>网络传输|
|环境|正常状态<br>“亚健康”状态|
|响应|记录日志（错误报告），回传给厂家<br>通知管理员或其他系统<br>关闭系统，系统在维修期间不可用|
|响应度量|故障时间百分比<br>修复故障所需时间<br>平均无故障时间<br>...|

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
    - 投票 /\* EVA-MAGI \*/ Vote
    - 主动/被动冗余 Active/Passive redundancy
    - 内测（补丁） //Closed beta
    - 检查点/回滚 Checkpointing/Rollback
- 方向3：故障避免
  - 如何主动减少故障的发生 
    - 服务下线 Removal from service
    - 事务 Transaction
    - 进程监控 Process monitoring

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

|质量属性||
|-|-|
|刺激源|设计人员<br>开发人员<br>终端用户<br>...|
|刺激|需求变更<br>出现缺陷/错误<br> 可修改性含义<br>进行优化或重构<br>...|
|制品|用户界面<br>后台业务逻辑<br>和其他外部系统交互的接口<br>数据访问<br>...|
|环境|设计期间<br>开发期间<br>运行期间|
|响应|理解如何修改<br>进行修改<br>测试<br>重新部署上线|
|响应度量|修改完成的时间<br>修改所花的人力<br>成本/经济成本<br>...|

#### 4.4.2 实现策略
- 目标
  - 降低修改的成本
- 方向1：限制修改范围
  - 让修改所影响的范围尽可能小
    - 模块高内聚低耦合 High cohesion and low coupling
    - 考虑未来的修改 
    - 使用通用化模块 Generalized modules
    - 隐藏信息（私有变量）
    - 维持接口不变 interface
    - 限制通信路径 
    - 使用中介 Use an intermediary
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

|质量属性||
|-|-|
|刺激源|用户请求<br>并发用户数<br>数据量增加<br>定时事件|
|刺激|点击按钮<br>提交数据<br>执行计算操作<br>请求数据查询<br>...|
|制品|系统提供的服务<br>一个服务可能涉及软件系统中的多个组成部分|
|环境|正常模式<br>超载模式<br>紧急模式<br>...|
|响应|生成结果<br>返回数据<br>执行操作<br>显示界面<br>...|
|响应度量|响应时间<br>吞吐量<br>并发用户数量<br>失败率<br>...|

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
    - 固定/动态优先级调度 Fixed-priority/Danamic-priority scheduling 

### 4.6 安全性 Security
软件在**受到恶意攻击**的情况下仍然能够继续正确运行，并确保软件在**授权范围内**被合法使用的能力。

#### 4.6.1 含义
**关注点**
在遭受攻击时，系统应能够识别和阻止**恶意请求**，保持服务的正常响应，让**合法用户**不会因为系统受到攻击而无法使用系统。

**质量属性场景**

|质量属性||
|-|-|
|刺激源|外部攻击者<br>内部员工|
|刺激|破坏系统的可用性<br>篡改数据<br>敏感数据泄露|
|制品|系统对外提供的服务<br>数据|
|环境|联网or未联网<br>在线or离线<br>在防火墙内or外|
|响应|允许合法用户使用<br>拒绝非法用户使用的响应<br>尽量威慑攻击者|
|响应度量|发起攻击的难度<br>从攻击中恢复的难度|


#### 4.6.2 实现策略

- 目标
  - 软件在被攻击时受到的影响尽量小
- 方向1：抵抗攻击
  - 系统的容错能力攻击
    - 验证用户身份 密码策略、强化身份验证、单点登录、社交登录
    - 验证用户权限 Authenticate users 
    - 维持数据保密性 Maintain data confidentiality
    - 维持数据完整性 //Maintain data integrity
    - 减少暴露 //Reduce exposure
    - 限制访问 Limit access 
- 方向2：检测攻击
  - 及时发现和应对攻击
    - 安全日志 //Security logs
    - 异常行为监测 Built-in monitors 
- 方向3：从攻击中恢复
  - 让系统尽快恢复到正常状态
    - 恢复状态 //Recovery state
    - 识别攻击者 //铁拳来喽

### 4.7 可测试性 Testability
可测试性指软件系统为**设计测试**、**执行测试**提供支持的能力。

#### 4.7.1 定义
测试：发现故障->定位故障->设计测试->执行测试

**关注点**
可测试性的关注点包括问题的**易发现性**、软件与需求的**匹配度**、测试的**成本**等。

**质量属性场景**
|质量属性||
|-|-|
|刺激源|用户对软件系统进行的操作<br>软件系统与外部系统进行交互|
|刺激|正常输入<br>异常输入|
|制品|系统中的部分模块或组件<br>系统整体环境|
|环境|正常的运行状态<br>异常的软件状态|
|响应|正常的响应<br>错误的响应（warning,error）|
|响应度量|功能正确性指标<br>白盒测试得覆盖率<br>未来发现bug的概率|

#### 4.7.2 实现策略
- 目标
  - 降低测试成本、提高缺陷在测试中暴露的可能性
- 方向1：黑盒测试
  - 给定输入，观察输出是否正确
    - 录制/回放 Record/playback
    - 分离接口和实现 //Separate interfaces and implementations
    - 提供专用的测试路径 //Dedicated test path
- 方向2：白盒测试
  - 验证软件系统的内部状态
    - 使用IDE内置调试工具 //built-in debugging tools
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

|质量属性||
|-|-|
|刺激源|用户操作<br>系统事件<br>外部环境变化<br>...|
|刺激|点击按钮<br>输入数据<br>修改设置<br>...|
|制品|系统整体|
|环境|系统运行时<br>系统配置时|
|响应|给出即时反馈<br>显示错误消息或警告<br>...|
|响应度量|用户完成任务耗时<br>用户出错的次数<br>用户操作的成功率<br>用户满意度|

#### 4.8.2 实现策略
- 目标
  - 让用户在使用软件时感到舒适和满意
- 方向1：运行时策略
  - 通过软件运行时的交互和反馈实现易用性
    - 猜测任务 //Guess the mission
    - 适当反馈 //Appropriate feedback
    - 一致体验 //Consistent experience
    - 支持撤销 //Support for revocation
    - 操作引导 //Operational guidance
    - 简化操作 //Simplify operations
- 方向2：设计时策略
  - 软件设计阶段实现易用性
    - 用户界面独立 //Independent User Interface

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
对象图是某个时间点系统中**对象的快照**，因为它显示的是实例而不是类，所以通常称为实例图。
![图七]({{site.path}}/public/image/2024_12_05_1_7.png "对象图")

#### 5.2.4 状态图 State Diagram
状态图是描述类的对象所有可能的**状态**以及事件发生时状态的**转移条件**。通常，状态图是对类图的补充。
![图八]({{site.path}}/public/image/2024_12_05_1_8.png "状态图")


//待补充
#### 5.2.5 协作（通信）图 Communication Diagram
协作图是一种**交互图**，强调的是发送和接收消息的对象之间的组织结构。一个协作图显示了一系列的对象及对象之间的联系以及对象间发送和接收的消息。
![图九]({{site.path}}/public/image/2024_12_05_1_9.png "协作图")

#### 5.2.6 序列图 Sequence Diagram
在软件工程中，序列图是对象交互的一种表现方式。主要用于按照交互发生的一系列顺序，显示对象之间的这些交互。
![图十]({{site.path}}/public/image/2024_12_05_1_10.png "序列图")

#### 5.2.7 活动图 Activity Diagram
描述满足用例要求所要进行的活动以及活动间的约束关系，有利于识别并行活动。
![图十一]({{site.path}}/public/image/2024_12_05_1_11.png "活动图")

#### 5.2.8 包图 Package Diagram
包是在UML中用类似于文件夹的符号表示的模型元素的组合，允许从UML中获取任何结构，并将其元素分组到**更高级别**的单元中。
![图十二]({{site.path}}/public/image/2024_12_05_1_12.png "包图")

#### 5.2.9 组件图 Component Diagram
组件图描述代码构件的**物理结构**及各构件之间的依赖关系。将系统划分为组件并希望通过接口或组件细分为较低级别的结构来显示其相互关系。
![图十三]({{site.path}}/public/image/2024_12_05_1_13.png "组件图")

#### 5.2.10 部署图 Deployment Diagram
部署图定义系统中软硬件的**物理体系结构**。描述了一个运行时的硬件结点，以及在这些结点上运行的软件组件的静态视图。 显示了系统的硬件，安装在硬件上的软件，以及用于连接异构的机器之间的中间件。
![图十四]({{site.path}}/public/image/2024_12_05_1_14.png "部署图")

## 6 软件体系结构评估
### 6.1 体系结构评估
**定义**

**Architecture evaluation** is a *development life-cycle activity* whereby several *stakeholders*（项目干系人） analyze the software architecture together in a formal or informal（正式或非正式）process using an assessment technique such as scenarios（场景）. 

**架构评估**是软件*开发生命周期中一个活动*，在此活动中，相关*项目干系人*使
用评估技术（如场景），在一个正式或非正式的过程中一起分析软件架构。

### 6.2 ATAM The Architecture Trade-Off Analysis Method
ATAM（The Architecture Trade-Off Analysis Method）的灵感主要来自于3个方面：**软件体系结构风格的概念**、**质量属性分析**和**SAAM**。之所以称为ATAM，是因为这种方法不仅可以揭示出软件架构对特定质量目标的满足情况，而且能够更清楚地认识到质量属性之间的联系，即如何权衡诸多质量属性。

ATAM是 SAAM的一个细化，特别关注**可修改性**、**性能**、**可用性**和**安全性**。

##### 目标
- 不是提供精确的分析，是发现由体系结构决策产生的风险
- 我们希望找到趋势：体系结构决策和系统属性预测之间的相关性

##### 优点
- 进行ATAM评估的优点
  - 确定风险
  - 明确质量属性需求
  - 完善体系结构文档
  - 体系结构决策的文档化基础
  - 加强利益相关者之间的沟通
- ATAM的结果是改进后的体系结构

##### 人员
- 评估小组
  - 每个评估团队由一名领导和至少三名其他团队成员组成。
  - ATAM团队成员必须是经验丰富的体系架构师。
  - ATAM领导者必须具备出色的沟通和促进技能。
- 项目决策者
  - 能够控制程序开发过程和授权变更的人员。
  - 通常包含项目经理，为开发买单的用户，和体系结构开发人员
- 构架涉众
  - 涉众是与要开发的系统相关的一切人和事。
  - 体系结构对可修改性、安全性等质量属性的支持程度会直接影响到涉众人员的正常工作的进行。
  - 涉众不等于用户，通常意义的user是指系统的使用者，这仅是涉众中的一部分。 
  - 涉众通常包括开发者，测试人员，集成人员，系统维护者，性能工程师，用户等等。

#### 评估阶段
四个阶段

- 阶段0 合作与准备
  - 这一阶段先于技术评估
  - 持续时间：不定
  - 会议：主要是电话、电子邮件
- 阶段1 初步评估
  - 专注于获取详细的体系结构信息并对其进行分析
- 阶段2 完成评估
  - 以上两个阶段：
  - 持续时间：阶段1和阶段2分别为1.5-2天
  - 会议：通常在客户现场进行
- 阶段3 后续工作
  - 持续时间：不定
  - 会议：主要是电话、电子邮件

##### Phase1

1. 评估小组对ATAM进行介绍
2. 客户描述系统的商业动机
3. 设计师介绍体系结构设计的概述。
4. 确定核心体系结构方法
5. 通过构建[效用树](#效用树-utility-tree)来识别、确定优先级并优化最重要的质量属性目标。
6. 评估团队从特定质量属性的角度探索体系结构方法以识别风险。

##### Phase2

涉及更多的**利益相关者**
重点是激发不同**利益相关者的观点**，并**验证**第一阶段的结果。

7. 头脑风暴并对场景进行优先级排序
8. 分析体系结构方法
9. 概括ATAM的所有步骤，并显示ATAM输出。

##### Phase3
主要包括为客户制作最终报告，以及反映评估和ATAM材料的质量。

- 执行摘要
- ATAM的介绍
- 商业动机和体系结构的描述
- 第 1 阶段和第 2 阶段场景和效用树列表
- 第 1 阶段和第 2 阶段分析：体系结构方法、决策、风险、敏感性、权衡和非风险
- 风险主题
- 接下来的步骤

###### **效用树 Utility Tree**

![图十五]({{site.path}}/public/image/2024_12_05_1_15.png "效用树")
(H,M)指(重要性,难度)

High/Middle/Low

###### 敏感点、权衡点、风险、非风险

**敏感点**是影响一个或多个组件（或组件关系）的特性，对于实现特定质量属性响应至关重要。

A **sensitivity point** is a property of one or more components (and/or component relationships) that is critical for achieving a particular quality attribute response.

**权衡点**是影响多个质量属性的特性，是多个质量属性的敏感点。

A tradeoff point is a property that affects more than one attribute and is a sensitivity point for more than one attribute.

**风险**是一个存在潜在问题的体系结构决策。

A riskis a potentially problematic architectural decision.

**非风险**是经分析认为安全的良好体系结构决策。

Non-risksare good architectural decisions that are deemed safe upon analysis.

## 7 试卷名词总结

### 7.1 tactic翻译

|word|翻译|
|-|-|
|tactic|策略|
|redundancy|冗余|
|coherence|相关|

#### 可用性 Availability
- 目标
  - 降低故障造成的影响
- 方向1：故障检测
  - 如何第一时间发现故障
    - Ping/Echo策略
    - Heartbeat（心跳）
    - Exceptions（异常）
- 方向2：故障恢复
  - 如何恢复正确的结果
    - 投票 /\*EVA-MAGI\*/ Vote
    - 主动/被动冗余 Active/Passive redundancy
    - 内测（补丁） Closed beta
    - 检查点/回滚 Checkpointing/Rollback
- 方向3：故障避免
  - 如何主动减少故障的发生 
    - 服务下线 
    - 事务 Transaction
    - 进程监控 Process monitoring

#### 性能 Performance
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
    - 固定/动态优先级调度 Fixed-priority/Danamic-priority scheduling 

#### 安全性 Security
- 目标
  - 软件在被攻击时受到的影响尽量小
- 方向1：抵抗攻击
  - 系统的容错能力攻击
    - 验证用户身份 密码策略、强化身份验证、单点登录、社交登录
    - 验证用户权限 Authenticate users 
    - 维持数据保密性 Maintain data confidentiality
    - 维持数据完整性 //Maintain data integrity
    - 减少暴露 //Reduce exposure
    - 限制访问 Limit access 
- 方向2：检测攻击
  - 及时发现和应对攻击
    - 安全日志 //Security logs
    - 异常行为监测 Built-in monitors 
- 方向3：从攻击中恢复
  - 让系统尽快恢复到正常状态
    - 恢复状态 //Recovery state
    - 识别攻击者 //铁拳来喽

#### 可测试性 Testability
- 目标
  - 降低测试成本、提高缺陷在测试中暴露的可能性
- 方向1：黑盒测试
  - 给定输入，观察输出是否正确
    - 录制/回放 Record/playback
    - 分离接口和实现 //Separate interfaces and implementations
    - 提供专用的测试路径 //Dedicated test path
- 方向2：白盒测试
  - 验证软件系统的内部状态
    - 使用IDE内置调试工具 //built-in debugging tools
    - 使用外部工具

#### 易用性 Usability
- 目标
  - 让用户在使用软件时感到舒适和满意
- 方向1：运行时策略
  - 通过软件运行时的交互和反馈实现易用性
    - 猜测任务 //Guess the mission
    - 适当反馈 //Appropriate feedback
    - 一致体验 //Consistent experience
    - 支持撤销 //Support for revocation
    - 操作引导 //Operational guidance
    - 简化操作 //Simplify operations
- 方向2：设计时策略
  - 软件设计阶段实现易用性
    - 用户界面独立 //Independent User Interface



### 20年大题

Question 3: Architecture Analysis and Design (70 points)  
#### 1.Quality Attribute and Architecture Style (34 points) 
A software company plans to develop a Supermarket Member Management System (short for SMMS) for a membership-based (会员制) supermarket. The membership-based supermarket means that only members can consume in this supermarket. One of the most important functionality of SMMS is to calculate the discount for each product according to a member level and records of her/his consumption(消费). There are three different member levels in the supermarket, as silver, gold and platinum. Meanwhile, the member level will be extended in the future. Besides, the way to calculate discount may change from time to time. Followings are some detailed requirements for SMMS system. 

a) The SMMS should not be accessible remotely to updating without internal protocols.

b) The code coverage of SMMS should be bigger than 70%. 

c) If a develop wishes to change the UI at development time, the change must be made with no effects in 2 days. 

d) When an unanticipated message from external arrives in SMMS under normal operations of the system, the operator(操作人员) must be informed and she/he can continue to operate without downtime. 

e) When a member initiates（发起） a “purchase order” transaction under normal operations of SMMS, the transaction must be processed with average latency of one second. 

f) The SMMS should have a friendly look-and-feel（外观）, so it is easy for members to accomplish a desired task in PC, Mobile Phone and Tablet. 

g) When an authorized member tries to modify her profile under normal operations of SMMS, the system should maintain an audit trail and the modified data is restored. 

Please analyze the requirements and complete following 4 questions: 

1) Identify and name the related quality attributes according to the requirements. 
2) For each quality attribute, give the corresponding quality attribute scenario. 
3) For each quality attribute, list at least 2 solutions for archiving the corresponding quality attribute.  
4) According to the requirements, which software architecture style is better for the SMMS? Describe the reason and list the advantages and disadvantages of architecture style you choose for the SMMS. 

#### 2. Utility Tree (16 points) 
A software company plans to develop a data processing system. The development team analyzed the Quality Attributes, designed architecture and wanted to use Utility Tree to evaluate the architecture, followings are the scenarios.

a) There are two roles in the system: administrator and user. An administrator can create one or more users, and grant them the permissions accordingly. 

b) Users are identified by their mobile phone numbers, and they can set a nickname having least 5 characters starting with letters. 

c) The cost for adding a new data processing algorithm to the system by a developer is less than 10-person days. 

d) The processing latency on main database need to be reduced to 100ms. 

e) Change Web user interface in <3-person weeks. 

f) The application can display the processing results for an authentication user, and the authentication works 99.99% of the time. 

g) When power outrage happens at site 1, it takes at most 3s to redirect all traffic from site 1 to site 3. 

h) If a user forgets his password, he can reset his password by receiving a message from the system. 

i) The latency for processing a 1GB video data (1080p) must be less than 10s. 

j) The network failure can be detected automatically and recovered in < 2.5 min.

k) The system must have a user authorization database to record the user permissions, and the authorization works 99.99% of the time. 

According the scenarios, please <u>construct a Utility Tree</u>. 

#### 3. Architecture Evaluation (20 points) 
Identifying and recording risks and non-risks, sensitivity points and tradeoffs are important tasks in architecture evaluation. Please describe the definitions of risk, non-risk, sensitivity point and tradeoffs and then read the following descriptions and point out each description is a risk, non-risk, sensitivity point or tradeoff. 
a) The number of concurrent requests will affect the number of transactions a database can process per second. 

b) Changing the level of authentication could have a significant impact on both security and performance. 

c) Some business processing component is provided by a third-party company, there is no way of detecting the failure of them directly. 

d) Assuming the request arrival rate is twice per second, and the average processing time is less than 80ms; a 1 second response time seems reasonable for our system.  

e) Some of the legacy data processing components are implemented by the C++ programming language, which should be encapsulated (封装) first and are hard for a Java program to maintain and modify them. 

f) The selection of the encryption algorithm might be closely related to the number of bits of encryption. 

![图十六]({{site.path}}/public/image/2024_12_05_1_16.png "题目配图")

### 翻译

#### 1. 质量属性与架构风格（34分）  
某软件公司计划开发一个超市会员管理系统（简称SMMS），用于一家会员制（会员制）超市。会员制超市的特点是只有会员可以在超市消费。SMMS的一个重要功能是根据会员等级和消费记录为每个商品计算折扣。超市有三种会员等级：银卡、金卡和白金卡。此外，会员等级在未来可能会扩展，并且折扣计算方式可能会不时更改。以下是SMMS系统的一些具体需求：  

a) SMMS 不应通过远程更新而无需内部协议访问。  
b) SMMS 的代码覆盖率应大于 70%。  
c) 如果开发人员希望在开发期间更改 UI，则该更改必须在两天内完成且不产生影响。  
d) 在正常操作的情况下，当外部的未预期消息到达 SMMS 时，操作人员必须得到通知，并且她/他可以在不中断系统运行的情况下继续操作。  
e) 当会员在正常操作情况下发起“购买订单”交易时，交易必须在平均一秒内完成。  
f) SMMS 应具有友好的外观和体验，便于会员在 PC、手机和平板电脑上完成所需任务。  
g) 当授权会员在正常操作情况下尝试修改其个人资料时，系统应维护审计日志，并可恢复修改的数据。  

请分析这些需求并完成以下四个问题：  

1) 根据需求，识别并命名相关的质量属性。  
2) 对于每个质量属性，给出相应的质量属性场景。  
3) 对于每个质量属性，列出至少 2 种实现该质量属性的解决方案。  
4) 根据这些需求，哪个软件架构风格更适合 SMMS？描述理由并列出您选择的架构风格的优点和缺点。  

---

#### 2. 效用树（16分）  
某软件公司计划开发一个数据处理系统。开发团队分析了质量属性、设计了架构，并希望通过效用树对架构进行评估。以下是相关场景：  

a) 系统中有两种角色：管理员和用户。管理员可以创建一个或多个用户，并相应地授予他们权限。  
b) 用户通过其手机号标识，可以设置昵称，昵称需至少包含5个以字母开头的字符。  
c) 开发人员为系统添加一个新的数据处理算法的成本应少于 10 个工时。  
d) 主数据库上的处理延迟需减少到 100ms。  
e) 在小于3人周的时间内更改Web用户界面。  
f) 应用程序可以向已认证用户显示处理结果，并且认证成功率为 99.99%。  
g) 当站点1发生断电时，所有流量从站点1重定向到站点3的时间不超过3秒。  
h) 如果用户忘记密码，他可以通过接收系统消息重置密码。  
i) 处理1GB视频数据（1080p）的延迟必须少于10秒。  
j) 网络故障可以自动检测并在小于2.5分钟内恢复。  
k) 系统必须有一个用户授权数据库来记录用户权限，并且授权成功率为99.99%。  

根据这些场景，**构建一棵效用树**。  

---

#### 3. 架构评估（20分）  
在架构评估中，识别并记录风险、非风险、敏感点和权衡点是重要的任务。请描述以下概念的定义，并阅读下列描述，指出每条描述属于风险、非风险、敏感点还是权衡点。  

a) 并发请求的数量将影响数据库每秒能处理的事务数量。  
b) 改变认证级别可能会对安全性和性能产生重大影响。  
c) 某些业务处理组件由第三方公司提供，无法直接检测其故障。  
d) 假设请求到达率为每秒两次，且平均处理时间小于80ms；1秒的响应时间似乎对我们的系统是合理的。  
e) 部分遗留的数据处理组件是用 C++ 编写的，需先进行封装，而 Java 程序难以维护和修改这些组件。  
f) 加密算法的选择可能与加密位数密切相关。  