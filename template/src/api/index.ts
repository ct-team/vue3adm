import Interface from '@/api/interface';
import useCurrentInstance from '@/assets/js/useCurrentInstance';
import { SearchRequest, FormInfo } from '@/types/index.d';
let p: any = null;
function getCxt(): any {
  if (p) {
    return p;
  }
  const { proxy } = useCurrentInstance();
  p = proxy;
  return p;
}

export const getTableList = (params: SearchRequest): any => {
  return getCxt().$dart.http.ajax({
    method: 'get',
    url: Interface.tableList,
    data: params,
  });
};

export const getViewData = async (id: number): Promise<any> => {
  return getCxt().$dart.http.ajax({
    method: 'get',
    url: Interface.viewData,
    data: { id },
  });
};

export const saveEditData = async (params: FormInfo): Promise<any> => {
  return getCxt().$dart.http.ajax({
    method: 'post',
    url: Interface.edit,
    data: params,
  });
};
