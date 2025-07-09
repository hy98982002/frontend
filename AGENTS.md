# AGENTS.md - Frontend (Vue 3 + Vite + Bootstrap 5.3.6)

## 📸 图片命名与阶段对照规范

### 课程封面图片命名规则

根据图片文件名前缀确定对应的课程阶段：

| 图片前缀        | 对应阶段(stage) | 中文名称     | 说明                       |
| --------------- | --------------- | ------------ | -------------------------- |
| `tiyan-`        | `free`          | 体验专区     | 免费体验课程               |
| `rumen-`        | `basic`         | 入门专区     | 基础入门课程               |
| `jingjin-`      | `advanced`      | 精进专区     | 进阶提升课程               |
| `shizhan-`      | `project`       | 实战专区     | 项目实战课程               |
| `xiangmuluodi-` | `landing`       | 项目落地专区 | 企业级项目落地             |
| `huiyuan-`      | -               | 会员专享     | 会员专享课程(可在任意阶段) |

### 重要原则

- **严格对应**：图片前缀必须与课程 stage 严格对应
- **一致性检查**：添加课程时必须验证图片命名和 stage 的匹配关系
- **错误修正**：发现不匹配时立即修正，确保用户体验一致性

### 示例配置

```typescript
// ✅ 正确配置
{
  title: 'Python基础入门',
  cover: '/images/tiyan-python-cover.jpg',  // tiyan前缀
  stage: 'free'  // 对应free阶段
}

// ❌ 错误配置
{
  title: 'Python基础入门',
  cover: '/images/rumen-python-cover.jpg',  // rumen前缀
  stage: 'free'  // 不匹配！应该是basic
}
```

## 🎯 前端技术栈

- **框架**：Vue 3 (Composition API)
- **构建工具**：Vite + TypeScript
- **UI 框架**：Bootstrap 5.3.6（静态引入，禁用 Ant Design Pro）
- **状态管理**：Pinia
- **HTTP 请求**：Axios（自封装 API 请求）
- **路由**：Vue Router
- **CSS 预处理器**：原生 CSS + Bootstrap Utility Classes

## 📦 模块职责

- 提供用户界面，包括首页、课程列表、课程详情等页面
- 使用 Vite + Vue 3 + TypeScript + Bootstrap 5.3 构建 UI
- 页面布局强调科技蓝 + Apple 风格 + Glassmorphism
- 所有课程卡片组件支持响应式、hover 动效、弹出详情
- 首页按"技能训练 / 职业训练 "分区呈现

## 📁 目录结构与职责

```
frontend/src/
├── views/                         # 页面级组件
│   ├── HomeView.vue              # 首页
│   ├── Login.vue                 # 登录页
│   ├── Register.vue              # 注册页
│   ├── CourseDetails.vue         # 课程详情页
│   ├── ShoppingCart.vue          # 购物车页
│   ├── Order.vue                 # 订单页
│   └── PersonalCenter.vue        # 个人中心
├── components/                    # 可复用组件
│   ├── cart/                     # 购物车相关组件
│   ├── order/                    # 订单相关组件
│   ├── personCenter/             # 个人中心相关组件
│   ├── Navbar.vue               # 导航栏
│   ├── AuthNavbar.vue           # 认证导航栏
│   ├── LoginModal.vue           # 登录弹窗
│   ├── RegisterModal.vue        # 注册弹窗
│   ├── CourseCard.vue           # 课程卡片
│   ├── CourseHeroCard.vue       # 课程英雄卡片
│   └── ...                     # 其他通用组件
├── api/                          # Axios封装接口
│   ├── index.ts                 # Axios配置
│   ├── auth.ts                  # 认证相关API
│   ├── course.ts                # 课程相关API
│   └── ...                     # 其他模块API
├── store/                        # Pinia状态管理
│   ├── index.ts                 # Store入口
│   ├── auth.ts                  # 认证状态
│   ├── course.ts                # 课程状态
│   └── ...                     # 其他状态模块
├── router/                       # Vue Router配置
│   └── index.ts                 # 路由配置
├── utils/                        # 工具函数
│   ├── request.ts               # Axios封装
│   ├── auth.ts                  # 认证工具
│   └── ...                     # 其他工具
├── types/                        # TypeScript类型定义
│   ├── api.ts                   # API接口类型
│   ├── user.ts                  # 用户相关类型
│   └── ...                     # 其他类型定义
└── public/                       # 静态资源
    ├── originals/               # 原始HTML模板（当前阶段）
    ├── img/                     # 图片资源
    └── ...                     # 其他静态文件
```

## 🎨 样式与 UI 规范

