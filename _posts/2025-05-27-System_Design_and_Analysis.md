---
layout: post
title:  系统分析与设计笔记
date: 2025-05-27 14:00:00 +0800
last_change_date: 2025-05-27 14:00:00 +0800
categories: notes
# brief_introduction:
tags: notes
# related_posts: 
---

## Ch1

系统分析（Systems Analysis）：系统分析是对业务问题领域的研究，以推荐改进措施并指定解决方案的业务要求。

系统设计（System Design）：针对系统分析中确定的业务需求的基于计算机的技术解决方案。

### 1.1 系统开发中的风险承担者

Stakeholder（风险承担者，相关利益人）
- System owners（系统的业主）：sponsors出资者
- System users（系统用户）：user使用者，internal & external
- Systems analysts（系统分析员）：主导者
- System designers（系统设计员）：将需求requirements与约束constraints翻译为技术解决方案
- System builders（系统的构建人员）：根据设计规格说明书design specifications构建信息系统构件
- IT vendors and consultants（信息技术供应商和顾问）：供应商&咨询

- Information workers：创建，收集，处理，分发，使用信息
- Knowledge workers：专家知识

### 1.2 系统分析师

General Problem-Solving Approach
1. Identify the problem.
2. Analyze and understand the problem.
3. Identify **solution** requirements or expectations.
4. Identify alternative solutions（可供选择的解） and decide a course of action（行动路线）.
5. Design and implement the “best” solution.
6. Evaluate（评估）the results. If the problem is not solved, return to step 1 or 2 as appropriate.


## Ch2

| Perspective Holder  | DATA Focus                                                                                      | PROCESS Focus                                                                                     | INTERFACE Focus                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **System Owner**    | Interested in business knowledge from timely, accurate, relevant information, not raw data.     | Views business functions and cross-functional systems supporting various departments.             | Focused on what units, employees, and external systems the system must interface with and their location. |
| **System User**     | Experts in data but often limited by how it's currently stored; provide entity/attribute rules. | Describes business processes in response to events, defines policies and step-by-step procedures. | Defines input/output requirements through interface requirements.                                         |
| **System Designer** | Translates data requirements into database schemas under DBMS constraints.                      | Designs application schemas and software specifications using diagrams/models.                    | Designs technical user/system interface specifications; defines user dialogues.                           |
| **System Builder**  | Implements data via precise DBMS languages like SQL.                                            | Writes application programs or builds quick prototypes of the software.                           | Builds and tests interfaces using development tools, markup languages, and middleware.                    |


| 视角承担者     | 数据焦点（DATA）                           | 过程焦点（PROCESS）                     | 接口焦点（INTERFACE）                            |
| --------- | ------------------------------------ | --------------------------------- | ------------------------------------------ |
| **系统所有者** | 关注从及时、准确、相关信息中提取出的业务知识，而非原始数据。       | 关注支持业务职能的业务功能及跨职能的信息系统，不受组织边界限制。  | 关注系统需要与哪些业务单位、员工、客户、外部系统对接，以及它们的位置。        |
| **系统用户**  | 是描述业务数据的专家，但常局限于当前存储方式；提出实体、属性和规则需求。 | 将业务流程看作响应事件的活动，制定政策和完成业务流程的操作步骤。  | 表达用户输入/输出需求，形成接口需求。                        |
| **系统设计者** | 将用户数据需求转化为符合所选DBMS的数据库模式。            | 构建应用模式并用状态图、流程图、结构图、UML等表达软件规格说明。 | 设计用户与系统接口的技术细节，包括窗口切换流程等用户对话设计。            |
| **系统建设者** | 使用SQL等精确语言实现数据库中的数据结构。               | 编写程序或使用快速开发工具构建系统原型。              | 利用开发工具和中间件技术（如XML、HTML、ODBC等）构建和部署用户/系统接口。 |


## Ch3

### Capability Maturity Model (CMM)

