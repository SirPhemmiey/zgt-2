import app from './app';

const listener = app.listen(app.get("port"), () => {
    console.info("Service is running at http://localhost:%d", app.get("port"));
 });
 
 process.on('SIGTERM', () => {
     listener.close(() => {
       console.info('Closing http server.');
       process.exit(0);
     });
 });
 
 export { app }