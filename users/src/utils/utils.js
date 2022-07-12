const moment = require("moment");
const User = require('../database/users');

module.exports = new class{

  async checkUniqueItem(item={}) {
    const user = await User.findOne(item);
    return (!!user)
  }
  
  idGenerator(){
    return moment().format("YYYYMMDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9, 0)
  }
  
  async checkExistUserById(userId){
    const user = await User.findOne({id: userId});
    return (!!user);
  }

  deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
    let nullishData = ["", " ", "0", 0, null, undefined]
    Object.keys(data).forEach(key => {
        if (blackListFields.includes(key)) delete data[key]
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if (nullishData.includes(data[key])) delete data[key];
    })
}


}
