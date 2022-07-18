## 公理

**公理 $0$** 每个数都在某一天被生成，天数为自然数集合。令 $d(x)$ 表示 $x$ 被生成的天数。

**公理 $1$** 每个数对应两个之前的数的集合，满足没有左边的数大于等于右边的数。

写作 $x=\{X_L|X_R\}$。

**公理 $2$** 一个数小于等于另一个数当且仅当第一个数的左集合没有大于等于第二个数的，并且第二个数的右集合没有小于等于第一个数的。

这是良定义的。因为我们在比较 $x, y$ 时援引 $X_L, Y_R$，会有 $d(x_L)+d(y)=d(x)+d(y_R)=d(x)+d(y)-1$，直到最后 $X_L, Y_R$ 均为空集时，小于等于号自然成立。

## 有限天内的情况

先来看看前两天会发生什么。

第零天，我们有 $0=\{\emptyset| \emptyset\}$，简写为 $\{|\}$。

我们可知，$0 \leq 0$。

第一天，我们可以有 $\{0|\}, \{|0\}, \{0|0\}$ 三个数。但第三个数不满足公理 $1$。

前两个数，既然代表了两种原初方向性，我们将其对应为 $-1, 1$。

可知，$-1 \leq 0, 0 \leq 1, -1 \leq 1$。

***

**定理** $\leq $ 满足传递性，也即 $a \leq b, b \leq c \Rightarrow a \leq c$。

**证明** 使用反证法，再使用归纳法。

如果 $x \leq y, y \leq z, x \not \leq z$，则有

* $\exist x_L \in X_L, x_L \geq z$

此时 $y \leq z, z \leq x_L, y \not \leq x_L$。

或

* $\exist z_R \in Z_R, z_R \leq x$

此时 $z_R \leq x, x \leq y, z_R \not \leq y$。

也就是说，若 $(x, y, z)$ 不满足传递性，则我们可以找到一组 $(y, z, x_L)$ 或 $(z_R, x, y)$ 也不满足传递性。


$$d(y)+d(z)+d(x_L)=d(z_R)+d(x)+d(y)=d(x)+d(y)+d(z)-1$$

使用归纳法，直到 $x, y, z \in \{0, 1, -1\}$，我们却发现，其一定满足传递性。矛盾。故不满足传递性的例子从一开始就不存在。

**定理** $\leq $ 满足自反性，也即 $x \leq x$。

**证明** 使用归纳法，再使用反证法。

归纳 设 $x \leq x$ 对所有 $d(x) \leq k$ 的数成立。$k=0$ 时成立，若 $k$ 成立，考虑 $d(x)=k+1$ 的 $x$。

若 $x \not \leq x$，则有

* $\exist x_L \in X_L, x \leq x_L$

或

* $\exist x_R \in X_R, x_R \leq x$


此时再把一式的 $\leq$ 拆开，有

* $X_L \not \geq x_L$。其中便有 $x_L \not \geq x_L$，这与归纳假设不符。

同理，二式也能得到矛盾。归纳假设成立。

**定理** $X_L \leq x \leq X_R$。

**证明** 使用归纳法，再使用反证法。

归纳 设 $X_L \leq x \leq X_R$ 对所有 $d(x) \leq k$ 的数成立。$k=0$ 时成立，若 $k$ 成立，考虑 $d(x)=k+1$ 的 $x$。

若 $x_L \not \leq x$，则

* $\exist x_{LL} \in (X_L)_L, x_{LL} \geq x$

或

* $\exist x_R, x_R \leq X_L$，这显然不会成立。

根据归纳假设，$x \leq x_{LL} \leq x_L$，这说明 $x \leq x_L$（**注意 反对称性还未被证明！！不能直接从 $x_L \not \leq x$ 得出**），则 $X_L \not \geq x_L$，矛盾。故归纳假设成立。


**定理** $\leq$ 满足反对称性，也即 $y \not \leq x \Rightarrow x \leq y$。

**证明** 使用反证法。

如果 $y \not \leq x, x \not \leq y$，则有

* $\exist x_L, x_L \geq y$

或

* $\exist y_R, x \geq y_R$

对一式，考虑 $y \leq x_L \leq x$，根据传递性有 $y \leq x$，矛盾。二式同理。



**推论** 超现实数有 $\leq$ 给定的全序关系。

**推论** $X_L < x < X_R$。

第二天，我们有了非常多种生成的选项，其中 $\{-1|1\}$ 满足 $\{-1|1\} \leq 0, \{-1|1\} \geq 0$，但其与 $0$ 的左右集合并不相同。我们记这样的关系为相似。

**定义** 若 $x, y$ 满足 $x \leq y, y \leq x$，则称 $x$ 和 $y$ 相似，记作 $x \equiv y$。

**定理** 若两个数的左右集合存在一一对应关系使得每一对元素相似，则两数相似。

令

$$f_L:X_L \to Y_L, f_L(x_L) \equiv x_L$$

$$f_R:X_R \to Y_R, f_R(x_R)\equiv x_R$$

$$g_L:Y_L \to X_L, g_L(y_L) \equiv y_L$$

$$g_L:Y_R \to X_R, g_R(y_R) \equiv y_R$$

**证明** 

$$\forall x_L \in X_L, x_L \leq f_L(x_L) < y$$

同理 $x < Y_R$ 可得 $x \leq y$，同理对称可得 $y \leq x$。

***

