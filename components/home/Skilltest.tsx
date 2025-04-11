import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Skillform } from "./Skillform";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Progress } from "../ui/progress";

const chartData = [
  { percentile: "0", noofstudents: 186 },
  { percentile: "25", noofstudents: 305 },
  { percentile: "50", noofstudents: 237 },
  { percentile: "75", noofstudents: 73 },
  { percentile: "100", noofstudents: 209 },
];
const chartConfig = {
  noofstudents: {
    label: "No of Students",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ScoreData {
  rank: number;
  percentile: number;
  currentScore: number;
}

function ComparisonGraph({ percentile }: { percentile: number }) {
  const activePointIndex = chartData.findIndex(
    (point) => Number(point.percentile) >= percentile
  );

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="percentile"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="noofstudents"
          type="natural"
          stroke="blue"
          strokeWidth={2}
          dot={(props) => {
            const isActive = props.index === activePointIndex;
            return (
              <circle
                cx={props.cx}
                cy={props.cy}
                r={isActive ? 4 : 2}
                fill={isActive ? "red" : "blue"}
                stroke={isActive ? "black" : "none"}
                strokeWidth={isActive ? 2 : 0}
              />
            );
          }}
          activeDot={{ r: 2, fill: "red", stroke: "black", strokeWidth: 2 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

const Skilltest = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [scoreData, setScoreData] = useState<ScoreData>({
    rank: 0,
    percentile: 0,
    currentScore: 0,
  });

  const percentage = (scoreData.currentScore / 15) * 100;
  const validPercentage = Math.min(100, Math.max(0, percentage));

  // Calculate the circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * validPercentage) / 100;

  return (
    <div className="flex-1 p-6">
      <h1 className="text-xl font-medium mb-6">Skill Test</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Test Card */}
          <Card className="p-6 relative">
            <div className="flex gap-6 items-center">
              <div className="h-16 w-16 flex-shrink-0">
                <div className="h-full w-full flex items-center justify-center rounded overflow-hidden">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png"
                    alt="HTML Icon"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  Hyper Text Markup Language
                </h2>
                <p className="text-gray-600 mt-1">
                  Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                </p>
              </div>
              {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-blue-800 hover:bg-blue-600 text-white"
                      variant="outline"
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[520px]">
                    <DialogHeader>
                      <DrawerTitle>
                        <div className="flex items-center w-full justify-between mt-3 mr-3">
                          <div className="text-lg font-bold">Update Scores</div>
                          <div className="h-8 w-8 flex-shrink-0">
                            <div className="h-full w-full flex items-center justify-center rounded overflow-hidden">
                              <Image
                                src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png"
                                alt="HTML Icon"
                                width={64}
                                height={64}
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </DrawerTitle>
                    </DialogHeader>
                    {/* <ProfileForm /> */}
                    <Skillform
                      scoreData={scoreData}
                      setScoreData={setScoreData}
                      setOpen={setOpen}
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>
                        <div className="flex items-center gap-6">
                          <div>Update Scores</div>
                          <div className="h-16 w-16 flex-shrink-0">
                            <div className="h-full w-full flex items-center justify-center rounded overflow-hidden">
                              <Image
                                src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png"
                                alt="HTML Icon"
                                width={64}
                                height={64}
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </DrawerTitle>
                    </DrawerHeader>
                    {/* <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
                    hello
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          </Card>

          {/* Quick Statistics */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <div className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500">🏆</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{scoreData.rank}</div>
                    <div className="text-xs text-gray-500">YOUR RANK</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">📊</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {scoreData.percentile}%
                    </div>
                    <div className="text-xs text-gray-500">PERCENTILE</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                    <span className="text-green-500">✓</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {scoreData.currentScore}/15
                    </div>
                    <div className="text-xs text-gray-500">CORRECT ANSWERS</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Comparison Graph */}
          <div>
            <h2 className="text-lg font-bold mb-4">Comparison Graph</h2>
            <Card className="p-6">
              <div className="mb-6">
                <p className="text-gray-700">
                  <span className="font-medium">
                    You scored {scoreData.percentile}% percentile
                  </span>{" "}
                  which is lower than the average percentile 72% of all the
                  engineers who took this assessment
                </p>
              </div>

              <ComparisonGraph percentile={scoreData.percentile} />
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Syllabus Analysis */}
          <div>
            <Card className="p-6 space-y-5">
              <h2 className="text-lg font-bold mb-4">Syllabus Wise Analysis</h2>
              <div>
                <div className="flex justify-between mb-2">
                  <span>HTML Tools, Forms, History</span>
                  <span className="text-blue-600">80%</span>
                </div>
                <Progress value={80} className=" [&>div]:bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Tags & References in HTML</span>
                  <span className="text-orange-500">60%</span>
                </div>
                <Progress value={60} className=" [&>div]:bg-orange-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Tables & References in HTML</span>
                  <span className="text-red-500">24%</span>
                </div>
                <Progress value={24} className=" [&>div]:bg-red-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Tables & CSS Basics</span>
                  <span className="text-green-500">96%</span>
                </div>
                <Progress value={96} className=" [&>div]:bg-green-500" />
              </div>
            </Card>
          </div>

          {/* Question Analysis */}
          <div>
            <Card className="p-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold mb-4">Question Analysis</h2>
                <div className="text-blue-600 font-bold">
                  {scoreData.currentScore}/15
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-700">
                    You scored {scoreData.currentScore} question correct out of
                    15.
                    <span className="text-gray-600">
                      However it still needs some improvements
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center p-8">
                <div className="relative w-32 h-32">
                  {/* Background circle */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="white"
                      stroke="#e6e6e6"
                      strokeWidth="10"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Target icon */}
                    <g transform="translate(43, 43) scale(0.14)">
                      <circle cx="50" cy="50" r="50" fill="#e53e3e" />
                      <circle cx="50" cy="50" r="35" fill="white" />
                      <circle cx="50" cy="50" r="20" fill="#e53e3e" />
                      <path
                        d="M 50 0 L 55 40 L 100 50 L 55 60 L 50 100 L 45 60 L 0 50 L 45 40 Z"
                        fill="#38a169"
                        transform="translate(50, -30) scale(0.3)"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skilltest;
