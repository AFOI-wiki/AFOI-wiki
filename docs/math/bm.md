## 线性递推式

对于数列 $\{a_0,a_1 \dots\}$，存在有限数列 $\{r_0,r_1\dots r_{m-1}\}$，使得 $p\ge m-1,\sum\limits_{i=0}^{m-1}r_ia_{p-i}=0$，那么我们称数列 $r$ 为数列 $a$ 的线性递归式，若 $r_0=1$，则称 $r$ 为线性递推式，称其阶数为 $m-1$。

容易发现，如果设 $r$ 的生成函数为 $R$，设 $a$ 的生成函数为 $A$，设 $S=AR$，则 $S$ 的次数不超过 $m-2$。

## Berlekamp-Massey 算法

已知数列 $\{a_0,a_1\dots a_{n-1}\}$，Berlekamp-Massey 算法会对其每个前缀 $\{a_0,a_1\dots a_i\}$ 求出这一前缀的最短线性递推式 $r^{(i)}$，我们设 $|r^{(i)}|-1=l_i$，即 $l_i$ 为线性递推式 $r^{(i)}$ 的阶，显然有 $l_{i-1}\le l_i$。我们令 $r^{(-1)}=\{1\}$。

## 算法流程

**引理**：若 $r^{(i-1)}$ 不是 $\{a_0,a_1,a_2\dots a_i\}$ 的线性递推式，那么有 $l_i\ge i+1-l_{i-1}$。

**证明**：反证法，设 $l_i\le i-l_{i-1}$，设 $r^{(i-1)}=\{p_0,p_1\dots p_{l_{i-1}}\},r^{(i)}=\{q_0,q_1\dots q_{l_i}\}$。

我们有 $l_i\le j\le i,a_j=-\sum\limits_{t=1}^{l_i}q_ta_{j-t}$。

由于 $l_i\le i-l_{i-1}$，我们可以做出如下变换。

$$
\begin{aligned}
-\sum\limits_{j=1}^{l_{i-1}}p_ja_{i-j}&=\sum\limits_{j=1}^{l_{i-1}}p_j\sum\limits_{k=1}^{l_i}q_ka_{i-j-k}\\
&=\sum\limits_{k=1}^{l_i}q_k\sum\limits_{j=1}^{l_{i-1}}p_ja_{i-j-k}\\
&=-\sum\limits_{k=1}^{l_i}q_ka_{i-k}\\
&=a_i
\end{aligned}
$$

所以 $r^{(i-1)}$ 是 $\{a_0,a_1,a_2\dots a_i\}$ 的线性递推式，矛盾。

于是，我们有 $l_i\ge \max(i+1-l_{i-1},l_{i-1})$。

下面给出一种构造使得 $l_i=\max(i+1-l_{i-1},l_{i-1})$，显然这样的 $r^{(i)}$ 即为 $\{a_0,a_1,a_2\dots a_i\}$ 的最短线性递推式。

如果 $r^{(i-1)}$ 是 $\{a_0,a_1,a_2\dots a_i\}$ 的线性递推式，$r^{(i)}=r^{(i-1)}$。

否则，我们设 $a$ 的生成函数为 $A$，$r^{(i)}$ 的生成函数为 $R^{(i)}$，设 $S^{(i)}\equiv AR^{(i)}\pmod{x^{i+1}}$，则有 $S^{(i)}$ 的次数不超过 $l_i-1$，即 $R^{(i)}$ 的次数 $-1$。

考虑由 $R^{(i-1)}$ 推出 $R^{(i)}$，由于 $r^{(i-1)}$ 不是 $\{a_0,a_1,a_2\dots a_i\}$ 的线性递推式，我们有 $AR^{(i-1)}\equiv S^{(i-1)}+dx^i\pmod{x^{i+1}}$。

若 $0\le j< i,l_j=0$，我们令 $r^{(i)}=\{1,0\dots 0\}$，此处有 $i+1$ 个 $0$，显然满足 $l_i=i+1-l_{i-1}$。

否则我们考虑上一次 $l_p>l_{p-1}$ 的情形，设当时的情况为 $AR^{(p-1)}\equiv S^{(p-1)}+cx^p\pmod{x^{p+1}}$，给两侧分别乘上 $x^{i-p}dc^{-1}$，那么有 $x^{i-p}dc^{-1}AR^{(p-1)}\equiv x^{i-p}dc^{-1}S^{(p-1)}+dx^i\pmod {x^{i+1}}$。

两式相减可以得到 $A(R^{(i-1)}-x^{i-p}dc^{-1}R^{(p-1)})\equiv S^{(i-1)}-x^{i-p}dc^{-1}S^{(p-1)}\pmod {x^{i+1}}$。

显然 $S^{(i-1)}-x^{i-p}dc^{-1}S^{(p-1)}$ 的次数不超过 $R^{(i-1)}-x^{i-p}dc^{-1}R^{(p-1)}$ 的次数 $-1$。