| 等级 | 英文名称                     | 中文名称 | 描述（中英对照）                                                                                                                                                                                                                                       |
| -- | ------------------------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | **Level 1 — Initial**    | 初始级  | System development projects follow no prescribed process. <br>系统开发项目没有遵循任何规定的流程。                                                                                                                                                               |
| 2  | **Level 2 — Repeatable** | 可重复级 | Project management processes and practices are established to track project costs, schedules, and functionality. <br>已建立项目管理流程与实践，用于跟踪项目成本、进度和功能。                                                                                              |
| 3  | **Level 3 — Defined**    | 已定义级 | A standard system development process (sometimes called a “methodology”) is purchased or developed, and integrated throughout the information systems/services unit of the organization. <br>已购买或开发标准化的系统开发流程（有时称为“方法论”），并在整个信息系统/服务部门中得到统一应用。 |
| 4  | **Level 4 — Managed**    | 已管理级 | Measurable goals for quality and productivity are established. <br>已建立可度量的质量与生产效率目标。                                                                                                                                                           |
| 5  | **Level 5 — Optimizing** | 优化级  | The standardized system development process is continuously monitored and improved based on measures and data analysis established in Level 4. <br>基于第4级中建立的度量与数据分析，持续监控并改进标准化的系统开发流程。                                                         |

### Principles of System Development

- Get the owners and users involved. (以人为本)
- Use a problem-solving approach. (有理有据)
- Establish phases and activities. (分步实施)
- Establish standards. (建立标准)
- Justify systems as capital investments. (最优决策)
- Don’t be afraid to cancel or revise scope. (悬崖勒马)
- Divide and conquer. (分而治之)
- Design systems for growth and change. (高瞻远瞩)

### Problem Solving Framework

The PIECES 描述非功能性需求
- P  the need to improve performance（性能）
- I the need to improve information（信息） (and data)
- E  the need to improve economics（经济性）, control costs, or increase profits
- C  the need to improve control（可控制程度） or security
- E  the need to improve efficiency（效率） of people and  processes
- S  the need to improve service（服务质量） to customers, suppliers, partners, employees, etc

FAST - **F**ramework for the **A**pplication of **S**ystems **T**echniques

### Alternative Routes through a Methodology

- Model-Driven Development (MDD)（模型驱动开发）
- Rapid Application Development (RAD)（快速原型开发）
- Commercial Off-the-Shelf Software (COTS) （购置商业软件）
- Maintenance and Reengineering（维护与再工程）or hybrids of the above

### 开发环境
CASE - 电脑环境

ADE - IDE环境

## CH4

### 项目管理的8个阶段

Project Management Functions
 - Scoping      确定项目的边界
 - Planning     认定需要完成的任务
 - Estimating   评估所需资源
 - Scheduling   任务进度安排
 - Organizing   确保人员理解角色和职责
 - Directing    指挥项目组成员的活动
 - Controlling  控制项目开发过程
 - Closing      总结经验和教训

### gantt & pert

![图一]({{site.path}}/public/image/2025-05-27-System_Design_and_Analysis/gantt图.png "gantt图")

![图二]({{site.path}}/public/image/2025-05-27-System_Design_and_Analysis/PERT图.png "PERT图")

## CH5

| 阶段编号    | 阶段名称（英文）                  | 阶段名称（中文）     | 系统相关角色参与情况                                                         |
| ------- | ------------------------- | ------------ | ------------------------------------------------------------------ |
| Phase 1 | Preliminary Investigation | 初始调查阶段       | **系统所有者 & 用户：** 提出问题、机会、指令及项目需求；<br>**分析员：** 主导问题识别，制定项目范围和项目章程。   |
| Phase 2 | Problem Analysis          | 问题分析阶段       | **用户：** 提供现有系统的使用信息和问题反馈；<br>**分析员：** 调查数据、流程、接口，进行因果分析、设定改进目标。    |
| Phase 3 | Requirements Analysis     | 需求分析阶段       | **用户 & 所有者：** 确认并细化业务需求；<br>**分析员：** 建立逻辑模型、整理功能和非功能需求、优先级排序、更新计划。 |
| Phase 4 | Decision Analysis         | 角色分析（决策分析）阶段 | **所有角色（含设计者、建设者）：** 提出候选方案、参与可行性评估；<br>**分析员：** 撰写系统建议书、推荐最终解决方案。  |

## CH6

PIECES框架

Ishikawa diagram 鱼骨图
- The Ishikawa diagram is a graphical tool used to identify, explore, and depict problems and the causes and effects of those problems. It is often referred to as a cause-and-effect diagram or a fishbone diagram. 
- 石川图是一种图形工具，用于识别、探索和描绘问题及其原因和影响。它通常被称为因果图或鱼骨图。

![图三]({{site.path}}/public/image/2025-05-27-System_Design_and_Analysis/鱼骨图.png "鱼骨图")

### 需求发现方法

#### 1. **Sampling of Existing Documentation, Forms, and Databases（文档、表单与数据库抽样）**

##### 过程：

