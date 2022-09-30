<template>
  <el-drawer
    :title="title"
    v-model="drawer"
    direction="rtl"
    size="60%"
    @closed="handleClose"
  >
    <div class="bk-drawer-form">
      <router-view @close-drawer="closeDrawer"></router-view>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const drawer = ref(false);
const title = route.meta.title;

const closeDrawer = () => {
  drawer.value = false;
};
const handleClose = (): void => {
  router.push('/');
};
onMounted(() => {
  drawer.value = true;
});
</script>
