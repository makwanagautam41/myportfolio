import { motion } from "framer-motion";
import { pageVariants, projects } from "../data/data";
import Footer from "../components/Footer";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
import ProjectCard from "../components/ProjectCard";
import "./WorkPage.css";

/**
 * WorkPage — Shows ALL projects in a full-viewport ScrollStack.
 *
 * To add a new project, update data/data.js only.
 * This page automatically picks up every entry in the `projects` array.
 */
const WorkPage = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

    {/* ── Full ScrollStack — all projects ── */}
    <ScrollStack
      itemDistance={0}
      itemStackDistance={30}
      stackPosition="15%"
      baseScale={0.88}
      itemScale={0.04}
      blurAmount={2}
    >
      {projects.map((project, idx) => (
        <ScrollStackItem key={project.title}>
          <ProjectCard
            project={project}
            index={idx + 1}
            total={projects.length}
            label="Work"
            /* No onNavigate — work page doesn't need "All works" button */
          />
        </ScrollStackItem>
      ))}
    </ScrollStack>

    <Footer />
  </motion.div>
);

export default WorkPage;
