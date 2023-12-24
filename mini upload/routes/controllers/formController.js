import { lastUploadedId } from "../../services/fileService.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";
import { executeQuery } from "../../database/database.js";


const viewForm = async ({ render }) => {
  const lastId = await lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

const processUpload = async ({ request, response }) => {
  const body = request.body({type: "form-data"});
  const reader = await body.value;
  const data = await reader.read();

  const fileDetails = data.files[0];

  const name = fileDetails.originalName;
  const type = fileDetails.contentType;
  const password = `${Math.floor(100000 * Math.random())}`
  const hash = await bcrypt.hash(password);

  // reading and encoding
  const fileContents = await Deno.readAll(await Deno.open(fileDetails.filename));
  const base64Encoded = base64.fromUint8Array(fileContents);

  // store contents
  await executeQuery("INSERT INTO miniupload_files (name, type, password, data) VALUES ($1, $2, $3, $4);",
    name,
    type,
    hash,
    base64Encoded,
);
  // respond somehow
  response.body = `${password}`;
};

const getFile = async ({ request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const idExtracted = params.get("id");
  const password = params.get("password");
  const res = await executeQuery("SELECT * FROM miniupload_files WHERE id = $1;", idExtracted);
  if (res.rows.length === 0){
    response.status = 401;
    return;
  } 

  const obj = res.rows[0];
  const hash = obj.password;
  const passwordCorrect = await bcrypt.compare(password, hash);

  if (!passwordCorrect) {
    response.status = 401;
    return;
  } 

  response.headers.set('Content-Type', obj.type);
  const arr = base64.toUint8Array(obj.data);
  response.headers.set('Content-Length', arr.length);
  response.body = arr;    
}

export { viewForm, processUpload, getFile };
