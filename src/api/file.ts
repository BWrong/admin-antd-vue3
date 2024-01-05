import type { AxiosProgressEvent } from 'axios';
import type { UnwrapNestedRefs } from 'vue';

import { download, upload } from '@/utils/request';

const prefix = '/file';

// 文件上传
export const uploadRequest = (params: object, progressRef?: UnwrapNestedRefs<Partial<AxiosProgressEvent>>) =>
  upload(`${prefix}/upload`, params, {
    onDownloadProgress(progressEvent) {
      const { loaded = 0, total = 0, progress = 0 } = progressEvent;
      progressRef &&
        Object.assign(progressRef, {
          total,
          loaded,
          progress: Number((progress * 100).toFixed(2))
        });
    }
  });
// 文件下载
export const downloadRequest = (
  fileName: string,
  params?,
  progressRef?: UnwrapNestedRefs<Partial<AxiosProgressEvent>>
) =>
  download(fileName, `/file/download?name=${fileName}`, params, {
    onDownloadProgress(progressEvent) {
      const { loaded = 0, total = 0, progress = 0 } = progressEvent;
      progressRef &&
        Object.assign(progressRef, {
          total,
          loaded,
          progress: Number((progress * 100).toFixed(2))
        });
    }
  });
