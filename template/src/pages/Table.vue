<template>
  <el-table :data="data" v-loading="loading" border>
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
    <el-table-column label="操作" width="150" fixed="right">
      <template #default="scope">
        <el-button
          icon="document"
          link
          type="primary"
          @click="handleView(scope.row)"
          v-if="proxy.$dart.permission.is('view')"
        >
          查看
        </el-button>
        <el-button
          icon="edit"
          link
          type="primary"
          @click="handleEdit(scope.row)"
          v-if="proxy.$dart.permission.is('edit')"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="dt-pagination mt10">
    <el-pagination background layout="total,prev, pager, next" :total="1000" />
  </div>
</template>

<script setup lang="ts">
import { TableRow } from '@/types/index.d';
import useCurrentInstance from '@/assets/js/useCurrentInstance';

defineProps({
  data: { type: Array, default: () => [] },
  loading: Boolean,
});
// 声明emits
const emit = defineEmits(['open-view', 'open-edit']);
const { proxy } = useCurrentInstance();

const handleView = (row: TableRow) => {
  emit('open-view', row);
};
const handleEdit = (row: TableRow) => {
  emit('open-edit', row);
};
</script>
