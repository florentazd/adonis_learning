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
import UsersController from 'App/Controllers/Http/UsersController'
Route.group(() => {

  // Inscription & connexion
  Route.post("/visitors/login", "VisitorsController.login")
  // Connexion d'un utilisateur
  Route.post("/visitors/signup", "VisitorsController.signup")

  // Route users
  Route.get("/users/:id?", async ctx => {
    // On récupère le nom d'utilisateur dans le corps de ma requête si il existe.
    const { username } = ctx.request.qs()
    if (ctx.params.id) return new UsersController().getUserById(ctx)
    else if (username) return new UsersController().getUserByUsername(ctx, username)
    else return new UsersController().getUsers(ctx)
  })
  Route.delete("/users/me/:userId", "UsersController.deleteMe")


  // Gestion des posts
}).prefix("/api")
