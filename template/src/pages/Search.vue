<template>
  <dart-search
    label-position="right"
    :model="form.data"
    :rules="rules"
    ref="searchRef"
  >
    <template #search-form>
      <dart-search-item label="审批人" prop="user">
        <el-input v-model="form.data.user"></el-input>
      </dart-search-item>
      <dart-search-item label="活动区域">
        <el-select v-model="form.data.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </dart-search-item>
    </template>
    <template #search-btn>
      <el-button
        type="primary"
        native-type="submit"
        icon="search"
        :loading="loading"
        @click="onSubmit"
      >
        查询
      </el-button>
    </template>
  </dart-search>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { SearchRequest } from '@/types/index.d';
import type { FormRules } from 'element-plus';
const emit = defineEmits<{
  (event: 'search', form: SearchRequest): void;
}>();
const searchRef = ref(null);
const form = reactive({
  data: {
    user: '',
    region: '',
  },
});
const rules = reactive<FormRules>({
  user: [{ required: true, message: 'Please input name', trigger: 'blur' }],
});
const loading = ref(false);
const onSubmit = (): void => {
  setLoading(true);
  (searchRef.value as any).validate((state: boolean) => {
    if (state) {
      search();
      return;
    }
    setLoading(false);
  });
};

const setLoading = (flag: boolean): void => {
  loading.value = flag;
};
const search = () => {
  emit('search', form.data);
};
defineExpose({
  setLoading,
});
</script>
