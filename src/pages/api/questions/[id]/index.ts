import type { NextApiRequest, NextApiResponse } from 'next'

export type Question = {
  id: string
  name: string
}

export const questions: Question[] = [
  {
    id: '1',
    name: '나는 어려운 일이 닥쳤을 때 감정을 통제 할 수 있다.',
  },
  {
    id: '2',
    name: '내가 무슨 생각을 하면, 그 생각이 내 기분에 어떤 영향을 미칠지 잘 알아챈다',
  },
  {
    id: '3',
    name: '논쟁거리가 되는 문제를 가족이나 친구들과 토론할 때 내 감정을 잘 통제할 수 있다',
  },
  {
    id: '4',
    name: '집중해야 할 중요한 일이 생기면 신바람이 나기보다는 더 스트레스를 받는 편이다.',
  },
  {
    id: '5',
    name: '나는 내 감정에 잘 휘말린다.',
  },
  {
    id: '6',
    name: '때때로 내 감정적인 문제 때문에 학교나 직장에서 공부하거나 일할 때 집중하기 힘들다.',
  },
  {
    id: '7',
    name: '당장 해야 할 일이 있으면 나는 어떠한 유혹이나 방해도 잘 이겨내고 할 일을 한다.',
  },
  {
    id: '8',
    name: '아무리 당황스럽고 어려운 상황이 닥쳐도, 나는 내가 어떤 생각을 하고 있는지 스스로 잘 안다.',
  },
  {
    id: '9',
    name: '누군가가 나에게 화를 낼 경우 나는 우선 그 사람의 의견을 잘 듣는다.',
  },
  {
    id: '10',
    name: '일이 생각대로 잘 안 풀리면 쉽게 포기하는 편이다.',
  },
  {
    id: '11',
    name: '평소 경제적인 소비나 지출 규모에 대해 별 다른 계획없이 지낸다.',
  },
  {
    id: '12',
    name: '미리 계획을 세우기 보다는 즉흥적으로 일을 처리하는 편이다.',
  },
  {
    id: '13',
    name: '문제가 생기면 여러 가지 가능한 해결 방안에 대해 먼저 생각한 후에 해결하려고 노력한다.',
  },
  {
    id: '14',
    name: '어려운 일이 생기면 그 원인이 무엇인지 신중하게 생각한 후에 그 문제를 해결하려고 노력한다.',
  },
  {
    id: '15',
    name: '나는 대부분의 상황에서 문제의 원인을 잘 알고 있다고 믿는다.',
  },
  {
    id: '16',
    name: '나는 사건이나 상황을 잘 파악하지 못한다는 이야기를 종종 듣는다.',
  },
  {
    id: '17',
    name: '문제가 생기면 나는 성급하게 결론을 내린다는 이야기를 종종 듣는다.',
  },
  {
    id: '18',
    name: '어려운 일이 생기면 그 원인을 완전히 이해하지 못했다 하더라도 일단 빨리 해결하는 것이 좋다고 생각한다.',
  },
  {
    id: '19',
    name: '나는 분위기나 대화 상대에 따라 대화를 잘 이끌어 갈 수 있다.',
  },
  {
    id: '20',
    name: '나는 재치있는 농담을 잘한다.',
  },
  {
    id: '21',
    name: '나는 내가 표현하고자 하는 바에 대한 적절한 문구나 단어를 잘 찾아낸다.',
  },
  {
    id: '22',
    name: '나는 윗사람과 대화하는 것이 부담스럽다.',
  },
  {
    id: '23',
    name: '나는 대화중에 다른 생각을 하느라 대화 내용을 놓칠때가 종종 있다.',
  },
  {
    id: '24',
    name: '대화를 할 때 하고 싶은 말을 다 하지 못하고 주저할 때가 종종 있다.',
  },
  {
    id: '25',
    name: '사람들의 얼굴 표정을 보면 어떤 감정인지 알 수 있다.',
  },
  {
    id: '26',
    name: '슬퍼하거나 화를 내거나 당황하는 사람을 보면 그들이 어떤 생각을 하는지 잘 알수 있다.',
  },
  {
    id: '27',
    name: '동료가 화를 낼 경우 나는 그 이유를 꽤 잘 아는 편이다.',
  },
  {
    id: '28',
    name: '나는 사람들의 행동방식을 때로 이해하기 힘들다.',
  },
  {
    id: '29',
    name: '친한 친구나 애인 혹은 배우자로부터 "당신은 나를 이해 못해"라는 말을 종종 듣는다.',
  },
  {
    id: '30',
    name: '동료와 친구들은 내가 자기 말을 잘 듣지 않는다고 한다.',
  },
  {
    id: '31',
    name: '나는 내 주변 사람들로부터 사랑과 관심을 받고 있다.',
  },
  {
    id: '32',
    name: '나는 내 친구들을 정말로 좋아 한다.',
  },
  {
    id: '33',
    name: '내 주변 사람들은 내 기분을 잘 이해한다.',
  },
  {
    id: '34',
    name: '서로 도움을 주고 받는 친구가 별로 없는 편이다.',
  },
  {
    id: '35',
    name: '나는 정기적으로 만나는 사람들은 대부분 나를 싫어하게 된다.',
  },
  {
    id: '36',
    name: '서로 마음을 터놓고 얘기할 수 있는 친구가 거의 없다.',
  },
  {
    id: '37',
    name: '열심히 일하면 언제나 보답이 있으리라고 생각한다.',
  },
  {
    id: '38',
    name: '맞든 아니든 "아무리 어려운 문제라도 나는 해결할 수 있다"고 일단 믿는 것이 좋다고 생각한다.',
  },
  {
    id: '39',
    name: '어려운 상황이 닥쳐도 나는 모든 일이 다 잘 해결될 거라고 확신한다.',
  },
  {
    id: '40',
    name: '내가 어떤 일을 마치고 나면, 주변 사람들이 부정적인 평가를 할까봐 걱정한다.',
  },
  {
    id: '41',
    name: '나에게 일어나는 대부분의 문제들은 나로서는 어쩔수 없는 상황에 의해 발생한다고 믿는다.',
  },
  {
    id: '42',
    name: '누가 나의 미래에 대해 물어보면 성공한 나의 모습을 상상하기 힘들다.',
  },
  {
    id: '43',
    name: '내 삶은 내가 생각하는 이상적인 삶에 가깝다.',
  },
  {
    id: '44',
    name: '내 인생의 여러가지 조건들은 만족스럽다.',
  },
  {
    id: '45',
    name: '나는 내 삶에 만족한다.',
  },
  {
    id: '46',
    name: '나는 내 삶에서 중요한다고 생각한 것들은 다 갖고 있다.',
  },
  {
    id: '47',
    name: '나는 다시 태어나도 나의 현재 삶을 다시 살고 싶다.',
  },
  {
    id: '48',
    name: '나는 다양한 종류의 많은 사람들에게 고마움을 느낀다.',
  },
  {
    id: '49',
    name: '내가 고맙게 여기는 것들을 모두 적는다면 아주 긴 목록이 될 것이다.',
  },
  {
    id: '50',
    name: '나이가 들어갈 수록 내 삶의 일부가 된 사람, 사건, 생활에 대해 감사하는 마음이 더 커져간다.',
  },
  {
    id: '51',
    name: '나는 감사해야 할 것이 별로 없다.',
  },
  {
    id: '52',
    name: '세상을 둘러볼때, 내가 고마워 할 것은 별로 없다.',
  },
  {
    id: '53',
    name: '사람이나 일에 대한 고마움을 한참 시간이 지나 후에야 겨우 느낀다.',
  },
]

export type Response = Question | { message: string }

function TestQuestions(req: NextApiRequest, res: NextApiResponse<Response>) {
  const questionId = (req.query.id ?? '') as string
  const question = questions.find((question) => question.id === questionId)

  if (!question) {
    res.status(400).send({ message: `id=${questionId} 문제는 존재하지 않아요.` })
  } else {
    res.status(200).json(question)
  }
}

export default TestQuestions
