let my_lodash = {

  /**
   * 返回接收到的第一个参数
   * @param  {*} value 任何值
   * @return {*}       返回值
   */
  identity: function (value) {
    return value
  },

   /**
   * 创建一个新数组,将原数组分组
   * @param  {array} array     原数组
   * @param  {Number} [size=1] 每组长度
   * @return {array}           新的数组
   */
  chunk: function(array, size = 1) {
    let ary = [], i
    for (i = 0; i < array.length; i = i + size) {
      if (i + size >= array.length) {
        ary.push(array.slice(i))
        return ary
      } 
      ary.push(array.slice(i,i + size))
    }
  },
  /**
   * 创建一个新数组,包含原数组中所有的非假值元素
   * @param  {array} array 原数组
   * @return {array}       新数组
   */
  compact: function(array) {
    let ary = [], i
    for (i = 0; i < array.length; i++) {
      if (typeof array[i] === "number" && array[i] != 0 && array[i] === array[i]) {
        ary.push(array[i])
      }
    }
    return ary
  },
   /**
   * 连接值和数组
   * @param  {array} array        被连接的数组
   * @param  {values} ...values   需要连接的数组
   * @return {array}              连接后的数组
   */
  concat: function (array, ...values) {
    let ary = []
    for (let i = 0; i < array.length; i++) ary.push(array[i])
    for (let i = 0; i < values.length; i++) {
      if (my_lodash.isArray(values[i])) {
        for (let j = 0; j < values[i].length; j++) ary.push(values[i][j])
      } else ary.push(values[i])
    }
    return ary
  },

  /**
   * 创建一个具有唯一array值的数组,每个值不包含在其他给定的数组中。
   * @param  {array} array     原数组
   * @param  {values} values   其他数组
   * @return {array}           唯一值新数组
   */

  difference: function(array, ...values) {
    let ary = [], i, judge = []
    for (i = 1; i < arguments.length; i++) {
      judge = judge.concat(arguments[i])
    }
    for (i = 0; i < array.length; i++) {
      if (judge.includes(array[i]) === false) {
        ary.push(array[i])
      }
    }
    return ary
  },

   /**
   * 类似于difference,为每个值调用iteratee    在进行比较
   * @param  {array} array                  被比较数组
   * @param  {...array} values              比较数组
   * @param  {function} iteratee=_.identity 调用的函数
   * @return {array}                        返回新的数组
   */
  differenceBy: function (array, ...others) {
    let iteratee
    if (!my_lodash.isArray(others[others.length - 1])) {
      iteratee = others.pop()
    } else {
      iteratee = my_lodash.identity
    }
    let ary = [].concat(...others).map(arg => my_lodash.iteratee(iteratee)(arg))
    return array.filter(item => {
        return !ary.includes(my_lodash.iteratee(iteratee)(item))
    })
  },

   /**
   * 类似于difference自定义比较方式在进行比较
   * @param  {array} array                  被比较数组
   * @param  {...array} values              比较数组
   * @param  {function} comparator          调用的函数
   * @return {array}                        返回新的数组
   */
  differenceWith: function (array, ...others) {
    let comparator = others.pop()
    let ary =  [].concat(...others)
    return array.filter(it => {
        for (let i = 0; i < ary.length; i++) {
            if (my_lodash.iteratee(comparator)(it, ary[i])) {
                return false
            }
        }
        return true
    })
  },

  /**
   * 创建一个切割数组,去除array前面的n个元素.(n默认值为1)
   * @param  {array} array  被切割数组
   * @param  {Number} [n=1] 开始切割的位置
   * @return {array}        返回新数组
   */
  drop: function(array, n = 1) {
    let ary = array.slice(0), i
    if (arguments[1] === undefined) {
      n = 1
    }
    for (i = 0; i < n; i++) {
      ary.shift()
    }
    return ary
  },

   /**
   * 返回一个从指定位置反方向在原数组上切割的新数组
   * @param  {array} array  被切割数组
   * @param  {Number} [n=1] 开始切割的位置
   * @return {array}        返回新数组
   */
  dropRight: function (array, n = 1) {
    let index = array.length - n
    return array.reduce(function (ary, val, i) {
      if (i < index) {
        ary.push(val)
      }
      return ary
    }, [])
  },

  /**
   * 创建一个切割数组,去除array中从predicate返回假值开始到尾部的部分
   * @param  {array} array                               被切割数组
   * @param  {function} [predicate = my_lodash.identity] 断言函数
   * @return {array}                                     返回新数组
   */
  dropRightWhile: function (array, predicate = my_lodash.identity) {
    let ary = [],i = array.length - 1
    for (i; i >= 0; i--) {
      if (my_lodash.iteratee(predicate)(array[i]) === false) break
    }
    for (let j = 0; j <= i; j++) {
      ary.push(array[j])
    }
    return ary
  },

  /**
   * 创建一个切割数组,去除array中从起点开始到predicate返回假值结束部分
   * @param  {array} array                                被切割数组
   * @param  {function} [predicate =  my_lodash.identity] 断言函数
   * @return {array}                                      返回新数组
   */
  dropWhile: function (array, predicate = my_lodash.identity) {
    let ary = [],i = 0
    for (i; i < array.length; i++) {
      if (my_lodash.iteratee(predicate)(array[i]) === false) break
    }
    for (i; i < array.length; i++) {
      ary.push(array[i])
    }
    return ary
  },

  /**
   * 使用value值来填充(替换)array,从start位置开始,到end位置结束(但不包含end位置)
   * @param  {array} array                 被分配的数组
   * @param  {*} value                     分配给数组的值
   * @param  {Number} [start = 0]          区段起始位置
   * @param  {number} [end = array.length] 区段结束为止（不包含）
   * @return {array}                       修改后的数组
   */
  fill: function(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },

  /**
   * 返回断言函数第一次返回true的元素的索引,如果找不到则返回-1
   * @param  {array} array                               被查找的数组
   * @param  {function} [predicate = my_lodash.identity] 断言函数
   * @param  {Number} [fromIndex = 0]                    开始查找的位置
   * @return {number}                                    索引
   */
  findIndex: function (array, predicate = my_lodash.identity, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (my_lodash.iteratee(predicate)(array[i])) {
        return i
      }
    }
    return -1
  },

  /**
   * 从右往左返回断言函数第一次返回true的元素的索引,如果找不到则返回-1
   * @param  {array} array                               被查找的数组
   * @param  {function} [predicate = my_lodash.identity] 断言函数
   * @param  {Number} [fromIndex = 0]                    开始查找的位置
   * @return {number}                                    索引
   */
  findLastIndex: function (array, predicate = my_lodash.identity, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (my_lodash.iteratee(predicate)(array[i])) {
        return i
      }
    }
    return -1
  },

  /**
   * 获取数组第一个元素
   * @param  {array} array 原数组
   * @return {*}           数组第一个元素
   */
  head: function(array) {
    return array[0]
  },

  /**
   * 减少数组一层嵌套深度
   * @param  {array} array 原数组
   * @return {array}       新数组
   */
  flatten: function(array) {
    let ary = []
    ary[0] = array[0]
    return ary.concat(array[1])
  },

  /**
   * 将数组降为一维数组
   * @param  {array} array 待降维数组
   * @return {array}       降维后的一维数组
   */
  flattenDeep: function(array) {
    function flatten(array) {
      let ary = []
      for (let res in array) {
        if (Array.isArray(array[res])) ary = ary.concat(flatten(array[res]));
        else ary.push(array[res]);
      }
      return ary
    }
    return flatten(array)
  },

  /**
   * 根据 depth递归减少array 的嵌套层级
   * @param  {array} array        降维数组
   * @param  {Number} [depth = 1] 降维深度
   * @return {array}              降维后的数组
   */
  flattenDepth: function(array, depth = 1) {
    let count = 0
    function flatten(array) {
      let ary = []
      if (count === depth) return array;
      for (let res in array) {
        if (Array.isArray(array[res])) {
          count++
          ary = ary.concat(flatten(array[res]))
        }
        else ary.push(array[res]);
      }
      return ary
    }
    return flatten(array)
  },

  /**
   * 将二维数组转换为对象
   * @param  {array} pairs  键值对二维数组
   * @return {object}       转换后的对象
   */
  fromPairs: function(pairs) {
    let map = {}
    for (let res in pairs) {
      map[pairs[res][0]] = pairs[res][1]
    }
    return map 
  },

  //返回首次 value 在数组array中被找到的 索引值,如果 fromIndex 大于或等于数组长度,则返回 -1.如果 fromIndex 为负,则搜索从数组长度加上 fromIndex 的位置处开始
  indexOf: function(array, value, fromIndex = 0) {
    fromIndex = fromIndex < 0 ? ((array.length - 1 + fromIndex) < 0 ? 0 : array.length - 1 + fromIndex) : fromIndex
    for (i = fromIndex; i < array.length; i++) {
      if (value !== value && array[i] !== array[i]) return i
      else if (array[i] === value) return i
    }
    return -1
  },

  /**
   * 获取数组array中除了最后一个元素之外的所有元素
   * @param  {array} array    被筛选数组
   * @return {array}          筛选出来的数组
   */
  initial: function(array) {
    return array.slice(0,array.length - 1)
  },

  /**
   * 创建唯一值的数组,这个数组包含所有给定数组都包含的元素(交集)
   * @param  {array} array    被筛选数组群
   * @return {array}          筛选出来的数组
   */
  intersection: function(arrays) {
    let ary = [], ary1 = [], i, j
    for (i in arguments) ary.push(arguments[i]);
    for (i in ary[0]) {
      for (j = 1; j < ary.length; j++) {
        if (ary[j].indexOf(ary[0][i]) === -1) break;
      }
      if (j === ary.length) ary1.push(ary[0][i])
    }
    return ary1
  },

  /**
   * 和 intersection 类似,通过 迭代器筛选
   * @param  {...array} array 被筛选数组群
   * @return {array}          筛选出来的数组
   */
  intersectionBy: function (...paras) {
    let iteratee
    if (!my_lodash.isArray(paras[paras.length - 1])) {
      iteratee = paras.pop()
    } else {
      iteratee = my_lodash.identity
    }
    let temp = my_lodash.drop(paras)
    return paras[0].reduce(function (ary, val) {
      let onOff = my_lodash.reduce(temp, function (me, cu) {
        let tmp = my_lodash.map(cu, it => my_lodash.iteratee(iteratee)(it))
        if (!my_lodash.includes(tmp, my_lodash.iteratee(iteratee)(val))) {
          me = false
        }
        return me
      }, true)
      if (onOff) {
        ary.push(val)
      }
      return ary
    }, [])
  },

  /**
   * 和intersection类似,可自定义比较方式
   * @param  {...array} array 被筛选数组群
   * @return {array}          筛选出来的数组
   */
  intersectionWith: function (...paras) {
    let comparator = paras.pop()
    let others = my_lodash.drop(paras)
    return paras[0].reduce(function (ary, val) {
      let onOff = my_lodash.reduce(others, function (me, cu) {
        for (let i = 0; i < cu.length; i++) {
          if (comparator(val, cu[i])) {
            me = true
          }
        }
        return me
      }, false)
      if (onOff) {
        ary.push(val)
      }
      return ary
    }, [])
  },

  /**
   * 将array中的所有元素转换为由 separator 分隔的字符串。
   * @param  {array}  array     数组对象
   * @param  {str}  separator   分隔符
   * @return {string} string    分隔字符串
   */
  join: function(array, separator = ',') {
    let str = ""
    for (let i in array)  str = str + array[i] + separator
    return str.slice(0,str.length - 1)
  },

  /**
   * 获取array中的最后一个元素
   * @param  {array} array 数组对象
   * @return {*} value     数组最后一个元素
   */
  last: function(array) {
    return array.slice(array.length - 1)[0]
  },

  /**
   * 类似indexOf,从右到左遍历array的元素.
   * @param  {array}  array                          数组对象
   * @param  {*}      value                          寻找的值
   * @param  {number} fromIndex = array.length - 1   开始寻找的位置
   * @return {number} value                          返回值
   */
  lastIndexOf: function(array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) return i
    }
    return -1
  },

  /**
   * 获取array数组的第n个元素。如果n为负数,则返回从数组结尾开始的第n个元素。
   * @param  {array}  array   数组对象
   * @param  {number} n = 0   数组下标
   * @return {*} value        返回的元素
   */
  nth: function(array, n = 0) {
    return n < 0 ? array[array.length + n] : array[n]
  },

  /**
   * 移除数组array中所有和给定值相等的元素
   * @param  {array}      array   原数组对象
   * @param  {...values}  values  需要移除的值
   * @return {*}          value   返回新数组
   */
  pull: function(array, values) {
    let ary = []
    for (let i = 1; i < arguments.length; i++) ary.push(arguments[i])
    for (let j = 0; j < array.length; j++) {
      if (ary.indexOf(array[j]) != -1) {
        array.splice(j,1)
        j--
      }
    }
    return array
  },

  /**
   * 移除数组array中所有和给定值相等的元素
   * @param  {array}  array   原数组对象
   * @param  {array}  values  需要移除值的数组集合
   * @return {*}      value   返回新数组
   */
  pullAll: function(array, values) {
    for (let j = 0; j < array.length; j++) {
      if (values.indexOf(array[j]) != -1) {
        array.splice(j,1)
        j--
      }
    }
    return array
  },

  /**
   * 通过迭代器从给定数组中剔除所有指定的值
   * @param  {array} array                              被操作的数组
   * @param  {*} values                                 指定的值的数组集合
   * @param  {function} [iteratee = my_lodash.identity] 迭代器
   * @return {array}                                    操作后的值
   */
  pullAllBy: function (array, values, iteratee = my_lodash.identity) {
    my_lodash.forEach(values, function (element) {
      for (let i = 0; i < array.length; i++) {
        if (my_lodash.isEqual(my_lodash.iteratee(iteratee)(element), my_lodash.iteratee(iteratee)(array[i]))) {
          array.splice(i, 1)
          i--
        }
      }
    })
    return array
  },

  /**
   * 和pullAllBy类似,自定义指定比较函数
   * @param  {array} array                       被操作的数组
   * @param  {*} values                          数组下标
   * @param  {function} [comparator]             自定义函数
   * @return {array}                             返回新数组
   */
  pullAllWith: function (array, values, comparator) {
    my_lodash.forEach(values, function (element) {
      for (let i = 0; i < array.length; i++) {
        if (comparator(element, array[i])) {
          array.splice(i, 1)
          i--
        }
      }
    })
    return array
  },

  /**
   * 根据索引 indexes,移除array中对应的元素,并返回被移除元素的数组。
   * @param  {array}                array     被操作的数组
   * @param  {...(number|number[]}  indexes   数组下标
   * @return {array}                array     返回新数组
   */
  pullAt: function(array, indexes) {
    let res = []
    for (let i = indexes.length - 1; i >= 0; i--) {
        res.unshift(array.splice(indexes[i], 1)[0])
    }
    return res
  },

  /**
   * 反转array,使得第一个元素变为最后一个元素,第二个元素变为倒数第二个元素,依次类推。 
   * @param  {array}  array  原数组对象
   * @return {array}         反转后的数组
   */
  reverse: function(array) {
    return array.reverse()
  },

  /**
   * 裁剪数组array,从 start 位置开始到end结束,但不包括 end 本身的位置。 
   * @param  {array}   array                   原数组对象
   * @param  {number}  start = 0               开始位置
   * @param  {number}  end = array.length - 1  开始位置
   * @return {array}                           裁剪后的数组
   */
  slice: function(array, start = 0, end = array.length) {
    return array.slice(start,end)
  },

  /**
   * 使用二分法的方式检索来决定 value值 应该插入到数组中 尽可能小的索引位置,以保证array的排序。
   * @param  {array}   array    原数组对象
   * @param  {*}       value    插入值
   * @return {number}           插入位置
   */
  sortedIndex: function(array, value) {
    let mid, i = 0, j = array.length - 1
    while (i < j - 1) {
      mid = parseInt((i + j) / 2)
      if (array[mid] < value) i = mid
      else if (array[mid] > value) j = mid
      else {
        while (array[mid] === value) {
          mid--
        }
        return mid + 1
      }
    }
    return i + 1
  },

  /**
   * 类似sortedIndex,但是调用迭代函数检索
   * @param  {array} array 被检索的数组
   * @param  {*} value     给定的值
   * @param  {function}    调用的迭代函数
   * @return {number}      索引值
   */
  sortedIndexBy: function (array, value, iteratee = my_lodash.identity) {
    let i = 0;
    for (; i < array.length; i++) {
      if (my_lodash.iteratee(iteratee)(value) <= my_lodash.iteratee(iteratee)(array[i])) {
        break
      }
    }
    return i
  },

  /**
   * 使用二分法的方式检索,返回尽可能小的索引位置
   * @param  {array}   array    原数组对象
   * @param  {*}       value    插入值
   * @return {number}           插入位置
   */
  sortedIndexOf: function(array, value) {
    let mid, i = 0, j = array.length - 1
    while (i < j - 1) {
      mid = parseInt((i + j) / 2)
      if (array[mid] < value) i = mid
      else if (array[mid] > value) j = mid
      else {
        while (array[mid] === value) {
          mid--
        }
        return mid + 1
      }
    }
    if (array[i] === value) return i
    if (array[j] === value) return j
    return -1
  },

  /**
   * 使用二分法的方式检索来决定value值应该插入到数组中 返回value值在array中尽可能大的索引位置（index）。
   * @param  {array}   array    原数组对象
   * @param  {*}       value    插入值
   * @return {number}           插入位置
   */
  sortedLastIndex: function(array, value) {
    let mid, i = 0, j = array.length - 1
    while (i < j - 1) {
      mid = parseInt((i + j) / 2)
      if (array[mid] < value) i = mid
      else if (array[mid] > value) j = mid
      else {
        while (array[mid] === value) {
          mid++
        }
        return mid
      }
    }
    return i + 1
  },

  /**
   * 从左往右类似 sortedIndex 调用迭代函数检索
   * @param  {array} array 被检索的数组
   * @param  {*} value     给定的值
   * @param  {function}    调用的迭代函数
   * @return {number}      索引值
   */
  sortedLastIndexBy: function (array, value, iteratee = my_lodash.identity) {
    let i = array.length - 1
    for (; i >= 0; i--) {
      if (my_lodash.iteratee(iteratee)(value) >= my_lodash.iteratee(iteratee)(array[i])) {
        break
      }
    }
    return i + 1
  },

  /**
   * 使用二分法的方式检索,返回尽可能小的索引位置
   * @param  {array}   array    原数组对象
   * @param  {*}       value    插入值
   * @return {number}           插入位置
   */
  sortedLastIndexOf: function(array, value) {
    let mid, i = 0, j = array.length - 1
    while (i < j - 1) {
      mid = parseInt((i + j) / 2)
      if (array[mid] < value) i = mid
      else if (array[mid] > value) j = mid
      else {
        while (array[mid] === value) {
          mid++
        }
        return mid - 1
      }
    }
    if (array[j] === value) return j
    if (array[i] === value) return i
    return -1
  },

  /**
   * 返回一个新的不重复的数组
   * @param  {array}  array  原数组对象
   * @return {array}  ary    返回新数组
   */
  sortedUniq: function(array) {
    let ary = [...array]
    for (let i = 0; i < ary.length; i++) {
      while (ary.indexOf(ary[i], i + 1) != -1) {
        ary.splice(ary.indexOf(ary[i], i + 1), 1)
      }
    }
    return ary
  },

  /**
   * 类似 uniq 通过迭代器筛选 数组
   * @param  {array} array        被筛选的数组
   * @param  {function} iteratee  迭代器
   * @return {array}              筛选后的数组
   */
  sortedUniqBy: function (array, iteratee) {
    return my_lodash.uniqBy(array, iteratee)
  },

  /**
   * 返回一个新的不重复的数组。
   * @param  {array} array        被筛选的数组
   * @return {array}              筛选后的数组
   */
  tail: function(array) {
    return array.slice(1)
  },

  /**
   * 切割数组,从array数组的起始元素开始提取n个元素。
   * @param  {array}  array    待切割数组
   * @param  {number} n = 1    提取数量
   * @return {array}           提取元素的数组集合
   */
  take: function(array, n = 1) {
    return array.slice(0, n)
  },

  /**
   * 切割数组,从array数组的最后一个原素开始提取n个元素。
   * @param  {array}  array    待切割数组
   * @param  {number} n = 1    提取数量
   * @return {array}           提取元素的数组集合
   */
  takeRight: function(array, n = 1) {
    return array.slice(array.length - n < 0 ? 0 : array.length - n)
  },

  /**
   * 依据断言函数,从右向左提取数据
   * @param  {array} array                             被提取数组
   * @param  {function} predicate = my_lodash.identity 断言函数
   * @return {array}                                   提取后的数组
   */
  takeRightWhile: function (array, predicate = my_lodash.identity) {
    let ary = [], onOff = true
    for (let i = array.length - 1; i >= 0; i--) {
      if (my_lodash.iteratee(predicate)(array[i], i, array) === false) {
        onOff = false
      }
      if (onOff) {
        ary.unshift(array[i])
      }
    }
    return ary
  },

  /**
   * 依据断言函数,提取数据
   * @param  {array} array                             被提取数组
   * @param  {function} predicate = my_lodash.identity 断言函数
   * @return {array}                                   提取后的数组
   */
  takeWhile: function (array, predicate = my_lodash.identity) {
    let ary = []
    for (let i = 0; i < array.length; i++) {
      if (my_lodash.iteratee(predicate)(array[i], i, array) === false) {
        return ary
      }
      ary.push(array[i])
    }
    return ary
  },

  /**
   * 创建一个按顺序排列的唯一值的数组。
   * @param  {array} array   原数组
   * @return {array}         筛选后的数组
   */
  union: function(arrays) {
    let array = [], ary = []
    for (let ii in arguments) array.push(...arguments[ii])
    for (let i in array) {
      if (ary.indexOf(array[i]) === -1) ary.push(array[i])
    }
    return ary
  },

  /**
   * 通过迭代函数将数组集提取出成员,且不重复提取
   * @param  {array} ...array    被提取的数组集
   * @param  {function}          迭代函数
   * @return {array}             提取后的数组
   */
  unionBy: function (...array) {
    let iteratee
    if (!my_lodash.isArray(array[array.length - 1])) {
      iteratee = array.pop()
    } else {
      iteratee = my_lodash.identity
    }
    iteratee = my_lodash.iteratee(iteratee)
    let ary = [].concat(...array)
    return my_lodash.uniqBy(ary, iteratee)
  },

  /**
   * 自定义函数将数组集提取出成员,且不重复提取
   * @param  {array} ...arrays  被提取的数组集
   * @param  {function}         对比函数
   * @return {array}            提取后的数组
   */
  unionWith: function (...array) {
    let iteratee
    if (!my_lodash.isArray(array[array.length - 1])) {
        iteratee = array.pop()
    } else {
        iteratee = my_lodash.identity
    }
    iteratee = my_lodash.iteratee(iteratee)
    return my_lodash.uniqWith([].concat(...array), iteratee)
  },

  /**
   * 创建一个按顺序排列的唯一值的数组。
   * @param  {array} array   被筛选的数组
   * @return {array}         筛选后的数组
   */
  uniq: function(array) {
    return my_lodash.union(array)
  },

  /**
   * 类似 uniq 通过迭代器筛选数组
   * @param  {array} array                      被筛选的数组
   * @param  {function} iteratee = my_lodash.identity  迭代器
   * @return {array}                            筛选后的数组
   */
  uniqBy: function (array, iteratee = my_lodash.identity) {
    return my_lodash.reduce(array, function (ary, val) {
      for (let i = 0; i < ary.length; i++) {
        if (my_lodash.isEqual(my_lodash.iteratee(iteratee)(val), my_lodash.iteratee(iteratee)(ary[i]))) {
          return ary
        }
      }
      ary.push(val)
      return ary
    }, [])
  },

  /**
   * 类似 uniqBy 通过迭代器筛选数组
   * @param  {array} array                                           被筛选的数组
   * @param  {function} comparator = my_lodash.iteratee(comparator)  迭代器
   * @return {array}                                                 筛选后的数组
   */
  uniqWith: function (array, comparator = my_lodash.iteratee(comparator)) {
    return array.reduce((res, item) => {
        for (let i = 0; i < res.length; i++) {
            if (comparator(item, res[i])) {
                break
            }
        }
        if (i === res.length) {
            res.push(item)
        }
        return res
    }, [array[0]])
  },

  /**
   * 解压数组
   * @param  {array} array 需要被解压的数组
   * @return {array}       解压后的数组
   */
  unzip: function(array) {
    let array = []
    array.push(...arguments[0])
    return my_lodash.zip(...array)
  },

  /**
   * 通过迭代器解压数组
   * @param  {array} array                         需要被解压的数组
   * @param  {array} iteratee = my_lodash.identity 迭代函数
   * @return {array}                               解压后的数组
   */
  unzipWith: function (array, iteratee = my_lodash.identity) {
    let temp = my_lodash.zip(...array)
    return my_lodash.map(temp, (it) => my_lodash.iteratee(iteratee)(...it))
  },

  /**
   * 创建一个剔除所有给定值的新数组
   * @param  {array}     array       原数组对象
   * @param  {...values} values      需要剔除的值的数组集合
   * @return {array}                 剔除值后的数组
   */
  without: function(array, values) {
    let judge = [], ary = []
    for (let i = 1; i < arguments.length; i++) judge.push(arguments[i])
    for (let j in array) {
      if (judge.indexOf(array[j]) === -1) ary.push(array[j])
    }
    return ary
  },

  /**
   * 创建一个给定数组唯一值的数组,返回值的顺序取决于他们数组的出现顺序。
   * @param  {array}     arg       原数组对象
   * @return {array}               返回唯一值数组
   */
  xor: function(...array) {
    return my_lodash.xorBy.call(this, ...array, it => it)
  },

  /**
   * 通过迭代仅保留数组中出现一次的成员
   * @param  {array} ...arrays 被检查的数组
   * @return {array}           筛选出的数组
   */
  xorBy: function (...array) {
    let iteratee
    if (!my_lodash.isArray(array[array.length - 1])) {
        iteratee = array.pop()
    } else {
       iteratee = my_lodash.identity
    }
    iteratee = my_lodash.iteratee(iteratee)
    array = [].concat(...array)
    let ary = array.map(item => item = iteratee(item))
    ary = ary.map((item, index) => {
        if (ary.indexOf(item) === ary.lastIndexOf(item)) {
            return true
        } else {
            return false
        }
    })
    return array.filter((item, index) => ary[index])
  },

  /**
   * 通过自定义函数仅保留数组中出现一次的成员
   * @param  {array} ...arrays 被检查的数组
   * @return {array}           筛选出的数组
   */
  xorWith: function (...array) {
    let iteratee
    if (!my_lodash.isArray(array[array.length - 1])) {
        iteratee = array.pop()
    } else {
       iteratee = my_lodash.identity
    }
    iteratee = my_lodash.iteratee(iteratee)
    array = [].concat(...array)
    return array.filter((item, index) => {
        for (let i = 0; i < array.length; i++) {
            if (i !== index && iteratee(item, array[i])) {
                return false
            }
        }
        return true
    })
  },

  /**
   * 创建一个分组元素的数组,数组的第一个元素包含所有给定数组的第一个元素,数组的第二个元素包含所有给定数组的第二个元素,以此类推。
   * @param  {array}  arg   多个数组集合
   * @return {object}       新的数组对象
   */
  zip: function(arg) {
    let array = [], ary = [], len = 0
    for (let i in arguments) {
      arguments[i].length > len ? len = arguments[i].length : len = len
      array.push(arguments[i])
    }
    for (i = 0; i < len; i++) {
      ary[i] = []
      ary[i].push(...(array => {
        let ary = []
        for (let i in array)  ary.push(array[i].shift())
        return ary
      })(array))
    }
    return ary
  },

  /**
   * 将参数压缩成对象
   * @param  {array} props = []  键
   * @param  {array} values = [] 值
   * @return {object}            压缩后的对象
   */
  zipObject: function(props = [], values = []) {
    let map = {}
    for (let i in props) map[props[i]] = values[i]
    return map
  },

  /**
   * 根据路径,将参数打包成对象
   * @param  {array} props = []  路径
   * @param  {array} values = [] 值
   * @return {object}            打包后的对象
   */
  zipObjectDeep: function(props = [], values = []) {
    let map = {}, judge = [], remap = {}
    for (let i in props) {
      let ary = []
      ary = props[i].split(".")
      for (let j = ary.length - 1; j >= 0; j--) {
        if (ary[j].indexOf("[") != -1) {
          let num = ary[j].slice(ary[j].indexOf("[") + 1,ary[j].indexOf("]"))
          ary[j] = ary[j].slice(0,ary[j].indexOf("["))
          if (!map[ary[j]]) map[ary[j]] = []
          if (j === ary.length - 1) {
            map[ary[j]][num] = values[i]
          } else {
              map[ary[j]][num] = {}
              map[ary[j]][num][ary[j + 1]] = map[ary[j + 1]]
          }
        } else {
            if (j === ary.length - 1) {
              if (!map[ary[j]]) map[ary[j]] = {}
              map[ary[j]] = values[i]
            } else {
              if (!map[ary[j]]) map[ary[j]] = {}
              map[ary[j]][ary[j + 1]] = map[ary[j + 1]]
            }
        }
        if (j === 0) {
          judge.push(ary[j])
        }
      }    
    }
    for (let i in judge) {
      remap[judge[i]] = map[judge[i]]
    }
    return remap
  },

  /**
   * 根据迭代器 打包数组
   * @param {array} ...array                    需要打包的数组
   * @param {function} iteratee = this.identity 迭代器
   * @return {array}                            打包后的数组
   */
  zipWith: function (...others) {
    let iteratee
    if (!my_lodash.isArray(others[others.length - 1])) {
      iteratee = others.pop()
    } else {
      iteratee = my_lodash.identity
    }
    let ary = my_lodash.zip(...others)
    return my_lodash.map(ary, val => iteratee(...val))
  },

  /**
   * 创建一个对象，
   * 将每个元素的迭代结果作为该对象的键名,该结果出现的次数,作为该对象的键值
   * @param  {array | object} collection             被操作的集合
   * @param  {function} iteratee= my_lodash.identity 迭代器
   * @return {object}                                迭代出的结果
   */
  countBy: function (collection, iteratee = my_lodash.identity) {
    return my_lodash.reduce(collection, function (ary, val) {
      let key = my_lodash.iteratee(iteratee)(val)
      if (key in ary) {
        ary[key]++
      } else {
        ary[key] = 1
      }
      return ary
    }, {})
  },

  /**
   * 反方向遍历数组
   * @param  {array | object} collection              被迭代的集合
   * @param  {function} iteratee = my_lodash.identity 迭代器
   * @return {*}                                      返回集合
   */
  forEachRight: function (collection, iteratee = my_lodash.identity) {
    let keys = Object.keys(collection)
    for (let i = keys.length - 1; i >= 0; i--) {
      if (iteratee(collection[keys[i]], keys[i], collection) === false) {
        return collection
      }
    }
    return collection
  },

  /**
   * 迭代集合元素,返回成员调用断言函数后为 true 的数组
   * @param  {array | object} collection                     被迭代的对象
   * @param  {function | object | array | string} predicate  断言
   * @return {array}                                         筛选后的新数组
   */
  filter: function (collection, predicate = my_lodash.identity) {
    predicate = my_lodash.iteratee(predicate)
    return collection.reduce((ary, item, index) => {
        if (predicate(item)) {
            ary.push(item)
        }
        return ary
    }, [])
  },

  /**
   * 迭代集合元素,返回第一个 返回 true 的元素
   * @param  {array | object} collection                被迭代的集合
   * @param  {function} [predicate = this.identity]     判定条件
   * @param  {Number} [fromIndex=0]                     判定起始位置
   * @return {*}                                        第一个判定成功的元素
   */
  find: function (collection, predicate = my_lodash.identity, fromIndex = 0) {
    for (let key in collection) {
      if (my_lodash.isArray(collection)) {
        if (key < fromIndex) {
          continue
        }
      }
      if (collection.hasOwnProperty(key)) {
        if (my_lodash.iteratee(predicate)(collection[key], key, collection)) {
          return collection[key]
        }
      }
    }
  },

   /**
   * 从右往左返回断言函数第一次返回 true 的元素的索引
   * @param  {array} array                                被查找的数组
   * @param  {function} [predicate = my_lodash.identity]  断言函数
   * @param  {Number} [fromIndex = array.length - 1]      开始查找的位置
   * @return {number}                                     索引
   */
  findLastIndex: function (array, predicate = my_lodash.identity, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (my_lodash.iteratee(predicate)(array[i])) {
        return i
      }
    }
    return -1
  },

  /**
   * 从右往左迭代成员,返回第一个满足的成员
   * @param  {array | object} collection                  被迭代的集合
   * @param  {function} predicate = my_lodash.identity     迭代器
   * @param  {number} fromIndex = collection.length-1     索引起始位置
   * @return {*}                                          满足条件的第一个成员,未找到返回 undefined
   */
  findLast: function (collection, predicate = my_lodash.identity, fromIndex = collection.length - 1) {
    let keys = Object.keys(collection)
    for (let i = fromIndex; i >= 0; i--) {
      if (my_lodash.iteratee(predicate)(collection[keys[i]])) {
        return collection[keys[i]]
      }
    }
  },

  /**
   * 迭代集合成员,并将结果降一维
   * @param  {array | object} collection              被迭代的集合
   * @param  {function} iteratee = my_lodash.identity  迭代器
   * @return {array}                                  处理后的数组
   */
  flatMap: function (collection, iteratee = my_lodash.identity) {
    return my_lodash.flatMapDepth(collection, iteratee)
  },

  /**
   * 迭代集合成员,并将结果降成一维
   * @param  {array | object} collection              被迭代的集合
   * @param  {function} iteratee = my_lodash.identity  迭代器
   * @return {array}                                  处理后的数组
   */
  flatMapDeep: function (collection, iteratee = my_lodash.identity) {
    return my_lodash.flatMapDepth(collection, iteratee, Infinity)
  },

  /**
   * 迭代集合成员,并将结果降维,维度自定义
   * @param  {array | object} collection    被迭代的集合
   * @param  {function} iteratee            迭代器
   * @param  {number} depth = 1             维度
   * @return {array}                        处理后的数组
   */
  flatMapDepth: function (collection, iteratee, depth = 1) {
    iteratee = my_lodash.iteratee(iteratee)
    return collection.reduce((ary, item) => {
        return ary.concat(my_lodash.flattenDepth(iteratee(item), depth - 1))
    }, [])
  },

  /**
   * 利用迭代期迭代集合,将迭代出来的结果作为键名,被迭代的成员作为键值
   * @param  {array | object} collection              被迭代的集合
   * @param  {function} iteratee = my_lodash.identity 迭代器
   * @return {object}                                 新对象
   */
  groupBy: function (collection, iteratee = my_lodash.identity) {
    return my_lodash.reduce(collection, function (obj, key) {
      let tmp = my_lodash.iteratee(iteratee)(key)
      if (tmp in obj) {
        obj[tmp].push(key)
      } else {
        obj[tmp] = [key]
      }
      return obj
    }, {})
  },

  /**
   * 检查一个值是否都在集合中
   * @param  {array | object | string} collection    被比较的集合
   * @param  {*} value                               检查的值
   * @param  {Number} [fromIndex = 0]                查找的索引
   * @return {booleam}                               如果存在,返回 true
   */
  includes: function (collection, value, fromIndex = 0) {
    let count = 0
    for (let key in collection) {
      if (count < fromIndex) {
        count++
        continue
      }
      if (collection.hasOwnProperty(key)) {
        if (my_lodash.isEqual(collection[key], value)) {
          return true
        }
      }
    }
    if (my_lodash.isString(collection) && my_lodash.isString(value)) {
      let reg = new RegExp(value)
      return reg.test(collection)
    }
    return false
  },

  /**
   * 对集合中每一个元素调用方法,返回结果数组
   * @param  {array | object} collection      被调用的集合
   * @param  {array | function | string} path 调用方法的路径
   * @param  {...*} ...args                   方法的参数
   * @return {array}                          结果集
   */
  invokeMap: function (collection, path, ...args) {
    return my_lodash.map(collection, function (it) {
      if (my_lodash.isFunction(path)) {
        return path.apply(it, args)
      } else {
        return my_lodash.propertyOf(it)(path).call(it, ...args)
      }
    })
  },

  /**
   * 创建一个对象,键名是集合成员通过接待后的结果,键值是该成员
   * @param  {array | object} collection              被迭代的集合
   * @param  {function} iteratee = my_lodash.identity 迭代器
   * @return {object}                                 生成的新对象
   */
  keyBy: function (collection, iteratee = my_lodash.identity) {
    return my_lodash.reduce(collection, function (obj, key) {
      obj[my_lodash.iteratee(iteratee)(key)] = key
      return obj
    }, {})
  },

  /**
   * 迭代集合的每一个元素,通过调用 iteratee 返回一个新的数组
   * @param  {array | object} collection    被迭代的集合
   * @param  {function | string} iteratee   用于迭代的函数
   * @return {array}                        返回一个新数组
   */
  map: function (collection, iteratee) {
    let ary = []
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (my_lodash.isString(iteratee)) {
          ary.push(my_lodash.property(iteratee)(collection[key], key, collection))
        } else if (my_lodash.isFunction(iteratee)) {
          ary.push(iteratee(collection[key], key, collection))
        }
      }
    }
    return ary
  },

  /**
   * 类似于 sortby 除了可以指定排序顺序
   * @param  {array | object} collection                                                被排序的集合
   * @param  {function[] | array[] | object[] | string[]} iteratee = my_lodash.identity 迭代器
   * @param  {string} orders = "asc"                                                    顺序指令
   * @return {array}                                                                    排序后的数组
   */
  orderBy: function (collection, iteratee = my_lodash.identity, orders = "asc") {
    let ary = my_lodash.clone(collection)
    for (let i = iteratee.length - 1; i >= 0; i--) {
      ary.sort(function (a, b) {
        let order = my_lodash.iteratee(iteratee[i])(a) > my_lodash.iteratee(iteratee[i])(b)
        return orders[i] === 'asc' ? order : !order
      })
    }
    return ary
  },

  /**
   * 断言集合中的元素,并进行分组
   * @param  {array | object} collection               被断言的集合
   * @param  {function} predicate = my_lodash.identity 断言函数
   * @return {array}                                   分组后的数组
   */
  partition: function (collection, predicate = my_lodash.identity) {
    let ary = [[],[]]
    return my_lodash.reduce(collection, function (topval, val) {
      my_lodash.iteratee(predicate)(val) ? ary[0].push(val) : ary[1].push(val)
      return ary
    }, ary)
  },

  /**
   * 类似reduce,不过从右往左迭代
   * @param  {array | object} collection              别迭代的集合
   * @param  {function} iteratee = my_lodash.identity 迭代器
   * @param  {*} accumulator                          初始值
   * @return {*}                                      迭代后的值
   */
  reduceRight: function (collection, iteratee = my_lodash.identity, accumulator) {
    let keys = Object.keys(collection)
    let result = accumulator || collection[keys[0]]
    for (let i = accumulator ? keys.length - 1 : keys.length - 2; i >= 0; i--) {
      result = iteratee(result, collection[keys[i]], keys[i], collection)
    }
    return result
  },

  /**
   * 和 filter 相反,收集断言失败的函数
   * @param  {array | object} collection               被断言的集合
   * @param  {function} predicate = my_lodash.identity 断言函数
   * @return {array}                                   收集的集合
   */
  reject: function (collection, predicate = my_lodash.identity) {
    let result = []
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (!my_lodash.iteratee(predicate)(collection[key], key, collection)) {
          result.push(collection[key])
        }
      }
    }
    return result
  },

  /**
   * 随机选取一个成员
   * @param  {array | object} collection 待选集合
   * @return {array}                     选中成员数组
   */
  sample: function(collection) {
    let ary = Object.keys(collection), index = Math.floor(Math.random() * ary.length)
    return collection[ary[index]]
  },

  /**
   * 随机选取一组成员
   * @param  {array | object} collection 待选集合
   * @param  {number}                    选取成员的个数
   * @return {array}                     选中成员数组
   */
  sampleSize: function(collection,n = 1) {
    let ary = Object.keys(collection), indexval, index = [], result = []
    for (let i = 1; i <= (n > ary.length ? ary.length : n); i++) {
      do {
        indexval = Math.floor(Math.random() * ary.length)
      } while (index.indexOf(indexval) != -1)
      index.push(indexval)
      result.push(collection[ary[indexval]])
    }
    return result
  },

  /**
   * 通过Fisher - Yates随机打乱数组
   * @param  {array | object} collection 待打乱集合
   * @return {array | object}            打乱后的数组
   */
  shuffle: function (collection) {
    let result = Object.keys(collection)
    let size = result.length
    let index
    result.forEach(function (func, i, array) {
      index = ~~(Math.random() * (size - i - 1)) + i
      array.splice(i, 1, array[index])
      array.splice(index, 1, func)
    })
    return my_lodash.map(result, it => collection[it])
  },

    /**
   * 返回集合的长度
   * @param  {array | string | object} collection 被统计的对象
   * @return {number}                             统计后的长度
   */
  size: function (collection) {
    let count = 0
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        count++
      }
    }
    return count
  },

  /**
   * 使用迭代器检查集合成员是否满足条件,一旦满足,返回 true
   * @param  {array | object} collection                被检查的对象
   * @param  {function} [predicate = my_lodash.identity]       迭代器
   * @return {boolean}                                  一旦满足,返回 true
   */
  some: function (collection, predicate = my_lodash.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (my_lodash.iteratee(predicate)(collection[key], key, collection)) {
          return true
        }
      }
    }
    return false
  },

  /**
   * 返回一个以升序排序后的数组
   * @param  {array} collection                      被排序的对象
   * @param  {Array}  [iteratee = [my_lodash.identity]] 判断条件集合
   * @return {array}                                 排序后的新数组
   */
  sortBy: function (collection, iteratee = [my_lodash.identity]) {
    let result = []
    for (let i = 0; i < collection.length; i++) {
      result.push(my_lodash.assign({}, collection[i]))
    }
    if (my_lodash.isFunction(iteratee)) {
      result.sort(function (a, b) {
        return my_lodash.iteratee(iteratee)(a) > my_lodash.iteratee(iteratee)(b)
      })
    } else {
      for (let i = 0; i < iteratee.length; i++) {
        result.sort(function (a, b) {
          return my_lodash.iteratee(iteratee[i])(a) > my_lodash.iteratee(iteratee[i])(b)
        })
      }
    }
    return result
  },

  /**
   * 返回从 1970 1.1 00：00：00 UTC 至今的毫秒数
   */
  now: function () {
    return Date.now()
  },

  /**
   * func 在第 n 次调用后才会执行
   * @param  {number} n      约定第几次开始执行函数 func
   * @param  {function} func 被约束的函数
   * @return {function}      新的函数
   */
  after: function (n, func) {
    let count = 0
    return function (...args) {
      count++
      if (count >= n) {
        return func(...args)
      }
    }
  },

  /**
   * 返回一个新函数来限制调用函数的参数数量
   * @param  {function} func        被限制的函数
   * @param  {number} n=func.length 被限制参数的数量
   * @return {function}             返回新的函数
   */
  ary: function (func, n = func.length) {
    return function (...args) {
      args.length = n
      return func(...args)
    }
  },

  /**
   * 限制函数的调用的函数,让函数只能被调用有限次数（n 次）
   * 当 限制次数为 0 时,被限制的函数不会被调用， 返回 undefined
   * @param  {number} n      指定被限制调用的次数
   * @param  {function} func 指定被限制调用的函数
   * @return {function}      新的被限制调用的函数
   */
  before: function (n, func) {
    let count = 0
    let result
    return function (...arg) {
      count++
      if (count <= n) {
        result = func(...arg)
      }
      return result
    }
  },

  /**
   * 绑定 this 和部分参数给 被调用函数,使得 func 在 绑定的 this 的上下文环境被调用,并固定部分参数
   * @param  {function}  func     被绑定的函数
   * @param  {*} thisArg          被绑定函数执行的上下文
   * @param  {...*}  partials     被绑定的参数
   * @return {function}           绑定后的新函数
   */
  bind: function (func, thisArg, ...partials) {
    return function (...args) {
      partials = my_lodash.map(partials, function (a) {
        if (a === _) {
          a = args.shift()
        }
        return a
      })
      return func.call(thisArg, ...partials, ...args)
    }
  },

  /**
   * 返回一个函数,调用对象的方法
   * @param  {object} object         被调用方法所附的对象
   * @param  {string} key            方法名
   * @param  {partials} ...partials  绑定的参数
   * @return {function}              返回新的函数
   */
  bindKey: function (object, key, ...partials) {
    return function (...args) {
      partials = partials.map(function (it) {
        if (it === _) {
          it = args.shift()
        }
        return it
      })
      return object[key](...partials, ...args)
    }
  },

  /**
   * curry函数
   * @param  {function} func              需要柯里化的函数
   * @param  {number} arity = func.length 指定参数数量
   * @return {function}                   柯里化后的函数
   */
  curry: function (func, arity = func.length) {
    let len
    return function fn(...args) {
      len = my_lodash.reduce(args, function (length, val) {
        if (val === _) {
          return length
        }
        return ++length
      }, 0)
      if (len < arity) {
        return my_lodash.partial(fn, ...args)
      } else {
        return func(...args)
      }
    }
  },

  /**
   * 反向curry函数
   * @param  {function} func              需要柯里化的函数
   * @param  {number} arity = func.length 指定参数数量
   * @return {function}                   柯里化后的函数
   */
  curryRight: function (func, arity = func.length) {
    let len
    return function fn(...args) {
      len = my_lodash.reduce(args, function (length, val) {
        if (val === _) {
          return length
        }
        return ++length
      }, 0)
      if (len < arity) {
        return my_lodash.partialRight(fn, ...args)
      } else {
        return func(...args)
      }
    }
  },

  debounce: function (func, wait = 0, options = {}) {
    let lastTimer = my_lodash.now()
    return function () {
      let currTimer = my_lodash.now()
      if (currTimer - lastTimer >= wait) {
        lastTimer = currTimer
        return func()
      } else {
        lastTimer = currTimer
      }
    }
  },

  throttle: function (func, wait = 0, options = {}) {
    let lastTimer = my_lodash.now()
    return function () {
      let currTimer = my_lodash.now()
      if (currTimer - lastTimer >= wait) {
        lastTimer = currTimer
        return func()
      }
    }
  },

  /**
   * 等待当前调用栈清空后调用函数,并可以传给该函数参数
   * @param  {function} func 被调用函数
   * @param  {...*} args     传入的参数
   * @return {number}        id
   */
  defer: function (func, ...args) {
    return setTimeout(func.bind(this, ...args, 0))
  },

  /**
   * 延时调用函数
   * @param  {function} func 延时调用函数
   * @param  {number} wait   延时时间
   * @param  {...*} args     传入函数的参数
   * @return {number}        id
   */
  delay: function (func, wait, ...args) {
    return setTimeout(func.bind(this, ...args), wait)
  },

  /**
   * 将值强行转换为数组
   * @param {*} value  待转换的值
   * @returns {array}  转换后的数组
   */
  castArray: function (value) {
    if (my_lodash.isArray(value)) {
      return value
    } else if (arguments.length === 0) {
      return []
    } else {
      return [value]
    }
  },

  /**
   * 通过 source 方法,检查 object 是否满足条件
   * @param {object} object 被判断的对象
   * @param {object} source 判断条件安
   * @returns {boolean}     满足,返回 true
   */
  conformsTo: function (object, source) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (!source[key](object[key])) {
          return false
        }
      }
    }
    return true
  },

  /**
   * 判断两个值是否浅相等
   * NaN 与 NaN 相等
   * @param {*} value 第一个值
   * @param {*} other 第二个值
   * @returns {bolean} 相等,返回 true
   */
  eq: function(value, other) {
    return value === other || (value !== value && other !== other)
  },

  /**
   * 判断第一个值是否大于第二个值
   * @param {*} value 第一个值
   * @param {*} other 第二个值
   * @returns {boolean} 大于,返回 true
   */
  gt: function(value, other) {
    return value > other ? true : false
  },

  /**
   * 判断第一个值是否大于等于第二个值
   * @param {*} value 第一个值
   * @param {*} other 第二个值
   * @returns {boolean} 大于,返回 true
   */
  gte: function(value, other) {
    return value >= other ? true : false
  },

  /**
   * 检查传入的值是不是一个 arguments 对象
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 arguments 对象,返回 true
   */
  isArguments: function(value) {
    return Object.prototype.toString.call(value) === "[object Arguments]" ? true : false
  },

  /**
   * 检查一个值是不是 ArrayBuffer 对象
   * @param  {*}  value      需要检查的值
   * @return {Boolean}       如果是 ArrayBuffer 对象,返回 true
   */
  isArrayBuffer: function (value) {
    return toString.call(value) === '[object ArrayBuffer]'
  },

  /**
   * 检查一个对象是否是类数组对象,包括 string ，（string 含有 length 属性,函数不是类数组对象）
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 类数组对象,返回 true
   */
  isArrayLike: function(value) {
    return value && typeof value != "function" && isFinite(value.length) && value.length >= 0 && value.length === Math.floor(value.length) &&  value.length < 4294967296          
  },

  /**
   * 检查一个对象是否是类数组对象,不包括 string 和 function
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 类数组对象,返回 true
   */
  isArrayLikeObject: function(value) {
    return value && typeof value === "object" && isFinite(value.length) && value.length >= 0 && value.length === Math.floor(value.length) &&  value.length < 4294967296          
  },

  /**
   * 检查 传入的值 是否是布尔值
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是布尔值。返回 true
   */
  isBoolean: function(value) {
    return Object.prototype.toString.call(value) ===  "[object Boolean]" ? true : false
  },

  /**
   * 检查一个对象是否是 日期对象
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 Date 对象,返回 true
   */
  isDate: function(value) {
    return Object.prototype.toString.call(value) ===  "[object Date]" ? true : false
  },

  /**
   * 检查一个值 是否是 DOM 元素
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是 DOM 元素,返回 true
   */
  isElement: function (value) {
    return toString.call(value) === "[object HTMLBodyElement]"
  },

  /**
   * 检查一个值是不是 空对象
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是空对象,返回 true
   */
  isEmpty: function (value) {
    if (value === null) {
      return true
    }
    if (value.length && value.length === 0) {
      return true
    } else if (value.size && value.size === 0) {
      return true
    } else if (Object.keys(value) && Object.keys(value).length === 0) {
      return true
    }
    return false
  },

  isError: function(value) {
    return value instanceof Error === true
  },

  isFinite: function(value) {
    return Number.isFinite(value)
  },

  isFunction: function(value) {
    return Object.prototype.toString.call(value) ===  "[object Function]" ? true : false
  },

  isInteger: function(value) {
    return  Number.isInteger(value)
  },

  isLength: function(value) {
    return  isFinite(value) && value >= 0 && value === Math.floor(value) &&  value < 4294967296
  },

  isMap: function (value) {
    return toString.call(value) === '[object Map]'
  },

  /**
   * 深度比较object与source是否后等值的属性
   * @param {object} object   被比较的对象
   * @param {object} source   匹配的对象
   * @returns {boolean}       匹配成功 返回 true
   */
  isMatch: function (object, source) {
    for (let key in source) {
        if (!my_lodash.isEqual(source[key], object[key])) {
            return false
        }
    }
    return true
  },

  /**
   * 类似isMatch接收一个函数进行比较
   * @param {object} object        要检查的对象
   * @param {object} source        匹配的对象
   * @returns {boolean} customizer 如果对象满足,返回 true
   */
  isMatchWith: function (object, source, customizer) {
    let iteratee = my_lodash.iteratee(customizer)
    for (let key in source) {
        if (!my_lodash.isEqual(iteratee(source[key]), iteratee(object[key]))) {
            return false
        }
    }
    return true
  },

  isNaN: function(value) {
    return  Object.prototype.toString.call(value) === "[object Number]" && isNaN(value)
  },

  isNative: function(value){
    return (/\{\s*\[native code\]\s*\}/).test('' + value)
  },

  isNil: function(value){
    return  Object.prototype.toString.call(value) === "[object Null]" || Object.prototype.toString.call(value) === "[object Undefined]" 
  },

  isNull: function(value){
    return  Object.prototype.toString.call(value) === "[object Null]"
  },

  isNumber: function (value) {
    return toString.call(value) === '[object Number]'
  },

  isObject: function (value) {
    return value instanceof Object
  },

  isObjectLike: function (value) {
    return typeof value === 'object' ? (!this.isNull(value)) ? true : false : false
  },

  isRegExp: function(value){
    return  Object.prototype.toString.call(value) === "[object RegExp]"
  },

  isSafeInteger: function(value){
    return  Number.isInteger(value) && value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER
  },

  isSet: function(value){
    return  Object.prototype.toString.call(value) === "[object Set]"
  },

  isString: function(value){
    return  Object.prototype.toString.call(value) === "[object String]"
  },

  isSymbol: function(value){
    return  Object.prototype.toString.call(value) === "[object Symbol]"
  },

  isTypedArray: function (value) {
    return toString.call(value) === '[object Uint8Array]'
  },

  isUndefined: function(value){
    return  Object.prototype.toString.call(value) === "[object Undefined]"
  },

  isWeakMap: function(value){
    return  Object.prototype.toString.call(value) === "[object WeakMap]"
  },

  isWeakSet: function(value){
    return  Object.prototype.toString.call(value) ===  "[object WeakSet]"
  },

  lt: function (value, other) {
    return value < other
  },

  lte: function (value, other) {
    return value <= other
  },

  /**
   * 将值转换为数组
   * @param  {*} value      需要被转换的值
   * @return {array}        返回转换后的数组
   */
  toArray: function (value) {
    let result = []
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        result.push(value[key])
      }
    }
    return result
  },

  toFinite: function (value) {
    return value < -Number.MAX_VALUE ? -Number.MAX_VALUE : value > Number.MAX_VALUE ? Number.MAX_VALUE : isNaN(value) ? 0 : +value
  },

  toInteger: function (value) {
    return Math.round(my_lodash.toFinite(value))
  },

  toLength: function (value) {
    let result = my_lodash.toInteger(value)
    return result > 4294967295 ? 4294967295 : result < 0 ? 0 : result
  },

  toNumber: function (value) {
    return +value
  },

  /**
   * 分配一个或多个被分配对象可自身可枚举属性,到目标对象上，
   * 分配的属性会覆盖目标对象身上的同名属性
   * @param  {object} obj     目标属性
   * @param  {...object} args 被分配的对象
   * @return {object}         分配后的目标对象
   */
  assign: function (obj, ...sources) {
    my_lodash.forEach(sources, function (func) {
      my_lodash.forOwn(func, function (element, key) {
        obj[key] = element
      })
    })
    return obj
  },

  /**
   * 遍历对象的可枚举自有属性
   * @param  {object} object     被迭代的对象
   * @param  {function} iteratee 对对象每个成员进行调用的函数
   * @return {object}            返回一个对象
   */
  forOwn: function (object, iteratee = my_lodash.identity) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        if (iteratee(object[key], key, object) === false) {
          break
        }
      }
    }
  },

  toSafeInteger: function (value) {
    let result = +value
    return isNaN(result) ? 0 : result > 9007199254740991 ? 9007199254740991 : result < -9007199254740991 ? -9007199254740991 : ~~result
  },

 /**
   * 两数相加
   * @param  {number} augend 加数
   * @param  {number} addend 被加数
   * @return {number}        和
   */
  add: function (augend, addend) {
    return augend + addend
  },

  /**
   * 根据precision（精度）向上舍入 number。
   * @param  {number} number        原数值
   * @param  {number} precision = 0 精度
   * @return {number}               返回新数值
   */
  ceil: function (number, precision = 0) {
    return Math.ceil(number * (10 ** precision)) / (10 ** precision)
  },

  /**
   * 求两个值的除数
   * @param {number} dividend 被除数
   * @param {number} divisor  除数
   * @returns {number}        商
   */
  divide: function (dividend, divisor) {
    return dividend / divisor
  },

  /**
   * 根据precision（精度）向上舍入 number。
   * @param  {number} number        原数值
   * @param  {number} precision = 0 精度
   * @return {number}               返回新数值
   */
  floor: function (number, precision = 0) {
    return Math.floor(number * (10 ** precision)) / (10 ** precision)
  },

    /**
   * 计算数组的最大值,如果 array 为空或者 false,返回 undefined
   * @param  {array} array 需要判断的数组
   * @return {*}           最大值
   */
  max: function (array) {
    if (array.length === 0) {
        return undefined
    }
    return my_lodash.maxBy(array, it => it)
  },

  /**
   * 通过迭代选择出数组内最大项
   * @param {array} array                              被选数组
   * @param {function} [iteratee = my_lodash.identity] 迭代函数
   * @returns {*}                                      最大值
   */
  maxBy: function (array, iteratee = my_lodash.identity) {
    return my_lodash.reduce(array, function (ary, val) {
      return my_lodash.iteratee(iteratee)(ary) > my_lodash.iteratee(iteratee)(val) ? ary : val
    })
  },

  /**
   * 求平均数
   * @param {array} array  求数组的平均数
   * @returns {number}     得到的平均值
   */
  mean: function (array) {
    return my_lodash.meanBy(array)
  },

  /**
   * 通过迭代求平均数
   * @param {array} array  求数组的平均数
   * @returns {number}     得到的平均值
   */
  meanBy: function (array, iteratee = my_lodash.identity) {
    return my_lodash.sumBy(array, iteratee) / array.length
  },

  /**
   * 计算数组的最小值,如果 array 为空或者 false,返回 undefined
   * @param  {array} array 需要判断的数组
   * @return {*}           最小值
   */
  min: function (array) {
    if (array.length === 0) {
        return undefined
    }
    return my_lodash.minBy(array, it => it)
  },

  /**
   * 根据迭代求出最小值
   * @param {array} array                              被筛选数组
   * @param {function} [iteratee = my_lodash.identity] 迭代函数
   * @return {*}                                       最小值
   */
  minBy: function (array, iteratee = my_lodash.identity) {
    return my_lodash.reduce(array, function (ary, val) {
      return my_lodash.iteratee(iteratee)(ary) < my_lodash.iteratee(iteratee)(val) ? ary : val
    })
  },

  /**
   * 
   * 两数相乘
   * @param {number} multiplier     乘数
   * @param {number} multiplicand   乘数
   * @returns {number}              乘积
   */
  multiply: function (multiplier, multiplicand) {
    return multiplier * multiplicand
  },

  /**
   * 根据 precision（精度） 四舍五入 number。
   * @param  {number} number        原数值
   * @param  {number} precision = 0 精度
   * @return {number}               返回新数值
   */
  round: function (number, precision = 0) {
    let pre = 10 ** precision
    return Math.round(number * pre) / pre
  },

  /**
   * 
   * 两数相减
   * @param {number} minuend     被减数
   * @param {number} subtrahend  减数
   * @returns {number}           被减数
   */
  subtract: function (minuend, subtrahend) {
    return minuend - subtrahend
  },

  /**
   * 计算集合总和
   * @param {array} array  被叠加的集合
   * @returns {number}     总和
   */
  sum: function (array) {
    return my_lodash.sumBy(array)
  },

  /**
   * 通过迭代计算集合总和
   * @param {array} array                              被叠加的集合
   * @param {function} [iteratee = my_lodash.identity] 迭代函数
   * @returns {number}                                 总和
   */
  sumBy: function (array, iteratee = my_lodash.identity) {
    return my_lodash.reduce(array, function (ary, val) {
      return ary + my_lodash.iteratee(iteratee)(val)
    }, 0)
  },

  /**
   * 
   * 限制 number
   * @param {number} number    被限制的数
   * @param {number} lower     下限
   * @param {number} upper     上限
   * @returns {number}         返回被限制的值
   */
  clamp: function (number, ...args) {
    if (args.length == 1) {
      return number > args[0] ? args[0] : number
    } else {
      return number > args[1] ? args[1] : number < args[0] ? args[0] : number
    }
  },

  /**
   * 检查 值 是否在区间内
   * @param {number} number  被检查值
   * @param {number} start   下限
   * @param {number} end     上限
   * @returns {number}       如果在,返回 true
   */
  inRange: function (number, start, end) {
    if (end === undefined) {
      end = start
      start = 0
    }
    if (start > end) {
      let temp = start
      start = end
      end = temp
    }
    return number < start ? false : number >= end ? false : true
  },

  /**
   * 生成规定范围内的随机数
   * @param {number}  lower    下限
   * @param {number}  upper    上限
   * @param {boolean} floating 是否返回浮点数
   * @return {number}          随机数
   */
  random: function (...args) {
    let lower, upper, floating
    if (args.length === 1) {
      lower = 0
      upper = args[0]
      floating = true
    } else if (args.length === 2) {
      if (this.isNumber(args[1])) {
        lower = args[0]
        upper = args[1]
        floating = true
      } else {
        lower = 0
        upper = args[0]
        floating = args[1]
      }
    } else {
      lower = args[0]
      upper = args[1]
      floating = args[2]
    }
    let result = Math.random() * (upper - lower) + lower
    return floating ? result : parseInt(result)
  },

  /**
   * 分配一个或者多个被分配对象自身 或者 继承到的 可枚举属性,到目标对象上，
   * 分配的属性会覆盖目标身上的同名属性
   * @param  {object} obj      目标属性
   * @param  {...sources} args 被分配的对象
   * @return {object}          分配后的目标对象
   */
  assignIn: function (obj, ...sources) {
    my_lodash.forEach(sources, function (a) {
      for (let key in a) {
        obj[key] = a[key]
      }
    })
    return obj
  },

  /**
   * 将源对象的可枚举自有属性分配到目标对象上，
   * 目标对象上已有的键值不能被覆盖
   * @param  {object} object     目标对象
   * @param  {...object} sources 源对象
   * @return {object}            修改后的目标对象
   */
  defaults: function (object, ...sources) {
    sources.forEach(function (obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && !(key in object)) {
          object[key] = obj[key]
        }
      }
    })
    return object
  },

  /**
   * 递归分配属性
   * 目标对象上已有的键值不能被覆盖
   * @param  {object} object     目标对象
   * @param  {...object} sources 源对象
   * @return {object}            修改后的目标对象
   */
  defaultsDeep: function (object, ...sources) {
    sources.forEach(function (obj) {
      for (let key in obj) {
        if (typeof object[key] === 'object' && typeof obj[key] === 'object') {
          my_lodash.defaultsDeep(object[key], obj[key])
        } else if (obj.hasOwnProperty(key) && !(key in object)) {
          object[key] = obj[key]
        }
      }
    })
    return object
  },

  /**
   * 迭代集合元素,返回第一个 返回 true 的元素键名
   * @param  {array | object} collection                被迭代的集合
   * @param  {function} [predicate = my_lodash.identity]     判定条件
   * @param  {Number} [fromIndex=0]                     判定起始位置
   * @return {*}                                        第一个判定成功的元素的键名
   */
  findKey: function (collection, predicate = my_lodash.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (my_lodash.iteratee(predicate)(collection[key], key, collection)) {
          return key
        }
      }
    }
  },

  /**
   * 从右往左迭代成员,返回第一个满足的成员的键名
   * @param  {array | object} collection               被迭代的集合
   * @param  {function} predicate = my_lodash.identity      迭代器
   * @param  {number} fromIndex = collection.length-1  索引起始位置
   * @return {*}                                       满足条件的第一个成员的键名,未找到返回 undefined
   */
  findLastKey: function (collection, predicate = my_lodash.identity) {
    let keys = Object.keys(collection)
    for (let i = keys.length - 1; i >= 0; i--) {
      if (my_lodash.iteratee(predicate)(collection[keys[i]])) {
        return keys[i]
      }
    }
  },

  /**
   * 通過 iteratee 迭代对象的可枚举和不可枚举对象
   * @param {object} object                       被迭代的对象
   * @param {function} [iteratee = my_lodash.identity] 迭代器
   * @returns {object}                            返回原对象
   */
  forIn: function (object, iteratee = my_lodash.identity) {
    for (let key in object) {
      iteratee(object[key], key, object)
    }
    return object
  },

  /**
   * 通過 iteratee 反向迭代对象的可枚举和不可枚举对象
   * @param {object} object                       被迭代的对象
   * @param {function} [iteratee = my_lodash.identity] 迭代器
   * @returns {object}                            返回原对象
   */
  forInRight: function (object, iteratee = my_lodash.identity) {
    let keys = []
    for (let key in object) {
      keys.push(key)
    }
    for (let i = keys.length - 1; i >= 0; i--) {
      iteratee(object[keys[i]], keys[i], object)
    }
    return object
  },

  /**
   * 通過 iteratee 反向迭代对象的可枚举和不可枚举对象
   * @param {object} object                            被迭代的对象
   * @param {function} [iteratee = my_lodash.identity] 迭代器
   * @returns {object}                                 返回原对象
   */ 
  forOwnRight: function (object, iteratee = my_lodash.identity) {
    let keys = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    for (let i = keys.length - 1; i >= 0; i--) {
      iteratee(object[keys[i]], keys[i], object)
    }
    return object
  },

  /**
   * 列举对象中所有自有方法 
   * @param {object} object 被列举的对象
   * @returns {array}       返回函数名数组
   */
  functions: function (object) {
    let result = []
    if (object === null) {
      return result
    } else {
      for (let key in object) {
        if (object.hasOwnProperty(key) && my_lodash.isFunction(object[key])) {
          result.push(key)
        }
      }
    }
    return result
  },

  /**
   * 列举对象中所有自有和继承方法 
   * @param {object} object 被列举的对象
   * @returns {array}       返回函数名数组
   */
  functionsIn: function (object) {
    let result = []
    if (object === null) {
      return result
    } else {
      for (let key in object) {
        if (my_lodash.isFunction(object[key])) {
          result.push(key)
        }
      }
    }
    return result
  },

  /**
   * 根据路径获取值
   * 
   * @param {object} object       被检索的对象
   * @param {array | string} path 路径
   * @param {*} defaultValue      如果解析 undefined,返回该值
   * @returns {*}                 解析出来的值
   */
  get: function (object, path, defaultValue) {
    if (my_lodash.isString(path)) {
      path = path.split(/[\[\]\.]/).filter(it => it !== '')
    }
    let result = path.reduce(function (ary, val) {
      return ary === undefined ? ary : ary[val]
    }, object)
    return result === undefined ? defaultValue : result
  },

  /**
   * 判断给定路径是否在对象自身上存在,且可枚举
   * @param  {object}  object         被查找的对象
   * @param  {array | string}  path   给定的路径
   * @return {Boolean}                如果存在,返回 true
   */
  has: function (object, path) {
    let prop
    if (my_lodash.isString(path)) {
      prop = path.match(/\w+/g)
    } else {
      prop = path
    }
    let temp = object
    for (let i = 0; i < prop.length; i++) {
      if (temp.hasOwnProperty(prop[i])) {
        temp = temp[prop[i]]
      } else {
        return false
      }
    }
    return true
  },

  /**
   * 检查 path 是否是对象的继承和直接属性
   * @param {object} object       检索对象
   * @param {array | string} path 检查的路径
   * @returns {boolean}           存在,返回 true
   */
  hasIn: function (object, path) {
    if (my_lodash.isString(path)) {
      path = path.split(/[\[\]\.]/).filter(it => it !== '')
    }
    let result = path.reduce(function (ary, val) {
      return ary === undefined ? ary : ary[val]
    }, object)
    return result === undefined ? false : true
  },

  /**
   * 创建一个 object 键值倒置后的对象
   * @param {object} object 被倒置的对象
   * @returns {object}      倒置后的对象
   */
  invert: function (object) {
    let result = {}
    for (let key in object) {
      result[object[key]] = key
    }
    return result
  },

  /**
   * 进过迭代函数,返回键值倒置,值为数组的对象
   * @param {object} object                            被倒置的对象
   * @param {function} [iteratee = my_lodash.identity] 倒置后的对象
   * @returns
   */
  invertBy: function (object, iteratee = my_lodash.identity) {
    let result = {},
      tempKey
    for (let key in object) {
      tempKey = iteratee(object[key], key, object)
      if (result[tempKey] === undefined) {
        result[tempKey] = [key]
      } else {
        result[tempKey].push(key)
      }
    }
    return result
  },

  /**
   * 转化 value 为属性路径的数组 
   * @param {*} value  要转换的值 
   * @returns          返回包含属性路径的数组
   */
  toPath: function(value) {
    return value.match(/[^\.\[\] ]+/g)
  },

  /**
   * 调用object对象path上的方法
   * @param {object} object 调用的对象
   * @param {path}          用来调用的方法路径
   * @param {...args}       调用的方法的参数  
   * @returns               返回调用方法的结果
   */
  invoke: function(object, path, ...args) {
      path = my_lodash.toPath(path)
      let iteratee = path.pop()
      return my_lodash.get(object, path)[iteratee](...args)
  },

  /**
   * 创建一个包含所给对象所有的可枚举自有属性的数组
   * @param  {object} object 被枚举的对象
   * @return {array}         包含所给对象的所有可枚举自有属性的数组
   */
  keys: function (object) {
    let obj = Object(object)
    let result = []
     my_lodash.forOwn(object, function (value, key) {
      result.push(key)
    })
    return result
  },

  /**
   * 创建一个包含所给对象所有的可枚举属性的数组
   * @param  {object} object 被枚举的对象
   * @return {array}         包含所给对象的所有可枚举自有属性的数组
   */
  keysIn: function (object) {
    let result = []
    for (let key in object) {
      result.push(key)
    }
    return result
  },


  mapKeys: function(object, iteratee = my_lodash.identity) {
      iteratee = my_lodash.iteratee(iteratee)
      let map = {}
      for (let key in object) {
          map[iteratee(object[key], key, object)] = object[key]
      }
      return map
  },

  mapValues(object, iteratee = my_lodash.identity) {
    iteratee = my_lodash.iteratee(iteratee)
    let map = {}
    for (let key in object) {
        map[key] = iteratee(object[key], key, object)
    }
    return map
  },

  /**
   * 通过给定路径返回给定对象的值,如果值是函数,返回调用的结果
   * 如果返回值是 undefined ，返回 defaultValue
   * @param  {object} object               被查找的对象
   * @param  {array | string} path         查找的路径
   * @param  {*} defaultValue              替代返回值是 undefined 的值
   * @return {*}                           得到的值
   */
  result: function (object, path, defaultValue) {
    let result = my_lodash.property(path)(object)
    result = result === undefined ? defaultValue : result
    if (my_lodash.isFunction(result)) {
      return result.call(object)
    }
    return result
  },

  /**
   * 将对象的值放入数组返回
   * @param  {object} object 被处理的数组
   * @return {array}         提取后的数组
   */
  values: function (object) {
    let result = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        result.push(object[key])
      }
    }
    return result
  },

  /**
   * 将字符串中的 '&' '<' '>' "'" '"' 转换成对应的 HTML 实体
   * @param  {string} string 待转换的字符串
   * @return {string}        转换后的字符串
   */
  escape: function (string = '') {
    return string.replace(/[\&\<\>\'\"]/g, function (char) {
      switch (char) {
        case '&':
          return '&amp;'
        case '<':
          return '&lt;'
        case '>':
          return '&gt;'
        case "'":
          return '&acute;'
        case '"':
          return '&quot;'
        default:
          return ''
      }
    })
  },

  /**
   * 返回一个函数,将传入的参数颠倒调用
   * @param  {function} func 被调用的函数
   * @return {function}      调整后的函数
   */
  flip: function (func) {
    return function (...args) {
      return func(...my_lodash.reverse(args))
    }
  },

  /**
   * 创建一个返回值的函数
   * @param  {*} value      被新函数返回的值
   * @return {function}     新的函数
   */
  constant: function (value) {
    return function () {
      return value
    }
  },

  /**
   * 深度复制
   * @param  {*} value  被复制的值
   * @return {*}        复制后的值
   */
  cloneDeep: function (value) {
    let result
    if (my_lodash.isDate(value)) {
      return new Date(value.toString())
    } else if (my_lodash.isRegExp(value)) {
      return new RegExp(value)
    } else if (my_lodash.isSymbol(value) || my_lodash.isString(value) || my_lodash.isBoolean(value) || my_lodash.isNumber(value)) {
      return value
    } else if (my_lodash.isArray(value)) {
      result = new Array()
    } else if (my_lodash.isArrayBuffer(value)) {
      result = new ArrayBuffer()
    } else if (my_lodash.isMap(value)) {
      result = new Map()
    } else if (my_lodash.isPlainObject(value)) {
      result = new Object()
    } else if (my_lodash.isSet(value)) {
      result = new Set()
    } else {
      return {}
    }
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = my_lodash.cloneDeep(value[key])
      }
    }
    return result
  },

  /**
   * 返回一个新函数,原函数只接受一个参数,多余的参数忽略
   * @param {any} func 被消减参数的函数
   * @returns          新的函数
   */
  unary: function (func) {
    return my_lodash.ary(func, 1)
  },

  /**
   * 创建一个否定 func 结果的函数,并绑定 this
   * @param  {function} predicate 被否定的函数
   * @return {function}           新建的函数
   */
  negate: function (predicate) {
    return function (...arg) {
      return !predicate(...arg)
    }
  },

  /**
   * 创建一个限制多次调用 func 的函数，对于重复调用 func，只返回 第一次调用的值
   * @param  {function} func 被限制的函数
   * @return {function}      限制后的函数
   */
  once: function (func) {
    return my_lodash.before(1, func.bind(this))
  },

  spread: function (func, start = 0) {
    return function (arg) {
      return func.apply(null, arg)
    }
  },

  /**
   * 参数绑定
   * @param  {function} func      需要参数绑定的函数
   * @param  {...*} ...partials   被绑定的参数
   * @return {function}           绑定后的函数
   */
  partial: function (func, ...partials) {
    return function (...args) {
      partials = my_lodash.map(partials, function (it) {
        if (it === _) {
          return args.shift()
        } else {
          return it
        }
      })
      return func(...partials, ...args)
    }
  },

  /**
   * 缓存计算结果，二次调用时，直接返回缓存中的数据
   * @param  {function} func     被缓存的值的函数
   * @param  {function} resolver 缓存键名迭代方法
   * @return {function}
   */
  memoize: function (func, resolver) {
    let cache = new Map()
    return function fn(...args) {
      fn.cache = cache
      let key = (resolver ? resolver.apply(null, ...args) : args[0])
      if (cache.has(key)) {
        return cache.get(key)
      } else {
        cache.set(key, func.apply(null, ...args))
        return cache.get(key)
      }
    }
  },

  /**
   * 生成唯一的 ID，如果有前缀，附上前缀
   * @param  {*} value      前缀
   * @return {array}        ID
   */
  uniqueId: () => {return (function () {
      let uniqueIdCount = 0
      return function (prefix = '') {
        uniqueIdCount++
        return prefix + uniqueIdCount
      }
    })()
  },

  /**
   * 调用迭代器 n 次，并将调用的结果以数组的形式返回，
   * 迭代器只传一个参数：循环的指针数
   * @param  {number} n          需要调用的次数
   * @param  {function} iteratee 被调用的迭代器
   * @return {array}             迭代出的结果集
   */
  times: function (n, iteratee = my_lodash.identity) {
    let result = []
    for (let i = 0; i < n; i++) {
      result.push(iteratee(i))
    }
    return result
  },















  /**
   * 浅复制值,并返回
   * @param  {*} value 被复制的值
   * @return {*}       复制后的值
   */
  clone: function (value) {
    let result
    if (my_lodash.isDate(value)) {
      return new Date(value.toString())
    } else if (my_lodash.isRegExp(value)) {
      return new RegExp(value)
    } else if (my_lodash.isSymbol(value) || my_lodash.isString(value) || my_lodash.isBoolean(value) || my_lodash.isNumber(value)) {
      return value
    } else if (my_lodash.isArray(value)) {
      result = new Array()
    } else if (my_lodash.isArrayBuffer(value)) {
      result = new ArrayBuffer()
    } else if (my_lodash.isMap(value)) {
      result = new Map()
    } else if (my_lodash.isPlainObject(value)) {
      result = new Object()
    } else if (my_lodash.isSet(value)) {
      result = new Set()
    } else {
      return {}
    }
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = value[key]
      }
    }
    return result
  },

  /**
   * 与property相反,通过对象返回一个函数,函数通过参数返回结果
   * @param  {object} object         查找的对象
   * @return {function}              返回的函数
   */
  propertyOf: function (object) {
    return function (path) {
      let prop
      if (my_lodash.isString(path)) {
        prop = path.match(/\w+/g)
      }
      if (my_lodash.isArray(path)) {
        prop = path
      }
      return my_lodash.reduce(prop, function (obj, key) {
        return obj = obj[key]
      }, object)
    }
  },

  /**
   * 使用迭代器迭代集合
   * @param  {array | object} collection          被迭代的集合
   * @param  {function} [iteratee=identity]        迭代器
   * @return {*}                                   返回值
   */
  forEach: function (collection, iteratee = my_lodash.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (iteratee(collection[key], key, collection) === false) {
          return collection
        }
      }
    }
    return collection
  },

  /**
   * 迭代器迭代集合,当所有迭代结果都为true时,返回true
   * @param  {array | object} collection                    被迭代的集合
   * @param  {function} [predicate = my_lodash.identity]    迭代器
   * @return {boolean}                                      如果所有成员迭代结果都为 true ，返回 true
   */
  every: function (collection, predicate = my_lodash.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (my_lodash.iteratee(predicate)(collection[key], key, collection) === false) {
          return false
        }
      }
    }
    return true
  },

  /**
   * 检查传入的值是不是一个 数组
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 对象,返回 true
   */
  isArray: function (value) {
    return toString.call(value) === '[object Array]'
  },

  /**
   * 将两个值进行深度比较,确定他们是否相等(对象不考虑顺序)
   * @param  {*}  value      被检查的值
   * @param  {[type]}  other 去比较的值
   * @return {Boolean}       如果两个值深度相等,返回 true
   */
  isEqual: function(values, others) {
    if (Object.prototype.toString.call(values) != Object.prototype.toString.call(others)) return false // 具体类型判断
    if (typeof values === "number" || typeof values === "boolean" || typeof values === "undefined" || typeof values === "string" ) return values === others ? true : false //递归结束条件 
    if (values != values && others != others) return true //判断NaN
    let value = Object.keys(values).sort(), other = Object.keys(others).sort()
    if (value.length != other.length) return false 
    for (let name in value) {
      if (value[name] != other[name]) return false
      if (!my_lodash.isEqual(values[value[name]], others[other[name]])) return false
    }
    return true
  },

  /**
   * 创建一个深比较的方法来比较给定的对象和source对象(深度对比)。如果给定的对象拥有相同的属性值返回true,否则返回false。
   * @param  {object} source 需要对比的参数
   * @return {function}      返回新的函数
   */
  matches: function (source) {
    return function (it) {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          if (!my_lodash.isEqual(source[key], it[key])) {
            return false
          }
        }
      }
      return true
    }
  },

  /**
   * 创建一个返回给定对象的 path 的值的函数。
   * @param  {array | string} path  查找的路径
   * @return {function}             返回新的函数
   */
  property: function (path) {
    let prop
    if (my_lodash.isString(path)) {
      prop = path.match(/\w+/g)
    }
    if (my_lodash.isArray(path)) {
      prop = path
    }
    return function (it) {
      return my_lodash.reduce(prop, function (obj, val) {
        return obj = obj[val]
      }, it)
    }
  },

  /**
   * 创建一个深比较的方法来比较给定对象的path的值是否是srcValue。如果是返回 true,否则返回false。 
   * @param  { array | string } path     用于比较的路径
   * @param  {*} srcValue                用于比较的值
   * @return {function}                  返回新的函数
   */
  matchesProperty: function (path, srcValue) {
    let prop
    if (my_lodash.isString(path)) {
      prop = path.match(/\w+/g)
    }
    if (my_lodash.isArray(path)) {
      prop = path
    }
    return function (it) {
      return my_lodash.isEqual(my_lodash.reduce(prop, function (obj, val) {
        return obj = obj[val]
      }, it), srcValue)
    }
  },

  /**
   * 创建一个函数,通过创建函数的参数调用func函数。如果func是一个属性名,传入包含这个属性名的对象,回调返回对应属性名的值。如果func是一个对象,传入的元素有相同的对象属性,回调返回true。其他情况返回 false。 
   * @param  {string | array | object} func 选择回调函数的参数
   * @return {function}                     返回该回调函数
   */
  iteratee: function (func = my_lodash.identity) {
    if (my_lodash.isString(func)) {
      return my_lodash.property(func)
    }
    if (my_lodash.isArray(func)) {
      return my_lodash.matchesProperty(func[0], func[1])
    }
    if (my_lodash.isPlainObject(func)) {
      return my_lodash.matches(func)
    }
    if (my_lodash.isFunction(func)) {
      return func
    }
  },

} 