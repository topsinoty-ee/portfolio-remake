"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Bug, Lightbulb, BookOpen, Zap, Tag } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns/format";
import { et } from "date-fns/locale";

type Priority = "low" | "medium" | "high";
type IssueStatus = "open" | "in-progress" | "completed";
type FeatureStatus = "planned" | "in-development" | "completed";
type ThoughtCategory = "general" | "architecture" | "design" | "performance";
type LearningCategory = "technical" | "design" | "process" | "tools";

interface BaseEntry {
  id: string;
  title: string;
  createdAt: Date;
}

interface Issue extends BaseEntry {
  description: string;
  priority: Priority;
  status: IssueStatus;
  tags: string[];
}

interface Thought extends BaseEntry {
  content: string;
  category: ThoughtCategory;
}

interface Feature extends BaseEntry {
  description: string;
  priority: Priority;
  estimatedTime: string;
  status: FeatureStatus;
}

interface Learning extends BaseEntry {
  content: string;
  category: LearningCategory;
}

type TabType = "issues" | "thoughts" | "features" | "learnings";

const SAMPLE_DATA = {
  issues: [
    {
      id: "1",
      title: "Authentication Bug",
      description: "Users can't login with google",
      priority: "medium",
      status: "open",
      tags: ["auth", "bug"],
      createdAt: new Date("2025-07-19"),
    },
    {
      id: "2",
      title: "Actually broken data model...",
      description: "remaking the new data model and flow in a new branch",
      priority: "high",
      status: "completed",
      tags: ["stupid mistake", "remake", "structure", "bug"],
      createdAt: new Date("2025-07-24"),
    },
  ] satisfies Issue[],
  thoughts: [
    {
      id: "1",
      title: "Architecture Thoughts",
      content: "thinking of remaking it just to use SQL instead of mongodb",
      category: "architecture",
      createdAt: new Date("2025-07-22"),
    },
    {
      id: "2",
      title: "refactor",
      content: "I'm thinking of moving this entire section to a db instead of hardcoded",
      category: "design",
      createdAt: new Date("2025-07-22"),
    },
    {
      id: "3",
      title: "UGHHHH",
      content:
        "You would think that based on my experience with flave and wefy i would remember to use react query...like first thing :_(",
      category: "general",
      createdAt: new Date("2025-07-22"),
    },
  ] satisfies Thought[],
  features: [
    {
      id: "1",
      title: "Dark Mode",
      description: "Implement dark mode theme toggle",
      priority: "medium",
      estimatedTime: "2 weeks",
      status: "planned",
      createdAt: new Date("2025-07-12"),
    },
  ] satisfies Feature[],
  learnings: [
    {
      id: "1",
      title: "Data-structure pre-planning",
      content:
        "This project has me twisted...i have like the weirdest connections and like cuz i wanted to use slugs then i have transformations and all these unnecessary shit and now i realize i DEF DID NOT NEED THAT. It's also the reason I'm thinking of remaking it again...but it;s not a design or flow issue...it's a me stupidity issue ( i forgot to use the mongo adapter meaning i can't link it to the comments and the auth is basically useless in that regard...)",
      category: "process",
      createdAt: new Date("2025-07-22"),
    },
  ] satisfies Learning[],
};

const StatusIcon = ({ status }: { status: IssueStatus | FeatureStatus }) => {
  const iconMap = {
    open: <span className="bg-muted-foreground h-2 w-2 rounded-full" />,
    planned: <span className="bg-muted-foreground h-2 w-2 rounded-full" />,
    "in-progress": <span className="h-2 w-2 rounded-full bg-yellow-500" />,
    "in-development": <span className="h-2 w-2 rounded-full bg-yellow-500" />,
    completed: <span className="h-2 w-2 rounded-full bg-green-500" />,
  };
  return iconMap[status] || iconMap.open;
};

