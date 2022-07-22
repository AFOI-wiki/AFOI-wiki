**by gxy001**

## 万能欧几里得算法

在平面直角坐标系内有一条不包含左端点的线段（$y=\frac{ax+b}{c},x\in(0,n],a,b\in\mathbb N,c,x\in\mathbb Z^+$），在其定义域内，从左到右，维护一个字符串，直线每碰到一条水平的整线就写下一个 `U`，每碰到一条竖直的整线就写下一个 `R`，碰到整点就先写 `U` 再写 `R`，给定一个字符串函数 $f$，求 $f(S)$。

要求 $f$ 满足，我们可以实现运算 $\cdot$：$f(S_1)\cdot f(S_2)=f(S_1+S_2)$，且 $\cdot$ 有结合律。

我们发现，要求的值只与 $a,b,c,n,f(\text U),f(\text R)$ 有关，不妨将其记为 $g(a,b,c,n,f_U,f_R)$。

显然可以发现将线段上下平移整数个单位长度不影响 $S$，那么我们令 $b\leftarrow b\bmod c$。

当 $a\ge c$ 时，直线 $y=\dfrac{ax+b}c$ 相比于 $y=\dfrac{(a\bmod c)x+b}c$，每个 `R` 前恰好会多出 $\left\lfloor\dfrac ac\right\rfloor$ 个 `U`。

所以我们有 $g(a,b,c,n,f_U,f_R)=g(a\bmod c,b,c,n,f_U,f_U^{\left\lfloor\frac ac\right\rfloor}\cdot f_R)$。

现在有 $a<c$， 第 $p$ 个 `R` 之前应该共有 $\left\lfloor\dfrac{ap+b}{c}\right\rfloor$ 个 `U`，假设第 $p$ 个 `R` 在第 $q$ 个 `U` 之前。
$$
q>\left\lfloor\frac{ap+b}{c}\right\rfloor\\
q>\frac{ap+b}{c}\\
p<\frac{cq-b}{a}\\
p\le\left\lfloor\frac{cq-b-1}{a}\right\rfloor
$$
于是得到结论，第 $q$ 个 `U` 前有 $\left\lfloor\dfrac{cq-b-1}{a}\right\rfloor$ 个 `R`。所以有，答案等于 $y=\dfrac{cx-b-1}{a},y\in(0,n]$，且 `U` 与 `R` 互换时的结果，设 $m=\left\lfloor\dfrac{an+b}{c}\right\rfloor$，我们将答案分为三部分计算：

- $x\le 1$，这部分的结果为 $f_R^{\left\lfloor\frac{c-b-1}a\right\rfloor}\cdot f_U$。
- $x>m$，这部分的结果为 $f_R^{n-\left\lfloor\frac{cm-b-1}{a}\right\rfloor}$。
- $1< x\le m$，这部分的结果即为 $g(c,c-b-1,a,m-1,f_R,f_U)$。

总结果即为 $f_R^{\left\lfloor\frac{c-b-1}a\right\rfloor}\cdot f_U\cdot g(c,c-b-1,a,m-1,f_R,f_U)\cdot f_R^{n-\left\lfloor\frac{cm-b-1}{a}\right\rfloor}$。

递归下去即可，递归边界为若 $m=0$，则答案为 $f_R^n$。

设单次 $\cdot$ 运算的时间复杂度为 $O(t)$，那么计算 $f^{p}$ 的时间复杂度即为 $O(t\log p)$，每一次迭代需要进行的快速幂的指数为 $O(\dfrac ac)$，所以时间复杂度为 $O(t\log\dfrac ac)=O(t\log a-t\log c)$，总时间复杂度为 $T(a,c)=T(c,a\bmod c)+O(t\log a-t\log c)=O(t\log \max(a,c))$。

???+note "示例代码"
	```cpp
	node solve(int a,int b,int c,int n,node u,node r){
		if(n==0) return node();//单位元
		if(b>=c) b%=c;
		if(a>=c) return solve(a%c,b,c,n,u,pow(u,a/c)*r);
		int m=(a*n+b)/c;
		if(m==0) return pow(r,n);
		return pow(r,(c-b-1)/a)*u*solve(c,c-b-1,a,m-1,r,u)*pow(r,n-(c*m-b-1)/a);
	}
	```

## 例题

??? note "[P5170 【模板】类欧几里得算法](https://www.luogu.com.cn/problem/P5170)"
	我们的算法求解的是 $i\in (0,n]$ 的结果，对于这题，最后把 $i=0$ 处的取值加上就好了，纯板子。

	```cpp
	#include<iostream>
	using std::cin;
	using std::cout;
	int const mod=998244353,inv2=(mod+1)/2;
	struct node{
		int ct,k,ans1,ans2,ans3;
		node():ct(),k(),ans1(),ans2(),ans3(){}
	};
	node operator *(node const &a,node const &b){
		node c;
		c.ct=(a.ct+b.ct)%mod;
		c.k=(a.k+b.k)%mod;
		c.ans1=(a.ans1+b.ans1+1ll*b.k*a.ct)%mod;
		c.ans2=(a.ans2+b.ans2+1ll*a.ct*a.ct%mod*b.k+2ll*a.ct*b.ans1)%mod;
		c.ans3=(a.ans3+b.ans3+1ll*b.ans1*a.k+1ll*a.ct*(2ll*a.k+b.k+1)%mod*b.k%mod*inv2)%mod;
		return c;
	}
	node pow(node a,int k){
		node res;
		while(k){
			if(k&1)res=res*a;
			a=a*a,k>>=1;
		}
		return res;
	}
	node solve(int a,int b,int c,int n,node u,node r){
		if(n==0) return node();
		if(b>=c) b%=c;
		if(a>=c) return solve(a%c,b,c,n,u,pow(u,a/c)*r);
		int m=(1ll*a*n+b)/c;
		if(m==0) return pow(r,n);
		return pow(r,(c-b-1)/a)*u*solve(c,c-b-1,a,m-1,r,u)*pow(r,n-(1ll*c*m-b-1)/a);
	}
	int main(){
		std::ios::sync_with_stdio(false),cin.tie(nullptr);
		int T;
		cin>>T;
		node u,r;
		u.ct=1,r.k=1;
		while(T--){
			int n,a,b,c;
			cin>>n>>a>>b>>c;
			node p=pow(u,b/c)*solve(a,b,c,n,u,r);
			cout<<(p.ans1+b/c)%mod<<' '<<(p.ans2+1ll*(b/c)*(b/c))%mod<<' '<<p.ans3<<'\n';
		}
		return 0;
	}
	```

下面这几道都是板子。

- [CF868G El Toll Caves](https://www.luogu.com.cn/problem/CF868G)
- [Loj#138](https://loj.ac/p/138)
- [Loj#6440](https://loj.ac/p/6440)

