<script setup>
  import quiz from '../../common/quiz'
  import { onMounted } from "vue"

  const emits = defineEmits(['nextStep'])

  const props = defineProps({
    typeOfQuiz: {
      type: [String, Number],
      required: true
    },
  })
  let quizData = quiz[props.typeOfQuiz]
  const goToAnswers = () => {
    emits('nextStep')
  }

</script>

<template>
  <div class="quiz_first-step__image" :style="[{'background-image': quizData.startPage.image}]"/>
    <div class="quiz_first-step-content">
      <div class="quiz_first-step-content__text">
        <h2 v-html="quizData.startPage.title" class="quiz_first-step-content__title" />
        <span 
          v-if="quizData.startPage.subtitle"
          class="quiz_first-step-content__subtitle" 
          v-html="quizData.startPage.subtitle" />
        <button 
          class="btn btn_primary quiz_first-step__btn"
          @click="goToAnswers">
          {{quizData.startPage.button}}
        </button>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .quiz_first-step{
    &__image {
      background-size: cover;
      @media screen and (max-width: 996px) {
        height: 300px;
        background-position: 50%;
        width: 100%;
      }
    }
    &__btn {
      margin-top: 15px;
      width: 200px;
    }
    &-content {
      padding: 0 25px 60px 25px ;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &__text {
        margin: 0 auto;
      }
      &__title {
        margin-bottom: 15px;
      }
      &__subtitle {
        font-weight: 700;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.7);;
      }
    }
  }
</style>