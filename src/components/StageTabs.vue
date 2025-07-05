<template>
  <div class="stage-tabs-container mb-4">
    <div class="d-flex justify-content-center flex-wrap gap-2">
      <button
        v-for="(stage, key) in STAGES"
        :key="key"
        :class="[
          'btn',
          'stage-tab-btn',
          { 'active': activeStage === key }
        ]"
        @click="handleStageChange(key)"
      >
        {{ stage }}专区
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
}

const props = defineProps<Props>()

// Emits定义
const emit = defineEmits<{
  'update:modelValue': [value: StageKey]
}>()

// 计算属性
const activeStage = computed(() => props.modelValue)

// 事件处理
const handleStageChange = (stage: StageKey) => {
  emit('update:modelValue', stage)
}
</script>

<style scoped>
.stage-tabs-container {
  padding: 1rem 0;
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  color: #1E7F98;
}

.stage-tab-btn.active {
  background: linear-gradient(135deg, #1E7F98, #2A9BB8);
  border-color: #1E7F98;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
}

.stage-tab-btn.active:hover {
  background: linear-gradient(135deg, #166d84, #228ba1);
  color: #fff;
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