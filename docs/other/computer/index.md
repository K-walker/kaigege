# 计算机字符编码

最早的计算机采用 8 个比特(bit)作为 1 字节(byte),在计算机中，二进制的位数就表示多少个比特，
那么 8 个比特 = 11111111（二进制）= 255(十进制)，所以一个字节最大表示的整数是 255，
所以要表示更大的数，就需要更多的字节 2 个字节 = 16 个比特 = 1111111111111111(二进制) ，
所以 2 个字节表示的最大整数是 65535,

## ASCII

由于计算机是外国人发明的，早期只有 127 个字符，也就是大小写英文字母，数字，和一些符号，这个编码被称为 `ASCII` 编码，
比如大小字母 `A` 的编码是 `65` 小写字母 `a` 的编码是 `97`，但是中文一个字节不够表示，所以中国制定了 `GBK2312`

## Unicode 字符集

世界语言上百种，每种语言都制定一种编码的话，就会出现冲突，因此 `Unicode` 字符集应运而生。
`Unicode` 是一套标准，常用的是 `UCS-16` 编码，用 2 个字节表示一个字符,所以：

| 字符 | 十进制 | ASCII    | Unicode           |
| ---- | ------ | -------- | ----------------- |
| A    | 65     | 01000001 | 00000000 01000001 |

可见，`ASCII` 转成 `Unicode` 编码，只要在前面补 `0` 即可，但是 `Unicode` 编码却会占用一倍存储空间,
所以才出现了 `UTF-8`
