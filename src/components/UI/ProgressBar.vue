<script setup>
const props = defineProps({
  maxWidth: {
    type: String,
    default: '300px'
  },
  percent: {
    type: Number, String,
    required: true
  },
  progressColor: {
    type: String,
    default: 'primary'
  },
  backColor: {
    type: String,
    default: 'grey'
  }
})
</script>

<template>
  <div class="progress-container" :style="[{'max-width': maxWidth}]">
    <div class="progress-percent">Done: <span class="progress-percent__number" :style="[{'color': `var(--${progressColor})`}]">{{percent}}%</span> </div>
    <div class="progress" :style="[{'background': `var(--${backColor})`}]">
      <div class="progress-bar" :style="[{'width': `${percent}%`}, {'background': `var(--${progressColor})`}]"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  height: 10px;
  border-radius: 4px;
  &-container {
    margin-bottom: 20px;
    overflow: hidden;
  }
  &-bar {
    background: #000;
    height: 100%;
    border-radius: 4px;
    transition: .5s;
  }
  &-percent {
    display: block;
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 10px;
  }
}
</style>