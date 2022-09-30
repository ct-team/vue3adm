<template>
  <div class="form-wrap" v-loading="slideLoading">
    <el-form
      :label-width="100"
      :model="formData"
      ref="dom"
      class="dt-form"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="formData.data.user"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.data.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.data.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit(dom)">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { ResponseInfo } from '@/types/index.d';
import { getViewData, saveEditData } from '@/api/index';
import type { FormRules, FormInstance } from 'element-plus';
const emit = defineEmits<{
  (event: 'close-drawer'): void;
}>();

const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const slideLoading = ref(true);
const formData = reactive({
  data: { name: '', address: '', date: '', user: '' },
});
const dom = ref<FormInstance>();
const rules = reactive<FormRules>({
  user: [{ required: true, message: 'Please input name', trigger: 'blur' }],
});
const getEditInfo = (id: number) => {
  setSlideLoading(true);
  getViewData(id)
    .then((res: ResponseInfo) => {
      formData.data = res.data;
      setSlideLoading(false);
    })
    .catch(() => {
      setSlideLoading(false);
    });
};
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  setSlideLoading(true);
  await formEl.validate((valid) => {
    if (valid) {
      saveEditData(formData.data)
        .then((res: any) => {
          setSlideLoading(false);
          proxy.$message({
            message: res.message,
            type: 'success',
          });
          handleCloseDrawer();
          proxy.$bus.emit('refreshTable');
        })
        .catch(() => {
          setSlideLoading(false);
        });
      return;
    }
    setSlideLoading(false);
  });
};

const setSlideLoading = (type: boolean): void => {
  slideLoading.value = type;
};

const handleCloseDrawer = () => {
  emit('close-drawer');
};
const id = Number(route.query.id);
getEditInfo(id);
</script>
