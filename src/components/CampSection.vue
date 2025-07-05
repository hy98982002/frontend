<template>
  <section id="courses" class="courses-section py-5">
    <div class="container">
      <!-- 区域标题 -->
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h2 class="section-title" data-aos="fade-up">
            <span class="title-highlight">精品课程</span>
            <span class="title-subtitle">助力你的技术成长之路</span>
          </h2>
          <p class="section-description" data-aos="fade-up" data-aos-delay="200">
            从入门到精通，从理论到实战，系统化的学习路径让你快速掌握前沿技术
          </p>
        </div>
      </div>

      <!-- 阶段切换标签 -->
      <div class="row mb-4">
        <div class="col-12">
          <StageTabs v-model="currentStage" />
        </div>
      </div>

      <!-- 热门标签（可选展示） -->
      <div class="row mb-4" v-if="showPopularTags && popularTags.length > 0">
        <div class="col-12">
          <div class="hot-keywords text-center">
            <span class="hot-label me-3">热门技术：</span>
            <span 
              v-for="tag in popularTags.slice(0, 8)" 
              :key="tag"
              class="badge badge-tag me-2 mb-2"
              :class="{ 'active': selectedTags.includes(tag) }"
              @click="toggleTag(tag)"
              role="button"
              tabindex="0"
              @keydown.enter="toggleTag(tag)"
              @keydown.space.prevent="toggleTag(tag)"
            >
              {{ tag }}
            </span>
            <button 
              v-if="selectedTags.length > 0"
              class="btn btn-sm btn-outline-secondary ms-2"
              @click="clearFilters"
            >
              <i class="fas fa-times me-1"></i>清除筛选
            </button>
          </div>
        </div>
      </div>

      <!-- 当前阶段信息展示 -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="stage-info text-center">
            <h3 class="stage-title">{{ stageInfo.title }}</h3>
            <p class="stage-description">{{ stageInfo.description }}</p>
            <div class="stage-stats">
              <span class="stat-item me-4">
                <i class="fas fa-book-open me-1"></i>
                {{ filteredCourses.length }} 门课程
              </span>
              <span class="stat-item me-4">
                <i class="fas fa-users me-1"></i>
                {{ totalLearners }}+ 学员
              </span>
              <span class="stat-item">
                <i class="fas fa-star me-1"></i>
                {{ averageRating.toFixed(1) }} 平均评分
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程网格 -->
      <div class="row">
        <div class="col-12">
          <CourseGrid 
            :courses="displayedCourses"
            :stage="currentStage"
            :show-load-more="hasMoreCourses"
            :loading="loading"
            @card-click="handleCourseClick"
            @add-to-cart="handleAddToCart"
            @watch-now="handleWatchNow"
            @load-more="loadMoreCourses"
          />
        </div>
      </div>

      <!-- 换一换按钮 -->
      <div class="row mt-4" v-if="!showAllCourses && filteredCourses.length > displayCount">
        <div class="col-12 text-center">
          <button 
            class="btn btn-outline-tech-blue btn-lg"
            @click="shuffleCourses"
            :disabled="loading"
          >
            <i class="fas fa-sync-alt me-2" :class="{ 'fa-spin': loading }"></i>
            换一换
          </button>
        </div>
      </div>

      <!-- 查看更多课程 -->
      <div class="row mt-5" v-if="!showAllCourses">
        <div class="col-12 text-center">
          <a 
            href="#courses" 
            class="btn btn-tech-blue btn-lg"
            @click="showAllCourses = true"
            data-track="click_more"
          >
            查看更多课程
            <i class="fas fa-arrow-right ms-2"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import StageTabs from './StageTabs.vue'
import CourseGrid from './CourseGrid.vue'
import { useCourseStore } from '../store/courseStore'
import { useUIStore } from '../store/uiStore'
import type { Course, StageKey } from '../types'
// Props
interface Props {
  showPopularTags?: boolean
  initialDisplayCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  showPopularTags: true,
  initialDisplayCount: 8
})

// Stores
const courseStore = useCourseStore()
const uiStore = useUIStore()

// 响应式状态
const currentStage = ref<StageKey>('free')
const displayCount = ref(props.initialDisplayCount)
const showAllCourses = ref(false)
const loading = ref(false)

// 计算属性
const filteredCourses = computed(() => {
  courseStore.setCurrentStage(currentStage.value)
  return courseStore.filteredCourses
})

const displayedCourses = computed(() => {
  if (showAllCourses.value) {
    return filteredCourses.value
  }
  return filteredCourses.value.slice(0, displayCount.value)
})

const hasMoreCourses = computed(() => {
  return !showAllCourses.value && filteredCourses.value.length > displayCount.value
})

