const { assistantV1 } = require('../services/ibm-watson');
const slugify = require('../utils/slugify');


class IBMAssistantModel {


  /**
   * Constructor
   * 
   */
  constructor(name, defaultParams) {
    this.name = name;

    this.defaultParams = {
      workspaceId: process.env.WATSON_ASSISTANT_SKILL_ID,
      includeAudit: true,
      includeCount: true,
      ...defaultParams,
    };
  }


  /**
   * get resource list
   * 
   */
  async __getListResource({ filter, range, sort}) {
    const methodName = this.__toCamelCase(`list ${this.name}s`);
    const responseContentKeyName = this.__getResponseKeyName();
    console.log(responseContentKeyName);
    let data = {};

    // get data from ibm
    data.result = await assistantV1[methodName]({
      ...this.defaultParams,
      sort: this.__getParsedSort(sort),
    }).then(response => response.result);

    // store total count
    const { total } = data.result.pagination;

    // get data object from response
    data.result = data.result[responseContentKeyName];

    // filter if needed
    if (filter instanceof Object && Object.keys(filter).length > 0) {
      data.result = this._getFilterdData(data.result, filter)
    }

    // get single page data if needed
    if (Array.isArray(range) && range.length === 2) {
      data.result = data.result.slice(range[0], range[1]);
      // set needed headers for pagination
      data.headers = {
        'Content-Range': `${this.type} ${range[0]}-${range[1]}/${total}`,
      };
    }

    return data;
  }

  
  /**
   * get one resource
   * 
   */
  _getOneResource(id) {
    const methodName = this.__toCamelCase(`get ${this.name}`);
    const idKeyName = this.__toCamelCase(this.name);

    return assistantV1[methodName]({
      ...this.defaultParams,
      [idKeyName]: id,
    }).then(response => response.result);
  }


  /**
   * create new resource
   * 
   */
  _createResource(data) {
    const methodName = this.__toCamelCase(`create ${this.name}`);

    return assistantV1[methodName]({
      ...this.defaultParams,
      ...data,
    }).then(response => response.result);
  }
  

  /**
   * update existing resource
   * 
   */
  _updateResource(data, id) {
    const methodName = this.__toCamelCase(`update ${this.name}`);
    const idKeyName = this.__toCamelCase(this.name);

    if (data.title) {
      data.dialogNode = slugify(data.title);
    }
    else {
      delete data.dialogNode;
    }

    this.__toUpdateAttributes(data);    

    return assistantV1[methodName]({
      ...this.defaultParams,
      [idKeyName]: id,
      ...data,
    }).then(response => response.result);
  }


  /**
   * delete existing resource
   * 
   */
  _deleteResource(id) {
    const methodName = this.__toCamelCase(`delete ${this.name}`);
    const idKeyName = this.__toCamelCase(this.name);

    console.log({ methodName, idKeyName });
    return assistantV1[methodName]({
      ...this.defaultParams,
      [idKeyName]: id,      
    }).then(response => response.result);
  }


  /**
   * Get many intents with filtering
   * 
   */
  _getFilterdData(data, filter) {
    return data.filter(element => {
      for (let key in filter) {
        let eKey = key === 'id' ? this.idKeyName : key;
        
        if (Array.isArray(filter[key])) {
          return filter[key].includes(element[eKey])
        }
        else {
          return filter[key] === element[eKey];
        }        
      }
    });
  }


  /**
   * attributes mapper function
   * 
   */
  _arrObjMapper(data, mapper) {
    if (Array.isArray(data)) {
      return data.map(mapper);
    }
    else {
      return mapper(data);
    }
  }


  /**
   * change sort to appropriate format for iBM Assistant
   * 
   */





  /**
   * rename update data keys to be appropriate for IBM Assistant
   * 
   */
   __toUpdateAttributes(data) {
    for (let key in data) {
      const firstCap = key.charAt(0).toUpperCase();
      const slicedKey = key.slice(1);

      data[`new${firstCap}${slicedKey}`] = data[key];
      delete data[key];
    }
  }


  __toCamelCase(str) {
    console.log('to camel:', str);
    return str
      .split(' ')
      .map((word, i) => i > 0 ? this.__firstToUpperCase(word) : word)
      .join('');
  }
  
  __firstToUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  __getResponseKeyName() {
    return this.name.split(' ').join('_') + 's';
  }

  __getParsedSort(sort) {
    return sort ? (sort[1] == 'DESC' ? '-'  : '') + sort[0] : undefined;
  }
}


module.exports = IBMAssistantModel;