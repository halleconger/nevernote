import axios from "axios";

export default {
    // Get todos from the /api/todos route on our Express server
    getTodos: function() {
        return axios.get("/api/todos")
    },

    // Create todos from the /api/todo route on our Express server
    createNewTodo: function(newTodo) {
        return axios.post("/api/todo", newTodo)
    }
        
}