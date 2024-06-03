package main

import (
	"time"

	"yatdl/controllers"
	"yatdl/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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

	// User
	router.POST("/user", controllers.Register)
	router.POST("/login", controllers.Login)

	auth := router.Group("/")
	auth.Use(middlewares.AuthMiddleware())
	{

		// Tasks
		auth.GET("/tasks", controllers.GetAllTasks)
		auth.POST("/task", controllers.AddTask)

	}

	router.Run("localhost:8080")
}
