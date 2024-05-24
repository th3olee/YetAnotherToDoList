package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type task struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}

type user struct {
	ID           string `json:"id"`
	Username     string `json:"username"`
	PasswordHash string `json:"password"`
}

var tasks = []task{
	{ID: "1", Title: "Finir le rapport", Done: false},
	{ID: "2", Title: "Acheter un cadeau", Done: false},
	{ID: "3", Title: "Saisir les imputations", Done: true},
	{ID: "4", Title: "Touver un restaurant", Done: false},
	{ID: "5", Title: "Acheter des pommes de terre 🥔", Done: false},
}

var users = []user{
	{ID: "1", Username: "Administrateur", PasswordHash: "admin"},
}

func getTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, tasks)
}

func getTasksByID(c *gin.Context) {
	id := c.Param("id")

	for _, a := range tasks {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "tasks not found"})
}

func postTasks(c *gin.Context) {
	var newTask task

	if err := c.BindJSON(&newTask); err != nil {
		return
	}

	tasks = append(tasks, newTask)
	c.IndentedJSON(http.StatusCreated, newTask)
}

func postLogin(c *gin.Context) {
	var loginSend user

	if err := c.BindJSON(&loginSend); err != nil {
		return
	}

	for _, l := range users {
		if l.Username == loginSend.Username {
			if l.PasswordHash == loginSend.PasswordHash {
				c.IndentedJSON(http.StatusOK, gin.H{"message": "Connected"})
				return
			} else {
				c.IndentedJSON(http.StatusForbidden, gin.H{"message": "Bad credentials"})
				return
			}
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "User not found"})

}

func main() {
	router := gin.Default()

	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Autoriser votre origine front-end
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/tasks", getTasks)
	router.GET("task/:id", getTasksByID)
	router.POST("/tasks", postTasks)

	router.POST("/login", postLogin)

	router.Run("localhost:8080")
}
