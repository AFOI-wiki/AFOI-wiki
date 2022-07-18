**by 木xx木大**

# 组合计数

## （一）基本计数原理

### 加法原理：

设集合 $S$ 被划分成两两不相交的部分 $S_1,S_2,\dots S_m$。则 $S$ 的对象数目可以通过确定它的每一个部分的对象数目并相加得到 ，即 $|S|=|S_1|+|S_2|+\dots+|S_m|$

### 乘法原理

设 $S$ 为有序对 $(a,b)$ 的集合，其中 $a$ 来自一个大小为 $p$ 的集合，而对于每个 $a$，$b$ 有 $q$ 种选择，则 $|S|=p\times q$ 。
实际上，乘法原理是加法原理的推论。		

### 减法原理：

设 $U$ 为全集，$S$ 是 $U$ 的子集，则 $S$ 中的对象数目 $|S|=|U|-|\complement_US|$。
利用这一原理，我们可以用正难则反的思想解决问题。

## （二）二项式系数

考虑 $(1+x)^n$ 的展开，可以看作有 $n$ 个物品，选这个物品看作 $\times x$，则选 $m$ 个物品的方案数就对应最终的 $m$ 次项系数，因此 ${n\choose m}=[x^m](1+x)^n$，这个结论被成为**二项式定理**，因此组合数也被称为**二项式系数**。

二项式定理也可表述为 $\displaystyle(x+y)^n=\sum_{i=0}^n{n\choose i}x^{n-i}y^i$

### 常用恒等式

* 对称恒等式：$\displaystyle{n\choose m}={n\choose n-m}$

* 吸收/提取恒等式：$\displaystyle{n\choose m}=\frac{n}{m}{n-1\choose m-1}$

* 加法/归纳恒等式 ：$\displaystyle{n\choose m}={n-1\choose m-1}+{n-1\choose m}$ 

  组合意义：考虑枚举最后一个物品选不选

* 上指标求和： $\displaystyle\sum_{i=m}^{n} {i\choose m}={n+1\choose m+1}$

  组合意义：枚举从 $n+1$ 个物品里选 $m+1$ 个物品的最后一个物品

* 对角线求和：$\displaystyle\sum_{i=0}^m{n+i\choose i}={n+m+1\choose m}$

* $\displaystyle{n\choose k}{k\choose m}={n\choose m}{n-m\choose k-m}={n\choose k-m}{n-k+m\choose m}\qquad(m\le k\le n)$

  组合意义：从 $n$ 个物品里选 $k$ 个，再从这 $k$ 个里面选 $m$ 个，相当于直接从 $n$ 个里面选 $m$ 个，再从剩下的 $n-m$ 个里面选 $k-m$ 个

* 二项式定理的推论：$\displaystyle(1-1)^n=\sum_{i=0}^n(-1)^i{n\choose i}=0(n\geq 1)\quad(1+1)^n=\sum_{i=0}^n{n\choose i}=2^n$

  由以上两式可得 $\displaystyle{n\choose 1}+{n\choose 3}+{n\choose 5}+\dots={n\choose 0}+{n\choose 2}+{n\choose 4}+\dots=2^{n-1}(n\ge 1)$

* 范德蒙德卷积：$\displaystyle\sum_{i=0}^k{n\choose i}{m\choose k-i}={n+m\choose k}$

  组合意义：从数量为 $n$ 和 $m$ 的两堆物品中一共取 $k$ 个物品。

  用二项式定理解释其本质：$\displaystyle(1+x)^n(1+x)^m=(1+x)^{n+m}$

### 广义二项式定理

将二项式系数的上指标扩展到实数域上，就得到了**广义二项式系数** $\displaystyle{a\choose k}=\frac{a(a-1)\dots(a-k+1)}{k!}$

相对应地，有广义二项式定理： $\displaystyle(x+y)^a=\sum_{k=0}^{\infty}{a\choose k}x^ky^{a-k}$
常用推论：$\displaystyle(1+x)^{-n}=\sum_{k=0}^{\infty}(-1)^k{n+k-1\choose k}x^k\qquad(1-x)^{-n}=\sum_{k=0}^{\infty}{n+k-1\choose k}x^k$

