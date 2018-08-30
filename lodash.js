var my_lodash = {

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
    if (!l_wj1995.isArray(others[others.length - 1])) {
      iteratee = others.pop()
    } else {
      iteratee = l_wj1995.identity
    }
    let ary = [].concat(...others).map(arg => l_wj1995.iteratee(iteratee)(arg))
    return array.filter(item => {
        return !ary.includes(l_wj1995.iteratee(iteratee)(item))
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
            if (l_wj1995.iteratee(comparator)(it, ary[i])) {
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
   * 创建唯一值的数组，这个数组包含所有给定数组都包含的元素(交集)
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
   * 和 intersection 类似，通过 迭代器筛选
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
   * 和intersection类似，可自定义比较方式
   * @param  {...array} array 被筛选数组群
   * @return {array}          筛选出来的数组
   */
  intersectionWith: function (...paras) {
    let comparator = paras.pop()
    let others = my_lodash.drop(paras)
    return paras[0].reduce(function (ary, val) {
      let onOff = my_lodash.reduce(others, function (me, cu) {
        for (let i = 0; i < cu.length; i++) {
          if (comparator.call(my_lodash, val, cu[i])) {
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
   * 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
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
    my_lodash.each(values, function (element) {
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
   * 和pullAllBy类似，自定义指定比较函数
   * @param  {array} array                       被操作的数组
   * @param  {*} values                          数组下标
   * @param  {function} [comparator]             自定义函数
   * @return {array}                             返回新数组
   */
  pullAllWith: function (array, values, comparator) {
    my_lodash.each(values, function (element) {
      for (let i = 0; i < array.length; i++) {
        if (comparator.call(my_lodash, element, array[i])) {
          array.splice(i, 1)
          i--
        }
      }
    })
    return array
  },

  /**
   * 根据索引 indexes，移除array中对应的元素，并返回被移除元素的数组。
   * @param  {array}                array     被操作的数组
   * @param  {...(number|number[]}  indexes   数组下标
   * @return {array}                array     返回新数组
   */
  pullAt: function(array, indexes) {
    let ary = []
    for (let i = 1; i < arguments.length; i++) ary.push(...arguments[i])
    for (let j = 0; j < ary; j++) {
      array.splice(ary[j],1)
    }
    return array
  },

  /**
   * 反转array，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推。 
   * @param  {array}  array  原数组对象
   * @return {array}         反转后的数组
   */
  reverse: function(array) {
    return array.reverse()
  },

  /**
   * 裁剪数组array，从 start 位置开始到end结束，但不包括 end 本身的位置。 
   * @param  {array}   array                   原数组对象
   * @param  {number}  start = 0               开始位置
   * @param  {number}  end = array.length - 1  开始位置
   * @return {array}                           裁剪后的数组
   */
  slice: function(array, start = 0, end = array.length) {
    return array.slice(start,end)
  },

  /**
   * 使用二分法的方式检索来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。
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
   * 切割数组，从array数组的起始元素开始提取n个元素。
   * @param  {array}  array    待切割数组
   * @param  {number} n = 1    提取数量
   * @return {array}           提取元素的数组集合
   */
  take: function(array, n = 1) {
    return array.slice(0, n)
  },

  /**
   * 切割数组，从array数组的最后一个原素开始提取n个元素。
   * @param  {array}  array    待切割数组
   * @param  {number} n = 1    提取数量
   * @return {array}           提取元素的数组集合
   */
  takeRight: function(array, n = 1) {
    return array.slice(array.length - n < 0 ? 0 : array.length - n)
  },

  /**
   * 依据断言函数，从右向左提取数据
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
   * 依据断言函数，提取数据
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
   * 使用迭代器迭代集合
   * @param  {array | object} collection          被迭代的集合
   * @param  {function} [iteratee=identity]        迭代器
   * @return {*}                                   返回值
   */
  each: function (collection, iteratee = my_lodash.identity) {
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
   * @return {Boolean}       如果是 对象，返回 true
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
   * 执行一个深度比较,来确定object是否含有和source完全相等的属性值。与isEqual差不多,取消长度判断。
   * @param {object} object      要检查的对象
   * @param {object} source      匹配的对象
   * @param {boolean} customizer 如果对象满足,返回 true
   * @returns
   */
  isMatchWith: function (object, source, customizer) {
    customizer = customizer || my_lodash.isEqual
    let temp = Object.entries(source)
    return temp.every(function (it) {
      return customizer.call(my_lodash, object[it[0]], it[1], it[0], object, source)
    })
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