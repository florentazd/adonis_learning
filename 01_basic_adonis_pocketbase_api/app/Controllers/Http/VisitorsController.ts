import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const PocketBase = require('pocketbase/cjs')
require('cross-fetch/polyfill');

export default class VisitorsController {
    /**
     * Controller de connexion d'un utlisteur
     * ### pamaretes attendu:
     * - 1 - Login/email
     * - 2 - Mot de passe
     * 
     * ### Retour StatusCode en fonction du resultat de l'authentification
     */
    public async login(ctx: HttpContextContract) {
        console.log("Hello" + ctx.request.url())
    }

    /**
     * Controller d'inscription d'un utlisteur
     * ### pamaretes attendu:
     * - 1 - Login
     * - 2 - Mot de passe
     * - 3 - Email
     * 
     * ### Retour StatusCode en fonction du resultat de l'inscription
     */
    public async signup(ctx: HttpContextContract) {

        // On recupères et on affiche les données envoyées dans le corps de la requete par l'utilisateur
        const { username, email, password, name } = ctx.request.body()

        if (!username || !email || !password || !name)
            ctx.response.status(400).send({
                error: "Un des champs est vide",
                payload: {
                    name: name || null,
                    username: username || null,
                    email: email || null,
                    password: password ? password.toString().replaceAll(/./g, "*") : null
                }
            })
        else {
            // A ce niveau les données existe ! On crée dont un payload
            const payload = {
                name: name,
                username: username,
                password: password,
                passwordConfirm: password,
                email: email
            }

            // Creation d'un client pocketbase pour envoie de la requête.
            const pb_client = new PocketBase("http://127.0.0.1:8090")

            try {
                // On envoie les données vers notre bd PocketBase
                const record = await pb_client.collection("users").create(payload)

                if (record)
                    // Si le compte de l'utilisateur a été créer avec succès, alors on renvoie les informations au client
                    ctx.response.status(200).send({ ...record })
            } catch (error) {
                ctx.response.status(400).send({
                    "error": "User information already exist in DB"
                })
            }
        }
    }
}