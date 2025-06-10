import { defineConfig } from 'vite';
import { createAngularServerRenderer } from '@angular/platform-server';
import { createAngularRenderer } from '@angular/platform-server';
import { join } from 'path';

export default defineConfig({
  build: {
    ssr: true,
    rollupOptions: {
      input: join(__dirname, 'src/main.server.ts'),
    },
  },
  plugins: [
    {
      name: 'angular-ssr',
      configureServer(server) {
        return () => {
          server.middlewares.use(async (req, res, next) => {
            try {
              const { renderModule } = await import('@angular/platform-server');
              const { AppServerModule } = await import('./src/main.server');
              const html = await renderModule(AppServerModule, {
                document: '<app-root></app-root>',
                url: req.url,
              });
              res.setHeader('Content-Type', 'text/html');
              res.end(html);
            } catch (e) {
              next(e);
            }
          });
        };
      },
    },
  ],
});