/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:18:02
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-19 09:19:55
 */
export default {
  name: 'en',
  app: {
    global: {
      title: 'Qm LowCode System',
      home: 'Home Page',
      dashboard: 'Dashboard',
      emptyText: 'No Data',
      noMatch: 'Sorry, the page you visited does not exist or is under development',
      errorLoad: 'Loading error. Please refresh the page and try again',
      leaveText: 'Data not saved, are you sure to leave?',
    },
    sidebar: {
      allNavTitle: 'All Navigation',
      allNavPlaceholder: 'Please enter menu name/pinyin',
      usedNav: 'Common Use',
      starNav: 'My Collection',
    },
    header: {
      fold: 'Fold',
      unfold: 'Unfold',
    },
    multiTab: {
      refresh: 'Refresh page',
      closeRight: 'Close right',
      closeLeft: 'Close left',
      closeOthers: 'Close other',
    },
    settings: {
      usercenter: 'User center',
      clearcache: 'Clear cache',
      logout: 'Logout',
      companyName: 'Company name',
      userInfo: 'Personal information',
      systemRole: 'System role',
      admin: 'Administrator',
    },
    insideLetter: {
      notice: 'Notice',
      message: 'Message',
      waiting: 'Todo',
    },
    dreadcrumb: {
      location: 'Location',
    },
    sizeSelect: {
      large: 'Large Size',
      medium: 'Medium Size',
      small: 'Small Size',
    },
    helperDoc: {
      helpDoc: 'Help Document',
      useManual: 'Use Manual',
    },
    login: {
      title: 'System login',
      weChat: 'WeChat login',
    },
    fetch: {
      errorCode: {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        412: '客户端请求信息的先决条件错误。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
      },
      errorText: 'Request timeout',
      lockText: 'Lock request',
      cancelText: 'Cancel request',
    },
    information: {
      title: 'Prompt information',
      confirm: 'Confirm the operation?',
      maxCache: 'Most support open {total} menus!',
      maxStar: 'Most to star {total} menus!',
    },
    button: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      close: 'Close',
      submit: 'Submit',
      remove: 'Remove',
      edit: 'Edit',
      modify: 'Modify',
      details: 'Details',
      view: 'View',
      print: 'Print',
      export: 'Export',
      import: 'Import',
      upload: 'Upload',
      download: 'Download',
      search: 'Search',
      reset: 'Reset',
      save: 'Save',
      clear: 'Clear',
      operation: 'Operation',
      preview: 'Preview',
    },
  },
};
