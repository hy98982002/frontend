<template>
  <div class="star-rating-custom" :class="{ 'star-rating-small': size === 'small' }">
    <div v-for="star in 5" :key="star" class="star-item" :class="getStarType(star)">
      <!-- 空心星星背景 -->
      <div class="star-empty"></div>
      <!-- 实心星星填充 -->
      <div class="star-filled" :style="getStarFillStyle(star)"></div>
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
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  background-color: #e0e0e0;
  border: 1px solid #d0d0d0;
  shape-rendering: crispEdges;
}

/* 实心星星填充 */
.star-filled {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
  shape-rendering: crispEdges;
  transition: width 0.3s ease;
}

/* 星星状态样式 */
.star-full .star-filled {
  background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
}

.star-half .star-filled {
  background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
}

.star-empty-type .star-filled {
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
