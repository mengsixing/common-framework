import indexModel from '../models/indexModel.js'

class indexController{
    getIndexInfo(){
        return new indexModel().getIndexInfo();
    }
}

export default indexController;