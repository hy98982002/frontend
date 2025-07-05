<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useUIStore } from './store/uiStore'

const uiStore = useUIStore()

onMounted(() => {
  uiStore.initializeUI()
})
</script>

<template>
  <div id="app">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 主内容区域 -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ffffff;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.main-content {
  padding-top: 0; /* 让轮播图贴着导航栏 */
  min-height: 100vh;
}

/* Bootstrap样式覆盖 */
.container {
  max-width: 1200px;
}

/* 自定义工具类 */
.text-tech-blue {
  color: #1e7f98 !important;
}

.bg-tech-blue {
  background-color: #1e7f98 !important;
}

.border-tech-blue {
  border-color: #1e7f98 !important;
}
</style>
