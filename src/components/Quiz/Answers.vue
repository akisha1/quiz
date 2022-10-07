<script setup>
  import { onBeforeMount, onMounted, computed, ref, reactive } from "vue"
  import { useRoute } from 'vue-router'
  import ProgressBar from '../UI/ProgressBar.vue'
  import Success from '../Quiz/Success.vue'
  import Radio from '../UI/Radio.vue'
  import quiz from '../../common/quiz'
  import { percentCreator } from '../../helpers/quiz'
  const route = useRoute()

  const emits = defineEmits(['nextStep', 'prevStep'])

  const props = defineProps({
    typeOfQuiz: {
      type: [String, Number],
      required: true
    },
  })

  const nextStep = (element) => {
    if (quizData.hookId) {
      let answerObj = {
        question: answersDataRotateBySteps(quizData.quizRotateStep).question,
        answer: element
      }
      let lsAnswers = JSON.parse(localStorage.getItem('quiz_answer'))
      if (!lsAnswers) lsAnswers = []
      lsAnswers.push(answerObj)
      localStorage.setItem('quiz_answer',JSON.stringify(lsAnswers))
    }
    emits('nextStep')
  }
  const prevStep = () => {
    emits('prevStep')
  }

  let quizData = quiz[props.typeOfQuiz]
  let stepCount = Object.keys(quizData.quizRotateStep).length
  percentCreator(quizData)

  const textOfReturnAnswerButton = () => {
    let buttonText = 'previous step'
    if (props.typeOfQuiz.includes("indonesia")) buttonText = 'langkah sebelumnya'
    if (props.typeOfQuiz.includes("turkey")) buttonText = 'önceki adım'
    if (props.typeOfQuiz.includes("poland")) buttonText = 'poprzedni krok'
    if (props.typeOfQuiz.includes("indo")) buttonText = 'langkah sebelumnya'
    return buttonText
  }

  const isSuccess = computed(() => route.query.step == stepCount + 1)
  const answersDataRotateBySteps = (payload) => payload[route.query.step]

  onBeforeMount (() => {
    document.body.style.background = "#f8f8f8"
  })
</script>

<template>
  <div class="quiz-answers__block" :style="[{'max-width': isSuccess ? '600px' : '1024px'}]">
    <div class="quiz-answers__block-content"> 
      <Success 
        v-if="isSuccess"
        :typeOfQuiz="typeOfQuiz"
      />
      <template v-else>
        <span class="quiz__title quiz-answers__title" v-html="answersDataRotateBySteps(quizData.quizRotateStep).question" />
        <div class="quiz-answers__variant">
          <Radio 
            :quizRadio="true" 
            :radios="answersDataRotateBySteps(quizData.quizRotateStep).answers" 
            @evntOnRadio="nextStep"
          />
        </div>
        <div class="quiz-answers__bottom">
          <ProgressBar maxWidth="480px" :percent="+answersDataRotateBySteps(quizData.percentRotateStep)" backColor="grey" progressColor="primary"/>
          <button 
            v-if="route.query.step > 1"
            class="btn quiz-answers__prev-step"
            @click="prevStep">
            {{textOfReturnAnswerButton()}}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .quiz-answers{
    &__block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #f8f8f8;
    padding: 0 20px;
    margin: 0 auto;
    height: 100%;
    @media screen and (max-width: 600px) {
      padding: 0;
    }
      &-content {
      @media screen and (max-width: 600px) {
        overflow-y: auto;
      }
        padding: 20px;
        background: #fff;
        box-shadow: 0 7px 15px 0 rgb(0 0 0 / 15%)
      }
    }
    &__variant {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
      margin-bottom: 50px;
      margin-top: 30px;
      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }
    &__bottom {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }
    &__prev-step {
      background: var(--primary);
      border: none;
      color: #fff;
      border-radius: 20px;
      height: 40px;
      width: 170px;
      margin-left: 30px;
      &:hover {
      background: var(--primary-active);
      }
      @media screen and (max-width: 600px) {
        margin-left: 0;
      }
    }
  }
</style>