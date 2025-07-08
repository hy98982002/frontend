<template>
  <div class="col-sm-6 col-md-3 mb-4">
    <a
      class="card-link-no-underline"
      href="#"
      @click.prevent="handleCardClick"
      @keydown.enter="handleCardClick"
      @keydown.space.prevent="handleCardClick"
      tabindex="0"
    >
      <div class="card h-100 card-glass">
        <div
          class="card-img-top"
          :style="{ backgroundImage: `url(${course.cover})` }"
          :aria-label="`课程封面 - ${course.title}`"
          role="img"
        ></div>

        <div class="card-body">
          <p class="card-text">{{ course.title }}</p>

          <!-- 评分显示 -->
          <div v-if="course.rating && course.reviewCount" class="d-flex align-items-center mt-2">
            <span class="text-warning fw-bold me-1">{{ course.rating }}</span>
            <div class="text-warning me-2">
              <i v-for="star in 5" :key="star" :class="getStarClass(star)"></i>
            </div>
            <small class="text-muted">({{ course.reviewCount }})</small>
          </div>
        </div>

        <!-- 卡片底部信息 -->
        <div class="card-footer">
          <span :class="levelStyleClass">{{ displayLevel }}</span>
          <span class="text-muted ms-2">
            <i class="fas fa-user"></i> {{ displayLearnerCount }}
          </span>

          <!-- 价格显示 -->
          <span v-if="isFreeDisplay" class="text-success ms-2"> 免费 </span>
          <span v-else class="text-danger ms-2"> ¥{{ displayPrice }}.00 </span>
        </div>

        <!-- hover详情弹窗 -->
        <div class="course-pop" data-track="view_card">
          <h6 class="fw-bold mb-2">{{ course.title }}</h6>

          <span v-if="course.badge" class="badge bg-info mb-2">
            {{ course.badge }}
          </span>

          <p class="small text-muted">
            总共 {{ course.duration || '45 小时' }} · {{ course.level || '入门级别' }}
          </p>

          <ul class="ps-3 small mb-3">
            <li>精心设计的实战课程内容</li>
            <li>从基础到进阶的系统学习</li>
            <li>实用技能快速提升</li>
            <li v-if="course.instructor">讲师：{{ course.instructor }}</li>
          </ul>

          <button
            class="btn btn-tech-blue w-100 mb-2"
            @click.stop="handleAddToCart"
            data-track="add_to_cart"
          >
            添加入购物车
          </button>

          <button class="btn btn-watch-now w-100" @click.stop="handleWatchNow">立即观看</button>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { Course, StageKey } from '../types'
import {
  // STAGE_STYLES,  // 暂时注释未使用的导入
  getTemplateFromImagePath,
  generateCourseData
  // type CourseCardTemplate  // 暂时注释未使用的类型
} from '../types'

// Props定义
interface Props {
  course: Course
  stage?: StageKey
}

const props = withDefaults(defineProps<Props>(), {
  stage: undefined
})

// 解构props以便在模板中使用
const { course } = toRefs(props)
// const { course, stage } = toRefs(props)  // stage暂时未使用

// Emits定义
const emit = defineEmits<{
  cardClick: [course: Course]
  addToCart: [course: Course]
  watchNow: [course: Course]
}>()

// 响应式数据（无需额外状态）

// 计算属性
// 暂时注释未使用的计算属性
// const actualStage = computed(() => stage?.value || course.value.stage)

// const stageStyle = computed(() => {
//   return STAGE_STYLES[actualStage.value] || STAGE_STYLES.free
// })

// 根据图片路径自动获取模板类型和生成数据
const cardTemplate = computed(() => getTemplateFromImagePath(course.value.cover))

const dynamicCardData = computed(() => {
  return generateCourseData(cardTemplate.value)
})

// 获取显示的价格（优先使用course中的价格，否则使用模板生成的）
const displayPrice = computed(() => {
  if (course.value.price !== undefined) return course.value.price
  return dynamicCardData.value.price
})

// 获取显示的学员数（优先使用course中的数据，否则使用模板生成的）
const displayLearnerCount = computed(() => {
  return course.value.learnerCount || dynamicCardData.value.learnerCount
})

// 获取显示的等级（优先使用course中的level，否则使用模板生成的）
const displayLevel = computed(() => {
  return course.value.level || dynamicCardData.value.level
})

// 判断是否免费（优先使用course中的isFree，否则使用模板判断）
const isFreeDisplay = computed(() => {
  if (course.value.isFree !== undefined) return course.value.isFree
  return dynamicCardData.value.isFree
})

// 暂时注释未使用的计算属性
// const isVipDisplay = computed(() => {
//   return course.value.isVip || dynamicCardData.value.isVip
// })

// 获取等级样式类
const levelStyleClass = computed(() => {
  const style = dynamicCardData.value.levelStyle
  return `text-${style}`
})

// 星级评分显示
const getStarClass = (star: number): string => {
  if (!course.value.rating) return 'far fa-star'

  const rating = course.value.rating
  if (star <= Math.floor(rating)) {
    return 'fas fa-star'
  } else if (star - 0.5 <= rating) {
    return 'fas fa-star-half-alt'
  } else {
    return 'far fa-star'
  }
}

