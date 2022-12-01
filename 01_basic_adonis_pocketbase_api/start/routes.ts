// Fichier de routage 

/**
 * Definitiion des routes de l'application
 * 
 *  GET /visitors/login -> Route de conneixon d'un utilisateur
 *  POST /visitors/signup -> Route d'inscription d'un visiteur
 * 
 * ----User commands---
 *  POST /posts -> Route de création d'un nouveau post par un utilisteur
 *  GET  /posts/:id? -> Route pour récupérer un post d'un utilisateur par son id ou tous ses posts
 *  PUT /posts/:id -> Route pour permmetre à un utilisteur de modifier un des ses posts
 *  DELETE /posts/:id -> Route pour permettre à un utilisateur de supprimer un de ses posts
 *  
 * 
 * ---Commande de recherche---
 * GET /users/:userid get a user by his id
 * GET /user?username=username -> get a user by his username
 * 
 * ---Commande destructrice----
 * DELETE /me
 */
import Route from '@ioc:Adonis/Core/Route'

// Inscription & connexion
Route.post("/visitors/login", "VisitorsController.login")
// Connexion d'un utilisateur
Route.post("/visitors/signup", "VisitorsController.signup")