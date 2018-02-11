import indexController from './indexController.js'


class InitController{
    init(app,router){
        app.use(router(_ => {
            _.get('/', async (ctx) => {
                var data=await new indexController().getIndexInfo();
                ctx.body=await ctx.render('index',{data:data});
            }),
            _.get('/user', (ctx) => {
                ctx.body=123;
            })
          }))
    }
}

export default InitController;