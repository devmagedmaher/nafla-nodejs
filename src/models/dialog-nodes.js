const slugify = require('../utils/slugify');
const IBMAssistantModel = require('./index');


class DialogNodeModel extends IBMAssistantModel {

  /**
   * constructor
   * 
   */
  constructor(workspaceId) {
    super({
      name: 'dialog node',
      workspaceId,
    });
    this.idKeyName = 'dialogNode';
  }


  /**
   * get dialog node list
   * 
   */
  async getList({ filter, range, sort }) {
    let data = {};


    data = await this.__getListResource({ filter, range, sort });
    
    data.result = this._mapAttributes(data.result);

    
    return data;
  }


  /**
   * get one dialog node by id
   * 
   */
  async getOne(id) {
    let data = {};


    data.result = await this._getOneResource(id);

    data.result = this._mapAttributes(data.result);


    return data;
  }


  /**
   * create new dialog node
   * 
   */
  async create(attributes) {
    let data = {};


    // add # before conditions string (`#` representing `intent`);
    if (attributes.conditions) {
      attributes.conditions = `#${attributes.conditions}`;
    }

    attributes.dialogNode = slugify(attributes.title);
    
    data.result = await this._createResource(attributes)

    data.result = this._mapAttributes(data.result);


    return data;
  }


  /**
   * update new dialog node
   * 
   */
  async update(attributes, id) {
    let data = {};


    // add # before conditions string (`#` representing `intent`);
    if (attributes.conditions) {
      attributes.conditions = `#${attributes.conditions}`;
    }
    
    // remap output attribute
    attributes.output = {
      generic: [ attributes.respond ],
    };
    
    data.result = await this._updateResource(attributes, id);

    data.result = this._mapAttributes(data.result);


    return data;
  }
  

  /**
   * delete dialog node
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

      // remove # from conditions
      if (data.conditions) {
        data.conditions = data.conditions.replace('#', '');
      }
      // remap output attribute
      if (node.output && node.output.generic) {
        node.respond = node.output.generic[0];
      }
      // add id attribute
      node.id = node.dialog_node;

      return node;
    });
  }

}


module.exports = DialogNodeModel;