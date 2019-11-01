import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/components', controller.component.list);
  router.post('/components', controller.component.create);
};
