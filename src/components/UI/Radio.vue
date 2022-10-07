<template>
  <label 
    :class="['radio-container', 'settings-edit_radio',{'quiz-radio': quizRadio}]" 
    v-for="(element) in radios" :key="element">
    <span v-html="element" />
    <input @input="checkRadio(element)" type="radio"  name="radio">
    <span class="radio-checkmark"/>
  </label>
</template>

<script setup>
  const props = defineProps({
    radios: {
      type: Array,
      required: true
    },
    quizRadio: {
      type: Boolean,
      required: false
    }
  })

  const emits = defineEmits(['evntOnRadio'])

  const checkRadio = (element) => {
    emits('evntOnRadio', element)
  }
</script>

<style lang="scss" scoped>
.quiz-radio {
  height: 70px;
  padding-left: 38px;
  display: flex;
  align-items: center;
  border: solid 1px rgba(217,216,230,.55);
  &:hover {
    border: solid 1px rgba(171, 171, 183, 0.55)
  }
  & .radio-checkmark {
    left: 10px;
  }
  & .radio-container {
    padding-left: 38px;
  }
}
</style>