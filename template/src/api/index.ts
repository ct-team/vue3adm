import Interface from '@/api/interface';

import { SearchRequest, FormInfo } from '@/types/index.d';
import { Http } from 'ct-dart3';

export const getTableList = (params: SearchRequest): any => {
  return Http.ajax({
    method: 'get',
    url: Interface.tableList,
    data: params,
  });
};

export const getViewData = async (id: number): Promise<any> => {
  return Http.ajax({
    method: 'get',
    url: Interface.viewData,
    data: { id },
  });
};

export const saveEditData = async (params: FormInfo): Promise<any> => {
  return Http.ajax({
    method: 'post',
    url: Interface.edit,
    data: params,
  });
};
