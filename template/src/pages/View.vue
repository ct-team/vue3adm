<template>
  <div class="form-wrap" v-loading="slideLoading">
    <el-form class="dt-form">
      <el-form-item label="日期">
        {{ formData.data.date }}
      </el-form-item>
      <el-form-item label="姓名">
        {{ formData.data.name }}
      </el-form-item>
      <el-form-item label="地址">
        {{ formData.data.address }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { ResponseInfo } from '@/types/index';
import { getViewData } from '@/api/index';

const route = useRoute();
const slideLoading = ref(true);
const formData = reactive({
  data: {
    name: '',
    address: '',
    date: '',
  },
});

const getViewInfo = (id: number) => {
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

const setSlideLoading = (type: boolean): void => {
  slideLoading.value = type;
};
const id = Number(route.query.id);
getViewInfo(id);
</script>
