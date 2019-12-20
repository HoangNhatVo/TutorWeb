var orm = require('../config/orm')
module.exports = {
    addTag:(TagName)=>{
        return orm.selectAll(`call AddTag('${TagName}')`);
    },
    addTagAccount:(IDTag, IDAcc)=>{
        return orm.selectAll(`call AddTagAccount(${IDTag},${IDAcc})`);
    },
    updateTagName:(IDTag, TagName)=>{
        return orm.selectAll(`call UpdateTagName(${IDTag},'${TagName}')`);
    },
    deleteTag:(IDTag)=>{
        return orm.selectAll(`call DeleteTag(${IDTag})`);
    },
    getAllTag:()=>{
        return orm.selectAll(`call GetAllTag()`);
    },
    getTagByID:(IDTag)=>{
        return orm.selectAll(`call GetTagByID(${IDTag})`);
    },
    getAllTagByAccID:(ID)=>{
        return orm.selectAll(`call GetAllTagByAccID(${ID})`);
    },
}