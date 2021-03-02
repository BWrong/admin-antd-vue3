const list = ({ query }) => ({
  code: 200,
  msg: '',
  data: {
    total: 200,
    current: Number(query.pageNow),
    size: Number(query.pageSize),
    list: [
      {
        id: '@guid',
        title: 'admin',
        code: 'ADMIN',
        describe: '超级管理员',
        createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
        deptCode: '86',
        deptName: '中国'
      },
      {
        id: '@guid',
        title: '默认',
        code: 'DEFAULT',
        describe: '系统默认角色',
        createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
        deptCode: '86',
        deptName: '中国'
      },
      {
        id: '@guid',
        title: '部门经理',
        code: 'DEPT_LEADE',
        describe: '部门经理',
        createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
        deptCode: '86',
        deptName: '中国'
      },
      {
        id: '@guid',
        title: '开发者',
        code: 'DEVELOPER',
        describe: '开发人员',
        createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
        deptCode: '86',
        deptName: '中国'
      }
    ]
  }
});
module.exports = [
  {
    url: '/system/role',
    response: list
  }
];
