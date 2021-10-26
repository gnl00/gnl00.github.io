(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{409:function(s,t,a){"use strict";a.r(t);var n=a(31),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"算法基础"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#算法基础"}},[s._v("#")]),s._v(" 算法基础")]),s._v(" "),a("h2",{attrs:{id:"位运算"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#位运算"}},[s._v("#")]),s._v(" 位运算")]),s._v(" "),a("blockquote",[a("p",[s._v("&、|、^、~、<<、>>")])]),s._v(" "),a("h3",{attrs:{id:"基础知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础知识"}},[s._v("#")]),s._v(" 基础知识")]),s._v(" "),a("p",[a("strong",[s._v("运算符号")])]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("符号")]),s._v(" "),a("th",[s._v("描述")]),s._v(" "),a("th",[s._v("运算规则")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("&")]),s._v(" "),a("td",[s._v("与")]),s._v(" "),a("td",[s._v("两个位都为1时，结果才为1")])]),s._v(" "),a("tr",[a("td",[s._v("|")]),s._v(" "),a("td",[s._v("或")]),s._v(" "),a("td",[s._v("两个位都为0时，结果才为0")])]),s._v(" "),a("tr",[a("td",[s._v("^")]),s._v(" "),a("td",[s._v("异或")]),s._v(" "),a("td",[s._v("两个位相同为0，相异为1")])]),s._v(" "),a("tr",[a("td",[s._v("~")]),s._v(" "),a("td",[s._v("取反")]),s._v(" "),a("td",[s._v("0变1，1变0")])]),s._v(" "),a("tr",[a("td",[s._v("<<")]),s._v(" "),a("td",[s._v("左移")]),s._v(" "),a("td",[s._v("各二进位全部左移若干位，高位丢弃，低位补0（左移运算相当于乘2^n）")])]),s._v(" "),a("tr",[a("td",[s._v(">>")]),s._v(" "),a("td",[s._v("右移")]),s._v(" "),a("td",[s._v("各二进位全部右移若干位，对无符号位，高位补0；对有符号位，各编译器处理方法不一样，有的补符号位（算术右移），有的补0（逻辑右移）。（右移运算相当于除2^n）")])])])]),s._v(" "),a("p",[a("strong",[s._v("原/反/补码")])]),s._v(" "),a("ul",[a("li",[a("p",[a("strong",[s._v("原 码")]),s._v("，一个整数按照绝对值大小转化成的二进制数称为原码")]),s._v(" "),a("p",[s._v("例如，0000 1110 是14的原码")])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("反 码")]),s._v("，将二进制数按位取反，所得到的新二进制数称为原二进制数的反码。原码和反码这两者互为反码")]),s._v(" "),a("p",[s._v("例如，将0000 1110 每一位取反，得1111 0001")])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("补 码")]),s._v("，反码加1称为补码")]),s._v(" "),a("p",[s._v("1111 0001 + 0000 0001 = 1111 0010")])])]),s._v(" "),a("p",[a("strong",[s._v("按位与运算")])]),s._v(" "),a("blockquote",[a("p",[s._v("参加运算的两个数据，按二进制位进行"),a("code",[s._v("&")]),s._v("运算。两位同时为1时，结果才为1，否则为0")])]),s._v(" "),a("p",[a("strong",[s._v("运算规则")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("0&0=0 0&1=0 1&0=0 1&1=1\n3&5 ==> 0000 0011 & 0000 0101 = 0000 0001\n因此，3&5=1\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("与运算用途")])]),s._v(" "),a("ol",[a("li",[a("p",[a("strong",[s._v("清零")])]),s._v(" "),a("p",[s._v("如果想将一个单元清零，即使其全部二进制位为0，只要与一个各位都为0的数值进行与运算，结果为0")])]),s._v(" "),a("li",[a("p",[s._v("取一个数的"),a("strong",[s._v("指定位")])]),s._v(" "),a("p",[s._v("比如，取数N=10101110 的低4位，只需要另找一个数M，另M的低4位为1，其余位为0，即M=00001111，然后将N与M进行与运算，N&M=00001110 ，即可得到N的指定位")])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("判断奇偶")])]),s._v(" "),a("p",[s._v("只要根据最末位是0还是1来判断，是0就是偶数，是1就是基数。因此可以用"),a("code",[s._v("if((n & 1) == 1)")]),s._v("或"),a("code",[s._v("if((n & 1) == 0)")]),s._v("来判断奇偶")])])]),s._v(" "),a("p",[a("strong",[s._v("按位或运算")])]),s._v(" "),a("blockquote",[a("p",[s._v("参加运算的两个数据，按二进制位进行"),a("code",[s._v("|")]),s._v("运算。两个位都为0时，结果才为0")])]),s._v(" "),a("p",[a("strong",[s._v("运算规则")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("0|0=0 0|1=1 1|0=1 1|1=1\n3|5 ==> 0000 0011 | 0000 0101 = 0000 0111\n因此，3|5=7\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("需要注意的是，负数按补码形式参加按位或运算")]),s._v(" "),a("p",[a("strong",[s._v("运算用途")])]),s._v(" "),a("ol",[a("li",[a("p",[s._v("常用来对一个数据的某些位设置为1")]),s._v(" "),a("p",[s._v("比如，将数 X=1010 1110 的低4位设置为1，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行按位或运算（X|Y=1010 1111）即可得到")])])]),s._v(" "),a("p",[a("strong",[s._v("异或运算")])]),s._v(" "),a("blockquote",[a("p",[s._v("参加运算的两个数据，按二进制位进行"),a("code",[s._v("^")]),s._v("运算。两个位相同为0，相异为1")])]),s._v(" "),a("p",[a("strong",[s._v("运算规则")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("0^0=0 0^1=1 1^0=1 1^1=0\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("异或的性质")])]),s._v(" "),a("ol",[a("li",[s._v("交换律")]),s._v(" "),a("li",[s._v("结合律，(a^b)^c == a^(b^c)")]),s._v(" "),a("li",[s._v("对任何数a，都有a^a=0，a^0=a")]),s._v(" "),a("li",[s._v("自反性，a^b^b=a^0=a")])]),s._v(" "),a("p",[a("strong",[s._v("运算用途")])]),s._v(" "),a("ol",[a("li",[a("p",[s._v("翻转指定位")]),s._v(" "),a("p",[s._v("比如，将数 X=1010 1110 的低4位进行翻转，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行异或运算（X^Y=1010 0001）即可得到")])]),s._v(" "),a("li",[a("p",[s._v("与0相异或值不变")]),s._v(" "),a("p",[s._v("1010 1110 ^ 0000 0000 = 1010 1110")])]),s._v(" "),a("li",[a("p",[s._v("交换两个数")]),s._v(" "),a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// a=0000 0001")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// b=0000 1111")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// a = a^b = 0000 1110")]),s._v("\n        a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^=")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// b = b^a = 0000 0001")]),s._v("\n        b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^=")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// a = a^b = 0000 1111")]),s._v("\n        a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^=")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("找出数组中只出现过一次的数")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * 找出数组中只出现过一次的数\n */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("single")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" temp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 异或运算")]),s._v("\n        temp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^=")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("temp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])])])]),s._v(" "),a("p",[a("strong",[s._v("取反运算")])]),s._v(" "),a("blockquote",[a("p",[s._v("参加运算的一个数据，按二进制位进行"),a("code",[s._v("~")]),s._v("运算。0变1，1变0")])]),s._v(" "),a("p",[a("strong",[s._v("运算规则")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("~1=0\n~0=1\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("strong",[s._v("运算用途")])]),s._v(" "),a("ol",[a("li",[a("p",[s._v("使一个数的最低位为0")]),s._v(" "),a("p",[s._v("例如，有一个数a，使a的最低位为0，可以表示为"),a("code",[s._v("a & ~1")]),s._v("。"),a("code",[s._v("~1")]),s._v("的值为 1111 1110，再按"),a("code",[s._v("&")]),s._v("运算，最低位一定为0。因为"),a("code",[s._v("~")]),s._v("运算符的优先级比算术运算符、关系运算符、逻辑运算符和其他运算符都高")])])]),s._v(" "),a("p",[a("strong",[s._v("左移运算")])]),s._v(" "),a("blockquote",[a("p",[s._v("将一个运算对象的各二进制位全部左移若干位（左边的二进制位丢弃，右边补0）")])]),s._v(" "),a("p",[a("strong",[s._v("运算规则")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("// a= 0000 0001 = 1\na = a << 2 = 0000 0100 = 4\n相当于，a*2^2 = 1*4 = 4\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("右移运算")])]),s._v(" "),a("blockquote",[a("p",[s._v("将一个数的各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃")])]),s._v(" "),a("p",[a("strong",[s._v("运算规则")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("// a= 0000 1000 = 8\na = a >> 2 = 0000 0010 = 2\n相当于，a/2^2 = 8/4 = 2\n// 无符号右移，左补0，右边丢弃\na = a >>> 2\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("strong",[s._v("复合运算")])]),s._v(" "),a("blockquote",[a("p",[s._v("位运算符与赋值运算符结合，组成新的复合赋值运算符")])]),s._v(" "),a("p",[a("strong",[s._v("运算符")])]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("运算符")]),s._v(" "),a("th",[s._v("例子")]),s._v(" "),a("th",[s._v("等价于")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("&=")]),s._v(" "),a("td",[s._v("a&=b")]),s._v(" "),a("td",[s._v("a=a&b")])]),s._v(" "),a("tr",[a("td",[s._v("|=")]),s._v(" "),a("td",[s._v("a|=b")]),s._v(" "),a("td",[s._v("a=a|b")])]),s._v(" "),a("tr",[a("td",[s._v(">>=")]),s._v(" "),a("td",[s._v("a>>=b")]),s._v(" "),a("td",[s._v("a=a>>b")])]),s._v(" "),a("tr",[a("td",[s._v("<<=")]),s._v(" "),a("td",[s._v("a<<=b")]),s._v(" "),a("td",[s._v("a=a<<b")])]),s._v(" "),a("tr",[a("td",[s._v("^=")]),s._v(" "),a("td",[s._v("a^=b")]),s._v(" "),a("td",[s._v("a=a^b")])])])]),s._v(" "),a("p",[a("strong",[s._v("运算规则")])]),s._v(" "),a("ol",[a("li",[s._v("不同长度的数据进行位运算，如果两个不同长度的数据进行位运算时，系统会将二者按右端对齐，正数左补0，负数左补1，然后进行位运算")])]),s._v(" "),a("h3",{attrs:{id:"实现加减乘除"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现加减乘除"}},[s._v("#")]),s._v(" 实现加减乘除")]),s._v(" "),a("p",[a("strong",[s._v("加法")])]),s._v(" "),a("p",[a("strong",[s._v("实现步骤")])]),s._v(" "),a("ol",[a("li",[a("p",[s._v("不考虑进位，分别将各位数相加，结果存为sum")])]),s._v(" "),a("li",[a("p",[s._v("只考虑进位，结果存为carry")])]),s._v(" "),a("li",[a("p",[s._v("如果步骤②中的carry不为0，则将sum和carry相加重复步骤①的操作")]),s._v(" "),a("p",[s._v("如果carry=0，运算结束，sum即为运算结果")])])]),s._v(" "),a("p",[a("strong",[s._v("举例说明")])]),s._v(" "),a("p",[s._v("十进制例，例如，13+9")]),s._v(" "),a("ol",[a("li",[s._v("不考虑进位，第一步得sum=12")]),s._v(" "),a("li",[s._v("不考虑进位，第二步得carry=10")]),s._v(" "),a("li",[s._v("判断carry是否为0，carry结果不是0，将sum和carry相加重复步骤①操作")]),s._v(" "),a("li",[s._v("不考虑进位，新一轮的sum=22")]),s._v(" "),a("li",[s._v("只考虑进位，新一轮的carry=0")]),s._v(" "),a("li",[s._v("判断carry是否为0，carry=0，运算结束，结果即为sum")])]),s._v(" "),a("p",[s._v("二进制例，例如，13的二进制为0000 1101，9的二进制为0000 1001")]),s._v(" "),a("ol",[a("li",[s._v("不考虑进位，分别对各位数相加，sum = 0000 1101 + 0000 1001 = 0000 0100，在位运算中，相当于"),a("strong",[s._v("异或运算")])]),s._v(" "),a("li",[s._v("只考虑进位，carry = 0000 1101 + 0000 1001 = 0001 0010，在为运算中，相当于"),a("strong",[s._v("先进行与运算，再将结果左移1位")])]),s._v(" "),a("li",[s._v("判断carry是否为0，为0结束，否则重复")])]),s._v(" "),a("p",[a("strong",[s._v("代码实现")])]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * 位运算实现加法，递归实现\n */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 先异或")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 再进行与，然后左移1位")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" carry "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" carry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[a("strong",[s._v("减法")])]),s._v(" "),a("blockquote",[a("p",[s._v("减法可以看成被减数加上减数的补码")])]),s._v(" "),a("p",[a("strong",[s._v("实现步骤")])]),s._v(" "),a("ol",[a("li",[s._v("取得减数的反码，即1变0，0变1")]),s._v(" "),a("li",[s._v("将减数的反码+1，得到减数的"),a("strong",[s._v("补码")])]),s._v(" "),a("li",[s._v("将"),a("strong",[s._v("被减数与减数的补码相加")])])]),s._v(" "),a("p",[a("strong",[s._v("代码实现")])]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * 位运算实现减法\n */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("subtraction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),s._v("b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[a("strong",[s._v("乘法")])]),s._v(" "),a("blockquote",[a("p",[s._v("十进制乘法的步骤对于二进乘法也适用")])]),s._v(" "),a("p",[a("strong",[s._v("实现步骤")])]),s._v(" "),a("ol",[a("li",[s._v("判断"),a("strong",[s._v("乘数是否为0")]),s._v("，为0跳到④")]),s._v(" "),a("li",[s._v("将"),a("strong",[s._v("乘数和1作与运算")]),s._v("，确定末尾是1还是0，如果是1，则"),a("strong",[s._v("相加数为当前被乘数")]),s._v("；如果为0，则"),a("strong",[s._v("相加数为0")]),s._v("；将"),a("strong",[s._v("所有的相加数加到一起")]),s._v("，就是最终结果")]),s._v(" "),a("li",[s._v("被乘数左移1位，乘数右移1位，回到步骤①")]),s._v(" "),a("li",[s._v("确定符号位，输出结果")])]),s._v(" "),a("p",[a("strong",[s._v("代码实现")])]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * 位运算实现乘法\n * @param a 被乘数\n * @param b 乘数\n * @return int\n */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("multi")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" res "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1. 判断乘数是否为0，为0直接返回0")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 确定末尾是1还是0")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 末尾为1，相加数是当前被乘数")]),s._v("\n            res "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+=")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 移位")]),s._v("\n            a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 末尾为0，相加数为0")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// res += 0，res不用执行操作")]),s._v("\n\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 移位")]),s._v("\n            a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br")])]),a("p",[a("strong",[s._v("除法")])]),s._v(" "),a("p",[a("strong",[s._v("实现思路")])]),s._v(" "),a("ul",[a("li",[s._v("除法可以转换成减法运算，即用被除数不断减去除数，直到被除数小于除数，此时两个数相减的次数就是商，而最终的被除数就是余数。")]),s._v(" "),a("li",[s._v("需要注意的是符号的确定，商的符号和乘法运算中的乘积的符号确定一样，取决于被除数和除数，同号为正，异号为负；余数的符号和被除数一致")])]),s._v(" "),a("p",[a("strong",[s._v("代码实现")])]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * 位运算实现除法\n * @param a 被除数\n * @param b 除数\n * @return int\n */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("division")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" res "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        res "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("division")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("subtraction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])])])}),[],!1,null,null,null);t.default=r.exports}}]);