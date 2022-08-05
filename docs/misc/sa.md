# 模拟退火
> 退火神教是一种信仰。 —— xkcdjerry

## 概念
模拟退火（简称模退或退火）是一种玄学算法，常用于解决规模较小的最优化问题（即找到某个状态 $S$ 使得给出的函数 $f(S)$ 最小或最大）。  

## 常用情景
由于模退得到的是较优解而不是最优解，故在 OI 种往往不作为正解出现。但是由于其几乎可用在所有最优化问题上的特性被常用于骗分算法。但是也存在一些能够拿到满分的题，如：

旅行商问题（[吃奶酪](https://www.luogu.com.cn/problem/P1433) 在 $n$ 较大 ($n \geqslant 30$) 时的情况），多元高次方程的求解（[\[JSOI2008\]球形空间产生器](https://www.luogu.com.cn/problem/P4035)），以及最优装配问题（[NR 机装配](https://www.luogu.com.cn/problem/U209515)）等。  

## 总体结构
退火的总体结构是与题无关的，下列出伪代码：  
```
while(时间足够)
{
    生成初始解 now
    设置初始温度
    while(温度>截止温度)
    {
        生成 now 的随机转移 temp
        if(接受 now 到 temp 的转移) now=temp;
        if(now 是最优解) best=now;
        降温
    }
}
输出 best
```

可见，退火算法设计中需要明确的内容为：

- 解包含哪些状态（一个良好的解表示可以减少无用的转移）

- 生成初始解的方法（可以利用贪心等方式得到一个较优的初始解，但是要注意避免每次生成相同的初始解导致循环退火结果相同）

- 估价函数（$f$）

- 转移的方法（需要保证任意状态均能由任意初始解经过有限次转移得到）

可以任意修改的内容为：  

- 运行退火的时间（时限为 $1$ 秒时常定义为 $0.8$ 秒）

- 初始温度

- 截止温度

可以一定程度上修改的内容为：

- 降温方式及速度（一般约定为给当前温度乘上 $0.85$ 到 $0.999$ 之间的一个数）

- 接受规则

以最小化 $f(S)$ 为例，常用的接受规则为  
`f(now)>=f(temp)||exp((f(now)-f(temp))/T/kb)*RAND_MAX>rand()`  
其中 `T` 为温度， `kb` 为接受常数，常用值为 `1.38e-23`。

## 实战讲解
此处以 [NR 机装配](https://www.luogu.com.cn/problem/U209515) 一题为例讲解模拟退火的四部构建法（因为洛谷上大多数模退题都可以用其它算法切掉）：

第一步：明确重点内容：

- 解包含的状态：每个零件所属的 NR 机。

- 生成初始解的方法：没有有效贪心，随机生成。

- 估价函数：显然，一个瑕疵点略大于限度的装配优于一个瑕疵点远大于限度的装配，所以为所有满足限度的记 $1$ 分，其它的记 $\epsilon \times exp(limit-sum)$ 分。

- 转移：随机交换两个零件所属的 NR 机。
  
第二步：根据重点内容写出对应代码：
```c++
//解
struct solu { int a[N][N]; }s, best;
//初始解
void init(solu &s)
{
    for(int i=0;i<n;i++) for(int j=0;j<len[i];j++)
        s.a[i][j] = j;
    for(int i=0;i<n;i++)
        std::random_shuffle(s.a[i], s.a[i] + len[i]);
}
//估价函数
double C(solu s)
{
    double ans=0;
    for (int i=0;i<mnl;i++)
    {
        int tot=0;
        for (int j=0;j<n;j++) tot+=a[j][s.a[j][i]];
        if (tot<=k) ans+=1;
        else ans+=exp(k-tot)/N;
    }
    return ans;
}
//转移函数
solu turn(solu s)
{
    int x=rand()%n;
    int y=rand()%len[x],z=rand()%mnl;
    swap(s.a[x][y],s.a[x][z]);
}
```

第三步：套模板（较小的函数可以直接嵌入退火主题种）
```c++
#define TEMP 1e12
#define eps 1e-9
#define COOL 0.997
#define kb 1.38e-23

bool accept(double d, double t)
{return d>=0||exp(d/t/kb)*RAND_MAX>rand();}
void sa()
{
    srand(0xfacefeed*rand());
    for(int i=0;i<n;i++) for(int j=0;j<len[i];j++)
        s.a[i][j] = j;
    for(int i=0;i<n;i++)
        std::random_shuffle(s.a[i], s.a[i] + len[i]);
    nc=C(s);
    for(double T=TEMP;T>eps;T*=COOL)
    {
        int x=rand()%n;
        int y=rand()%len[x],z=rand()%mnl;
        swap(s.a[x][y], s.a[x][z]); tc=C(s);
        if(accept(tc-nc,T))
        {nc=tc;if(nc>bc){bc=nc;best=s;}}
        else swap(s.a[x][y], s.a[x][z]);
    }
}
```
第四步：主程序（数据读入和答案输出）
```c++
int main()
{
    scanf("%d%d",&n,&k); mnl=N*2;
    srand(0xdeadbeef);
    for(int i=0;i<n;i++)
    {
        scanf("%d",len+i);
        for(int j=0; j<len[i];j++) scanf("%d",a[i]+j);
        if(len[i]<mnl) mnl=len[i];
    }
    while(clock()<1.8*CLOCKS_PER_SEC) sa();
    printf("%d\n",(int)bc);
    for(int i=0;i<mnl;i++)
    {
        int tot=0;
        for(int j=0;j<n;j++) tot+=a[j][best.a[j][i]];
        if(tot<=k)
        {
            for(int j=0;j<n;j++)
                printf("%d ",best.a[j][i] + 1);
            putchar('\n');
        }
    }
}
```
[AC 记录](https://www.luogu.com.cn/record/72707354)

按照这个步骤走下来，就能切掉大多数退火题了~
