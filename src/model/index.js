const { Serializer } = require('jsonapi-serializer');
const { assistantV1 } = require('../services/ibm-watson');


class IBMAssistantModel {

  /**
   * Constructor
   * 
   */
  constructor(props) {
    this.type = props.type;
    this.responseKey = props.responseKey;
    this.idFieldName = props.idFieldName;
    this.attributes = props.attributes;
    this.options = props.defaultOptions;
    this.methodNames = props.methodNames;
  }


  /**
   * get Model list
   * 
   */
  async getList({ page, sort }) {
    this.options.sort = sort;
    const { result } = await assistantV1[this.methodNames.getList](this.options);

    const paginatedData = this.getPageData(result[this.responseKey], page);

    return this.serialize(paginatedData, {
      meta: {
        'total-count': result.pagination.total,
      }
    });
  }


  /**
   * Serialize data into JSON:API format
   * 
   */
  serialize(data, opts) {
    return new Serializer(this.type, {
      id: this.idFieldName,
      attributes: this.attributes,
      ...opts,
    }).serialize(data);
  }


  /**
   * Get paginated data
   * 
   */
  getPageData(data, page) {
    const { number, size } = page;
    const start = (number-1) * size;
    const end = number * size;
    
    return data.slice(start, end);
  }

}


module.exports = IBMAssistantModel;