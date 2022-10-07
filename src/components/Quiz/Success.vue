<script setup>
  import quiz from '../../common/quiz'
  import { useRouter }  from 'vue-router'

  const router = useRouter()

  const props = defineProps({
    typeOfQuiz: {
      type: [String, Number],
      required: true
    },
  })

  let quizData = quiz[props.typeOfQuiz]

  const goToCreateTC = async () => {
    console.log('goToCreateTC');
  }
</script>

<template>
  <div class="success">
    <div class="success__smile">🎉</div>
    <div class="quiz__title success__title" v-html="quizData.successPage.title" />
    <div class="success__subtitle" v-html="quizData.successPage.subtitle" />
    <div class="central-wrapper">
      <button 
        class="btn btn_primary success__btn"
        @click="goToCreateTC">
        {{quizData.successPage.button}}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .success {
    &__smile {
      margin-bottom: 8px;
    }
    &__title {
      margin-bottom: 12px;
    }
    &__subtitle {
      margin-bottom: 40px;
    }
    &__btn {
      max-width: 200px;
    }
  }
</style>