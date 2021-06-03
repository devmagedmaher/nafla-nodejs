const IBMAssistantModel = require('./index');


class IntentModel extends IBMAssistantModel {

  /**
   * constructor
   * 
   */
  constructor() {
    super({
      name: 'workspace',
      defaultParams: {
        _export: true,
      },
    });
    this.idKeyName = 'workspaceId';
  }


  /**
   * get workspaces list
   * 
   */
  async getList({ filter, range, sort }) {
    let data = {};


    // change id field name
    if (sort && sort[0] === 'id') {
      sort[0] = 'workspace_id';
    }

    data = await this.__getListResource({ filter, range, sort });
    
    data.result = this._mapAttributes(data.result);

    
    return data;
  }


  /**
   * get one workspace by id
   * 
   */
  async getOne(id) {
    let data = {};


    data.result = await this._getOneResource(id);

    data.result = this._mapAttributes(data.result);


    return data;
  }


  /**
   * create new workspace
   * 
   */
  async create(attributes) {
    let data = {};


    data.result = await this._createResource(attributes)

    data.result = this._mapAttributes(data.result);


    return data;
  }


  /**
   * update new workspace
   * 
   */
  async update(attributes, id) {
    let data = {};


    data.result = await this._updateResource(attributes, id);

    data.result = this._mapAttributes(data.result);


    return data;
  }
  

  /**
   * delete workspace
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
    return this._arrObjMapper(data, workspace => {
      workspace.id = workspace.workspace_id;
      return workspace;
    });
  }

}


module.exports = IntentModel;