**定理** （最简性定理）$y=\{Y_L|Y_R\}$，如果 $x$ 是最早的被创造的满足 $Y_L < x < Y_R$ 的元素，则有 $x\equiv y$。

**证明** 令 $z = \{X_L \cup Y_L| X_R \cup Y_R\}$，则有 $X_L \cup Y_L < x, z < X_R$，故 $z \leq x$，又有 $x < X_R \cup Y_R, X_L < z$，故 $x \leq z$，也即 $x \equiv z$。同理，$y \equiv z$，故 $x \equiv y$。

**定理** 若 $X_L, X_R$ 是有限集合，则 $\{X_L|X_R\} \equiv \{\max\{X_L\}|\min\{X_R\}\}$。

**证明** 两者拥有同样的最早的被创造的 $x$。

**定理** 若第 $n$ 天，我们已经有的元素有

$$x_1 < x_2 < \ldots < x_m$$

那么第 $n+1$ 天，我们将有

$$\{|x_1\} < x_1 < \{x_1|x_2\} < x_2 < \ldots < \{x_{m-1}|x_m\} < x_m < \{x_m|\}$$

**证明** 根据上一条定理，我们只用考虑所有的 $\{x_i|x_j\}$ 和 $\{|x_i\}, \{x_i|\}$。

* $\{x_{i-1}|x_{i+1}\}$ 是不可能存在的。因为 $x_i$ 是最早的满足 $x_{i-1} < x_i < x_{i+1}$ 的数，两者相似。

* $\{x_{i-1}|x_{j+1}\}$ 是不可能存在的。因为 $x_i \sim x_j$ 均比其更早。

* $\{|x_{i+1}\}$（$1 \leq i < n$）是不可能存在的。因为 $x_1 \sim x_i$ 均比其更早。

* $\{x_{i-1}|\}$ 是不可能存在的。

也就是说，要想产生新的数，只能在原有的数上做加细。

**推论** 第 $n$ 天（$n \in \mathbb N$）共有 $2^{n+1}-1$ 个数。

## 运算

**定义** $x=\{X_L|X_R\}$，则 $-x=\{-X_R|-X_L\}$。

**定理** $x \leq y \Leftrightarrow -y \leq -x$。

**定义** $x+y=\{X_L+y,x+Y_L|X_R+y,x+Y_R\}$。

为了方便论述其为良定义的，我们先要引入不满足公理 $1$ 的数，再证明其不会因 $+$ 而产生（类似于证明 $x$ 等于 $x$ 的共轭来说明其为实数一样）。

称不满足没有左边的数大于等于右边的数的为伪数。如 $\{0|0\}, \{1|0\}$ 等。

我们可以在伪数上同样定义 $\leq$，因为 $\leq$ 的定义不依赖于公理 $1$。

**定理** $\leq$ 在伪数上满足传递性。

**定理** 加法满足交换律，即 $x+y=y+x$。

**证明** 使用归纳法。$x+y=\{X_L+y, x+Y_L | X_R+y, x+Y_R\}=\{Y_L+x, y+X_L | Y_R+x, y+X_R\}=y+x$。

**定理** 加法满足结合律，即 $(x+y)+z=x+(y+z)$。

**证明** 使用归纳法。展开即可。

**定理** 加法对 $\leq$ 满足消去律，即 $x \leq y \Leftrightarrow x+z \leq y + z$。

证明了这一点，我们便能说明满足公理 $1$ 的数之间的加法也能满足公理 $1$。

**证明** 令 $I(x, y, z)$ 表示 $(x, y, z)$ 满足 $x \leq y \Rightarrow x+z \leq y + z$，$II(x, y, z)$ 表示 $x \leq y \Leftarrow x+z \leq y + z$，按 $d(x)+d(y)+d(z)$ 从小到大对两者进行互归纳法，再使用反证法。

* $I(x, y, z)$ 等价于 $x \leq y \Rightarrow \{X_L+z\} \cup \{x+Z_L\} < y+z, x+z < \{Y_R+z \} \cup \{y+Z_R\}$。

    将这个式子展开有

    $$X_L+z < y + z, x + z < Y_R + z$$

    $$x+Z_L < y + z, x + z < y + Z_R$$

    先看第一行。若存在 $x_L$ 使得 $x_L+z \geq y + z$，由 $II(x_L, y, z)$，根据归纳假设，$x_L \geq y$，这与 $x_L < x \leq y$ 矛盾。故 $X_L + z < y + z$。同理，$x + z < Y_R + z$。

    再看第二行。若存在 $z_L$ 使得 $x + z_L \geq y+z$，由 $I(x, y, z_L)$ 得 $x+z_L \leq y + z_L$，则有 $y + Z_L < y+z \leq x + z_L \leq y + z_L$，矛盾。

* $II(x, y, z)$ 等价于 $x + z \leq y + z \Rightarrow X_L < y, x < Y_R$。

    若存在 $x_L$ 使得 $y \leq x_L$，由 $I(x_L, y, z)$ 得 $y + z \leq x_L + z$，则有 $X_L + Z < x + z \leq y + z \leq x_L + z$，矛盾。同理，另一边也成立。

**定理** $x+0=x$。

**定理** $x+(-x)=0$。

**证明** 归纳，反证，简单性定理。

**定义** $x-y=x+(-y)$。

现在我们可知，加法有

* 结合律

* 交换律

* 逆元

* 零元

故超现实数在加法下构成了一个阿贝尔群。



## 