export default function DevJournal() {
  const [activeTab, setActiveTab] = useState<TabType>("issues");

  const getPriorityColors = (priority: Priority) => {
    return {
      bg: priority === "high" ? "bg-destructive" : priority === "medium" ? "bg-warning" : "bg-success",
      text:
        priority === "high"
          ? "text-destructive-foreground"
          : priority === "medium"
            ? "text-warning-foreground"
            : "text-success-foreground",
    };
  };

  const renderTabContent = (tab: TabType) => {
    const items = SAMPLE_DATA[tab];
    const isEmpty = items.length === 0;

    const emptyStates = {
      issues: {
        icon: <Bug className="h-4 w-4" />,
        title: "No issues yet",
        description: "Track bugs and problems here.",
      },
      thoughts: {
        icon: <Lightbulb className="h-4 w-4" />,
        title: "No thoughts yet",
        description: "Share your development ideas here.",
      },
      features: {
        icon: <Zap className="h-4 w-4" />,
        title: "No features planned yet",
        description: "Track upcoming features here.",
      },
      learnings: {
        icon: <BookOpen className="h-4 w-4" />,
        title: "No learnings yet",
        description: "Document what you learn here.",
      },
    };

    if (isEmpty) {
      const state = emptyStates[tab];
      return (
        <Alert className="bg-background">
          {state.icon}
          <AlertTitle>{state.title}</AlertTitle>
          <AlertDescription>{state.description}</AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-card">
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-card-foreground text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">
                    {format(item.createdAt, "dd.MM.yyyy", { locale: et })}{" "}
                    {"estimatedTime" in item && ` • Est. ${item.estimatedTime}`}
                    {"category" in item && ` • ${item.category}`}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {"description" in item && <p className="text-muted-foreground mb-3">{item.description}</p>}
              {"content" in item && <p className="text-card-foreground whitespace-pre-wrap">{item.content}</p>}
              {"tags" in item && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                  <div className="flex items-center gap-2">
                    {"priority" in item && (
                      <Badge
                        className={`${getPriorityColors(item.priority).bg} ${getPriorityColors(item.priority).text}`}
                      >
                        {item.priority}
                      </Badge>
                    )}
                    {"status" in item && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <StatusIcon status={item.status} />
                        {item.status}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-card-foreground text-3xl font-bold">Dev Journal</h1>
        <p className="text-muted-foreground">Track your development progress</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bug className="text-destructive h-5 w-5" />
              <div>
                <p className="text-card-foreground text-sm font-medium">Issues</p>
                <p className="text-xl font-bold">{SAMPLE_DATA.issues.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="text-warning h-5 w-5" />
              <div>
                <p className="text-card-foreground text-sm font-medium">Thoughts</p>
                <p className="text-xl font-bold">{SAMPLE_DATA.thoughts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="text-success h-5 w-5" />
              <div>
                <p className="text-card-foreground text-sm font-medium">Features</p>
                <p className="text-xl font-bold">{SAMPLE_DATA.features.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="text-primary h-5 w-5" />
              <div>
                <p className="text-card-foreground text-sm font-medium">Learnings</p>
                <p className="text-xl font-bold">{SAMPLE_DATA.learnings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="mt-4">
        <TabsList className="grid w-full grid-cols-4">
          {(["issues", "thoughts", "features", "learnings"] satisfies TabType[]).map((tab) => (
            <TabsTrigger key={tab} value={tab} className="flex items-center gap-2">
              {tab === "issues" && <Bug className="h-4 w-4" />}
              {tab === "thoughts" && <Lightbulb className="h-4 w-4" />}
              {tab === "features" && <Zap className="h-4 w-4" />}
              {tab === "learnings" && <BookOpen className="h-4 w-4" />}
              <span className="hidden sm:inline">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-4">
          <TabsContent value="issues">{renderTabContent("issues")}</TabsContent>
          <TabsContent value="thoughts">{renderTabContent("thoughts")}</TabsContent>
          <TabsContent value="features">{renderTabContent("features")}</TabsContent>
          <TabsContent value="learnings">{renderTabContent("learnings")}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
