import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createWorkEntry = async (request) => {
  const urlParts = request.url.split("/");
  await workEntryService.createWorkEntry(urlParts[2]);
  await requestUtils.redirectTo(request, `/tasks/${urlParts[2]}`);
};

const finishWorkEntry = async (request) => {
  const urlParts = request.url.split("/");
  await workEntryService.finishWorkEntry(urlParts[4]);
  await requestUtils.redirectTo(request, `/tasks/${urlParts[2]}`);
};

export { createWorkEntry, finishWorkEntry };