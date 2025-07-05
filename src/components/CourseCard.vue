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
        <img 
          :src="course.cover" 
          :alt="`课程封面 - ${course.title}`"
          class="card-img-top"
          loading="lazy"
        />
        
        <div class="card-body">
          <p class="card-text">{{ course.title }}</p>
          
          <!-- 评分显示 -->
          <div 
            v-if="course.rating && course.reviewCount" 
            class="d-flex align-items-center mt-2"
          >
            <span class="text-warning fw-bold me-1">{{ course.rating }}</span>
            <div class="text-warning me-2">
              <i 
                v-for="star in 5" 
                :key="star"
                :class="getStarClass(star)"
              ></i>
            </div>
            <small class="text-muted">({{ course.reviewCount }})</small>
          </div>
        </div>

        <!-- 卡片底部信息 -->
        <div class="card-footer">
          <span :class="stageStyle.textClass">{{ stageStyle.label }}</span>
          <span class="text-muted ms-2">
            <i class="fas fa-user"></i> {{ course.learnerCount }}
          </span>
          
          <!-- 价格显示 -->
          <span v-if="course.isFree || course.price === 0" class="text-success ms-2">
            免费
          </span>
          <span v-else-if="course.price" class="text-danger ms-2">
            ¥{{ course.price.toFixed(2) }}
          </span>
        </div>

        <!-- hover详情弹窗 -->
        <div 
          class="course-pop"
          :class="{'force-hide': forceHidePopup}"
          data-track="view_card"
        >
          <h6 class="fw-bold mb-2">{{ course.title }}</h6>
          
          <span 
            v-if="course.badge" 
            class="badge bg-info mb-2"
          >
            {{ course.badge }}
          </span>
          
          <p class="small text-muted">
            总共 {{ course.duration || '45 小时' }} · {{ course.level || '入门级别' }}
          </p>
          
          <ul class="ps-3 small mb-3">
            <li>精心设计的实战课程内容</li>
            <li>从基础到进阶的系统学习</li>
            <li>实用技能快速提升</li>
            <li v-if="course.instructor">
              讲师：{{ course.instructor }}
            </li>
          </ul>
          
          <button 
            class="btn btn-sm btn-tech-blue d-block"
            @click.stop="handleAddToCart"
            data-track="add_to_cart"
          >
            添加入购物车
          </button>
          
          <button 
            class="btn btn-sm btn-watch-now d-block mt-2"
            @click.stop="handleWatchNow"
          >
            立即观看
          </button>
          
          <button 
            class="close-dialog"
            @click.stop="handleClosePopup"
          >
            关闭对话框
          </button>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { Course, StageKey } from '../types'
import { STAGE_STYLES } from '../types'

// Props定义
interface Props {
  course: Course
  stage?: StageKey
}

const props = withDefaults(defineProps<Props>(), {
  stage: undefined
})

// 解构props以便在模板中使用
const { course, stage } = toRefs(props)

// Emits定义
const emit = defineEmits<{
  cardClick: [course: Course]
  addToCart: [course: Course]
  watchNow: [course: Course]
}>()

// 响应式数据
const forceHidePopup = ref(false)

// 计算属性
const actualStage = computed(() => stage?.value || course.value.stage)

const stageStyle = computed(() => {
  return STAGE_STYLES[actualStage.value] || STAGE_STYLES.free
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

const handleClosePopup = () => {
  forceHidePopup.value = true
  setTimeout(() => {
    forceHidePopup.value = false
  }, 300)
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
  overflow: visible;
  position: relative;
}

.card-glass:hover {
  transform: none;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  z-index: 2000;
}

.card-img-top {
  border-radius: 18px 18px 0 0;
  transition: all 0.3s ease-in-out;
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
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  padding: 18px 20px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(12px) scale(0.96);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
  z-index: 1050;
}

/* 小尖角 */
.course-pop::before {
  content: "";
  position: absolute;
  left: -7px;
  top: 120px;
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(22, 109, 132, 0.1);
  border-right: none;
  border-bottom: none;
  transform: rotate(-45deg);
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
    right: -8px;
    transform: rotate(135deg);
  }

  .col-md-3:nth-child(4n) .card:hover .course-pop {
    transform: translateX(0) scale(1);
  }
}

/* 强制隐藏状态 */
.course-pop.force-hide {
  opacity: 0 !important;
  visibility: hidden !important;
  transform: translateX(12px) scale(0.96) !important;
  pointer-events: none !important;
}

/* 按钮样式 */
.btn-tech-blue {
  background: #1E7F98;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(30, 127, 152, 0.2);
}

.btn-tech-blue:hover {
  background: #166d84;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
  color: #fff;
}

.btn-watch-now {
  border: 1px solid #1e7f98;
  color: #333;
  background: transparent;
  border-radius: 25px;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-watch-now:hover {
  background: #1e7f98 !important;
  color: #fff !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
}

.close-dialog {
  color: #666;
  font-size: 14px;
  text-align: center;
  display: block;
  margin-top: 16px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
}

.close-dialog:hover {
  color: #1E7F98;
}
</style> 