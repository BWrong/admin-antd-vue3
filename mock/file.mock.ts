import { defineMock } from 'vite-plugin-mock-dev-server';
export default defineMock([
  {
    url: '/api/file/download',
    method: 'GET',
    response: (req, res) => {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment;');
      res.statusCode = 200;
      res.end('测试数据');
    }
  }
]);
