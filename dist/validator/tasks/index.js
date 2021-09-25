const InvariantError = require('../../exceptions/InvariantError');
const { 
  TaskCreateUpdateSchema
} = require('./schema');

const TasksValidator = {
  validateTaskCreateUpdate: (payload) => {
    const validationResult = TaskCreateUpdateSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TasksValidator;