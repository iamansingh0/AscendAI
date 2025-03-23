import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Brain, Trophy } from "lucide-react";

const StatsCards = ({ assessments }) => {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[assessments.length-1];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className={`w-4 h-4 text-muted-foreground`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getAverageScore()}%</div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Questions Practiced</CardTitle>
          <Brain className={`w-4 h-4 text-muted-foreground`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalQuestions()}</div>
          <p className="text-xs text-muted-foreground">
            Total Questions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <Trophy className={`w-4 h-4 text-muted-foreground`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getLatestAssessment()?.quizScore.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Most recent quiz
          </p>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default StatsCards;
