<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-glass">
    <!-- 磨玻璃背景层 - 分离以保证文字清晰 -->
    <div class="glass-background medium-blur"></div>
    <div class="container">
      <!-- 品牌Logo -->
      <router-link class="navbar-brand" to="/">
        <img src="/images/logo.png" alt="UAI Logo" height="40" />
        <span class="brand-text ms-2">UAI教育</span>
      </router-link>

      <!-- 移动端菜单按钮 -->
      <button
        class="navbar-toggler"
        type="button"
        @click="uiStore.toggleNavbar()"
        :class="{ collapsed: uiStore.isNavbarCollapsed }"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 导航菜单 -->
      <div class="collapse navbar-collapse" :class="{ show: !uiStore.isNavbarCollapsed }">
        <!-- 主导航 -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
              @click="setActiveNav('home')"
              :class="{ active: uiStore.currentNavItem === 'home' }"
            >
              首页
            </router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#courses"
              @click="setActiveNav('courses')"
              :class="{ active: uiStore.currentNavItem === 'courses' }"
            >
              课程
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#teachers"
              @click="setActiveNav('teachers')"
              :class="{ active: uiStore.currentNavItem === 'teachers' }"
            >
              师资
            </a>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/about"
              @click="setActiveNav('about')"
              :class="{ active: uiStore.currentNavItem === 'about' }"
            >
              关于
            </router-link>
          </li>
        </ul>

        <!-- 搜索框 -->
        <form class="d-flex me-3" @submit.prevent="handleSearch">
          <div class="search-container">
            <input
              v-model="searchQuery"
              class="form-control search-input"
              type="search"
              placeholder="搜索课程..."
              @focus="uiStore.setSearchFocus(true)"
              @blur="uiStore.setSearchFocus(false)"
            />
            <button class="btn search-btn" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>

        <!-- 用户操作区 -->
        <div class="d-flex align-items-center">
          <!-- 购物车 -->
          <button
            class="btn btn-outline-light me-2 position-relative"
            @click="uiStore.openCartModal()"
          >
            <i class="fas fa-shopping-cart"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              v-if="cartItemCount > 0"
            >
              {{ cartItemCount }}
            </span>
          </button>

          <!-- 用户菜单 -->
          <div class="dropdown">
            <button
              class="btn btn-outline-light dropdown-toggle"
              type="button"
              id="userMenuDropdown"
              data-bs-toggle="dropdown"
            >
              <i class="fas fa-user"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" @click="uiStore.openLoginModal()">登录</a></li>
              <li><a class="dropdown-item" href="#">注册</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#" @click="uiStore.openProfileModal()">个人中心</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUIStore } from '../store/uiStore'
import { useCourseStore } from '../store/courseStore'

// Store实例
const uiStore = useUIStore()
const courseStore = useCourseStore()

// 响应式数据
const searchQuery = ref('')
const cartItemCount = ref(0) // 这里应该从购物车store获取

// 方法
const setActiveNav = (navItem: string) => {
  uiStore.setCurrentNavItem(navItem)
  uiStore.collapseNavbar()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    courseStore.setSearchKeyword(searchQuery.value.trim())
    uiStore.addToSearchHistory(searchQuery.value.trim())
    // 滚动到课程区域
    const coursesSection = document.getElementById('courses')
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
/* 导航栏容器 - 文字层清晰 */
.navbar-glass {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  /* 确保文字层在磨玻璃背景之上 */
  z-index: 1000;
}

.navbar-glass .container {
  position: relative;
  z-index: 10;
}

.navbar-glass.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 25px rgba(0, 0, 0, 0.15);
}

/* 品牌样式 */
.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1e7f98 !important;
  font-weight: 600;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  color: #166d84 !important;
  transform: translateY(-1px);
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* 导航链接 */
.nav-link {
  color: #333 !important;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  margin: 0 0.5rem;
}

.nav-link:hover,
.nav-link.active {
  color: #1e7f98 !important;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 2px;
  background: #1e7f98;
  border-radius: 2px;
}

/* 搜索框样式 */
.search-container {
  position: relative;
  display: flex;
}

.search-input {
  border-radius: 25px 0 0 25px;
  border: 2px solid rgba(30, 127, 152, 0.2);
  border-right: none;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  min-width: 250px;
}

.search-input:focus {
  border-color: #1e7f98;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0 0.2rem rgba(30, 127, 152, 0.25);
}

.search-btn {
  border-radius: 0 25px 25px 0;
  border: 2px solid rgba(30, 127, 152, 0.2);
  border-left: none;
  background: #1e7f98;
  color: white;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #166d84;
  border-color: #166d84;
}

/* 按钮样式 */
.btn-outline-light {
  border-color: rgba(30, 127, 152, 0.3);
  color: #1e7f98;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background: #1e7f98;
  border-color: #1e7f98;
  color: white;
  transform: translateY(-1px);
}

/* 下拉菜单 - 使用轻度磨玻璃保证文字清晰 */
.dropdown-menu {
  position: relative;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 20;
}

.dropdown-item {
  color: #333;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background: rgba(30, 127, 152, 0.1);
  color: #1e7f98;
}

/* 移动端适配 */
@media (max-width: 991px) {
  .search-input {
    min-width: 200px;
  }

  .navbar-nav {
    margin-bottom: 1rem;
  }

  .search-container {
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .search-input {
    min-width: 150px;
  }

  .brand-text {
    font-size: 1.1rem;
  }
}

/* 购物车徽章 */
.badge {
  font-size: 0.6rem;
}

/* 导航栏切换器 */
.navbar-toggler {
  border: none;
  padding: 0.25rem 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(30, 127, 152, 0.25);
}
</style>
