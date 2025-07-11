<template>
  <div class="stage-tabs-container">
    <div class="d-flex justify-content-start flex-wrap gap-2">
      <!-- 普通阶段按钮 -->
      <button
        v-for="(stage, key) in STAGES"
        :key="key"
        :class="['btn', 'stage-tab-btn', { active: activeStage === key && !showVipOnly }]"
        @click="handleStageChange(key)"
      >
        {{ stage }}专区
      </button>

      <!-- 会员专区按钮 -->
      <button
        :class="['btn', 'stage-tab-btn', 'vip-btn', { active: showVipOnly }]"
        @click="handleVipToggle"
      >
        <i class="fas fa-crown me-1"></i>
        会员专区
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StageKey } from '../types'
import { STAGES } from '../types'

// Props定义
interface Props {
  modelValue: StageKey
  showVipOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showVipOnly: false
})

// Emits定义
const emit = defineEmits<{
  'update:modelValue': [value: StageKey]
  'update:showVipOnly': [value: boolean]
}>()

// 计算属性
const activeStage = computed(() => props.modelValue)
const showVipOnly = computed(() => props.showVipOnly)

// 事件处理
const handleStageChange = (stage: StageKey) => {
  emit('update:modelValue', stage)
  // 切换阶段时关闭会员模式
  if (props.showVipOnly) {
    emit('update:showVipOnly', false)
  }
}

const handleVipToggle = () => {
  emit('update:showVipOnly', !props.showVipOnly)
}
</script>

<style scoped>
.stage-tabs-container {
  padding: 0.5rem 0;
}

.stage-tab-btn {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 2px solid rgba(30, 127, 152, 0.35);
  border-radius: 25px;
  color: #333;
  padding: 12px 24px;
  font-weight: 500; /* 统一调整为500 */
  font-size: 17px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.stage-tab-btn:hover {
  transform: translateY(-2px);
  background: rgba(30, 127, 152, 0.1);
  border-color: rgba(30, 127, 152, 0.4);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #1e7f98;
}

.stage-tab-btn.active {
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  border-color: #1e7f98;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(30, 127, 152, 0.15);
}

.stage-tab-btn.active:hover {
  background: linear-gradient(135deg, #166d84, #228ba1);
  color: #fff;
}

/* 会员专区按钮特殊样式 - 基于 #eeb18e 的淡雅橙色系配色 */
.stage-tab-btn.vip-btn {
  /* 基础状态：淡雅橙色主调，低调优雅 */
  background: rgba(238, 177, 142, 0.15);
  border: 2px solid rgba(238, 177, 142, 1);
  color: #836349;
  position: relative;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  font-weight: 750;
}

.stage-tab-btn.vip-btn:hover {
  /* Hover状态：淡橙色->淡黄色渐变，整体淡雅 */
  background: linear-gradient(
    135deg,
    rgba(238, 177, 142, 0.2) 0%,
    rgba(244, 201, 160, 0.25) 30%,
    rgba(249, 215, 178, 0.3) 65%,
    rgba(253, 229, 196, 0.35) 100%
  );
  border-color: rgba(238, 177, 142, 0.8);
  color: #836349;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(238, 177, 142, 0.15), 0 3px 8px rgba(249, 215, 178, 0.1);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}

.stage-tab-btn.vip-btn.active {
  /* 激活状态：稍强的淡橙黄渐变，保持淡雅 */
  background: linear-gradient(
    135deg,
    rgba(238, 177, 142, 0.3) 0%,
    rgba(244, 201, 160, 0.35) 25%,
    rgba(249, 215, 178, 0.4) 50%,
    rgba(253, 229, 196, 0.45) 75%,
    rgba(255, 240, 210, 0.5) 100%
  );
  border-color: #f47e30;
  color: #836349;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(238, 177, 142, 0.2), 0 3px 10px rgba(249, 215, 178, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  font-weight: 700;
}

.stage-tab-btn.vip-btn.active:hover {
  /* 激活+Hover：最强但仍淡雅的效果 */
  background: linear-gradient(
    135deg,
    rgba(238, 177, 142, 0.35) 0%,
    rgba(244, 201, 160, 0.4) 20%,
    rgba(249, 215, 178, 0.45) 45%,
    rgba(253, 229, 196, 0.5) 70%,
    rgba(255, 245, 220, 0.55) 100%
  );
  color: #7a5d42;
  box-shadow: 0 8px 30px rgba(238, 177, 142, 0.25), 0 4px 12px rgba(249, 215, 178, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
  font-weight: 700;
}

.stage-tab-btn.vip-btn .fas.fa-crown {
  /* 皇冠图标：淡雅的橙黄渐变 */
  background: linear-gradient(135deg, #eeb18e, #f9d7b2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 1px 2px rgba(238, 177, 142, 0.2));
}

/* Hover时皇冠图标变为深色调 */
.stage-tab-btn.vip-btn:hover .fas.fa-crown {
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  color: #9d7a5a;
  filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.3));
}

.stage-tab-btn.vip-btn.active .fas.fa-crown {
  background: none;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  color: #8d6d4f;
  filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.4));
}

/* 按钮点击动效 */
.stage-tab-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stage-tab-btn {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 100px;
  }

  .stage-tabs-container {
    padding: 0.5rem 0;
  }
}

@media (max-width: 576px) {
  .stage-tab-btn {
    padding: 8px 16px;
    font-size: 13px;
    min-width: 90px;
  }

  .d-flex.gap-2 {
    gap: 0.5rem !important;
  }
}
</style>
