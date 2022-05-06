// DAO : Data Access Object 

class Dao {
    constructor(Model) { // 通过构造函数确定Model
        // 将参数所传入的Model绑定到当前实例
        this.Model = Model;
    }
    async save(props) { // 保存单个文档(或单行数据)
        // 创建Model类的实例(instance)
        let model = new this.Model(props);
        // 调用 Model实例 的实例函数完成保存操作
        let results = await model.save();
        return results;
    }
    async list(condition) { // 根据条件查询列表
        // 调用 this.Model类 的 静态函数 完成查询操作
        let results = await this.Model.find(condition);
        return results;
    }
    async find(id) { // 根据oid查询单个文档详细信息
        let condition = { oid: id }
        return await this.Model.findOne(condition);
    }
    async delete(id) { //根据oid删除单个文档
        let condition = { oid: id }
        return await this.Model.deleteOne(condition);
    }
    async update(id, props) { // 根据条件更新文档
        let condition = { oid: id }
        return await this.Model.updateOne(condition, props);
    }
    async updatepush(condition){
        return await this.Model.updateOne(condition);  
    }
 
}

// 使用 CommonJS 方式导出(Node.js 支持 CommonJS)
module.exports = Dao;
