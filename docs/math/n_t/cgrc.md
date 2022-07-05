**by Acc_Robin**

## 基础知识

### 带余除法

对整数 $a,b(b\neq 0)$ 存在 **唯一** 一对 $q,r(0\le r<b)$  使得 $a=bq+r$，$r$ 称为余数。

#### 下取整

对 $a,b(b\neq 0)$，$a=bq+r(0\le r<b)$，称 $q=\lfloor \frac ab \rfloor$

**常用性质**

- 当 $1\le i\le n$，$\lfloor \frac ni\rfloor$ 有不超过 $2\sqrt n$ 种取值。

??? note "证明"
    在 $i\le \sqrt n$ 时，显然不超过 $\sqrt n$ 种；在 $i>\sqrt n$ 时，$1\le \lfloor \frac ni\rfloor\le \sqrt n$，也不超过 $\sqrt n$ 种。

- $\lfloor \frac {\lfloor \frac ab \rfloor}c \rfloor = \lfloor \frac{a}{bc}\rfloor$

??? note "证明"
    对右侧进行带余除法：
    $$
    a=pbc+q(0\le q\le bc-1)
    $$

    对左侧进行带余除法：
    $$
    a=xb+y(0\le y\le b-1)\\
    \lfloor \frac ab\rfloor =x=uc+v(0\le v\le c-1)\\
    a=(uc+v)b+y=ubc+vb+y
    $$

    因为 $0\le vb+y\le (c-1)b+b-1=bc-1<bc$，且带余除法具有唯一性得证。

- 由上面两条可知，$n$ 无论怎么除，都在 $\{\lfloor \frac ni\rfloor \}$ 这个集合内，且集合大小不超过 $O(\sqrt n)$。

### 最大公约数与最小公倍数

对 $\forall x|a\land x|b$，都有 $x|d$，称 $d$ 为 $a,b$ 的最大公约数，记作 $\gcd(a,b)$。

对 $\forall a|x\land b|x$，都有 $d|x$，称 $d$ 为 $a,b$ 的最小公倍数，记作 $\operatorname{lcm}(a,b)$。

**常用性质**

- $\gcd(a,0) = a$，$\gcd(a, a) = a$。

- 辗转相除法：$\gcd(a,b)=\gcd(b,a\bmod b)$，特例 $\gcd(a,b)=\gcd(b,a-b)$。

- 使用辗转相除法计算 $\gcd$ 的复杂度为 $O(\log \frac{\min(a,b)}{\gcd(a,b)})$。

??? note"证明"
    只需证明 $a\bmod b<\frac 12 a$。
    当 $b \le \frac 12 a$ 时结论显然；当 $b > \frac 12 a$ 时 $a\bmod b = a - b$。

- $\gcd(a_1, a_2, \cdots, a_n)=\gcd(a_1,\gcd(a_2, \gcd(\cdots)))$。

- $\gcd(a,b)\cdot \operatorname{lcm}(a,b)=a\cdot b$（多个时不适用）。

- $\gcd$ 本质上是每个质数指数取 $\min$，而 $\operatorname{lcm}$ 是取 $\max$。$\gcd$ 是求质因子的交集，而 $\operatorname{lcm}$ 是求并集。

- **裴蜀定理**：一定存在一对整数 $x,y$ 使得 $ax + by = \gcd(a,b)$，且 $\gcd(a, b)$ 是最小的由 $ax + by$ 生成的非负整数，反之也成立。

## 同余系

定义 若 $a\bmod p = b\bmod p$，则称 $a,b$ 模 $p$ 同余，记作 $a\equiv b\pmod p$。

$\bmod p$ 同余系就是 $0\sim p-1$ 中所有整数，和 $+,\times$ 运算组成的群。

### 逆元

定义数 $a$ 在模 $p$ 意义下的乘法逆元为使得 $ax\equiv 1\pmod p$ 的 $x$。

存在逆元的充要条件是 $a\bot p$。

#### 求逆元的方法

1. 求单个数逆元：在模数是质数时使用费马小定理。

2. 求多个数逆元（比如 $1\sim n$）：维护前缀积，再反过来推一边（注意特判 $0$）。

3. 求单个数逆元但模数不是质数时：使用 exgcd。

#### exgcd

$$
\gcd(a,b)=\gcd(b,a-b\lfloor \frac ab\rfloor)
$$

由裴蜀定理，一定存在 $x,y,x',y'$ 使得

