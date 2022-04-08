const http = require("http");
const fs   = require("fs");

const serveTo = (res, code = 200) => (name, type) => {
    res.writeHead(code, { "content-type": type });
    fs.createReadStream(name).pipe(res);
}

const removeExt = file => file.split(".")[0];
const removeDir = path => path.substring(path.indexOf("/") + 1);

const toRoute = (type, fn = x => x) => serve => file =>
    ([`/${fn(file)}`, () => serve(file, type)]);

const toHtmlRoute  = toRoute("text/html", f => removeDir(removeExt(f)));
const toStyleRoute = toRoute("text/css");
const toJsRoute    = toRoute("text/javascript");
const toImgRoute   = serve => file => {
    const ext = file.split(".").at(-1);
    return toRoute(`image/${ext}`)(serve)(file);
}

const toMp4Route = serve => file => 
    toRoute("video/mp4")(serve)(file);

const isFile = item => item.split(".").length != 1;
const readDir = dir => 
    fs.readdirSync(dir)
        .map(item => `${dir}/${item}`)
        .flatMap(item => isFile(item) ? item : readDir(item));

const createRoutes = (dir, toRoute) => serve => {
    const files = readDir(dir);
    return Object.fromEntries(files.map(toRoute(serve)));
}

const createHtmlRoutes  = createRoutes("pages",        toHtmlRoute);
const createStyleRoutes = createRoutes("styles",       toStyleRoute);
const createImgRoutes   = createRoutes("assets/img",   toImgRoute);
const createMp4Routes   = createRoutes("assets/video", toMp4Route);
const createJsRoutes    = createRoutes("src",          toJsRoute);

const notFound = res => serveTo(res, 404)("pages/404.html", "text/html");

const server = http.createServer((req, res) => {
    const serveFile = serveTo(res);

    const routes = {
        "/":            () => serveFile("index.html", "text/html"),
        "/favicon.ico": () => {},
        ...createHtmlRoutes(serveFile),
        ...createStyleRoutes(serveFile),
        ...createImgRoutes(serveFile),
        ...createMp4Routes(serveFile),
        ...createJsRoutes(serveFile)
    };

    const route = routes[req.url];
    route();
    //route ? route() : notFound(res);
});

server.listen(process.env.PORT || 3000, () => console.log("Listening at port 3000..."));
