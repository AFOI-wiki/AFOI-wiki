**by gxy001**

## 拉格朗日反演

对于两个形式幂级数 $F(x),G(x)$，若 $F(G(x))=x$，则有

$$
[x^n]F(x)=\frac{1}{n}[x^{n-1}] (\frac{x}{G(x)})^n
$$

## 扩展拉格朗日反演

对于三个形式幂级数 $F(x),G(x),H(x)$，若 $F(G(x))=x$，则有

$$
[x^n]H(F(x))=\frac{1}{n}[x^{n-1}]H'(x)(\frac{x}{G(x)})^n
$$

推论：$[x^n]F(x)^m=\frac{m}{n}[x^{n-m}] (\frac{x}{G(x)})^n$。

## 例题

### Fuss-Catalan 数

求 $n$ 个内点的 $k$ 叉树数量，满足儿子有顺序，每个点要么有 $k$ 个儿子，有么有 $0$ 个儿子，没有儿子的称作外点，有儿子的称作内点。

从 $(0,0)$ 到 $(kn,0)$ 的格点路径，每次只能走 $(+1,+1)$ 和 $(+1,-(k-1))$，且不能走到 $y=0$ 以下，的方案数。

上面这两个问题的答案是相等的，其生成函数为 $F(x)=x(F(x)+1)^k$，考虑如何求出其第 $n$ 项。

移项得 $x=\dfrac{F(x)}{(F(x)+1)^k}$，所以我们知道，$F(x)$ 的复合逆为 $G(x)=\dfrac{x}{(x+1)^k}$，根据拉格朗日反演，我们可以得到，$[x^n] F(x)=\frac 1n[x^{n-1}] (\dfrac{x}{G(x)})^n=\dfrac{1}n[x^{n-1}] (x+1)^{kn}=\dfrac1n\binom{kn}{n-1}$。

### ABC222H

定义满足以下条件的二叉树（类似于上面的定义，儿子是有顺序的，左右儿子不同时，交换左右儿子视为两种树，只有一个儿子时，也区分左右儿子）是大小为 $n$ 的好树：

- 每个点上写有 $0$ 或者 $1$，总和为 $n$。
- 每个叶子写有 $1$。
- 可以通过 $n-1$ 次下面的操作，使得根节点权值为 $n$：
  - 选择两个节点 $u,v$，$v$ 必须是 $u$ 的儿子，或者 $u$ 的儿子的儿子。令 $a_u\leftarrow a_u+a_v,a_v\leftarrow 0$。

$n\le 10^7$。

容易发现，根节点必须为 $1$，不存在两个连续的 $0$。

答案的生成函数为 $F(x)=x(F(x)^2+3F(x)+1)^2$，即考虑根的一个儿子子树形如什么，可以为空（$1$），可以是一个好树（$F(x)$），可以是 $0$ 的某个儿子挂了一个好树（$2F(x)$），可以是 $0$ 的两个儿子都是好树（$F(x)^2$）。

移项得到 $x=\dfrac{F(x)}{(F(x)^2+3F(x)+1)^2}$，$F(x)$ 的复合逆即为 $G(x)=\dfrac{x}{(x^2+3x+1)^2}$，所以有 $[x^n] F(x)=\frac 1n[x^{n-1}] (\dfrac{x}{G(x)})^n=\dfrac 1n[x^{n-1}] (x^2+3x+1)^{2n}$。

问题变为求解 $[x^{n-1}] (x^2+3x+1)^{2n}$，我们设 $m=2n,U(x)=T(x)^m,T(x)=x^2+3x+1$。

我们有 $U'=mT^{m-1}T'\rightarrow TU'=mT'U$。

设 $u_k=[x^k]U(x)$，则根据 $TU'=mT'U$，我们考察左右两侧的 $k-1$ 次项系数。

$$
ku_k+3(k-1)u_{k-1}+(k-2)u_{k-2}=m(3u_{k-1}+2u_{k-2})\\
u_k=\frac{(3m+3-3k)u_{k-1}+(2m+2-k)u_{k-2}}{k}\\
$$

