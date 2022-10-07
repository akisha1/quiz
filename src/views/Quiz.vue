<script setup>
  import { ref } from "vue"
  import { computed } from "vue"
  import { useRoute, useRouter } from 'vue-router'
  import StartPage from "../components/Quiz/StartPage.vue"
  import Answers from "../components/Quiz/Answers.vue"

  const router = useRouter()
  const route = useRoute()

  let step = ref(0)

  const nextStep = () => {
    let newStep = route.query.step ? +route.query.step + 1 : step.value + 1
    if (step.value > 0) {
      setTimeout(() => {
        step.value = newStep
        router.push({
          query: {
            step: newStep
          }
        })
    } , 300)
    }else {
      step.value = newStep
      router.push({
        query: {
          step: newStep
        }
      })
    }
  }
  const prevStep = () => {
    let newStep = route.query.step ? +route.query.step -1 : step.value - 1
    router.push({
      query: {
        step: newStep
      }
    })
  }

  const isFirstPAge = computed(() => {
    const isStep = !!route.query.step
    return !isStep
  })

  let typeOfQuiz = ''
  if (route.name === 'Quiz_first') typeOfQuiz = 'indonezia_v1'
  else typeOfQuiz = route.params.id
</script>

<template>
  <Transition>
    <div class="quiz quiz__first-step" v-if="isFirstPAge">
      <StartPage  
      :typeOfQuiz="typeOfQuiz"
      @nextStep="nextStep"/>
    </div>
    <div class="quiz quiz__answers" v-else>
      <Answers 
        @nextStep="nextStep" 
        @prevStep="prevStep"
        :typeOfQuiz="typeOfQuiz"
        :step="step"
      />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
  .quiz{
    font-family: "GPro-Regular";
    height: 100vh;
    &__first-step {
      background: #fff;
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      @media screen and (max-width: 996px) {
        display: block;
      }
    }
    &__answers {
      background: #f8f8f8;
    }
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>