* 获取组织结构图、战略计划、政策手册、SOP、任务说明书；
* 收集相关报告、系统请求、用户投诉、绩效记录等；
* 查看旧系统设计文档、数据流图、数据库模型；
* 抽样策略包括**随机抽样**与**分层抽样**；
* 推荐样本量计算公式：
  `Sample Size = 0.25 × (Certainty factor / Acceptable error)^2`

##### 优点：

* 真实、客观，能发现系统中实际的问题；
* 文档来源丰富，易于获取；
* 有助于理解历史背景和演变过程。

##### 缺点：

* 可能过时或不准确；
* 无法反映隐性需求；
* 对初学者难以判断信息的价值。

---

#### 2. **Research and Site Visits（研究与实地考察）**

##### 过程：

* 调查其他公司或行业的成功案例；
* 实地走访相关现场，参考外部最佳实践。

##### 优点：

* 提供外部视角和创新灵感；
* 有利于技术或流程的对比分析。

##### 缺点：

* 花费较高，组织复杂；
* 可比性受限，外部案例不一定适用。

---

#### 3. **Observation of the Work Environment（工作环境观察）**

##### 过程：

* 现场观察用户操作（可为参与式或非参与式）；
* 可采用“Work Sampling”（随机时段观察）或“Living the System”（模拟用户）；
* 观察六要素：who, what, where, when, why, how；
* 避免干扰工作，保持低调，及时记录并确认观察结果。

##### 优点：

* 获取第一手资料，真实可信；
* 适合识别操作中的问题与瓶颈。

##### 缺点：

* 花费时间精力大；
* 用户可能因被观察而改变行为（霍桑效应）；
* 不适合了解复杂逻辑。

---

#### 4. **Questionnaires（问卷调查）**

##### 过程：

* 确定调查对象与问题类型（自由格式或固定格式）；
* 编写、测试、分发问卷；
* 收集并分析答案。

##### 优点：

* 成本低，适用于大范围人员；
* 匿名性强，便于收集真实意见；
* 便于统计分析。

##### 缺点：

* 回收率不高；
* 回答质量无法控制；
* 无法深入探究原因。

---

#### 5. **Interviews（面谈）**

##### 过程：

* 选择访谈对象；
* 设计面谈提纲，避免带有倾向性的问题；
* 进行结构化或非结构化访谈；
* 面谈后总结与确认信息。

##### 优点：

* 信息丰富，便于深入了解；
* 可感知非语言信息，如肢体语言与态度。

##### 缺点：

* 花费时间多；
* 可能产生偏见或误导；
* 需要较高的交流与倾听技巧。

---

#### 6. **Prototyping（原型开发）**

##### 过程：

* 快速构建一个功能性原型；
* 让用户“看见”系统，并基于此进行反馈；
* 不断迭代改进。

##### 优点：

* 需求明确性大幅提升；
* 能及时发现误解与遗漏；
* 提高用户参与感与接受度。

##### 缺点：

* 可能过于聚焦界面而忽视后端逻辑；
* 容易被误认为“半成品系统”；
* 过度依赖可能导致计划失控。

---

#### 7. **Joint Requirements Planning (JRP)（联合需求规划）**

##### 过程：

* 召集系统所有者、用户、分析师、设计师等召开JRP会议；
* 设置议程、选择参与人、布置会场；
* 采用结构化会议方式、脑力激荡（brainstorming）等；
* 鼓励集体共识、记录会议结果。

##### 优点：

* 提高用户参与度与项目认同感；
* 大幅度减少开发周期；
* 效率高、决策快，易整合多方意见。

##### 缺点：

* 策划成本高，对主持人和协作氛围要求高；
* 难以控制某些参与者主导话语权；
* 需要良好时间管理与会议纪律。

#### High level usecase
Example of a High-Level Use Case

Author: S. Shepard

Date: 03/01/2000

|||
|-|-|
|Use Case Name:| New Member Order|
|Actors: |Member|
|Description: |This use case describes the process of a member submitting an order for SoundStage products. On completion, the member will be sent a notification that the order was accepted.|

#### Requirements Use Case

![图四]({{site.path}}/public/image/2025-05-27-System_Design_and_Analysis/RequirementsUseCase.png "Requirements Use Case")


#### Use case Diagram

- Relating use cases:
  -  Use cases can be organized and related to simplify their descriptions.
  - Three associations are:
    - Includes.
    - Extends.
    - Generalization-specialization.