递推即可。当然，直接用二项式定理展开可以得到 $\sum\limits_{j=0}^{2n}\dbinom{2n}{j}\dbinom{2n-j}{n-1-2j}3^{n-1-2j}$，也可以 $O(n)$ 计算。

### P7896 『JROI-3』Moke 的游戏

问有多少种满足以下条件的方案数。

初始位于 $(0,0)$，要到达 $(n,0)$，每次有 $a_i$ 种方案移动 $(+1,i)$（$-1\le i\le n$）， 中途不得到达 $y=0$ 以下，并恰好 $m$ 次到达 $(k,0)$（$0< k\le n$）。

$n\le 5\times 10^6,\mid\{i\mid i>0\land a_i\ne 0\}\mid\le 10$。

考虑 $(0,0)$ 到 $(i,-1)$ 且除最后一步未经过 $y=-1$ 的方案数，记其生成函数为 $F(x)$。

我们有 $F(x)=x\sum\limits_{i=-1}a_iF(x)^{i+1}$。

设从 $(0,0)$ 到 $(i,0)$ 且只有起点和终点经过 $y=0$ 的方案数，记其生成函数为 $G(x)$。

我们有 $G(x)=x\sum\limits_{i=0}a_iF(x)^i$

求的实际上就是 $[x^n] G(x)^{m}$，即 $[x^{n-m}] (\sum\limits_{i=0}a_iF(x)^i)^m$。

设 $F(x)$ 的复合逆为 $H(x)$，有 $H(x)=\dfrac{x}{\sum\limits_{i=-1}a_ix^{i+1}}$。

设 $A(x)=(\sum\limits_{i=0}a_ix^i)^m$，我们有 $[x^{n-m}]A(F(x))=\dfrac{1}{n-m}[x^{n-m-1}]A'(x)(\frac{x}{H(x)})^{n-m}$，又有 $A'(x)=m(\sum\limits_{i=0}a_ix^i)^{m-1}(\sum\limits_{i=1}ia_ix^{i-1})$。

所以答案就是

$$
\frac{m}{n-m}[x^{n-m-1}](\sum\limits_{i=0}a_ix^i)^{m-1}(\sum\limits_{i=1}ia_ix^{i-1})(\sum\limits_{i=-1}a_ix^{i+1})^{n-m}\\
$$

我们可以通过类似于上道题的做法，即根据 $f(f^k)'=kf'f^k$，得到一个 $[x^i] (f^k)$ 的递推式，求出 $(\sum\limits_{i=0}a_ix^i)^{m-1}$ 和 $(\sum\limits_{i=-1}a_ix^{i+1})^{n-m}$ 的前 $n-m-1$ 项，再暴力求出卷积的第 $[x^{n-m-1}]$ 项即可。

$$
b_k=[x^k](\sum\limits_{i=0}a_ix^i)^{m-1}\\
\sum\limits_{i=0}^{k-1}a_i(k-i)b_{k-i}=(m-1)\sum\limits_{i=0}^{k-1}(i+1)a_{i+1}b_{k-1-i}\\
b_k=\frac{(m-1)\sum\limits_{i=1}^{k}ia_{i}b_{k-i}-\sum\limits_{i=1}^{k-1}a_i(k-i)b_{k-i}}{a_0k}\\
c_k=[x^k](\sum\limits_{i=0}a_{i-1}x^i)^{n-m}\\
\sum\limits_{i=0}^{k-1}a_{i-1}(k-i)c_{k-i}=(n-m)\sum\limits_{i=0}^{k-1}(i+1)a_{i}c_{k-1-i}\\
c_k=\frac{(n-m)\sum\limits_{i=0}^{k-1}(i+1)a_{i}c_{k-1-i}-\sum\limits_{i=0}^{k-2}a_{i}(k-i-1)c_{k-i-1}}{a_{-1}k}
$$
