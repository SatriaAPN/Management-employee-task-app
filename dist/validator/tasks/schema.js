const joi = require('joi');

const TaskCreateUpdateSchema = joi.object({
    title: joi.string()
        .required(),
    description: joi.string()
        .required()
});

module.exports = { TaskCreateUpdateSchema };