### Bootstrap 5.3.6 使用约定

- **优先使用 Bootstrap Utility Classes**编写样式
- **Grid System**：默认使用`row`、`col-*`实现响应式布局
- **组件样式**：优先使用 Bootstrap 原生组件样式
- **自定义样式**：仅在 Bootstrap 无法满足时添加自定义 CSS

### 响应式设计规范

- **移动优先**：所有组件必须支持移动端视图（≤768px）
- **断点规范**：
  - `xs`: <576px
  - `sm`: ≥576px
  - `md`: ≥768px
  - `lg`: ≥992px
  - `xl`: ≥1200px
  - `xxl`: ≥1400px

### Mac 设备响应式特殊处理

- **Mac 桌面端优化**：针对 Mac 设备的大屏显示（≥1440px），课程卡片布局需要特殊处理
- **推荐断点设置**：

  ```css
  /* Mac设备专用断点 */
  @media (min-width: 1440px) and (-webkit-min-device-pixel-ratio: 2) {
    .course-cards-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .course-card-wrapper {
      flex: 0 0 22%;
      max-width: 22%;
      margin: 0 1.5%;
    }
  }

  /* MacBook Pro 16寸及以上 */
  @media (min-width: 1728px) {
    .course-cards-container {
      max-width: 1400px;
      padding: 0 3rem;
    }
  }
  ```

### 组件命名规范

- **文件命名**：严格使用 PascalCase（如`CourseHeroCard.vue`）
- **组件名称**：与文件名保持一致
- **按功能分组**：相关组件放入对应子目录（如`cart/`、`personCenter/`）

## 💻 Vue 3 开发规范

### Composition API 要求

- **严格禁止**使用 Options API，必须使用 Composition API
- **推荐模式**：

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const loading = ref(false)
const userInfo = ref(null)

// 计算属性
const isLoggedIn = computed(() => !!userInfo.value)

// 生命周期
onMounted(() => {
  // 初始化逻辑
})
</script>
```

### 组件结构规范

```vue
<template>
  <!-- 使用Bootstrap classes -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <!-- 主要内容 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入依赖
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth'

// 接口和类型定义
interface Props {
  title: string
}

// Props定义
const props = defineProps<Props>()

// 响应式数据
const isVisible = ref(true)

// 计算属性
const displayTitle = computed(() => props.title.toUpperCase())
</script>

<style scoped>
/* 仅在必要时添加自定义样式 */
.custom-style {
  /* 避免与Bootstrap冲突 */
}
</style>
```

## 🔗 状态管理规范

### Pinia Store 结构

```typescript
// src/store/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserInfo | null>(null)

  // Getters
  const isLoggedIn = computed(() => !!token.value)

  // Actions
  const login = async (credentials: LoginForm) => {
    // 登录逻辑
  }

  const logout = () => {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return {
    // State
    token,
    userInfo,
    // Getters
    isLoggedIn,
    // Actions
    login,
    logout
  }
})
```

## 🌐 API 接口封装规范

### Axios 统一配置

```typescript
// src/api/index.ts
import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const request = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000
})

// 请求拦截器 - 自动添加JWT token
request.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// 响应拦截器 - 统一处理响应格式
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 统一错误处理
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default request
```

## 🧠 命名规范

- 页面组件以 `Page*.vue` 命名，卡片类组件以 `Card*.vue` 命名
- 状态管理采用 Pinia，store 命名为 `useXStore`
- 推荐使用 `props + emits` 实现组件解耦

## ✨ UI 规范

- 使用 Bootstrap 栅格系统统一布局，配合组件类实现快速复用
- 课程卡片组件卡片数为 4/8 个一组
- 标签组件支持 hover 边框高亮 + 选中状态记忆

## 📌 目标

- 保持代码风格统一、组件可读性强
- 方便 Cursor AI 理解结构和语义，提升建议质量
- 确保在各种设备（包括 Mac）上的最佳显示效果

## 🚀 从 HTML 到 Vue 迁移指南

### 阶段性迁移策略

1. **第一阶段**：保持原有 HTML 结构，逐步组件化
2. **第二阶段**：引入 Pinia 状态管理，实现动态数据
3. **第三阶段**：完善 TypeScript 类型定义和 API 封装
4. **第四阶段**：优化性能，添加懒加载等高级特性

### 组件拆分原则

- 每个课程卡片独立为`CourseCard.vue`组件
- 导航栏单独抽取为`Navbar.vue`组件
- 标签切换区域抽取为`TabNavigation.vue`组件
- 轮播图抽取为`HeroCarousel.vue`组件
