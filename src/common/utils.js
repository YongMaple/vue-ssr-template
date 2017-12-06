import $ from 'jquery'

export default {
  clone: function(obj) {
    var o;
    if (typeof obj == "object") {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(this.clone(obj[i]));
          }
        } else {
          o = {};
          for (var j in obj) {
            o[j] = this.clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  },

  unique: function(items, filterOn) {
    let newItems = []

    if (Array.isArray(items)) {
      items.forEach(item => {
        if (!newItems.includes(item[filterOn])) {
          newItems.push(item[filterOn])
        }
      })
    }
    return newItems
  },

  disableBodyScroll: function() {
    document.body.style.overflowY = 'hidden'
  },

  enableBodyScroll: function() {
    document.body.style.overflowY = ''
  },

  isAndroid: function() {
    let userAgent = navigator.userAgent
    return (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1)
  },

  // crypto: function(val) {
  //   let salt = 'P7LW5I9ZLW15776X'
  //   let hash = crypto.createHash('md5').update(val).digest('hex').toUpperCase() + salt
  //   return crypto.createHash('md5').update(hash).digest('hex').toUpperCase()
  // },
  /**
   * 手机号验证
   * @param  String number 手机号
   * @return Object 验证成功或失败
   */
  validateMobileNumber: function(number) {
    if (number === '') {
      return { message: '请填写联系手机' }
    }
    let re = /^(13[0-9]|147|145|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
    if (!re.test(number)) {
      return { message: '联系手机不合法！'}
    }
    return undefined;
  },
  /**
   * 判断闰年
   * @param yy
   * @returns {boolean}
   */
  isLeapYear: function (yy) {
    if (((yy % 4) == 0) && ((yy % 100) != 0) || ((yy % 400) == 0)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 计算年龄
   * @param date
   * @param flyDate
   * @returns {number}
   */
  checkAge: function (date, flyDate) {
    let yy = date.substr(0, 4)
    let mm = date.substr(4, 2)
    let dd = date.substr(6, 2)
    let main = "valid"

    if (date.indexOf('-1') != -1) {
      yy = date.substr(0, 4)
      mm = date.substr(5, 2)
      dd = date.substr(8, 2)
    }

    if ((mm < 1) || (mm > 12) || (dd < 1) || (dd > 31) || (yy < 1) || (mm == "") || (dd == "") || (yy == "")) main = "invalid"
    else if (((mm == 4) || (mm == 6) || (mm == 9) || (mm == 11)) && (dd > 30)) main = "invalid"
    else if (mm == 2) {
      if (dd > 29) {
        main = "invalid"
      } else if ((dd > 28) && (!this.isLeapYear(yy))) {
        main = "invalid"
      }
    } else if ((yy > 9999) || (yy < 0)) main = "invalid";

    if (main == "valid") {
      var days = new Date(Date.parse(flyDate.replace(/-/g, "/")));

      var gdate = days.getDate();
      var gmonth = days.getMonth();
      var gyear = days.getFullYear();
      var age = gyear - yy;
      if ((mm == (gmonth + 1)) && (dd <= parseInt(gdate))) {
        age = age;
      } else {
        if (mm <= (gmonth)) {
          age = age;
        } else {
          age = age - 1;
        }
      }
      if (age == 0) age = age;
      return age;
    }
  },
  /**
   * 乘机人新增成人判断
   * @param cardtype
   * @param cardno
   * @param birth
   * @param flyDate
   * @returns {*}
   */
  isAgeType: function (cardtype, cardno, birth, flyDate) {
    let year = ""
    let month = ""
    let day = ""
    if (cardtype === "身份证") {
      year = cardno.substr(6, 4);
      month = cardno.substr(10, 2);
      day = cardno.substr(12, 2)
    } else {
      if (birth.indexOf('-') != -1) {
        year = birth.substr(0, 4);
        month = birth.substr(5, 2);
        day = birth.substr(8, 2)
      } else {
        year = birth.substr(0, 4);
        month = birth.substr(4, 2);
        day = birth.substr(6, 2);
      }
    }
    var age = this.checkAge(year + month + day, flyDate);

    if (age >= 18) {
      return "AA"; //完全成人
    } else if (age < 18 && age >= 12) {
      return "A"; //成人
    } else if (age < 12 && age >= 5) {
      return "BB"; //儿童1
    } else if (age < 5 && age >= 2) {
      return "B"; //儿童2
    } else {
      return "C"; //婴儿
    }
  },
  /**
   * 判断空对象
   */
  isEmptyObject: function(obj) {
    for (let key in obj) {
      return false
    }
    return true
  },
  // 平台ID： 手Q  519  微信  501  小程序  502
  platId : function () {
    return 519
  },

  setTitle: function(title) {
    let $body = $('body')
    document.title = title
    let $iframe = $('<iframe src="/favicon.ico"></iframe>')
    $iframe.on('load', function() {
      setTimeout(function() {
        $iframe.off('load').remove()
      }, 0)
    }).appendTo($body)
  },

  addCookie: function (name, value, day) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + day);
    //设置失效时间
    document.cookie = escape(name) + '=' + value +';path=/;expires=' + expireDate.toGMTString();
  }
}