const popularTags = computed(() => courseStore.popularTags)
const selectedTags = computed(() => courseStore.selectedTags)

const stageInfo = computed(() => {
  const stageData = {
    free: {
      title: '免费体验专区',
      description: '精选免费课程，零门槛开始你的技术学习之旅'
    },
    basic: {
      title: '入门学习专区', 
      description: '系统化基础课程，为初学者量身定制的学习路径'
    },
    advanced: {
      title: '进阶提升专区',
      description: '深度技术课程，提升你的专业技能和竞争力'
    },
    project: {
      title: '项目实战专区',
      description: '真实项目实战，将理论知识转化为实际开发能力'
    },
    landing: {
      title: '项目落地专区',
      description: '企业级项目实战，将技术应用于真实业务场景'
    }
  } as const
  return stageData[currentStage.value] || stageData.free
})

const totalLearners = computed(() => {
  return filteredCourses.value.reduce((sum, course) => sum + course.learnerCount, 0)
})

const averageRating = computed(() => {
  const validRatings = filteredCourses.value.filter(course => course.rating)
  if (validRatings.length === 0) return 0
  const sum = validRatings.reduce((sum, course) => sum + (course.rating || 0), 0)
  return sum / validRatings.length
})

// 方法
const toggleTag = (tag: string) => {
  courseStore.toggleTag(tag)
}

const clearFilters = () => {
  courseStore.clearFilters()
}

const handleCourseClick = (course: Course) => {
  console.log('课程点击:', course.title)
  // 这里可以导航到课程详情页
}

const handleAddToCart = (course: Course) => {
  console.log('添加到购物车:', course.title)
  uiStore.showSuccess('添加成功', `${course.title} 已添加到购物车`)
}

const handleWatchNow = (course: Course) => {
  console.log('立即观看:', course.title)
  // 这里可以导航到观看页面
}

const shuffleCourses = () => {
  loading.value = true
  // 模拟换一换的加载效果
  setTimeout(() => {
    // 这里可以实现课程随机排序或重新获取
    loading.value = false
  }, 500)
}

const loadMoreCourses = () => {
  displayCount.value += props.initialDisplayCount
}

// 监听阶段变化
watch(currentStage, (newStage) => {
  courseStore.setCurrentStage(newStage)
  displayCount.value = props.initialDisplayCount
  showAllCourses.value = false
})
</script>

<style scoped>
.courses-section {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(245, 248, 255, 0.95) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-height: 80vh;
}

/* 标题样式 */
.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
}

.title-highlight {
  background: linear-gradient(135deg, #1E7F98, #2A9BB8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.title-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 400;
  display: block;
  margin-top: 0.5rem;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 热门标签样式 */
.hot-keywords {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hot-label {
  font-weight: 600;
  color: #1E7F98;
  font-size: 1rem;
}

.badge-tag {
  background: rgba(30, 127, 152, 0.1);
  color: #1E7F98;
  border: 2px solid rgba(30, 127, 152, 0.2);
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.badge-tag:hover {
  background: rgba(30, 127, 152, 0.2);
  border-color: rgba(30, 127, 152, 0.4);
  transform: translateY(-2px);
}

.badge-tag.active {
  background: #1E7F98;
  color: white;
  border-color: #1E7F98;
}

/* 阶段信息样式 */
.stage-info {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stage-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1E7F98;
  margin-bottom: 0.5rem;
}

.stage-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.stage-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.stat-item {
  color: #1E7F98;
  font-weight: 500;
  font-size: 1rem;
}

.stat-item i {
  color: #2A9BB8;
}

/* 按钮样式 */
.btn-tech-blue {
  background: linear-gradient(135deg, #1E7F98, #2A9BB8);
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(30, 127, 152, 0.3);
  color: white;
}

.btn-tech-blue:hover {
  background: linear-gradient(135deg, #166d84, #228ba1);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(30, 127, 152, 0.4);
  color: white;
}

.btn-outline-tech-blue {
  border: 2px solid #1E7F98;
  color: #1E7F98;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  padding: 13px 38px;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.btn-outline-tech-blue:hover {
  background: #1E7F98;
  border-color: #1E7F98;
  color: white;
  transform: translateY(-3px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }
  
  .stage-stats {
    flex-direction: column;
    text-align: center;
  }
  
  .stage-info {
    padding: 1.5rem;
  }
  
  .hot-keywords {
    padding: 1rem;
  }
  
  .badge-tag {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .title-subtitle {
    font-size: 1rem;
  }
  
  .stage-title {
    font-size: 1.5rem;
  }
  
  .btn-tech-blue,
  .btn-outline-tech-blue {
    padding: 12px 30px;
    font-size: 1rem;
  }
}
</style> 