| 关系类型          | 含义               | 是否必须执行 | 常用于     | 示例                     |
| ------------- | ---------------- | ------ | ------- | ---------------------- |
| `<<include>>` | 抽取公共用例，被调用用例必须执行 | ✅ 是    | 公共逻辑复用  | 下订单 <<include>> 验证用户身份 |
| `<<extend>>`  | 条件扩展主用例行为        | ❌ 否    | 可选/异常流程 | 取款 <<extend>> 打印凭证     |
| 泛化/特化         | 继承父用例或参与者的行为     | ✅ 是    | 类别/层级关系 | 学生借书 → 借书；VIP用户 → 用户   |

## CH7
E-R图

![图五]({{site.path}}/public/image/2025-05-27-System_Design_and_Analysis/E-R图-边.png "E-R图-边")

![图六]({{site.path}}/public/image/2025-05-27-System_Design_and_Analysis/E-R图-关联实体.png "E-R图-关联实体")

![图七]({{site.path}}/public/image/2025-05-27-System_Design_and_Analysis/E-R图-外键.png "E-R图-外键")


A Ternary Relationship

Notations for Weak Entity and Nonidentiiying Relationship 

Resolving Nonspecific Relationships with an Associative Entity

## CH8
(Context)  Data  Flow  Diagram

Functional  Decomposition  Diagram

### CIOD矩阵

在**数据流图（DFD, Data Flow Diagram）**建模中，**CIOD 矩阵** 是一种用于系统分析阶段的**辅助工具**，全称为：

> **CIOD Matrix = Create - Input - Output - Delete Matrix**

---

#### CIOD 矩阵是什么？

CIOD 矩阵是一种 **交叉矩阵（Cross Reference Matrix）**，用于显示：

* **数据存储（Data Stores）** 与
* **加工过程（Processes）**

之间的四种操作关系：

| 字母    | 英文     | 中文含义 | 说明               |
| ----- | ------ | ---- | ---------------- |
| **C** | Create | 创建数据 | 第一次写入或建立数据       |
| **I** | Input  | 读取数据 | 从数据存储中读取         |
| **O** | Output | 更新数据 | 将结果写入数据存储（通常是修改） |
| **D** | Delete | 删除数据 | 从数据存储中删除         |

---

#### CIOD 矩阵长什么样？

它是一个二维表格，**行表示加工（Process）**，**列表示数据存储（Data Store）**：

|           | Data Store A | Data Store B | Data Store C |
| --------- | ------------ | ------------ | ------------ |
| Process 1 | C            | I            |              |
| Process 2 |              | O            | D            |
| Process 3 | I            |              |              |


在一个图书借阅系统中，有如下数据存储：

* DS1 = 图书表（Books）
* DS2 = 借阅记录表（Loans）

|          | Books (DS1) | Loans (DS2) |
| -------- | ----------- | ----------- |
| P1: 添加图书 | C           |             |
| P2: 查询图书 | I           |             |
| P3: 借出图书 | I/O         | C           |
| P4: 还书   |             | D           |
| P5: 删除图书|D            |这里必须要D|

说明：

* 图书是在 Process 1 中**被创建**；
* 被借出时，图书数量被修改（I/O），借阅记录被创建（C）；
* 还书时，借阅记录被删除（D）；
* 删除图书时需将借阅记录一同删除



## CH9

可行性分析

Six Tests For Feasibility

- Operational feasibility is a measure of how well the solution will work in the organization. It is also a measure of how people feel about the system/project.
- Technical feasibility is a measure of the practicality of a specific technical solution and the availability of technical resources and expertise. 
- Schedule feasibility is a measure of how reasonable the project timetable is.
- Economic feasibility is a measure of the cost-effectiveness of a project or solution.
- Cultural (or political) feasibility.
- Legal feasibility.


- 运营可行性是衡量解决方案在组织中的效果的指标。它也是衡量人们对系统/项目感受的指标。
- 技术可行性是衡量特定技术解决方案的实用性以及技术资源和专业知识的可用性的指标。
- 进度可行性是衡量项目时间表合理程度的指标。
- 经济可行性是衡量项目或解决方案成本效益的指标。
- 文化（或政治）可行性。
- 法律可行性。

### Cost Benefit Analysis Techniques 

| 名称               | 中文名称  | 是否考虑时间价值 | 表示内容          | 优点              | 缺点                |
| ---------------- | ----- | -------- | ------------- | --------------- | ----------------- |
| Payback Analysis | 偿还分析  | ❌ 否      | 回本所需的时间       | 简单明了，适合初步风险评估   | 忽略回本后的利润，不考虑时间价值  |
| Return On Investment/ROI              | 投资回报率 | ❌ 否      | 利润与投资的百分比     | 易于比较项目收益率       | 无法评估时间因素，可能夸大利润表现 |
| Net Present Value/NPV              | 净现值   | ✅ 是      | 所有未来收益折现后的净收益 | 精准科学，最具财务决策参考价值 | 需要准确预测现金流和设定折现率   |

