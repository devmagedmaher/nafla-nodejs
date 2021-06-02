const IBMAssistantModel = require('./index');


class IntentModel extends IBMAssistantModel {

  /**
   * constructor
   * 
   */
  constructor(workspaceId) {
    super({
      name: 'intent',
      workspaceId,
      defaultParams: {
        _export: true,
      },
    });
    this.idKeyName = 'intent';
    this.titleKeyName = 'intent';
  }


  /**
   * get intent list
   * 
   */
  async getList({ filter, range, sort }) {
    let data = {};


    data = await this.__getListResource({ filter, range, sort });
    
    data.result = this._mapAttributes(data.result);

    
    return data;
  }


  /**
   * get one intent by id
   * 
   */
  async getOne(id) {
    let data = {};


    data.result = await this._getOneResource(id);

    data.result = this._mapAttributes(data.result);


    return data;
  }


  /**
   * create new intent
   * 
   */
  async create(attributes) {
    let data = {};


    data.result = await this._createResource(attributes)

    data.result = this._mapAttributes(data.result);


    return data;
  }


  /**
   * update new intent
   * 
   */
  async update(attributes, id) {
    let data = {};


    data.result = await this._updateResource(attributes, id);

    data.result = this._mapAttributes(data.result);


    return data;
  }
  

  /**
   * delete intent
   * 
   */
  async delete(id) {
    let data = {};

    
    data.result = await this._deleteResource(id)


    return data;
  }


  /**
   * map attribute before send
   * 
   */
  _mapAttributes(data) {
    return this._arrObjMapper(data, node => {
      node.id = node.intent;
      return node;
    });
  }

}


module.exports = IntentModel;