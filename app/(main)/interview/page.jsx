import { getAssessments } from '@/actions/interview'
import StatsCards from './_components/stats-cards';
import PerformanceChart from './_components/performance-chart';
import QuizList from './_components/quiz-list';

const InterviewPage = async () => {
  const assessments = await getAssessments();
  return (
    <div>
      <div>
        <h1 className='font-bold text-6xl gradient-title mb-5'>Interview Preparation</h1>
        <div>
          <StatsCards assessments={assessments}/>
          <PerformanceChart assessments={assessments}/>
          <QuizList assessments={assessments}/>
        </div>
      </div>
    </div>
  )
}

export default InterviewPage