> 证明： 
> $$ \begin{aligned}(1+x)^{-n}&=\sum_{k=0}^{\infty}{-n\choose k}x^k\\&=\sum_{k=0}^{\infty}\frac{(-n)(-n-1)\dots(-n-k+1)}{k!}x^k\\&=\sum_{k=0}^{\infty}(-1)^k\frac{n(n-1)\dots(n+k-1)}{k!}x^k\\&=\sum_{k=0}^{\infty}(-1)^k{n+k-1\choose k}x^k\end{aligned}$$

## （三）容斥原理

给定 $n$ 个集合 $\{S_1\dots S_n\}$，如果我们可以方便地算出它们其中一些交集的大小，则可以推出它们并集的大小
$$
\begin{aligned}			\left|\bigcup_{i=1}^nS_i\right|=\sum_{T\subseteq[n]}^n(-1)^{|T|+1}\left|\bigcap_{i\in T}S_{i}\right|
\end{aligned}
$$
其中 $[n]=\{1,2\dots n\}$。这个式子的含义是：集合的并的大小可以通过枚举每一个子集，将子集内的集合求交并乘上 $-1$ 的子集大小加 1 次方求和得到。

证明：$\sum_{i=1}^n(-1)^{i+1}{n\choose i}=(-1)\sum_{i=0}^n(-1)^{i}{n\choose i}-(-1){n\choose 0}=(-1)(1-1)^n+1=1$

容斥原理的另一种表述形式为（其实就是将上式取补集）
$$
\begin{aligned}         \left|\overline{\bigcup_{i=1}^nS_i}\right|=\sum_{T\subset[n]}^n(-1)^{|T|}\left|\bigcap_{i\in T}S_{i}\right|\end{aligned}
$$
其中当 $T=\varnothing$ 时后面部分定义为全集大小。

直观地理解，$n$ 件事至少有一件发生/均不发生的方案数可以通过其中每个子集同时发生的方案数计算。

### 子集反演

对于两个集合的函数 $f(S),g(S)$，若$f(S)=\sum_{T\subseteq S} g(T)$，则$g(S)=\sum_{T\subseteq S}(-1)^{|S|-|T|}f(T)$

对于两个集合的函数 $f(S),g(S)$，若$f(S)=\sum_{S\subseteq T} g(T)$，则$g(S)=\sum_{S\subseteq T}(-1)^{|T|-|S|}f(T)$

### 二项式反演

设 $f(n)$ 表示至多满足 $n$ 个性质的方案数，$g(n)$ 表示恰好满足 $n$ 个性质的方案数，则有
$$
f(n)=\sum_{i=0}^n{n\choose i}g(i)\Rightarrow g(n)=\sum_{i=0}^n(-1)^{n-i}{n\choose i}f(i)
$$
设 $f(n)$ 表示至少（钦定）满足 $n$ 个性质的方案数，$g(n)$ 表示恰好满足 $n$ 个性质的方案数，则有
$$
f(n)=\sum_{i=n}^m{i\choose n}g(i)\Rightarrow g(n)=\sum_{i=n}^m(-1)^{i-n}{i\choose n}f(i)
$$
根据上面两个式子，我们容易在 $O(n^2)$ 或 $O(n\log n)$ 的复杂度内完成 $f,g$ 的转化。容易发现，这两个式子和子集反演的本质是一样的。

#### 经典应用：错排问题

设 $D_n$ 表示恰好有 $i$ 个数不在自己位置上的方案数。则有 $n!=\sum_{i=0}^n{n\choose i}D_i$，套用二项式反演的第一个式子得到 $D_n=\sum_{i=0}^n(-1)^{n-i}{n\choose i}i!=n!\sum_{i=0}^n\frac{(-1)^{n-i}}{(n-i)!}=\sum_{i=0}^n\frac{(-1)^{i}}{i!}$

##### 例题：

