import { configure, renderFile } from "../deps.js";

const render = async (context, next) => {
    configure({
        views: `${Deno.cwd()}/views/`,
    });

    context.render = async (file, data) => {
        if (!data) {
            data = {};
          }
      
        if (context.user) {
            data.user = context.user;
        }
        context.response.headers.set("Content-Type", "text/html; charset=utf-8");
        context.response.body = await renderFile(file, data);
    };

    await next();
}

export default render;