// 事件处理函数
const handleCardClick = () => {
  emit('cardClick', course.value)
}

const handleAddToCart = () => {
  emit('addToCart', course.value)
}

const handleWatchNow = () => {
  emit('watchNow', course.value)
}
</script>

<style scoped>
/* 卡片链接去除下划线 & 保持文字颜色 */
.card-link-no-underline {
  text-decoration: none;
  color: inherit;
}

.card-link-no-underline:hover,
.card-link-no-underline:focus,
.card-link-no-underline:active {
  text-decoration: none;
  color: inherit;
}

/* 卡片玻璃效果 */
.card-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: visible; /* 恢复可见，让弹出卡能显示 */
  position: relative;
  padding: 0 !important; /* 移除所有内边距 */
}

/* 强制覆盖Bootstrap卡片样式 */
.card-glass.card {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 18px !important;
}

.card-glass .card-img-top:first-child {
  border-radius: 18px 18px 0 0 !important;
  margin-top: 0 !important;
}

.card-glass:hover {
  transform: none;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  position: relative; /* 确保z-index生效 */
}

.card-img-top {
  border-radius: 18px 18px 0 0 !important;
  transition: all 0.3s ease-in-out;
  height: 200px !important; /* 固定高度 */
  width: 100% !important;
  background-size: cover !important; /* 背景图片覆盖整个容器 */
  background-position: center !important; /* 背景图片居中 */
  background-repeat: no-repeat !important; /* 不重复 */
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  overflow: hidden !important; /* 只对图片区域进行裁剪 */
}

/* 卡片主体样式 */
.card-body {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.card-footer {
  background: rgba(255, 255, 255, 0.75) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0 0 18px 18px !important;
  border-top: none;
  overflow: hidden;
}

/* 详情弹窗样式 */
.course-pop {
  position: absolute;
  top: 12px;
  left: 100%;
  margin-left: 16px;
  margin-top: -15px;
  width: 340px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(22, 109, 132, 0.1);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(30, 127, 152, 0.06), 0 2px 8px rgba(30, 127, 152, 0.04),
    inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  padding: 24px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(12px) scale(0.96);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1050;
}

/* 小尖角优化 */
.course-pop::before {
  content: '';
  position: absolute;
  left: -9px;
  top: 30px;
  width: 18px;
  height: 18px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(30, 127, 152, 0.08);
  border-right: none;
  border-bottom: none;
  transform: rotate(-45deg);
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.6);
}

/* 内容样式优化 */
.course-pop h6 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.course-pop .badge {
  background: rgba(30, 127, 152, 0.08);
  color: #1e7f98;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.course-pop .text-muted {
  color: #444 !important;
  font-size: 15px;
}

.course-pop ul {
  margin: 16px 0;
  padding-left: 20px;
}

.course-pop ul li {
  color: #333;
  margin-bottom: 12px;
  font-size: 15px;
  position: relative;
  list-style: none;
}

.course-pop ul li::before {
  content: '•';
  color: #1e7f98;
  font-weight: bold;
  position: absolute;
  left: -15px;
}

/* ≥lg 屏幕启用 hover 弹窗 */
@media (min-width: 992px) {
  .card:hover .course-pop {
    opacity: 1;
    visibility: visible;
    transform: translateX(0) scale(1);
    pointer-events: auto;
  }

  .card:hover .course-pop,
  .course-pop:hover {
    opacity: 1;
    visibility: visible;
    transform: translateX(0) scale(1);
    pointer-events: auto;
  }

  /* 桥接功能 - 连接卡片和弹出卡的不可见区域 */
  .card:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: 24px;
    height: 100%;
    z-index: 1049;
  }

  /* 右侧卡片特殊处理 */
  .col-md-3:nth-child(4n) .course-pop {
    left: auto;
    right: 100%;
    margin-left: 0;
    margin-right: 16px;
    transform: translateX(-12px) scale(0.96);
  }

  .col-md-3:nth-child(4n) .course-pop::before {
    left: auto;
    right: -9px;
    transform: rotate(135deg);
  }

  .col-md-3:nth-child(4n) .card:hover .course-pop {
    transform: translateX(0) scale(1);
  }

  /* 右侧卡片的桥接功能 */
  .col-md-3:nth-child(4n) .card:hover::before {
    content: '';
    position: absolute;
    top: 0;
    right: 100%;
    width: 24px;
    height: 100%;
    z-index: 1049;
  }
}

/* 按钮样式 */
.course-pop .btn-tech-blue {
  background: #1e7f98;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(30, 127, 152, 0.2);
  width: 100%;
}

.course-pop .btn-tech-blue:hover {
  background: #166d84;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
  color: #ffffff;
}

.course-pop .btn-watch-now {
  border: 1px solid #1e7f98;
  color: #333;
  background: transparent;
  border-radius: 25px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  width: 100%;
}

.course-pop .btn-watch-now:hover {
  background: #1e7f98 !important;
  color: #fff !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
}
</style>