[P4491 [HAOI2018]染色](https://www.luogu.com.cn/problem/P4491)

设 $g(i)$ 表示**恰好**有 $i$ 种元素出现了 $S$ 次的方案数，$f(i)$ 表示**钦定至少**有 $i$ 种元素出现了 $S$ 次的方案数。则 $f(i)={m\choose i}{n\choose iS}\frac{iS!}{(S!)^i}(n-iS)^{m-k}$，二项式反演一下得到 $g(n)=\sum_{i=n}^{lim}(-1)^{i-n}{i\choose n}f(i)$，其中 $lim$ 为可能出现的元素种类数，即 $lim=\min(m,n/S)$。二项式反演的式子是一个差卷积的形式，$\text{NTT}$ 优化即可。

[题解 CF997C Sky Full of Stars](https://www.luogu.com.cn/blog/flyingfan/cf997c-sky-full-of-stars-zu-ge-shuo-xue-post)

[题解 P6478 [NOI Online #2 提高组]游戏](https://www.luogu.com.cn/blog/flyingfan/p6478-noi-online-2-ti-gao-zu-you-hu-shu-dp-guang-yi-rong-chi-post)

[题解 P3270 [JLOI2016]成绩比较](https://www.luogu.com.cn/blog/flyingfan/solution-p3270)

### Min-max 容斥

$$
\max S=\sum_{T\subseteq S}(-1)^{|T|-1}\min T\\
\min S=\sum_{T\subseteq}(-1)^{|T|-1}\max T
$$

> 证明：
>
> 设 $A_k$ 表示 $S$ 中第 $k$ 大的元素，当 $\min T=A_k$ 时
>
> * $k=1$ ，则 $T=\{A_1\}$，贡献为 $(-1)^0A_1=\max S$
> * $k>1$，符合要求的 $T$ 共有 $2^{k-1}$ 种，且这些选法中 $|T|$ 为奇数的占一半，贡献为 $A_k$，$|T|$ 为偶数的占一半，贡献为 $-A_k$，刚好抵消为 0

#### 例题：

[P3175 [HAOI2015]按位或](https://www.luogu.com.cn/problem/P3175)

[题解 P5643 [PKUWC2018]随机游走](https://www.luogu.com.cn/blog/flyingfan/p5643-pkuwc2018-sui-ji-you-zou-min-max-rong-chi-ji-wang-dp-gao-wei-qi)

#### 扩展 Min-max 容斥

$$
Kth\max{S}=\sum_{T\subseteq S}(-1)^{|T|-K}{|T|-1\choose K-1}\min T\\
Kth\min{S}=\sum_{T\subseteq S}(-1)^{|T|-K}{|T|-1\choose K-1}\max T\\
$$

> 证明：
>
> 我们可以套用一般 Min−max 容斥的式子猜想 k 大值容斥的形式：
> $$ Kth\max{S}=\sum_{T\subseteq S}f(|T|)\min T$$
> 对于第 $x+1$ 大的元素 $A_{x+1}$，只有仅包含它和比它大的元素的集合 $T$ 才满足 $\min T=A_{x+1}$，这样的集合 $T$ 共有 $\sum_{i=0}^x{x\choose i}$ 个，它的贡献系数为 $\sum_{i=0}^x{x\choose i}f(i+1)$。
>
> 令 $[x+1=k]=\sum_{i=0}^x{x\choose i}f(i+1)$，二项式反演得到 $f(x+1)=\sum_{i=0}^x(-1)^{x-i}{x\choose i}[i+1=k]=(-1)^{x-k+1}{x\choose k-1}$，即$f(x)=(-1)^{x-k}{x-1\choose k-1}$

##### 例题：

[题解 P4707 重返现世](https://www.luogu.com.cn/blog/flyingfan/p4707-zhong-fan-xian-shi-kuo-zhan-min-max-rong-chi-post)

### 综合练习

[题解 P5400 [CTS2019]随机立方体](https://www.luogu.com.cn/blog/flyingfan/p5400-cts2019-sui-ji-li-fang-ti-zu-ge-rong-chi-post)

[题解 P5405 [CTS2019]氪金手游](https://www.luogu.com.cn/blog/flyingfan/p5405-cts2019-ke-jin-shou-you-rong-chi-shu-dp-gai-shuai-post)

[题解 P5644 [PKUWC2018]猎人杀](https://www.luogu.com.cn/blog/flyingfan/p5644-pkuwc2018-lie-ren-sha-gai-shuai-rong-chi-sheng-cheng-han-shuo)

[P5417 [CTSC2016]萨菲克斯·阿瑞](https://www.luogu.com.cn/problem/P5417)（终极挑战！极其巧妙的映射转化！）

## （四）特殊数和简单生成函数

### 卡特兰数

#### 组合意义:

* 对角线不相交的情况下，将一个凸多边形区域分成三角形区域的方法数
* $n$ 个不同的数依次进栈，不同的出栈结果的种数
* $n$ 个节点的二叉树数量
* 从 $(0,0)$ 到 $(n,n)$ 的除端点外不穿过直线 $y=x$ 的非降路径数
* $n$ 对括号的合法序列数
* ……

对于这些问题，我们容易得到一个暴力的递推式 $\displaystyle h_0=1,\quad h_n=\sum_{i=0}^{n-1}h_ih_{n-i-1}(n\ge 1)$
但通常情况下，我们需要一个更优秀的式子，下面介绍几种推通项的方法。

* $\text{Raney}$ 引理

  **若 $A=\{A_i,i=1,2,...,m\}$ 是任意一个和为 1 的整数序列，则其所有循环位移中有且仅有一个满足所有前缀和都是正数。**

  >证明：
  >
  >每次必须取最后一个 前缀和的最小值 的后一位作为起点，使得其他最小值位置跨过序列结尾，前缀和为 1；否则如果有两个相等最小值而取前一个作为起点，第二个最小值位置前缀和是 0。

  据此，假设 $m$ 个数之和为 1，那么满足所有前缀和为正数的排列的数量即其圆排列的数量 $(m-1)!$，因为每个圆排列（环）都只有一个链满足条件。设进栈为 1，出栈为 -1，问题转化为求有多少种由 $n$ 个 1 和 $n$ 个 -1 组成的序列满足任意前缀和 $\le 0$ 

  设进栈为 1，出栈为 -1，问题转化为求有多少种由 $n$ 个 1 和 $n$ 个 -1 组成的序列满足任意前缀和 $\ge 0$ 。在序列最前面放一个 1 ，就可以应用 Raney 引理了。这样的圆排列数为$\dfrac{{2n+1\choose n}}{2n+1}$。根据 Raney 引理，在一个循环同构的等价类中，只有一个串满足任意前缀和大于零，所以圆排列数即合法的排列数。因为第一位只能是 1 ，所以除去第一位后剩下部分的方案数也为 $\dfrac{{2n+1\choose n}}{2n+1}=\dfrac{{2n\choose n}}{n+1}={2n\choose n}-{2n\choose n-1}$

  用类似方法做的例题：[题解 P6672 [清华集训2016] 你的生命已如风中残烛](https://www.luogu.com.cn/blog/flyingfan/solution-p6672)

* 翻折法

  如果不考虑直线 $y=x$ 的限制，则从 $(0,0)$ 走到 $(n,n)$ 的方案数为 ${2n\choose n}$。

  任意一种非法方案都至少经过一个 $y=x+1$ 的点 $p$ ，那么我们将这条路径 $p$ 点以后的部分全部关于直线 $y=x+1$ 对称，则任意一条非法路径都对应一条从 $(0,0)$ 到 $(n-1,n+1)$ 的路径。非法路径的条数为 ${2n\choose n-1}$，则合法路径的条数为 ${2n\choose n}-{2n\choose n-1}$

  用到类似方法做的例题：[题解 P3266 [JLOI2015]骗我呢](https://www.luogu.com.cn/blog/flyingfan/p3266-jloi2015-pian-wo-ni-zu-ge-rong-chi-post)，[AT2705 [AGC019F] Yes or No](https://www.luogu.com.cn/problem/AT2705)

* 生成函数

  设卡特数数列为 $h_1\dots h_n$，其生成函数为 

$$
  g(x)=1+h_1x+h_2x^2\dots h_nx^n\dots
$$

  其暴力递推形式非常像卷积，令 $g$ 自卷
$$
  \begin{aligned}
&(g(x))^2=1+(h_0h_1+h_1h_0)x+(h_0h_2+h_1h_1+h_2h_0)x^2\dots\\
&xg(x)^2=x+(h_0h_1+h_1h_0)x^2+(h_0h_2+h_1h_1+h_2h_0)x^3\dots=g(x)-1\\
&x(g(x))^2-g(x)+1=0\\
&g(x)=\frac{1\pm\sqrt{1-4x}}{2x}
\end{aligned}
$$
   将 $g(0)=1$ 代入，通过洛必达法则得
$$
  g(x)=\frac{1-\sqrt{1-4x}}{2x}
$$
  用广义二项式定理展开得
$$
  \begin{aligned}
  \sqrt{1-4x}=&\sum_{k=0}^{\infty}\frac{\frac{1}{2}(\frac{1}{2}-1)\dots(\frac{1}{2}-k+1)}{k!}(-1)^k4^kx^k\\
  =&1+\sum_{k=1}^{\infty}\frac{(-1)^{k-1}}{2^k}\frac{(2k-2)！}{2\times 4\times\dots\times(2k-2) k!}(-1)^k4^kx^k\\
  =&1+\sum_{k=1}^{\infty}\frac{(-1)^{k-1}}{2^{2k-1}k}\frac{(2k-2)！}{((k-1)!)^2}(-1)^k4^kx^k\\
  =&1+\sum_{k=1}^{\infty}\frac{(-2)}{k}{2k-2\choose k-1}x^k\\
  =&1-2\sum_{k=1}^{\infty}\frac{1}{k}{2k-2\choose k-1}x^k\\
  g(x)=\frac{1-\sqrt{1-4x}}{2x}
  &=\sum_{k=1}^{\infty}\frac{1}{k}{2k-2\choose k-1}x^{k-1}=\sum_{k=0}^{\infty}\frac{1}{k+1}{2k\choose k}x^{k}\\
  \end{aligned}
$$
  与上面用组合意义推出来的结果是一样的。

### 斯特林数

#### 第一类斯特林数

定义**第一类斯特林数 $\displaystyle{n\brack m}$** 为$n$ 个元素分成 $m$ 个圆排列的方案数。
			
递推公式：${n\brack m}={n-1\brack m-1}+{n-1\brack m}(n-1)$，组合意义即考虑新加入的元素单独成环或插入某个已有的环。

##### 生成函数

对 $m=1$ 的情况构造指数型生成函数
$$
S(x)=\sum_{i=0}(i-1)!\frac{x^i}{i!}=\sum_{i=0}\frac{x^i}{i}=-\ln(1-x)
$$
那么对于 $m$ 为任意值的情况指数型生成函数即为
$$
\frac{S(x)^m}{m!}=\frac{(-\ln(1-x))^m}{m!}
$$
模板题：[P5409 第一类斯特林数·列](https://www.luogu.com.cn/problem/P5409)

#### 第二类斯特林数

定义**第二类斯特林数 $\displaystyle {n\brace m}$** 为$n$ 个元素分成 $m$ 个无序集合的方案数。
			
递推公式：${n\brace m}={n-1\brace m-1}+{n-1\brace m}m$，组合意义即考虑新加入的元素单独成一个集合或插入某个已有的集合。

##### 生成函数

对 $m=1$ 的情况构造指数型生成函数
$$
S(x)=\sum_{i=0}[i\ne 0]\frac{x^i}{i!}=e^x-1
$$
那么对于 $m$ 为任意值的情况指数型生成函数即为
$$
\frac{S(x)^m}{m!}=\frac{(e^x-1))^k}{k!}
$$
模板题：[P5396 第二类斯特林数·列](https://www.luogu.com.cn/problem/P5396)

#### 斯特林数与阶乘幂：

定义**上升幂** $n^{\overline{m}}=\prod\limits_{i=n}^{n+m-1}$，定义**下降幂** $n^{\underline{m}}=\prod\limits_{i=n-m+1}^n$

上升幂和下降幂可以互相转化：$\displaystyle n^{\overline{m}}=(-1)^m(-n)^{\underline{m}},\quad n^{\underline{m}}=(-1)^m(-n)^{\overline{m}}$

* $\displaystyle m^n=\sum_{i=0}^n{n\brace i}m^{\underline i}$

  组合意义：$m^n$ 即把 $n$ 个物品放入 $m$ 个有序集合中，允许存在空集的方案数。相当于先从 $m$ 个集合中选出 $i$ 个非空的，乘上 ${m\choose i}$；再把物品放进去，乘上 $n\brace i$；集合有序，再乘 $i!$

  推论：$\displaystyle\sum_{i=0}^ni^k=\sum_{j=0}^k{k\brace j}{n+1\choose j+1}j!\quad(0^0=1)$，推导如下

$$
\begin{aligned}
  \sum_{i=0}^ni^k&=\sum_{i=0}^n\sum_{j=0}^k{k\brace j}{i\choose j}j!\\
  &=\sum_{j=0}^k{k\brace j}j!\sum_{i=j}^n{i\choose j}\\
  &=\sum_{j=0}^k{k\brace j}{n+1\choose j+1}j!
  \end{aligned}
$$

  最后一步套用了上指标求和公式。这个式子常被用来解决自然数幂和问题。

  例题：

  [P4827 [国家集训队] Crash 的文明世界](https://www.luogu.com.cn/problem/P4827)

  [P4091 [HEOI2016/TJOI2016]求和](https://www.luogu.com.cn/problem/P4091)

  [P6620 [省选联考 2020 A 卷] 组合数问题](https://www.luogu.com.cn/problem/P6620)

  [题解 CF1097G Vladislav and a Great Legend](https://www.luogu.com.cn/blog/flyingfan/cf1097g-vladislav-and-a-great-legend-si-te-lin-shuo-dp) 

  [题解 CF932E Team Work](https://www.luogu.com.cn/blog/flyingfan/cf932e-team-work-si-te-lin-shuo-tui-shi-zi-post)

  [题解 CF1278F Cards](https://www.luogu.com.cn/blog/flyingfan/cf1278f-cards-ji-wang-si-te-lin-shuo-post)

  [题解 CF961G Partitions](https://www.luogu.com.cn/blog/flyingfan/solution-cf961g)

* $\displaystyle {n\brace m}=\sum_{i=0}^m\frac{(-1)^{m-i}i^n}{(m-i)!i!} $，对上面的式子二项式反演一下即可得到。可用来算 [P5395 第二类斯特林数·行](https://www.luogu.com.cn/problem/P5395)

* $\displaystyle x^{\overline{n}}=\sum_{i=1}^n{n\brack i}x^i\qquad x^{\underline{n}}=\sum_{i=1}^n{n\brack i}(-1)^{n-i}x^i$

#### 斯特林反演

$$
\begin{aligned}
			F(n)=\sum\limits_{i=0}^n{n\brace i}G(i)\quad\Longleftrightarrow\quad G(n)=\sum\limits_{i=0}^n(-1)^{n-i}{n\brack i}F(i)\\
			F(n)=\sum\limits_{i=0}^n(-1)^{n-i}{n\brace i}G(i)\quad\Longleftrightarrow\quad G(n)=\sum\limits_{i=0}^n{n\brack i}F(i)\\
			F(n)=\sum\limits_{i=n}{i\brace n}G(i)\quad\Longleftrightarrow\quad G(n)=\sum\limits_{i=n}(-1)^{i-n}{i\brack n}F(i)\\
			F(n)=\sum\limits_{i=n}(-1)^{i-n}{i\brace n}G(i)\quad\Longleftrightarrow\quad G(n)=\sum\limits_{i=n}{i\brack n}F(i)\\
		\end{aligned}
$$

>证明：
>
>设 $F,G$ 的 EGF 为 $F(x),G(x)$，则有
>$$\begin{aligned}F(x)=&\sum_{k=0}\frac{F[k]x^k}{k!}\\=&\sum_{k=0}\frac{x^k}{k!}\sum_{i=0}{k\brace i}G[i]\\=&\sum_{i=0}G[i]\sum_{k=0}\frac{x^k}{k!}{k\brace i}\\=&\sum_{i=0}G[i]\frac{(e^x-1)^i}{i!}\\=&G(e^x-1)\end{aligned}$$
>代换一下得 $F(\ln(1+x))=G(x)$，展开得
>$$\begin{aligned}
>F(\ln(1+x))=&\sum_{k=0}F[k]\frac{(\ln(x+1))^k}{k!}\\=&\sum_{k=0}F[k]\frac{(-1)^k(-(\ln(1-(-x))))^k}{k!}\\=&\sum_{k=0}F[k](-1)^k\sum_{i=0}{k\brack i}\frac{(-x)^i}{i!}\\=&\sum_{i=0}\frac{x^i}{i!}\sum_{k=0}(-1)^{k-i}{k\brack i}F[k]\end{aligned}$$
>
> 比较一下系数即得 $G[n]=\sum_{i=0}(-1)^{n-i}{n\brack i}F[i]$

### 贝尔数

设 $B_n$ 表示把 $n$ 个元素划分到任意个无序非空集合的方案数。

通项：枚举划分出的集合的个数，得到 $B_n=\sum_{i=1}^n{n\brace i}$		

递推公式：考虑从原来的 $n$ 个元素中选 $i$ 个和第 $n+1$ 个元素分到一个集合，得到$B_{n+1}=\sum_{i=0}^n{n\choose i}B_{n-i}$	

生成函数：生成单个集合的 EGF 为 $e^x-1$，那么贝尔数的 EGF 即为 $\exp(e^x-1)$	

模板题：[P5748 集合划分计数](https://www.luogu.com.cn/problem/P5748)

### 分拆数

~~分拆数有四种求法，你知道吗？~~

定义： 记 $P_n$ 为将 $n$ 拆分成若干无序正整数的和的方案数。	

模板题：loj 6268。$n\le 10^5$，答案对 998244353 取模。

例题：[P6189 [NOI Online #1 入门组] 跑步](https://www.luogu.com.cn/problem/P6189)（其实也是模板啦）


#### 方法一		

这个问题非常像完全背包。但 $O(n^2)$ 过不去。考虑根号分治：

* 对于小于 $\sqrt n$ 的数，暴力完全背包。

* 对于大于 $\sqrt n$ 的数，设 $g_{i,j}$ 表示用了 $i$ 个 $>m$ 的数，和为 $j$ 的方案数，dp 一下，转移为 $g_{i,j}=g_{i-1,j-m}+g_{i,j-i}$。前者表示加入一个 $m$ ，后者表示将现在的序列整体+1。

  容易发现第一维大小只有 $\sqrt n$ 级别。

* 把两部分卷起来即可。



#### 方法二

类似付公主的背包的做法。分拆数的 OGF 为
$$
			P(x)=\prod_{k=1}\sum_{i=0}x^{ik}=\prod_{k=1}\frac{1}{1-x^k}=\exp\sum_{k=1}\ln\frac{1}{1-x^k}=\exp\sum_{k=1}\sum_{i=1}\frac{x^{ik}}{i}
$$

后面的求和可以 $O(n\log n)$ 计算。具体见[P4389 付公主的背包 题解](https://www.luogu.com.cn/blog/flyingfan/p4389-fu-gong-zhu-di-bei-bao-sheng-cheng-han-shuo-duo-xiang-shi-post)



#### 方法三

##### 前置知识：五边形数

五边形数是能排成五边形的多边形数。

 ![img](https://cdn.luogu.com.cn/upload/image_hosting/8twzhkih.png?x-oss-process=image/resize,m_lfit,h_420,w_625) 

如图，前几项为 $1,5,12,22\dots$，其通项公式为 $\frac{3n^2-n}{2}$

广义五边形数： $n$ 可以取负数，其通项公式为$\frac{3n^2\mp n}{2}$

##### 五边形数定理

定义欧拉函数 $\phi(x)$
$$
		\begin{aligned}
		\phi(x)&=\prod_{i=1}(1-x^i)\\&=1-x-x^2+x^5+x^7-x^{12}-x^{15}+\dots\\
		&=1+\sum\limits_{i=1}(-1)^ix^{i(3i\pm 1)/2}
		\end{aligned}
$$

这条等式被称为五边形数定理。证明比较复杂，故不展开叙述。有兴趣的可以看 [visit_world的博客](https://blog.csdn.net/visit_world/article/details/52734860)

将 $\phi$ 与 $P$ 乘起来
$$
\begin{aligned} \phi(x)\sum_{k=0}^{\infty}p(k)x^k =& (1-x-x^2+x^5+x^7-\ldots)\\&(1+p(1)x+p(2)x^2+p(3)x^3+\ldots)\\ =& 1 \end{aligned}
$$

将整个式子展开，得到：
$$
p(k)-p(k-1)-p(k-2)+p(k-5)+p(k-7)-\ldots=0
$$

$n$ 以内的五边形数是 $O(\sqrt n)$ 级别的，所以递推式只有 $O(\sqrt n)$ 项，于是我们得到了一个 $O(n\sqrt n)$ 的做法。



#### 方法四

（图片来自百度百科）

##### 前置知识：Ferrers diagram

一个分拆的 Ferrers 图，是把分拆出的每一项，用点（或方格）组成的行来表示。一般分拆写为递减正整数和，所以 Ferrers 图也用长度递减的行来表示。

Ferrers 图与分拆之间是一一对应的。如 14=6+3+3+2 的一个分拆的 Ferrers 图如下：

 ![img](https://cdn.luogu.com.cn/upload/image_hosting/wj6y5efz.png?x-oss-process=image/resize,m_lfit,h_420,w_625) 

通过读它的列，得到的 Ferrers 图与原图互为共轭。

##### 引申

* 对于所有行数不超过 $m$ 的 Ferrers 图，都唯一对应一个列数不超过 $m$ 的共轭图。因此整数 $n$拆分成 $m$ 个数的和的拆分数，和数 $n$ 拆分成最大数为 $m$ 的拆分数相等。

* 整数 $n$ 拆分成最多不超过 $m$ 个数的和的拆分数，和 $n$ 拆分成最大不超过 $m$ 的拆分数相等。 

* 整数 $n$ 拆分成互不相同的若干奇数的和的拆分数，和 $n$ 拆分成自共轭的Ferrers图像的拆分数相等。例如：17=9+5+3

  ![img](https://cdn.luogu.com.cn/upload/image_hosting/jpl3ofsh.png?x-oss-process=image/resize,m_lfit,h_420,w_625) 

考虑从 Ferrers diagram 的原点引出一条 $y=x$ 的直线，它离开这个图的位置就框处了一个 $h \times h$ 的正方形，这个正方形被称为一个整数拆分的 Durfee square。

如果我们确认了正方形的边长是 $h$，它两侧放置的就都是 $\le h$ 的整数划分。因此我们得到了这样的表达式：
$$
 \prod_{k\ge1} \frac1{1-x^k} = \sum_{h\ge0} x^{h^2} \left(\prod_{k=1}^h \frac1{1-x^k}\right)^2
$$

在计算前 $n$ 项时，由于 $h^2\le n$，枚举 $h$ 的上界为 $\sqrt n$，复杂度为 $O(n\sqrt n)$。



#### 不会证的结论

* 对于 $n$ 的分拆，各个分拆方案中出现至少 $k$ 次的数的个数和，等于所有方案中 $k$ 出现的总次数。详细见[整数分拆中的一个出人意料的结论](http://www.matrix67.com/blog/archives/6348)
* 对任意正整数，其奇分拆数目（每个部分均为奇数）等于其互异分拆（每个部分互不相同）数目。证明见《组合数学》

#### 
