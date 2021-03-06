import { QuestionCircleOutlined } from '@ant-design/icons'
import { Progress, Popover } from 'antd'
import { useContext } from 'react'
import { PrimaryButton, SecondaryButton } from 'src/components/atoms/Button'
import { FlexContainerColumn, Padding } from 'src/components/atoms/Styles'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import { GlobalContext } from 'src/pages/_app'
import styled from 'styled-components'
import useSWR from 'swr'
import { Response } from 'src/pages/api/result'
import useQueryString from 'src/hooks/useQueryString'
import { toast } from 'react-toastify'

const Line = styled.div`
  margin: 3rem 0;
  padding: 2px;
  background: #eee;
`

const Padding22 = styled.div`
  padding: 2rem 0;
`

const Score = styled.h3`
  text-align: center;
  font-size: 3rem;
`

const CenterBigH3 = styled.h3`
  text-align: center;
  font-size: 2rem;
`

const CenterH3 = styled.h3`
  text-align: center;
`

const CenterPaddingP = styled.p`
  text-align: center;
  padding: 1rem;
`

const FlexContainerColumnPadding = styled(FlexContainerColumn)`
  padding: 1rem;
`

export const gradientBlueGreen = {
  '0%': '#108ee9',
  '100%': '#87d068',
}

const gradientVioletOrange = {
  '0%': '#7a0886',
  '100%': '#81663f',
}

function fetchConditionally(condition: boolean) {
  if (!condition) return null
  return '/api/result'
}

function compareScoreWithAverage(score: number) {
  return score > 195
    ? `한국인 평균 대비 ${score - 195}점 높습니다`
    : score < 195
    ? `한국인 평균 대비 ${195 - score}점 낮습니다`
    : '한국인 평균과 같습니다.'
}

const description = '회복 탄력성 검사 결과를 확인해보세요.'

// const answers = [...new Array(53).keys()].map((i) => ({
//   questionId: `${i}`,
//   answer: 3,
// }))