### 系统建议书？

## CH10
设计阶段概论

## CH11
物理DFD

## CH12
数据库设计

E-R -> 数据库Schema

外键or关联实体

3NF

完整性设计-参照完整性

## Ch13 Ch14 Ch15

三种输出
输出设计

输入输出 GUI
设计的原则是什么

GUI人机工程学

页面状态迁移图

## Module A
“**OOA**” 和 “**OOD**” 是软件工程中两个密切相关但阶段不同的概念，分别代表：

---

### 1. **OOA – Object-Oriented Analysis（面向对象分析）**

> 面向对象分析是一种**需求分析**技术，用于识别系统中的**对象（Object）**、它们的**属性（Attribute）**、\*\*行为（Method）\*\*以及对象之间的关系，以便深入理解业务问题。

#### 目标：

* 不涉及代码实现；
* 专注于\*\*“系统需要做什么”\*\*；
* 把现实世界的业务问题映射为面向对象的模型。

| 模型/图                             | 说明                      |
| -------------------------------- | ----------------------- |
| **用例图（Use Case Diagram）**        | 表达用户如何与系统交互             |
| **用例描述（Use Case Description）**   | 每个用例的详细过程               |
| **分析类图（Analysis Class Diagram）** | 识别潜在的实体类、控制类和边界类        |
| **概念模型（Conceptual Model）**       | 只定义对象之间的业务关系和结构，不涉及程序细节 |

#### 举例（图书馆系统）：

在 OOA 阶段我们会识别出：

* 实体类：图书（Book）、借阅记录（Loan）、读者（User）；
* 行为：图书可以被借出、归还；
* 关系：一个读者可以借多本书 → User 1..\* Loan

---

### 2. **OOD – Object-Oriented Design（面向对象设计）**

> 面向对象设计是在分析基础上，进一步考虑**系统如何实现**，设计出可以直接映射为代码的对象结构、类接口、继承关系等。

#### 目标：

* 关注“**系统怎么做**”；
* 设计出高内聚低耦合的系统结构；
* 为编码提供详细蓝图。

| 图                              | 说明                               |
| ------------------------------ | -------------------------------- |
| **设计类图（Design Class Diagram）** | 详细列出类的属性、方法、可见性（public/private）等 |
| **顺序图（Sequence Diagram）**      | 展示对象之间的调用流程                      |
| **状态图（State Machine Diagram）** | 对象在不同状态下的行为                      |
| **部署图（Deployment Diagram）**    | 系统在硬件上的部署结构                      |
| **包图（Package Diagram）**        | 模块之间的依赖结构                        |

#### 举例（延续上例）：

OOD 阶段我们会具体设计：

```java
class Book {
    String title;
    boolean isAvailable;
    
    void checkout(User user);
    void returnBook();
}
```

* 明确了方法名、访问修饰符；
* 设计类的接口、关系、可能的抽象基类；
* 定义控制器类如 `LoanManager` 来处理借书流程。

---

### 对比总结表

| 对比项      | OOA（面向对象分析）                               | OOD（面向对象设计）                                   |
| -------- | ----------------------------------------- | --------------------------------------------- |
| 阶段       | 分析阶段（理解问题）                                | 设计阶段（制定方案）                                    |
| 关注点      | 业务对象、用户需求、行为建模                            | 类结构、接口设计、模块划分、系统实现细节                          |
| 输出成果     | 用例图、概念类图、用例描述                             | 设计类图、顺序图、包图、状态图等                              |
| 是否考虑实现细节 | ❌ 不考虑                                     | ✅ 详细考虑                                        |
| 面向谁      | 需求分析师、系统分析师                               | 软件架构师、程序员                                     |
| 示例关键词    | Actor、Use Case、Association、Generalization | Class、Interface、Method、Visibility、Inheritance |

---

## ✅ 最后小结

* **OOA：做“需求建模”** —— 系统需要什么功能，涉及哪些对象（**what**）；
* **OOD：做“实现建模”** —— 系统应该怎么实现，类如何组织和交互（**how**）；

二者之间是一种 **自上而下的过渡关系**，OOA 是桥梁，OOD 是工程蓝图，最终交付编码者实现。

---

如你有具体系统（比如图书管理、点餐系统等），我可以帮你从 OOA 到 OOD 画出一个完整流程图，是否需要？
