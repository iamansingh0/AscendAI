"use client";

import React, { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowRight, BookOpen, Code, Award } from "lucide-react";

const CareerRoadmap = ({ roadmapData }) => {
  // Create refs for each stage
  const stageRefs = useRef([]);

  if (!roadmapData) {
    return <div className="text-center py-8">No roadmap data available</div>;
  }

  const { title, description, stages, additionalAdvice } = roadmapData.roadmap;

  // Initialize refs array with the correct length
  if (stageRefs.current.length !== stages.length) {
    stageRefs.current = Array(stages.length)
      .fill()
      .map((_, i) => stageRefs.current[i] || React.createRef());
  }

  // Function to scroll to the next stage
  const scrollToNextStage = (nextIndex) => {
    const nextStageRef = stageRefs.current[nextIndex];
    if (nextStageRef && nextStageRef.current) {
      nextStageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800">
            {title}
          </CardTitle>
          <CardDescription className="text-blue-700 text-sm sm:text-base lg:text-lg">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {stages.map((stage, index) => (
          <div
            key={index}
            ref={stageRefs.current[index]}
            className="mb-10 sm:mb-14 relative scroll-mt-4"
          >
            {/* Timeline connector - hidden on small screens */}
            {index < stages.length - 1 && (
              <div className="absolute left-4 sm:left-6 top-16 sm:top-20 bottom-0 w-0.5 sm:w-1 bg-blue-200 z-0 hidden sm:block"></div>
            )}

            {/* Stage card */}
            <Card className="relative z-10 border-l-2 sm:border-l-4 border-l-blue-500 ml-0 sm:ml-12">
              {/* Stage number bubble - repositioned on mobile */}
              <div className="absolute left-0 -translate-x-1/2 sm:-left-12 sm:translate-x-0 top-4 sm:top-0 bg-blue-500 text-white h-10 w-10 sm:h-16 sm:w-16 rounded-full flex items-center justify-center text-base sm:text-xl font-bold shadow-md">
                {index + 1}
              </div>

              <CardHeader className="sm:pl-6 pt-4 pb-2 px-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold pl-6 sm:pl-0">
                    {stage.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800 self-start sm:self-auto ml-6 sm:ml-0"
                  >
                    {stage.timeframe}
                  </Badge>
                </div>
                <CardDescription className="pl-6 sm:pl-0 text-sm lg:text-base">
                  Job titles: {stage.jobTitles.join(", ")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 pt-0 px-4 sm:px-6">
                {/* Skills */}
                <div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {stage.keySkills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-green-100 text-green-800 text-xs sm:text-sm lg:text-base break-words whitespace-normal max-w-full py-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-semibold mb-2 flex items-center gap-2">
                    <Code className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {stage.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 text-xs sm:text-sm lg:text-base break-words whitespace-normal max-w-full py-2"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 text-amber-600" />
                    Learning Resources
                  </h4>
                  <ul className="list-disc pl-5 text-xs sm:text-sm lg:text-base space-y-1">
                    {stage.resources.map((resource, i) => (
                      <li key={i}>{resource}</li>
                    ))}
                  </ul>
                </div>

                {/* Next steps arrow - only for non-final stages */}
                {index < stages.length - 1 && (
                  <div className="flex justify-end pb-2 sm:pb-0">
                    <Badge
                      className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-xs sm:text-sm lg:text-base"
                      onClick={() => scrollToNextStage(index + 1)}
                    >
                      Next Step{" "}
                      <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 ml-1" />
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Additional advice */}
      {additionalAdvice && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-amber-800 text-lg sm:text-xl lg:text-2xl">
              <Award className="h-5 w-5 lg:h-6 lg:w-6" />
              Additional Advice
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <p className="text-amber-800 text-sm sm:text-base lg:text-lg">
              {additionalAdvice}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CareerRoadmap;
