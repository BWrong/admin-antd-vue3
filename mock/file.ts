import type { MockMethod } from 'vite-plugin-mock';
import fs from 'fs'; // 注意：生产环境不可用
export default [
  {
    url: '/api/file/download',
    method: 'get',
    rawResponse: (req, res) => {
      const rs = fs.readFileSync(__dirname + '/menu.json');
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment;');
      res.statusCode = 200;
      res.end(rs);
    }
  }
] as MockMethod[];
