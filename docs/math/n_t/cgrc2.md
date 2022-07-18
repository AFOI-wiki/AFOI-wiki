**by 木xx木大**

## 同余系相关算法与定理

### （一）素数

设正整数 $p\neq1$，如果 $p$ 除了它自身以外没有其他大于 1 的约数，则称 $p$ 为素数,否则称 $p$ 为合数。

#### 素数个数

$n$ 以内的素数个数大约为 $\frac{n}{\ln n}$

#### 素数判定

##### 暴力做法

若 $a$ 是合数，则必存在素数 $p\le \sqrt a$使得 $p | a$。据此可以 $O(\sqrt n)$ 判断一个数是否是质数

##### $\text{Miller-Rabin}$ 素性测试 

**费马小定理：对于素数 $p$， $a^{p-1}\equiv 1\pmod p$。**

虽然这个定理的逆定理并不成立，但不符合这个定理的 $p$ 一定不是质数。如果随机取一些 $a$ 都满足这个性质，那么可以猜测 $p$ **大概率**为质数。

**二次探测定理：如果 $p$ 为奇素数，则同余方程 $x^2\equiv 1\pmod p$ 的解有且仅有 $x=\pm 1\pmod p$**

考虑同时用以上两个定理进行判断：对于奇素数 $p$，记 $p-1=2^kq$，对于 $a\perp p$，以下两个命题一定有一个成立

* $a^q\equiv 1\pmod p$
* $\exists r\in[0,k)$使得 $a^{2^r}q\equiv p-1\pmod p$

对于每个奇合数，至少有 $\frac{n-1}{2}$ 个数会把它判定为合数。如果我们选 $T$ 个数进行检测，这个算法的正确率为 $1-2^{-T}$，时间复杂度为 $O(T\log^2n)$。取 $\log n$ 个数基本就万无一失了。据 cmd 巨佬说

> 实战中,选择 $p=\{2,3,5,7,13,19,61,233\}$基本上$10^{18}$以内都没问题了。

```cpp
	bool check(ll x,ll p)
	{
		if(x%p==0)return 1;
		if(qpow(p%x,x-1,x)!=1)return 1;//此处 return 1 表示 hack 成功了
		ll k=x-1,d;
		while(k)
		{
			d=qpow(p,k,x);
			if(d!=1&&d!=x-1)return 1;
			if(((k&1)==1)||d==x-1)return 0;
			k>>=1;
		}
		return 0;
	}
	bool MR(ll x)
	{
		if(x<2)return 0;
		for(int i=0;i<=10;i++)
		{
			if(x==p[i])return 1;
			if(check(x,p[i]))return 0;
		}
		return 1;
	}
```

##### $\text{Eratosthenes}$ 筛法（埃氏筛）

**核心思想：如果一个数是合数，那么所有它的倍数都是合数。从小到大枚举每个数，如果它没有被标记过，就把它的所有倍数打上标记；最后没有被打过标记的数就是质数**。时间复杂度 $O(n\ln\ln n)$

