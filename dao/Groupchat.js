const Dao = require('./Dao.js');
const Groupchat = require('../models/groupchat');

class GroupchatDao extends Dao {
    constructor() {
        // 使用 super 调用父类构造函数并指定Model
        super(Groupchat);
    }
}

// 使用 CommonJS 方式导出(Node.js 支持 CommonJS)
module.exports = GroupchatDao;