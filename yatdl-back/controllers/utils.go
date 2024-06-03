package controllers

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"yatdl/constants"
)

var client *mongo.Client

func init() {
	// Configurer la connexion à MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var err error
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(constants.DB_BASE_URL))
	if err != nil {
		panic(err)
	}
}
