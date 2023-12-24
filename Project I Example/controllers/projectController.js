import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectService from "../services/projectService.js";
import * as requestUtils from "../utils/requestUtils.js";

/* Part 1 */

// Listing all projects, from "listAllProjects" in projectService
const viewAllProjects = async (request) => {
  const data = {
    projects: await projectService.listAllProjects(),
  };

  request.respond({ body: await renderFile("projects.eta", data) });
};

// Adding new project, from "create" in projectService
const addProject = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);
  const name = params.get("name");

  await projectService.create(name);
  await requestUtils.redirectTo(request, "/projects");
};

// Remove a project, from "removeById" in projectService

const removeProject = async (request) => {
  const urlParts = request.url.split("/");
  await projectService.removeById(urlParts[2]);
  await requestUtils.redirectTo(request, "/projects");
};

export { viewAllProjects, addProject, removeProject };



/* import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as taskService from "../services/taskService.js";
import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addTask = async (request) => {
  const body = new TextDecoder().decode(await Deno.readAll(request.body));
  const params = new URLSearchParams(body);
  const name = params.get("name");

  await taskService.create(name);
  await requestUtils.redirectTo(request, "/tasks");
};

const viewTask = async (request) => {
  const urlParts = request.url.split("/");

  const data = {
    task: await taskService.findById(urlParts[2]),
    currentWorkEntry: await workEntryService.findCurrentWorkEntry(urlParts[2]),
    totalTime: await workEntryService.calculateTotalTime(urlParts[2]),
  };
  
  request.respond({ body: await renderFile("task.eta", data) });
};

const viewTasks = async (request) => {
  const data = {
    tasks: await taskService.findAllNonCompletedTasks(),
  };

  request.respond({ body: await renderFile("tasks.eta", data) });
};

const completeTask = async (request) => {
  const urlParts = request.url.split("/");
  await taskService.completeById(urlParts[2]);
  await requestUtils.redirectTo("/tasks");
};

export { addTask, viewTask, viewTasks, completeTask };
*/