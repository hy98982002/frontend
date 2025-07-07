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
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(30, 127, 152, 0.2);
  border-radius: 25px;
  color: #333;
  padding: 12px 24px;
  font-weight: 500;
  font-size: 16px;
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

/* 会员专区按钮特殊样式 */
.stage-tab-btn.vip-btn {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
  color: #b8860b;
  position: relative;
}

.stage-tab-btn.vip-btn:hover {
  background: rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.5);
  color: #daa520;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.2);
}

.stage-tab-btn.vip-btn.active {
  background: linear-gradient(135deg, #daa520, #ffd700);
  border-color: #daa520;
  color: #fff;
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.stage-tab-btn.vip-btn.active:hover {
  background: linear-gradient(135deg, #b8860b, #daa520);
  color: #fff;
}

.stage-tab-btn.vip-btn .fas.fa-crown {
  color: #ffd700;
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
