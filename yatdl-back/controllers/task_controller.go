package controllers

import (
	"context"
	"net/http"
	"time"
	"yatdl/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddTask(c *gin.Context) {
	var task models.Task

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := client.Database("yatdl").Collection("tasks")

	// Vérifier si la tache existe déjà
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	count, err := collection.CountDocuments(ctx, bson.M{"title": task.Title})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la vérification de la tache"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "La tache existe déjà"})
		return
	}

	// Ajouter l'utilisateur à la base de données
	task.ID = primitive.NewObjectID()
	_, err = collection.InsertOne(ctx, task)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de l'ajout de la tache"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tache enregistré avec succès"})
}

func GetAllTasks(c *gin.Context) {

	collection := client.Database("yatdl").Collection("tasks")

	var tasks []models.Task
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la récupération des tâches"})
		return
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var task models.Task
		if err := cursor.Decode(&task); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors du décodage des tâches"})
			return
		}
		tasks = append(tasks, task)
	}

	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de l'itération des tâches"})
		return
	}

	c.JSON(http.StatusOK, tasks)
}
