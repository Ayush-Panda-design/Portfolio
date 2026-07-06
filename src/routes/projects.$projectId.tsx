import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetailPage } from "@/components/portfolio/ProjectDetailPage";
import { getProductionProject } from "@/data/projects";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProductionProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Project"} — Ayush Panda` },
      {
        name: "description",
        content: loaderData?.project.summary ?? "",
      },
    ],
  }),
  component: ProjectRoute,
});

function ProjectRoute() {
  const { project } = Route.useLoaderData();
  return <ProjectDetailPage project={project} />;
}
