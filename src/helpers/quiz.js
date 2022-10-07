export const percentCreator = (payload) => {
  let percentObject = {}
  const quizPageCount = Object.keys(payload.quizRotateStep).length
  const middleMathNum = 100 / quizPageCount
  let percentForStep = 0
  for (const property in payload.quizRotateStep) {
    percentObject[property] = percentForStep.toFixed()
    percentForStep = percentForStep + middleMathNum
  }
  payload.percentRotateStep = percentObject
}


