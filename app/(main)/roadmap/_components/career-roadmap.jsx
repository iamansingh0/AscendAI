"use client";

import React, { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, BookOpen, Code, Award } from 'lucide-react';

const CareerRoadmap = ({ roadmapData }) => {
  // Create refs for each stage
  const stageRefs = useRef([]);

  if (!roadmapData) {
    return <div className="text-center py-8">No roadmap data available</div>;
  }

  const { title, description, stages, additionalAdvice } = roadmapData.roadmap;

  // Initialize refs array with the correct length
  if (stageRefs.current.length !== stages.length) {
    stageRefs.current = Array(stages.length).fill().map((_, i) => stageRefs.current[i] || React.createRef());
  }

  // Function to scroll to the next stage
  const scrollToNextStage = (nextIndex) => {
    const nextStageRef = stageRefs.current[nextIndex];
    if (nextStageRef && nextStageRef.current) {
      nextStageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      {/* Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-800">{title}</CardTitle>
          <CardDescription className="text-blue-700">{description}</CardDescription>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {stages.map((stage, index) => (
          <div 
            key={index} 
            ref={stageRefs.current[index]}
            className="mb-12 relative scroll-mt-4"
          >
            {/* Timeline connector */}
            {index < stages.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-1 bg-blue-200 z-0"></div>
            )}
            
            {/* Stage card */}
            <Card className="relative z-10 border-l-4 border-l-blue-500 ml-12">
              {/* Stage number bubble */}
              <div className="absolute -left-12 top-0 bg-blue-500 text-white h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md">
                {index + 1}
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">{stage.name}</CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {stage.timeframe}
                  </Badge>
                </div>
                <CardDescription>
                  Job titles: {stage.jobTitles.join(", ")}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" /> 
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.keySkills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Code className="h-4 w-4 text-purple-600" /> 
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-800">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Resources */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-600" /> 
                    Learning Resources
                  </h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {stage.resources.map((resource, i) => (
                      <li key={i}>{resource}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Next steps arrow - only for non-final stages */}
                {index < stages.length - 1 && (
                  <div className="flex justify-end">
                    <Badge 
                      className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                      onClick={() => scrollToNextStage(index + 1)}
                    >
                      Next Step <ArrowRight className="h-3 w-3 ml-1" />
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Award className="h-5 w-5" /> 
              Additional Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-800">{additionalAdvice}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CareerRoadmap;