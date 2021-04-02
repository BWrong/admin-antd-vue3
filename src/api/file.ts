import { post } from '@/utils/request';
const prefix = '/file';
export default {
  upload: (params: object) =>
    post(`${prefix}/upload`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  download: (fileName: string) =>
    post(
      `${prefix}/download?fileName=${fileName}`,
      {},
      {
        isNotIntercept: true,
        responseType: 'blob'
      }
    )
};
