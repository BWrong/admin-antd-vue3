const list = ({ query }) => ({
  code: 200,
  msg: '',
  data: {
    total: 200,
    current: Number(query.pageNow),
    size: Number(query.pageSize),
    'list|10': [
      {
        id: '@guid',
        title: '@ctitle',
        code: '@zip()',
        describe: '@csentence(20,30)',
        'children|2': [
          {
            id: '@guid',
            title: '@ctitle',
            code: '@zip()',
            describe: '@csentence(20,30)'
          }
        ]
      }
    ]
  }
});
module.exports = [
  {
    url: '/system/department',
    response: list
  }
];
