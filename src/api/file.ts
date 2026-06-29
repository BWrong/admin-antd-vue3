import type { AxiosProgressEvent } from "axios";
import type { UnwrapNestedRefs } from "vue";

import { download, upload } from "@/utils/request";

const prefix = "/file";

// 文件上传
export const uploadRequest = (
  params: object,
  progressRef?: UnwrapNestedRefs<Partial<AxiosProgressEvent>>,
) =>
  upload(`${prefix}/upload`, params, {
    onDownloadProgress(progressEvent) {
      const { loaded, total, progress } = progressEvent;
      progressRef &&
        Object.assign(progressRef, {
          total,
          loaded,
          progress: Number(((progress ?? 0) * 100).toFixed(2)),
        });
    },
  });
// 文件下载
export const downloadRequest = (
  fileName: string,
  params?: any,
  progressRef?: UnwrapNestedRefs<Partial<AxiosProgressEvent>>,
) =>
  download(fileName, `/file/download?name=${fileName}`, params, {
    onDownloadProgress(progressEvent) {
      const { loaded, total, progress } = progressEvent;
      progressRef &&
        Object.assign(progressRef, {
          total,
          loaded,
          progress: Number(((progress ?? 0) * 100).toFixed(2)),
        });
    },
  });
