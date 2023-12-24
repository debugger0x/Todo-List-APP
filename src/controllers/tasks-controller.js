const Task = require('../models/task-model.js');
const appError = require('../utils/app-error.js');

async function handleInvalidId(req) {
  const taskId = await Task.findById(req.params.id);
  if (!taskId) throw new appError('This task does not exist', 400);

  return;
}

// create task
exports.createTask = async (req, res, next) => {
  try {
    if (!req.body.task) {
      next(new appError('Please enter a task', 400));
    }

    const body = { task: req.body.task };
    const task = await Task.create(body);

    res.status(201).json({
      status: 'success',
      data: task,
    });
  } catch (err) {
    console.log(err.message);
    return next(new appError(`Error creating task`, 400));
  }
};

// find task
exports.tasks = async (req, res, next) => {
  try {
    const task = await Task.find();
    res.status(200).json({ status: 'success', data: task });
  } catch (err) {
    res.status(401).json({ status: 'fail', message: err.message });
  }
};

// update task
exports.updateTask = (req, res, next) => {
  try {
    // handleInvalidId();
    res.status(200).json({ status: 'success', message: 'updated' });
  } catch (err) {}
};

// delete task
exports.deleteTask = async (req, res, next) => {
  const task = await Task.find(req.body.taskId);

  try {
    await handleInvalidId(req);
    await Task.findOneAndDelete(req.params.id);
    res.status(204).json({ status: 'success', message: 'deleted' });
  } catch (err) {
    next(err);
  }
};