// 使用 CommonJS 导入(Node.js 支持 CommonJS)
const Dao = require('./Dao.js');
const User = require('../models/users.js');

class UserDao extends Dao {
    constructor() {
        // 使用 super 调用父类构造函数并指定Model
        super(User);
    }
}

// 使用 CommonJS 方式导出(Node.js 支持 CommonJS)
module.exports = UserDao;