所以我们令 $R^{(i)}=R^{(i-1)}-x^{i-p}dc^{-1}R^{(p-1)}$ 即可。

由归纳法，我们设 $l_p=\max(l_{p-1},p+1-l_{p-1})$，由于 $l_p>l_{p-1}$，所以 $l_p=p+1-l_{p-1}$，那么 $l_i=\max(l_{i-1},i-p+l_{p-1})=\max(l_{i-1},i+1-l_p)=\max(l_{i-1},i+1-l_{i-1})$。

时间复杂度 $O(n^2)$。

**引理**：对于一个无限数列，若我们已知其线性递推式阶数不超过 $s$，则只需取 $\{a_0,a_1\dots a_{2s-1}\}$ 的最短线性递推式即可。

**证明**：反证，令 $t$ 为最小的满足 $t\ge 2s,r^{(t)}\ne r^{(2s-1)}$ 的数，由上一个引理，我们就有 $l_t\ge t+1-l_{2s-1}\ge t+1-s\ge 2s+1-s\ge s+1$，矛盾。

### 扩展：关于线性递推数列的远处单点求值

设数列 $\{a_0,a_1\dots \}$ 的线性递推式为 $\{r_0,r_1\dots r_{m-1}\}$，我们现在要求解 $a_n$。

我们需要已知 $a_0,a_1\dots a_{m-2}$。

设 $F(x)=x^{m-1}-\sum\limits_{i=1}^{m-1}r_ix^{m-1-i}$，$G(x)=x^n\bmod F(x)=\sum\limits_{i=0}^{m-2}g_ix^i$。

则答案为 $\sum\limits_{i=0}^{m-2}g_ia_i$。

时间复杂度 $O(m\log m\log n)$ 或 $O(m^2\log n)$，取决于是否使用 FFT 加速卷积。

??? note "示例代码 [P5487 【模板】Berlekamp–Massey 算法](https://www.luogu.com.cn/problem/P5487)"
    ```cpp
    #include<iostream>
    using std::cin;
    using std::cout;
    int const mod=998244353;
    int pow(int x,int y){
        int res=1;
        while(y){
            if(y&1) res=1ll*res*x%mod;
            x=1ll*x*x%mod,y>>=1;
        }
        return res;
    }
    int n,m,r[5010],a[10010],len;
    int bm(int *a,int n,int *r){
        int len=1,p=0,clen=0,dt=0;
        static int cr[5010];
        r[0]=1;
        for(int i=0;i<n;i++){
            int d=0;
            for(int j=0;j<len;j++) d=(d+1ll*a[i-j]*r[j])%mod;
            if(d==0) continue;
            if(len==1){
                len=i+2,p=i,cr[0]=1,clen=1,dt=d;
                continue;
            }
            int u=1ll*d*pow(dt,mod-2)%mod;
            if(i-p+clen>len){
                static int pr[5010];
                for(int i=0;i<len;i++) pr[i]=r[i];
                for(int j=0;j<clen;j++) pr[i-p+j]=(pr[i-p+j]-1ll*cr[j]*u%mod+mod)%mod;
                for(int i=0;i<len;i++) cr[i]=r[i];
                int tmp=clen;
                clen=len,dt=d;
                len=i-p+tmp;
                p=i;
                for(int i=0;i<len;i++) r[i]=pr[i];
            }else for(int j=0;j<clen;j++) r[i-p+j]=(r[i-p+j]-1ll*cr[j]*u%mod+mod)%mod;
        }
        return len-1;
    } 
    int getans(int *r,int len,int m,int *a){
        static int x[20010],res[20010];
        x[1]=1,res[0]=1;
        if(len==1) x[0]=1ll*(mod-x[1])*r[1]%mod,x[1]=0;
        int t=2*len-2;
        auto mul=[&t,&len](int *a,int *b,int *p){
            static int tmp[20010];
            for(int i=0;i<=t;i++) tmp[i]=0;
            for(int i=0;i<len;i++) for(int j=0;j<len;j++) tmp[i+j]=(tmp[i+j]+1ll*a[i]*b[j])%mod;
            for(int i=0;i<=t;i++) a[i]=tmp[i];
            for(int i=t;i>=len;i--){
                int u=(mod-a[i])%mod;
                a[i]=0;
                for(int j=1;j<=len;j++) a[i-j]=(a[i-j]+1ll*u*p[j])%mod;
            }
        };
        while(m){
            if(m&1) mul(res,x,r);
            mul(x,x,r);
            m>>=1;
        }
        int ans=0;
        for(int i=0;i<len;i++) ans=(ans+1ll*a[i]*res[i])%mod;
        return ans;
    }
    int main(){
        std::ios::sync_with_stdio(false),cin.tie(nullptr);
        cin>>n>>m;
        for(int i=0;i<n;i++) cin>>a[i];
        len=bm(a,n,r);
        for(int i=1;i<=len;i++) cout<<(mod-r[i])%mod<<' ';
        cout<<'\n'<<getans(r,len,m,a)<<'\n';
        return 0;
    }
    ```

