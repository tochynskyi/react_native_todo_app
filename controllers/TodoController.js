import Todo from "../models/Todo.js";

class TodoController {
  async get(req, res) {
    try {
      const { author } = req.params;
      const todos = await Todo.find({ author });
      res.json(todos);
    } catch (e) {
      res.status(500).json({ message: "Error in fetching", e });
    }
  }
  async add(req, res) {
    try {
      const { id, author, checked, title, priority, addDate } = req.body;
      const todo = await Todo.create({
        id,
        author,
        checked,
        title,
        priority,
        addDate,
      });
      res.json(todo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async check(req, res) {
    try {
      const { id, checked } = req.body;
      const todo = await Todo.findOneAndUpdate(
        { id },
        { checked },
        {
          new: true,
          returnOriginal: false,
        }
      );
      res.json(todo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "No specified id" });
      }
      const todo = await Todo.findOneAndDelete({ id });
      res.json(todo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TodoController();