$$
ax + by = bx' + (a - b\lfloor \frac ab\rfloor ) y'\\
a(x-y')+b(y-x'+\lfloor \frac ab \rfloor y')=0
$$

因为上式需恒成立成立，则有 $a\cdot 0+b\cdot 0 = 0$

$$
\left\{
    \begin{matrix}
    x - y' = 0
    \\
    y - x'+\lfloor \frac ab \rfloor y' = 0
    \end{matrix}
\right.
$$

解之即得

$$
\left\{
    \begin{matrix}
    x = y'
    \\
    y = x' - \lfloor \frac ab \rfloor y'
    \end{matrix}
\right.
$$

类似 $\gcd$ 以此向下递归计算即可，复杂度同样是 $O(\log \frac{\min(a,b)}{\gcd(a,b)})$。

本质是在求解一个同余方程组 $ax\equiv \gcd(a,b)\pmod b$。

### 欧拉定理

#### 欧拉函数

定义 $\varphi(n)$ 表示 $1\sim n$ 中与 $n$ 互质的数的个数。

**常用性质**

- 定义：$\varphi(n)=\sum\limits_{i=1}^n[\gcd(i,n)=1]$。


- 积性函数：$a\bot b \Rightarrow \varphi(pq)=\varphi(p)\cdot \varphi(q)$

- 若 $n=p_1^{c_1}\cdot p_2^{c_2} \cdots p_k^{c_k}$（标准素因数分解），则 $\varphi(n)=n\cdot (1-\frac 1{p_1})(1-\frac 1{p_2})\cdots (1-\frac 1{p_k})$。

??? "证明"
    求补集，即 $1\sim n$ 中含 $n$ 的素因子的数的个数，相当于对 $n$ 的每个素因数有限制再求并。

    对于素因子集合 $\{p_1,p_2,\cdots, p_s\}$，$1\sim n$ 中是这个集合所有数的倍数的个数为 $\frac n{p_1p_2\cdots p_s}$，并且有容斥系数 $(-1)^{s+1}$。那么最终答案为
    $$
    n - (\frac n{p_1} + \frac n{p_2} + \cdots - \frac n{p_1p_2}- \frac n{p_1p_3} -\cdots +\cdots)\\
    = n(1-\frac 1{p_1} - \frac 1{p_2} +\frac 1{p_1p_2}+\frac 1{p_1p_3}-\cdots )\\
    =n(1-\frac 1{p_1})(1-\frac 1{p_2})\cdots(1-\frac 1{p_k})
    $$

- 若 $d|n$，则 $\varphi(d \cdot n)=d\cdot \varphi(n)$。

- $\varphi * 1 = id$，也即 $\sum\limits_{d|n}\varphi(d)=n$。

- $\varphi(\varphi(\varphi(...\varphi(n))))$ 在嵌套 $O(\log n)$ 次后变为 $1$。

??? "证明"
    若 $n$ 是 $1$ 则结束；否则若 $n$ 是偶数，因为会有一个 $2$ 变成 $1$，所以$\varphi(n)\le \frac 12n$；否则若 $n$ 是奇数，则必然有一个奇质因子变为偶数。

#### 求欧拉函数的方法

1. 按照解析式直接求解，复杂度 $O(\sqrt n)$。

2. 在可以 $O(n)$ 预处理时并且多次询问时，维护最小质因子进行分解，复杂度 $O(n + T\log n)$。

3. 埃氏筛：$\varphi(n)=n-\sum\limits_{d|n,d\neq n}\varphi(d)$，复杂度 $O(n\log n)$ 或 $O(n\log\log n)$。

4. 线性筛：
$$
\varphi(n\cdot p) = 
\begin{cases}
\varphi(n)\cdot \varphi(p) & p\not|n \\
\varphi(n) \cdot p & p|n
\end{cases}
$$

#### 欧拉定理

$$
a^{\varphi(p)}\equiv 1\pmod p
$$

[证明]()

#### 扩展欧拉定理

$$
a^b\equiv 
\begin{cases}
a^{b\bmod \varphi(p)} & \gcd(a,p) = 1 \\
a^b & \gcd(a,p) \neq 1 \land b<\varphi(p) \\
a^{b \bmod \varphi(p) + \varphi(p)} & \gcd(a, p) = 1 \land b\ge \varphi(p)
\end{cases}
\pmod p
$$

理解：互质时为普通欧拉定理，否则会有 $\rho$ 形循环节。

用途：可以用来求“幂塔”：${a_1}^{a_2^{a_3^{\cdots}}}$，不断套用扩展欧拉定理，在 $O(\log)$ 次后指数的模数就会变成 $1$。

### 中国剩余定理（CRT）

求解同余方程组

$$
\left\{
    \begin{matrix}
    x \equiv a_1 \pmod {p_1} \\
    x \equiv a_2 \pmod {p_2} \\
    \cdots \\
    x \equiv a_n \pmod {p_n} \\
    \end{matrix}
\right.
$$

其中 $p_i$ 两两互质。

考虑两两合并：

$$
\left\{
    \begin{matrix}
    x \equiv a_1 \pmod {p_1} \\
    x \equiv a_2 \pmod {p_2} \\
    \end{matrix}
\right.
$$

我们希望 $\bmod p_1$ 时显示 $a_1$, $\bmod p_2$ 时显示 $a_2$，那么就让 $x = a_1p_2 + a_2p_1$，但此时显示的是 $a_1p_2$ 和 $a_2p_1$，那就分别乘上 $p_2$ 在模 $p_1$ 下的逆元 和 $p_1$ 在模 $p_2$ 下的逆元即可。合并完的方程模数是 $p_1\cdot p_2$。

因为两两互质，所以一定存在逆元。

```cpp
auto CRT = [](int n, const vector<int>& a, const vector<int>& p) {
	ll r = 0, m = 1, M, x, y;
	for (int i = 0; i < n; ++i, m = M) {
		M = m * p[i], exgcd(p[i], m, x, y);
		x = (x % m + m) % m, y = (y % p[i] + p[i]) % p[i];
		r = (r * x % M * p[i] + a[i] * y % M * m) % M;
	}
	return r;
};
```

#### 扩展中国剩余定理（EXCRT）

当 $p_i$ 不互质时，不能够直接构造逆元。第一个方程有通解 $up_1+a_1$，第二个方程有通解 $vp_2+a_2$，令这二者相等即 $up_1-vp_2=a_2-a_1$，形似裴蜀定理。

那么有解的条件就是 $\gcd(p_1,p_2)|a_2-a_1$，并且使用 exgcd 求得一组合法 $u,v$ 即可。此时合并完方程的模数是 $\operatorname{lcm}(p_1,p_2)$。

注意防止溢出。

```cpp
auto mul = [](ll a, ll b, ll m) {
	ll c = a * b - ll((long double)a / m * b + 0.5L) * m;
	return c < 0 ? c + m : c;
};
auto exCRT = [](int n, const vector<ll>& a, const vector<ll>& p) {
	ll r = 0, m = 1, M, x, y, d;
	for (int i = 0; i < n; ++i, m = M) {
		d = exgcd(m, p[i], x, y), M = p[i] / d * m;
		y = (a[i] - r % p[i] + p[i]) % p[i];
		if (y % d) return -1ll;
		x = mul(x, y / d, p[i]), r = (r + mul(x, m, M)) % M;
	}
	return r;
};
```

### Lucas 定理

在 $p$ 是素数时，有

$$
\binom nm \equiv \binom {\lfloor \frac n p \rfloor}{\lfloor \frac m p\rfloor}\cdot \binom{n \bmod p}{m \bmod p}\pmod p
$$

**重要性质**

- 预处理 $O(p)$，单次询问 $O(\log_p n)$。

- 本质是对 $n,m$ 做 $p$ 进制分解。

#### Krummer 定理

$\binom {n + m} m$ 中 $p$ 的指数 $=$ $p$ 进制下 $n,m$ 做加法时的进位次数。

??? "证明"
    显然有勒让德定理 $v_p(n!)=\sum\limits_{i\ge 1}\lfloor \frac n {p^i} \rfloor$。
    
    又因为 $\binom{n + m}m=\frac {(n+m)!}{n!m!}$，所以 $v_p(\binom {n+m}m) = v_p((n + m)!) - v_p(n!) - v_p(m!) = \sum\limits_{i\ge 1}\lfloor \frac {n + m}{p^i}\rfloor-\lfloor \frac {n}{p^i}\rfloor - \lfloor \frac {m}{p^i}\rfloor$。
    
    当且仅当第 $i$ 位产生进位才不会被除掉。

### exLucas

对 $p\notin \mathbb P$ 时，求 $\binom nm \bmod p$（事实上所谓 exLucas 和 Lucas 没有关系，只是一种求组合数的技巧，而其功能和 Lucas 互补而得名）。

对 $p$ 素因数分解后使用 CRT 合并即可，现在处理 $\bmod p^k$ 时的答案。

首先有 $v_p(n!) = \sum\limits_{i \ge 1} \lfloor \frac n{p^i} \rfloor$；定义 $r_p(n!) = \frac {n!}{p^{v_p(n)}}$，相当于 $n!$ 去掉所有 $p$ 后剩下的数。后文分别简记为 $v(n!)$ 和 $r(n!)$。

所求为

$$
\binom n m \equiv \frac {n!}{m! (n - m)!} \equiv \frac {r(n!)}{r(m!)r((n-m)!)}\cdot p^{v(n!)-v(m!)-v((n - m)!)} \pmod {p^k} \\
$$

发现 $v(n!)$ 可以在 $O(\log_p n)$ 的时间内计算，现在只需要计算 $r(n!)$ 即可。

$$
n! = {\color{red}\left[p\cdot 2p\cdot 3p\cdots \lfloor \frac np\rfloor p\right ]} \cdot {\color{violet}\left[\left(1\cdot 2 \cdots p-1\right)\cdot\left((p+1)\cdot (p+2)\cdots (p+p-1)\right) \cdots \right]}
$$

我们把 $1\cdot 2 \cdots n$ 拆成两部分，一部分是 $p$ 的倍数（红色，要被除掉），另一部分是剩下的数（紫色）。

先考虑紫色部分，事实上是由两部分组成的，相当于若干个长度为 $p$ 的块和最后一个散块：

$$
\left(
    \prod_{0\le i<\lfloor \frac{n}{p} \rfloor - 1} 
        \prod_{1\le j < p} (ip+j)
\right)
\cdot 
\left(
    \prod_{1\le j\le (n \bmod p) }
        \left(
            \left(
                \lfloor\frac np\rfloor-1
            \right)p +j
        \right)
\right)
$$

在对 $p^k$ 取模时上式具有周期性，所以只需要预处理除 $1\sim p^k$ 中非 $p$ 的倍数的数的前缀积即可 $O(1)$ 计算上式。

再考虑红色部分，这部分含有 $p$，是要除以 $p^{v(n!)}$ 的

$$
\frac{p\cdot 2p\cdots \lfloor \frac np \rfloor p}{p^{v(n!)}} = \frac {p^{\lfloor \frac np\rfloor}\cdot (\lfloor \frac np\rfloor)!}{p^{v(n!)}}=p^{\lfloor \frac np \rfloor - v(n!)} \cdot (\lfloor \frac np\rfloor)!
$$

又因为 $v(n!)=\lfloor \frac np\rfloor + v\left((\lfloor \frac np\rfloor)!\right) \Leftrightarrow \lfloor \frac np\rfloor - v(n!) =-v\left((\lfloor \frac np\rfloor)!\right)$

所以
$$
p^{\lfloor \frac np \rfloor - v(n!)} \cdot (\lfloor \frac np\rfloor)!=\frac{(\lfloor \frac np \rfloor)!}{v\left((\lfloor \frac np \rfloor)!\right)}= r\left((\lfloor \frac np \rfloor)! \right)
$$

递归计算 $r(n!)$ 即可。

```cpp
int z, P, fc[N];
auto qp = [](int a, ll b, int P) {
	int z = 1;
	while (b) {
		if (b & 1) z = 1ll * z * a % P;
		a = 1ll * a * a % P, b >>= 1;
	}
	return z;
};
void exgcd(int a, int b, int& x, int& y) {
	if (b == 0) return x = 1, y = 0, void();
	exgcd(b, a % b, y, x), y -= a /b * x;
}
auto inv = [](int a, int P) {
	int x, y; exgcd(a, P, x, y);
	return (x % P + P) % P;
};
auto v = [](int p, ll n) {
	ll z = 0;
	while (n) z += (n /= p);
	return z;
};
int r(ll n, int p, int P) {
	if (n == 0) return 1;
	ll z = qp(fc[P - 1], n / P, P);
	z = 1ll * z * fc[n % P] % P;
	return 1ll * z * r(n / p, p, P) % P;
};
auto C = [](ll n, ll m, int p, int P) {
	int z = v(p, n) - v(p, m) - v(p, n - m);
	z = qp(p, z, P), *fc = 1;
	for (int i = 1; i < P; ++i) {
		if (i % p == 0) fc[i] = fc[i - 1];
		else fc[i] = 1ll * fc[i - 1] * i % P;
	}
	z = 1ll * z * r(n, p, P) % P;
	z = 1ll * z * inv(r(m, p, P), P) % P;
	z = 1ll * z * inv(r(n - m, p, P), P) % P;
	return z;
};
auto CRT = [](int a, int p) {
	int x, y, M = P * p;
	exgcd(P, p, x, y);
	x = (x % p + p) % p, y = (y % P + P) % P;
	z = (1ll * z * p % M * y + 1ll * a * P % M * x) % M;
	P = M;
};
auto exLucas = [](ll n, ll m, int p) {
	z = 0, P = 1;
	int i = 2, j;
	for (; i * i <= p; ++i) {
		if (p % i == 0) {
			j = 1;
			while (p % i == 0) p /= i, j *= i;
			CRT(C(n, m, i, j), j);
		}
	}
	if (p > 1) CRT(C(n, m, p, p), p);
	return z;
};
```
