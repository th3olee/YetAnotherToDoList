package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"

	"yatdl/models"
)

// JWT secret key
var jwtSecret = []byte("your_secret_key")

func generateToken(user models.User) (string, error) {
	// Crée les revendications JWT
	claims := jwt.MapClaims{
		"user_id":  user.ID.Hex(),
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	}

	// Crée le token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Signe et obtient le token complet sous forme de chaîne
	return token.SignedString(jwtSecret)
}

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := client.Database("yatdl").Collection("users")

	// Check if user already exists
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	count, err := collection.CountDocuments(ctx, bson.M{"email": user.Email})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la vérification de l'utilisateur"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "L'utilisateur existe déjà"})
		return
	}

	// Add User to Database
	user.ID = primitive.NewObjectID()
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de l'ajout de l'utilisateur"})
		return
	}

	user.Password = string(hashedPassword)

	_, err = collection.InsertOne(ctx, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de l'ajout de l'utilisateur"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Utilisateur enregistré avec succès"})
}

func Login(c *gin.Context) {
	var loginData struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Données de connexion invalides"})
		return
	}

	var user models.User
	collection := client.Database("yatdl").Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, bson.M{"username": loginData.Username}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username ou mot de passe incorrect"})
		return
	}

	// Password checking
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginData.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username ou mot de passe incorrect"})
		return
	}

	token, err := generateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la génération du token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})

}
