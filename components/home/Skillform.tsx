"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ScoreData {
  rank: number;
  percentile: number;
  currentScore: number;
}

type SetScoreData = React.Dispatch<React.SetStateAction<ScoreData>>;
type SetOpen = React.Dispatch<React.SetStateAction<boolean>>;

const formSchema = z.object({
  rank: z.number().min(1, {
    message: "Rank must be at least 1.",
  }),
  percentile: z.number().min(0).max(100, {
    message: "Percentile must be between 0 and 100.",
  }),
  score: z.number().min(0).max(15, {
    message: "Score must be between 0 and 15.",
  }),
});

export function Skillform({
  scoreData,
  setScoreData,
  setOpen,
}: {
  scoreData: ScoreData;
  setScoreData: SetScoreData;
  setOpen: SetOpen;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rank: scoreData.rank,
      percentile: scoreData.percentile,
      score: scoreData.currentScore,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const saveData: ScoreData = {
      rank: values.rank,
      percentile: values.percentile,
      currentScore: values.score,
    };

    setScoreData(saveData);
    setOpen(false);

    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-4">
                <FormLabel>
                  <span className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5 mr-2">
                    1
                  </span>
                  <p className="text-sm font-normal">
                    Update your <span className="font-bold">Rank</span>
                  </p>
                </FormLabel>
                <div className="flex flex-col justify-center items-center w-40">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Optional"
                      {...field}
                      className="w-40"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percentile"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-4">
                <FormLabel>
                  <span className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5 mr-2">
                    2
                  </span>
                  <p className="text-sm font-normal">
                    Update your <span className="font-bold">Percentile</span>
                  </p>
                </FormLabel>
                <div className="flex flex-col justify-center items-center w-40">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-100"
                      {...field}
                      className="w-40"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-4">
                <FormLabel>
                  <span className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white w-5 h-5 mr-2">
                    3
                  </span>
                  <p className="text-sm font-normal">
                    Update your{" "}
                    <span className="font-bold">Current Score (out of 15)</span>
                  </p>
                </FormLabel>
                <div className="flex flex-col justify-center items-center w-40">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0-15"
                      {...field}
                      className="w-40"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button type="submit" className="bg-blue-800 hover:bg-blue-600 text-white px-6">save →</Button>
        </div>
      </form>
    </Form>
  );
}