用到此思想的例题：[loj 561. CommonAnts 的调和数](https://loj.ac/p/561)

##### 欧拉筛（线性筛）

每个数只被它最小的质因子标记一次，复杂度即可降至线性。

#### 质因数分解

即 [Pollard-Rho算法](https://www.luogu.org/problem/P4718)，可以在 $O(n^{0.25})$ 的时间找到一个数的最大质因子。

感觉这玩意没怎么考过，暂时咕了。

### （二）同余系基本定理

#### 裴蜀定理

存在整数 $x_1,x_2\dots x_n$ 使得 $\sum_{i=1}^na_ix_i=d$ 成立的充要条件是 $\gcd(a_1,\dots a_n)|d$

特殊情况：$ax\equiv 1\pmod p$ 有解当且仅当 $a\perp p$ 。

##### 例题：

[题解 P4571 [JSOI2009]瓶子和燃料](https://www.luogu.com.cn/blog/flyingfan/p4571-jsoi2009-ping-zi-hu-ran-liao-pei-shu-ding-li-post)

[题解 CF516E Drazil and His Happy Friends](https://www.luogu.com.cn/blog/flyingfan/cf516e-drazil-and-his-happy-friends-shuo-lun-post)

#### 欧拉定理

**若 $\gcd(a,m)=1$，则 $a^{\varphi(m)}\equiv 1\pmod m$**（$\varphi$ 的定义见下文**数论函数**部分）

上面提到过的费马小定理是这个定理的特殊形式。事实上，更常用的是它的扩展：

**扩展欧拉定理**

$$a^b=\begin{cases}a^{b\bmod \varphi(m)}&(\gcd(a,m)=1)\\a^b&(\gcd(a,m)\neq 1,b<\varphi(m))\\a^{b\bmod \varphi(m)+\varphi(m)}&(\gcd(a,m)\neq 1,b\ge\varphi(m))\end{cases}$$

主要用来降幂。

**例题：**

[P4139 上帝与集合的正确用法](https://www.luogu.com.cn/problem/P4139)

[P3934 [Ynoi2016] 炸脖龙 I](https://www.luogu.com.cn/problem/P3934)

[P3747 [六省联考 2017] 相逢是问候](https://www.luogu.com.cn/problem/P3747)

### （三）一元一次同余方程

一元一次同余方程是指形如 $ax\equiv b\pmod m$ 的同余方程。根据裴蜀定理，这个方程有解的充要条件是 $\gcd(a,m)|b$，且若有解则解数为 $\gcd(a,m)$。

此外，若 $x_0$ 为该方程的一个特解，则该方程的所有解可表示为 $x_0+\frac{m}{\gcd(a,m)}t\pmod m,t\in[0,\gcd(a,m))$

#### 扩展欧几里德算法（$\text{exgcd}$）

这个算法用于求 $ax+by=\gcd(a,b)$ 的一组可行解。根据辗转相除，$\gcd(a,b)=\gcd(b,a\bmod b)$。所以有

$$
ax_1+by_1=bx_2+(a\bmod b)y_2\\
ax_1+by_1=bx_2+(a-\lfloor\frac ab\rfloor b)y_2\\
ax_1+by_1=ay_2+b(x_2-\lfloor\frac ab\rfloor y_2)\\
x_1=y_2,y_1=x_2-\lfloor\frac ab\rfloor y_2
$$

于是我们可以从 $bx_2+(a\bmod b)y_2=\gcd(b,a\bmod b)$ 的解推出 $ax_1+by_1=\gcd(a,b)$的解，那么我们可以用类似辗转相除的方法递归下去，直至 $\gcd(a,0)=a$ 时推出 $ax=x$ 的合法解 $x=1$。

$\text{exgcd}$ 只能处理 $ax+by=\gcd(a,b)$ 的问题，但我们现在要处理 $ax+by=c$  的一般情况。已知当 $\gcd(a,b)|c$ 时这个方程有解，那么可以先求出 $ax'+by'=\gcd(a,b)$ 的一组解，然后给 $x',y'$ 同时乘上$\frac c {\gcd(a,b)}$，即 $ax'\frac{c}{\gcd(a,b)}+by'\frac{c}{\gcd(a,b)}=c$

##### 例题：

[P5656 【模板】二元一次不定方程 (exgcd)](https://www.luogu.com.cn/problem/P5656)

这个问题还要求出 $x,y$ 的最大、最小解及解的数量。容易发现 $x$ 减小时 $y$ 增大，反之亦然。如果我们已经求出了一组特解 $x_0,y_0$，则有$a(x_0+t\frac{b}{\gcd(a,b)})+b(y_0-t\frac{a}{\gcd(a,b)})=c$。设 $d_x=\frac{b}{\gcd(a,b)},d_y=\frac{a}{\gcd(a,b)}$

$$
x_0+td_x>0\Rightarrow t>-\frac{x}{d_x}\\
y_0-td_y>0\Rightarrow t<\frac{y}{d_y}\\
\lceil\frac{-x+1}{d_x}\rceil\le t\le\lfloor\frac{y}{d_y}\rfloor
$$

根据 $t$ 的取值就可以确定 $x$ 的最大、最小解，对于 $y$ 同理。

[P2421 [NOI2002] 荒岛野人](https://www.luogu.com.cn/problem/P2421)

[P1516 青蛙的约会](https://www.luogu.com.cn/problem/P1516)

[CF710D Two Arithmetic Progressions](https://www.luogu.com.cn/problem/CF710D)

#### 逆元

根据除法是乘法的逆运算，我们需要找到一个数 $b=a^{-1}$ 使得其能抵消 $\times a$ 的影响，即乘 $b$ 就相当于除以 $a$。在同余系中，对于互质的两个数 $a,m$ ，定义同余方程 $ab\equiv 1\pmod m$ 的解 $b$ 为 $a$ 在模 $m$ 意义下的逆元。

若 $a^{-1}$ 存在，则它是唯一的。

> 证明：假设有 $ax\equiv 1,ay\equiv 1$，则有 $axy\equiv(ax)y\equiv y,axy\equiv x(ay)\equiv x\Rightarrow x\equiv y$

下面介绍几种求逆元的方法

* 求单个数的逆元

  可以方便地用 $\text{exgcd}$ 或欧拉定理在 $O(\log m)$ 的时间内求出一个数的逆元

* 在线性时间内求出 $[1,n]$ 所有数的逆元

  * 递推

    首先 $1^{-1}=1$。假如我们已经知道了 $[1,n-1]$ 的逆元 $\pmod p$，现在要求 $n$ 的逆元

    设 $q=\lfloor\frac{p}{n}\rfloor,r=p\%n$，则有 $qn+r\equiv 0\Rightarrow-qn\equiv r$。

    两边同时乘上 $n^{-1}r^{-1}$，则有 $-qr^{-1}\equiv n^{-1}$，得到 $n^{-1}=(p-\lfloor\frac{p}{n}\rfloor)(p\%n)^{-1}$。

    这个方法在 $p$ 不是质数时，只要 $n$ 的逆元存在就仍然适用

  * 造阶乘

    设 $\text{fac}(n)=n!,\text{ifac}(n)=(n!)^{-1}$，则有 $n^{-1}=\frac{(n-1)!}{n!}=\text{ifac}(n)\times \text{fac}(n-1)$。先递推出 $\text{fac}(n)$，求出 $\text{ifac}(n)$，再递推$\text{ifac}(i)=\text{ifac}(i+1)\times (i+1)$

### （四）一元一次同余方程组

#### 中国剩余定理（$\text{CRT}$）

设 $\{p_i\}$ 为两两互质的正整数，那么对于任意正整数 $\{a_i\}$，一元一次同余方程组 $\{x\equiv a_i\pmod {p_i}\}$ 有唯一解 $x=\sum M_iM_i^{-1}a_i\pmod P$。其中 $P=\prod p_i,p_iM_i=P,M_iM_i^{-1}\equiv 1\pmod {p_i}$

##### 例题：

[P3868 [TJOI2009]猜数字](https://www.luogu.com.cn/problem/P3868)

#### 扩展中国剩余定理（$\text{EXCRT}$）

（和普通 $\text{CRT}$ 关系不大，且似乎可以完全包含普通 $\text{CRT}$ 的功能）

当 $\{p_i\}$ 不满足两两互质时，考虑将同余方程两两合并，对于 $\begin{cases}x\equiv a_1\pmod {p_1}\\x\equiv a_2\pmod {p_2}\end{cases}$

$$
a_1+y_1p_1=a_2+y_2p_2\\
y_1p_1-y_2p_2=a_2-a_1\\
$$

根据裴蜀定理，方程有解的充要条件是 $\gcd(p_1,p_2)|(a_2-a_1)$。用 $\text{exgcd}$ 求上面方程的解就可以算出新的 $a$，新的 $p=\gcd(p_1,p_2)$

```cpp
ll excrt()
{
	M=b[1];
	ans=a[1];
	for(int i=2;i<=n;i++)
	{
		ll p=M,q=b[i],c=(a[i]-ans%q+q)%q,x,y;
		ll gcd=exgcd(p,q,x,y);
		ll bg=q/gcd;
		x=qmul(x,c/gcd,bg);
		ans+=x*M;
		M*=bg;
		ans=(ans%M+M)%M;
	}
	return (ans%M+M)%M;
}
```

##### 例题：

[P4774 [NOI2018] 屠龙勇士](https://www.luogu.com.cn/problem/P4774)

（以下做法是我写本篇博客时口胡的，口胡晚完才发现和我当时写这题的思路不太一样，所以没有代码实现）

所有的剑用一个 $\text{multiset}$ 维护即可。我们要找的实际上是同余方程组 $\{k_ix\equiv a_i\pmod {p_i}$ 的解。

先想办法把 $k$ 搞掉。上式相当于 $kx+py=a$。若 $\gcd(k,p)\not\mid a$则无解，否则可以把两边同时除以 $\gcd(k,p)$，得到 $k'x+p'y=a'$，此时 $k'\perp p'$，就可以给 $k'x\equiv a'\pmod p'$ 两边同时乘 $k'^{-1}$ 把 $k'$ 消掉了。然后就是 $\text{EXCRT}$ 板子题了。

实现时要注意，$x\ge \max\{\lceil\frac{a_i}{k_i}\rceil\}$，如果解出的 $x$ 太小要补齐。

### （五）组合数取模

#### $\text{Lucas}$ 定理

当 $n\ge p$ 时不能直接用阶乘算组合数。 $p$ 为质数时，有

$$
{n\choose m}\bmod p={\lfloor\frac{n}{p}\rfloor\choose\lfloor\frac{m}{p}\rfloor}{{n\bmod p}\choose m\bmod p}
$$

即把 $n,m$ 按 $p$ 进制拆位，每一位对应求组合数乘积。用上式算组合数的复杂度为 $O(p+T\log_pn)$，$T$ 为询问次数。

#### $\text{Kummer}$ 定理

${n+m\choose m}$ 中 $p$ 的幂次为 $n,m$ 在 $p$ 进制下相加的进位次数。

>证明：（为方便表述，以下的第 $i$ 位表示从高到低的第 $i$ 位）
>
>设 $f(x)$ 表示 $x!$ 中 $p$ 的次数，则有 $f(x)=\sum_{i=1}^\infty \lfloor\frac{x}{p^i}\rfloor$，即 $x$ 在 $p$ 进制下每个前缀各个数位上数字的和。若 $\lfloor\frac{x+y}{p^i}\rfloor-\lfloor\frac{x}{p^i}\rfloor-\lfloor\frac{y}{p^i}\rfloor=1$ 则第 $i+1$ 位向第 $i$ 位进位了，否则没有进位。

以上两个定理可以用来数位 dp

##### 例题：

[P6669 [清华集训2016] 组合数问题](https://www.luogu.com.cn/problem/P6669)

题目所求即有多少对 $i,j(j\le i)$满足 ${i\choose j}\equiv 0\pmod k$ 。${n\choose m}=0$ 当且仅当 $n<m$ 时成立。用 $\text{Lucas}$ 定理把题意转化为，有多少对 $i,j(j\le i)$满足 $p$ 进制下 $i$ 至少有一位比 $j$ 小，数位 dp 一下即可。

[题解 CF582D Number of Binominal Coefficients](https://www.luogu.com.cn/blog/flyingfan/cf582d-number-of-binominal-coefficients-shuo-wei-dp)

#### $\text{Wilson}$ 定理

对于质数 $p$，有 $(p-1)!\equiv -1\pmod p$

>证明：$[1,p-1]$ 在模 $p$ 意义下均存在逆元且唯一。除了逆元是自己的数，每个数和自己的逆元配对，积为 $1$。逆元是自己的数只有 $\pm 1$，积为 $-1$

##### 例题：

[UVA1434 YAPTCHA](https://onlinejudge.org/external/14/p1434.pdf)

#### $\text{exLucas}$

感觉不能算是个定理，而是一种处理组合数取模的方法。和 $\text{Lucas}$ 定理 关系不大。用于处理 $n\ge p$ 且 $p$ 不是质数时的组合数取模问题。

首先把模数分解成 $\prod p_i^{c_i}$ 的形式，对每个素数幂单独处理，最后再 $\text{CRT}$ 合并。

对于 $\dfrac{n!}{m!(n-m)!}\bmod {p^k}$，最大的问题在于 $m!$ 在模 $p^k$ 意义下没有逆元，那么我们先使 $m!$ 与 $p$ 互质，将因子 $p$ 全部提出来得到。

$$
\dfrac{\frac{n!}{p^x}}{\frac{m!}{p^y}\frac{(n-m)!}{p^z}}p^{x-y-z}\bmod p^k，x=\sum_{i=1}\lfloor\frac{n}{p^i}\rfloor
$$

考虑 $f(n)=\dfrac{n!}{p^x}$ 怎么求，有

$$
n!=\prod_{p|i,i\le n}i\prod_{p\not\mid i,i\le n}i=p^{\lfloor\frac{n}{p}\rfloor}(\lfloor\frac{n}{p}\rfloor)!\prod_{p\not\mid i,i\le n}i\\
f(n)=f(\lfloor\frac{n}{p}\rfloor)\prod_{p\not\mid i,i\le n}i
$$

后面 $\prod_{p\not\mid i,i\le n}i$ 的部分在 $\bmod {p^k}$ 意义下是有循环节的，提前预处理出 $p^k$ 以内的 $\prod_{p\not\mid i}i$ 的前缀积，则有

$$
f(n)=f(\lfloor\frac{n}{p}\rfloor)\left(\prod_{p\not\mid i,i=1}^{p^k}i\right)^{\lfloor\frac{n}{p^k}\rfloor}\prod_{p\not\mid i,i=1}^{n\bmod p^k}i
$$

$f(m)$ 与 $p^k$ 互质，可以求逆元。预处理复杂度为 $O(\sum p_i^{c_i})$，单次查询复杂度 $O(\log_{p^k}n)$

```cpp
ll fac(ll n ,ll p,ll pk)
{
	if(!n)return 1;
	if(n<p)return f[n];
	return qpow(f[pk-1],n/pk,pk)*f[n%pk]%pk*fac(n/p,p,pk)%pk; 
}
ll C(ll n,ll m,ll p,ll pk)
{
	if(n<m)return 0;
	f[0]=1;
	for(int i=1;i<pk;i++)
		if(i%p)f[i]=f[i-1]*i%pk;
			else f[i]=f[i-1];
	ll f1=fac(n,p,pk),f2=fac(m,p,pk),f3=fac(n-m,p,pk),cnt=0LL;
	for(ll i=n;i;i/=p)
		cnt+=i/p;
	for(ll i=m;i;i/=p)
		cnt-=i/p;
	for(ll i=n-m;i;i/=p)
		cnt-=i/p;
	return f1*inv(f2,pk)%pk*inv(f3,pk)%pk*qpow(p,cnt,pk)%pk;
}
```

##### 例题：

[P2183 [国家集训队]礼物](https://www.luogu.com.cn/problem/P2183)

[P3301 [SDOI2013]方程](https://www.luogu.com.cn/problem/P3301)

[题解 P3726 [AH2017/HNOI2017]抛硬币](https://www.luogu.com.cn/blog/flyingfan/p3726-ah2017hnoi2017-pao-ying-bi-fan-de-meng-de-juan-ji-exlucas)

### （六）高次剩余

（搬自[阶、原根与指标小记](https://www.luogu.com.cn/blog/flyingfan/jie-yu-yuan-gen-xiao-ji)，并做了一些补充）

#### 阶：

设 $a\perp m$ 且 $m>1$，称满足 $a^k\equiv 1\pmod m$ 的最小正整数 $k$ 为 $a$ 在$\bmod m$ 意义下的阶，记作 $\delta_m(a)$。

其实就是幂的最小循环节，由欧拉定理可知这个东西上界是 $\varphi(m)$

##### 引理：

* 若 $a\perp m$，且 $a^k\equiv a^h\pmod m$，则 $k\equiv h\pmod {\delta_m (a)}$

* $\delta_m (a)=\delta_m (a^{-1})$
* 如果 $a^d\equiv 1\pmod m$ ，则 $\delta_m (a)|d$。可推出 $\delta_m (a)|\varphi(m)$
* $\delta_m (ab)=\delta_m (a)\delta_m (b)\Rightarrow \gcd(\delta_m (a),\delta_m (b))=1$

* 设 $k$ 为非负整数，则 $\delta_m (a^k)=\frac{\delta_m (a)}{\gcd(\delta_m (a),k)}$

* 若 $m_1\perp m_2$，则 $\delta_{m_1m_2} (a)=\text{lcm}(\delta_{m_1} (a),\delta_{m_2} (a))$

* 若 $a\perp m$，$a^0,a^1,a^2\dots a^{\delta_m(a)-1}$ 模 $m$ 两两不同余。特别地，当 $a$ 是原根时，这组数构成模 $m$ 的一个缩系

#### 原根：

$\delta_m (a)=\varphi(a)$ 时，称 $a$ 是 $\bmod m$ 意义下的原根。

##### 相关引理

* **原根个数：**若一个数 $m$ 有原根，它的原根个数为 $\varphi(\varphi(m))$

  > 当我们求出一个原根 $g$ 时，对于所有 $k\perp\varphi(m)$ ，$g^k$ 也是原根

* **原根判定：**若 $g$ 是 $m$ 的原根，则对于 $\varphi(m)$ 的任意素因子 $p$ 都有 $g^{\frac{\varphi(m)}{p}}\not\equiv 1\pmod m$

  > 任意数的阶都为 $\varphi(m)$ 的约数，而原根的阶恰好为 $\varphi(m)$

* **原根存在：**一个数 $m$ 存在原根，当且仅当 $m=2,4,p^{\alpha},2p^{\alpha}$ ，其中 $p$ 为奇素数，$\alpha\in \mathbb N^{*}$

#### 指标：

设 $g$ 为 $\bmod m$ 意义下的原根，$a\perp  m$，称最小非负的满足 $g^{\gamma}\equiv a\pmod m$ 的 $\gamma$ 为 $a$ 在 $\bmod m$ 意义下以 $g$ 为底的指标，记作 $\gamma_{m,g}(a)$

##### 相关引理：

* 若 $ab\perp m$，则 $\gamma(ab)\equiv\gamma(a)+\gamma(b)\pmod {\varphi(m)}$

  > 可以联系对数理解

* 设 $g_0,g_1$ 为 $\bmod m$ 意义下的两个不同的原根，则 $\gamma_{g_0}(a)\equiv\gamma_{g_0}(g_1)\gamma_{g_1}(a)\pmod{\varphi(m)}$

* $\delta_m(a)=\frac{\varphi(m)}{\gcd(\varphi(m),\gamma(a))}$

  > $a=g^{\gamma(a)}$，相当于在一个大小为 $\varphi(m)$ 的环上，每次跳 $\gamma(a)$ 步，则能跳到 $\frac{\varphi(m)}{\gcd(\varphi(m),\gamma(a))}$ 个元素

#### 离散对数问题：$\text{BSGS}$ 算法

问题：$y\perp p$ 时，对 $y^x\equiv z\pmod{p}$，求 $x$


设 $x=am-b$，其中 $a\in[1,\lceil\frac{p}{m}\rceil],b\in[0,m]$，则有

$$
y^{am}\equiv zy^b\pmod p
$$

预处理出 $zy^b$ 的值，用 map 存起来。然后枚举 $a$ 查表即可。取 $m=\lceil\sqrt p\rceil$，用 map 的话复杂度为 $O(\sqrt p \log p)$。若有 $n$ 次查询，则取 $m=\lceil\sqrt {np}\rceil$，复杂度为 $O(\sqrt{np}\log p)$

```cpp
int bsgs(int x,int y)
{
	mp.clear();
	int m=sqrt(p)+1,s=y;
	for(int i=0;i<=m;i++)
		mp[s]=i,s=1ll*s*x%p;
	x=qpow(x,m),s=x;
	for(int i=1;i<=m;i++,s=1ll*s*x%p)
		if(mp.count(s))return i*m-mp[s];
	return -1;
}
```

#### $\text{EXBSGS}$：处理 $y,p$ 不互质的情况

思路：让 $y,p$ 变得互质

具体地，设 $d_1=\gcd(y,p)$。$d_1\nmid z$ 时无解，否则有 

$$
y^{x-1}\frac{y}{d_1}\equiv \frac{z}{d_1}\pmod{\frac{p}{d_1}}
$$

若 $y$ 与 $\frac{p}{d_1}$ 不互质就继续这样做下去，直至 $y\perp \frac{p}{d_1d_2\dots d_k}$。记 $D=\prod\limits_{i=1}^kd_i$，则有

$$
y^{x-k}\frac{y^k}{D}\equiv \frac{z}{D}\pmod{\frac{p}{D}}
$$

算出 $x-k$ 再加上 $k$ 即可。

**注意：** 答案有可能 $<k$ ，因此在除以 $d$ 的过程中，若出现 $y^{x-1}\equiv \dfrac{\frac{z}{d}}{\frac{y}{d}}\pmod{\frac{p}{D}}$，则答案为此时的 $k$

##### 例题：

[P4884 多少个1？](https://www.luogu.com.cn/problem/P4884)

将原题等式左右同时 $\times 9+1$ ，则问题转化为求 $10^N\equiv K\pmod m$。注意：要龟速乘

[P4454 [CQOI2018]破解D-H协议](https://www.luogu.com.cn/problem/P4454)

[P3306 [SDOI2013] 随机数生成器](https://www.luogu.com.cn/problem/P3306)（注意各种特判）

[CF1106F Lunar New Year and a Recursive Sequence](https://www.luogu.com.cn/problem/CF1106F)

看到 $k$ 很小，$n$ 很大，容易想到矩阵乘法。但是乘方的形式又无法矩乘，所以要想办法把乘方变成乘法和加法运算。考虑把 $f_i$ 表示为 $g^{a_i}$ 的形式，其中 $g$ 为 $998244353$ 的原根。那么 $f_i=\prod_{i=1}^kf_{i-j}^{b_j}$ 等价于 $a_i=\sum_{j=1}^ka_{i-j}b_j$ 。这个新式子就可以矩乘优化了。

假如知道 $f_k$ ，则我们可以通过上述方法求出 $f_n$，但现在问题是已知 $f_n$ 求 $f_k$。容易看出 $f_n$ 可以表示为 $f_k^x$的形式。考虑令 $a_k=1$ 时求出 $a_n=x$，则有 $f_k^x=f_n$。问题转化为 $g^{xa_k}=f_n$ ，求 $g^{a_k}$。先用 $\text{BSGS}$ 算法求出 $b$ 满足 $g^b=f_n$，则问题转化为解同余方程 $xa_k\equiv b\pmod {\varphi(m)}$，$\text{exgcd}$ 再快速幂一下就完了。

[P5605 小A与两位神仙](https://www.luogu.com.cn/problem/P5605)

$m$ 为奇素数的幂，因此它必然有原根。设 $m$ 的原根为 $g$，$x=g^b,y=g^c$。那么有
$$
g^{ab}\equiv g^c\pmod m\Rightarrow ab\equiv c\pmod {\varphi(m)}
$$
根据裴蜀定理 $\gcd(b,\varphi(m))|c$ 时才有解，进而推出 $\gcd(b,\varphi(m))|\gcd(c,\varphi(m))$

设 $x$ 的阶为 $k$，$x^{kb}\equiv 1$。因为 $g$ 的阶为 $\varphi(m)$ ，所以 $\varphi(m)|kb$。

设 $i\varphi(m)=kb$，因为 $k$ 为最小的能使 $i$ 为整数的数，$k=\frac{\text{lcm}(\varphi(m),b)}{b}=\frac{\varphi(m)}{\gcd(\varphi(m),b)}$。代入原式可得出 $\delta_m(y)|\delta_m(x)$ 时有解。所以我们只需要求出 $x,y$ 的阶即可。

根据阶都是 $\varphi(m)$ 的因数，求阶时枚举 $\varphi(m)$ 的每个质因数，确定这一质因数能取到的最高次数即可。

分解质因数需要用 Pollard-rho，时间复杂度为 $O(\sqrt[4]m+T\omega(m)\log m)$，如果像我一样实现不够优秀可能会写成 $O(\sqrt[4]m+T\log^2 m)$ 然后被卡常/kk。

[P6690 一次函数](https://www.luogu.com.cn/problem/P6690) （将 $\text{BSGS}$ 扩展到一次函数上，好题！sto $\color\red\text{_sys}$ orz ！）
