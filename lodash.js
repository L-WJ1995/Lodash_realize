var my_lodash = {

  /**
   * 返回接收到的第一个参数
   * @param  {*} value 任何值
   * @return {*}       返回值
   */
  identity: function (value) {
    return value
  }

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
    let flat = my_lodash.map(my_lodash.flatten(others), it => my_lodash.iteratee(iteratee)(it))
    return my_lodash.reduce(array, function (ary, val) {
      if (!my_lodash.includes(flat, my_lodash.iteratee(iteratee)(val))) {
        ary.push(val)
      }
      return ary
    }, [])
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
    let flat = my_lodash.flatten(others)
    return my_lodash.reduce(array, function (ary, val) {
      my_lodash.each(flat, function (a) {
        if (!comparator.call(my_lodash, a, val)) {
          ary.push(val)
        }
      })
      return ary
    }, [])
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
    let ary = []
    for (let i = array.length - 1; i >= 0; i--) {
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
    let ary = []
    for (let i = 0; i < array.length; i++) {
      if (my_lodash.iteratee(predicate)(array[i]) === false) break
    }
    for (let i = 0; i < array.length; i++) {
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
      return customizer.call(that, object[it[0]], it[1], it[0], object, source)
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