function TestResultPage() {
  const { answers } = useContext(GlobalContext)

  const queryString = useQueryString()
  let testResultFromQueryString: Response | undefined
  try {
    testResultFromQueryString = JSON.parse(decodeURI(queryString))
  } catch (error) {}

  const goToTestPage = useGoToPage(`/test`)

  let { data, error } = useSWR<Response>(
    fetchConditionally(!testResultFromQueryString && answers.length > 0),
    async (url) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      return await response.json()
    }
  )

  if (!testResultFromQueryString && answers.length === 0) {
    return (
      <PageHead title="회복 탄력성 검사 - 결과" description={description}>
        <NavigationLayout>
          <Padding>
            <h2 style={{ textAlign: 'center' }}>결과 없음</h2>
            <br />
            <p>모든 문항에 응답해주셔야 결과를 볼 수 있어요.</p>
          </Padding>
          <FlexContainerColumnPadding>
            <PrimaryButton onClick={goToTestPage}>회복 탄력성 검사 하기</PrimaryButton>
          </FlexContainerColumnPadding>
        </NavigationLayout>
      </PageHead>
    )
  }

  data = testResultFromQueryString ?? data

  function sendKakaoTalkMessage() {
    if (!data) {
      toast.warn('아직 응답 결과가 없습니다.')
    } else if (!window.Kakao?.Link) {
      toast.warn('카카오 API 인증에 실패했습니다.')
    } else {
      window.Kakao.Link.sendDefault({
        objectType: 'text',
        text: '회복 탄력성 검사 결과를 확인할 수 있어요',
        link: {
          webUrl:
            process.env.NODE_ENV === 'production'
              ? `https://resilience1.vercel.app/test/result?${encodeURI(JSON.stringify(data))}`
              : `http://localhost:3000/test/result?${encodeURI(JSON.stringify(data))}`,
          mobileWebUrl:
            process.env.NODE_ENV === 'production'
              ? `https://resilience1.vercel.app/test/result?${encodeURI(JSON.stringify(data))}`
              : `http://localhost:3000/test/result?${encodeURI(JSON.stringify(data))}`,
        },
        buttonTitle: '검사 결과 보기',
      })
    }
  }

  return (
    <PageHead title="회복 탄력성 검사 - 결과" description={description}>
      <NavigationLayout>
        <Padding>
          <h2 style={{ textAlign: 'center' }}>회복 탄력성 검사 결과</h2>

          {data ? (
            <>
              <Padding22>
                <Progress
                  format={(percent) => `${Math.round(percent ?? 0)}%`}
                  percent={(data.score * 100) / 265}
                  status="active"
                  strokeColor={gradientBlueGreen}
                />
              </Padding22>
              <Score>{data.score}점</Score>
              <div style={{ textAlign: 'center' }}>{compareScoreWithAverage(data.score)}</div>
              <br />
              <CenterBigH3>{data.scoreName}</CenterBigH3>
              <CenterPaddingP>{data.scoreContent}</CenterPaddingP>

              <Line />

              <Popover
                content="감정조절력 + 충동통제력 + 원인분석력 (성인 평균 63.5점)"
                trigger="click"
              >
                <CenterH3>
                  자기 조절 능력 <QuestionCircleOutlined /> {data.selfControlScore}점
                </CenterH3>
              </Popover>
              <Progress
                format={(percent) => `${Math.round(percent ?? 0)}%`}
                percent={(data.selfControlScore * 100) / 90}
                strokeColor={gradientVioletOrange}
              />
              <CenterPaddingP>{data.selfControlContent}</CenterPaddingP>
              <Popover
                content="압박과 스트레스 상황에서도 평온을 유지할 수 있는 능력"
                trigger="click"
              >
                <div>
                  감정조절력 <QuestionCircleOutlined /> {data.emotionalControlScore}점
                </div>
              </Popover>
              <Popover content="자신의 동기를 스스로 부여하고 조절할 수 있는 능력" trigger="click">
                <div>
                  충동통제력 <QuestionCircleOutlined /> {data.impulseControlScore}점
                </div>
              </Popover>
              <Popover
                content="문제를 긍정적으로 바라보고 해결책을 정확히 진단해 내는 능력"
                trigger="click"
              >
                <div>
                  원인분석력 <QuestionCircleOutlined /> {data.causeAnalysisScore}점
                </div>
              </Popover>

              <Line />

              <Popover
                content="소통능력 + 공감능력 + 자아확장력 (성인 평균 67.8점)"
                trigger="click"
              >
                <CenterH3>
                  대인 관계 능력 <QuestionCircleOutlined /> {data.interpersonalAbilityScore}점
                </CenterH3>
              </Popover>
              <Progress
                format={(percent) => `${Math.round(percent ?? 0)}%`}
                percent={(data.interpersonalAbilityScore * 100) / 90}
                strokeColor={gradientVioletOrange}
              />
              <CenterPaddingP>{data.interpersonalAbilityContent}</CenterPaddingP>
              <Popover content="인간관계를 진지하게 맺고 오래도록 유지하는 능력" trigger="click">
                <div>
                  소통능력 <QuestionCircleOutlined /> {data.communicationScore}점
                </div>
              </Popover>
              <Popover
                content="다른 사람의 심리나 감정상태를 잘 읽어낼 수 있는 능력"
                trigger="click"
              >
                <div>
                  공감능력 <QuestionCircleOutlined /> {data.empathyScore}점
                </div>
              </Popover>
              <Popover
                content="자기 자신이 다른 사람과 연결되어 있다고 느끼는 정도"
                trigger="click"
              >
                <div>
                  자아확장력 <QuestionCircleOutlined /> {data.selfExtensionScore}점
                </div>
              </Popover>

              <Line />

              <Popover
                content="자아낙관성 + 생활만족도 + 감사하기 (성인 평균 63.4점)"
                trigger="click"
              >
                <CenterH3>
                  긍정성 <QuestionCircleOutlined /> {data.affirmativeScore}점
                </CenterH3>
              </Popover>
              <Progress
                format={(percent) => `${Math.round(percent ?? 0)}%`}
                percent={(data.affirmativeScore * 100) / 80}
                strokeColor={gradientVioletOrange}
              />
              <CenterPaddingP>{data.affirmativeContent}</CenterPaddingP>
              <Popover
                content="주어진 상황은 언젠간 좋아지리라는 믿음을 지니는 정도"
                trigger="click"
              >
                <div>
                  자아낙관성
                  <QuestionCircleOutlined /> {data.selfOptimismScore}점
                </div>
              </Popover>
              <Popover
                content="자신이 잘 할 수 있는 일을 통해 즐거움과 성취, 보람을 느끼는 정도"
                trigger="click"
              >
                <div>
                  생활만족도
                  <QuestionCircleOutlined /> {data.lifeSatisfactionScore}점
                </div>
              </Popover>
              <Popover
                content="매사에 감사하는 마음을 갖는 정도 (긍정심리학의 최상위)"
                trigger="click"
              >
                <div>
                  감사하기
                  <QuestionCircleOutlined /> {data.appreciationScore}점
                </div>
              </Popover>
            </>
          ) : error ? (
            '네트워크 요청 오류'
          ) : (
            '회복 탄력성 검사 결과 불러오는 중..'
          )}
        </Padding>
        <FlexContainerColumnPadding>
          <PrimaryButton onClick={goToTestPage}>다시 검사하기</PrimaryButton>
          <SecondaryButton onClick={sendKakaoTalkMessage}>카카오톡 공유하기</SecondaryButton>
        </FlexContainerColumnPadding>
      </NavigationLayout>
    </PageHead>
  )
}

export default TestResultPage
