# set/map

## Set

`Set` 结构中的数据不重复，通过 `Same-value-zero equality` 也就是 `===` 判断其中的值是否相同,
并且可以保证数据插入的顺序

### 属性和方法

- 1.size
- 2.add(value: any)
- 3.delete(value: any)
- 4.has(value: any): boolean
- 5.clear()
- 6.keys()
- 7.values()
- 8.entries()
- 9.forEach()

可以使用 `Set` 对数组去重

```js
const a = new Set([1,2,3]);
const b = new Set([2,3,4]);
const c = [1,1,2,3,2,4]

//去重
Array.from(new Set(c))
[...new Set(c)]

// 并集 (合并 a,b 去重)
let union = new Set([...a, ...b])

// 交集 (找出 a,b 中包含的值)
let intersect = new Set([...a].filter( x => b.has(x)))

// 差集
let intersect = new Set([...a].filter( x => !b.has(x)))
```

### WeakSet/WeakMap

**WeakSet** 接受一个数组或类数组的对象作为参数，且数组成员必须是对象
其中的对象都是弱引用，在没有被引用时，会自动回收，并且 WeakSet 不可遍历

```js
// WeakSet
const ws = new WeakSet(1); // 报错
const a = [{ a: 1 }, ["a", "b"]];
const ws = new WeakSet(a); // 数组中成员必须是对象
```

**WeakMap** 只接受对象作为键值，但是 `null` 除外，其中的对象都是弱引用，在没有被引用时，会自动回收

```js
const e1 = document.getElementById("foo");
const arr = [[e1, "描述信息"]];
// arr 引用了 e1 ，当 arr 不再需要时，就需要手动删除引用,这样比较麻烦
arr[0] = null;

// 使用 WeakMap 可以自动回收
const wm = new weakMap();
const e1 = document.getElementById("foo");
wm.set(el, "something information");

// 通过 WeakMap ，当 el 不在被引用时，垃圾回收机制会自动回收 el 所在内存，避免造成内存浪费
```

## Map

`Map` 对象其实是一个二维数据，如下， `name` 和 `age` 是 `key`

```js
const map = new Map([
  ["name", "king"],
  ["age", 20],
]);

map.get("name"); // king
map.get("age"); // 20
```
