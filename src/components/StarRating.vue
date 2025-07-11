<template>
  <div
    class="star-rating-custom"
    :class="{ 'star-rating-small': size === 'small' }"
  >
    <div
      v-for="star in 5"
      :key="star"
      class="star-item"
      :class="getStarType(star)"
    >
      <!-- 空心星 -->
      <svg
        class="star-empty"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <polygon
          points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5"
          fill="none"
          stroke="#d0d0d0"
          stroke-width="2"
        />
      </svg>
      <!-- 实心星填充，使用包裹容器控制宽度 -->
      <div class="fill-wrapper" :style="getStarFillStyle(star)">
        <svg
          class="star-filled"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ffc107" />
              <stop offset="100%" stop-color="#ff8f00" />
            </linearGradient>
          </defs>
          <polygon
            points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5"
            fill="url(#starGrad)"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number
  size?: 'normal' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  rating: 0,
  size: 'normal'
})

// 计算星星类型
const getStarType = (starNumber: number): string => {
  const rating = props.rating
  if (starNumber <= Math.floor(rating)) {
    return 'star-full'
  } else if (starNumber - 0.5 <= rating) {
    return 'star-half'
  }
  return 'star-empty-type'
}

// 计算星星填充样式
const getStarFillStyle = (starNumber: number): { width: string } => {
  const rating = props.rating

  if (starNumber <= Math.floor(rating)) {
    // 完整填充
    return { width: '100%' }
  } else if (starNumber - 0.5 <= rating) {
    // 半星填充
    return { width: '50%' }
  }
  // 无填充
  return { width: '0%' }
}
</script>

<style scoped>
.star-rating-custom {
  display: inline-flex;
  align-items: center;
  gap: 1px;
}

.star-item {
  position: relative;
  width: 16px;
  height: 16px;
  display: inline-block;
}

.star-rating-small .star-item {
  width: 14px;
  height: 14px;
}

/* 空心星星背景 */
.star-empty {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  stroke: #d0d0d0;
  fill: none;
  stroke-width: 2;
  shape-rendering: geometricPrecision;
  pointer-events: none;
}

/* 实心星星填充 */
.fill-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease;
}

.star-filled {
  width: 100%;
  height: 100%;
  shape-rendering: geometricPrecision;
  pointer-events: none;
}

/* 星星状态样式 */
.star-empty-type .fill-wrapper {
  width: 0% !important;
}

/* 悬浮效果 */
.star-rating-custom:hover .star-item {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* 确保清晰渲染 */
.star-rating-custom,
.star-item,
.star-empty,
.star-filled {
  /* 最佳渲染优化 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 清除任何模糊效果 */
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  filter: none !important;

  /* 确保锐利边缘 */
  transform: translateZ(0);
  will-change: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .star-item {
    width: 14px;
    height: 14px;
  }

  .star-rating-small .star-item {
    width: 12px;
    height: 12px;
  }
}
</style>
