import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/components', controller.component.list);
  router.post('/components', controller.component.create);

  router.post('/pages', controller.page.create);
  router.get('/pages/:id', controller.page.find);
  router.post('/page/addComponents', controller.page.addComponents);
  router.post('/page/updateComponentData', controller.page.changeComponentData);
};
