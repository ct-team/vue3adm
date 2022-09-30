<template>
  <div>
    <div>环境：{{ title }}</div>
    <Breadcrumb />
    <Search @search="handleSearch" ref="refSearch" />
    <Table
      @open-view="handleOpenView"
      @open-edit="handleOpenEdit"
      :data="tableData"
      :loading="loading"
    ></Table>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

import Breadcrumb from './Breadcrumb.vue';
import Search from './Search.vue';
import Table from './Table.vue';
import { SearchRequest, TableRow, ResponseInfo } from '@/types/index.d';
import { getTableList } from '@/api/index';
const title = process.env.VUE_APP_TITLE;
const router = useRouter();
const refSearch = ref(null);
const { proxy } = getCurrentInstance() as any;
const tableData = ref([]);
const loading = ref(true);
let form = {
  user: '',
  region: '',
};

const handleSearch = (searchValue: SearchRequest): void => {
  form = searchValue;
  refreshTable(searchValue, () => {
    (refSearch as any).value.setLoading(false);
  });
};

const handleOpenView = (row: TableRow): void => {
  routerPush('/drawer/view', row.id);
};

const handleOpenEdit = (row: TableRow): void => {
  routerPush('/drawer/edit', row.id);
};
const setTableLoading = (type: boolean) => {
  loading.value = type;
};

const refreshTable = (data: SearchRequest, complete?: any) => {
  setTableLoading(true);
  getTableList(data)
    .then((res: ResponseInfo) => {
      if (res.code === 0) {
        tableData.value = res.data;
      }
    })
    .catch(() => {
      tableData.value = [];
    })
    .then(() => {
      complete && complete();
      setTableLoading(false);
    });
};

const bindBusEvent = () => {
  proxy.$bus.on('refreshTable', (params: any) => {
    refreshTable(params);
  });
};
const routerPush = (path: string, id: any): void => {
  router.push({
    path,
    query: {
      id,
    },
  });
};
bindBusEvent();

onBeforeUnmount(() => {
  proxy.$bus.off('refreshTable');
});

refreshTable(form);
</script>
