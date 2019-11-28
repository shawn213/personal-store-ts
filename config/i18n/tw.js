export default {
  __wait: '處理中...',
  __message: {
    success: '{action}成功',
    fail: '{action}失敗',
    create: '新增',
    update: '更新',
    delete: '刪除',
    addItem: '{name}加入購物車',
    order: '訂單確認',
    error: {
      password: '密碼錯誤'
    }
  },
  __html: {
    feature: '功能',
    store: '門市店號：{id}, 門市名稱：{name}, 門市地址：{addr}',
    user: {
      userId: '用戶帳號',
      username: '用戶姓名',
      password: '用戶密碼',
      confirm: '確認密碼',
      email: '電子郵件',
      cellPhone: '手機號碼',
      status: '身份',
      authority: {
        0: '顧客',
        1: '賣家',
        99: '管理員'
      }
    },
    product: {
      name: '商品名稱',
      price: '商品原價',
      onSale: '商品特價',
      preview: '商品預覽',
      url: '圖片網址',
      images: '商品圖片',
      range: '團購時間設定',
      content: '商品描述'
    },
    btn: {
      create: '新增',
      update: '更新',
      login: '登入',
      delete: '刪除',
      query: '查詢',
      cancel: '取消',
      checkout: '結帳',
      preview: '預覽',
      register: '註冊',
      resetPW: '重設密碼',
      selectStore: '選擇取件門市',
      confirmOrder: '確認訂單'
    },
    checkout: {
      name: '商品名稱',
      image: '商品圖片',
      count: '數量',
      amount: '金額',
      feature: '功能',
      type: '樣式',
      seven: '7-11',
      family: '全家',
      hilife: '萊爾富'
    },
    order: {
      orderTime: '訂購時間',
      userId: '訂購者名稱',
      count: '訂單總件數',
      amount: '訂單總金額',
      status: '訂單狀態',
      orderStatus: {
        N: '未登記',
        Y: '已登記'
      }
    }
  },
  __validator: {
    error: '錯誤.',
    required: '{0}必須輸入.',
    float: '必須是數字.',
    integer: '必須是整數.',
    number: '必須是數字.',
    lessThan: '必須小於 {0}.',
    lessThanOrEqualTo: '必須小於或等於 {0}.',
    greaterThan: '必須大於 {0}.',
    greaterThanOrEqualTo: '必須大於或等於 {0}.',
    between: '必須介於 {0} 和 {1} 之間.',
    size: '大小必須為 {0}.',
    length: '長度必須為 {0}.',
    minLength: '必須至少包含 {0} 個字符.',
    maxLength: '最多包含 {0} 個字符.',
    lengthBetween: '長度必須介於 {0} 和 {1} 之間.',
    in: '必須為 {0}.',
    notIn: '不得為 {0}.',
    match: '{0} 不匹配.',
    regex: '無效的格式.',
    digit: '必須是數字.',
    email: '無效的電子郵件地址.',
    url: '無效的網址.'
  },
  __menu: {
    management: {
      product: '登入商品',
      user: '管理使用者',
      order: '管理訂單'
    },
    user: {
      login: '登入/註冊',
      productList: '訂單查詢',
      logout: '登出'
    }
  }
}
