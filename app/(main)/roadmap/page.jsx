"use client";

import React, { useEffect } from "react";
import { createRoadmap } from "@/actions/roadmap";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { roadmapSchema } from "@/app/lib/schema";
import { Loader2, Route } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import CareerRoadmap from "./_components/career-roadmap";

const RoadmapPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(roadmapSchema),
  });

  const {
    loading: generating,
    fn: createRoadmapFn,
    data: createdRoadmap,
  } = useFetch(createRoadmap);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      await createRoadmapFn(data.industry, data.careerGoal);
    } catch (error) {
      toast.error(error.message || "Failed to generate roadmap");
    }
  };
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a Career Roadmap</CardTitle>
          <CardDescription>
            Create a roadmap for your dream career.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields remain the same */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="Enter industry"
                  {...register("industry")}
                />
                {errors.industry && (
                  <p className="text-sm text-red-500">
                    {errors.industry.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="careerGoal">Career Goal</Label>
                <Input
                  id="careerGoal"
                  placeholder="Enter your Career Goal"
                  {...register("careerGoal")}
                />
                {errors.careerGoal && (
                  <p className="text-sm text-red-500">
                    {errors.careerGoal.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Route className="h-4 w-4" />
                    Get Roadmap
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {createdRoadmap && (
        <CareerRoadmap roadmapData={createdRoadmap} />
      )}
    </div>
  );
};

export default RoadmapPage;
