let isBun = typeof Bun !== 'undefined' // detect Bun vs Deno

// nasty code to make it work with both Bun and Deno Deploy
let Hono, serveStatic
if (isBun) {
  ;({ Hono } = await import('hono'))
  ;({ serveStatic } = await import('hono/bun'))
} else {
  ;({ Hono } = await import('jsr:@hono/hono'))
  ;({ serveStatic } = await import('jsr:@hono/hono/deno'))
}

//i dunno
let app = new Hono()
app.get('/now', (c) => c.text(Date.now()))
let startTime = Date.now()
app.get('/started', (c) => c.text(startTime))
app.get('/now', (c) => c.text(Date.now()))
app.get('/online', (c) => c.text(`Online for ${((Date.now() - startTime)/1000).toFixed(0)}s`))

// serve all files in the ./web subfolder
app.use('/*', serveStatic({ root: './pages' }))
app.get('*', serveStatic({ path: './pages/my404.html'}))


// run the server with either Bun or Deno
if (isBun) {
  let server = Bun.serve({ fetch: app.fetch })
  console.log(`Hono server started at ${server.url}`)
} else Deno.serve(app.fetch)