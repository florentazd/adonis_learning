import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const PocketBase = require('pocketbase/cjs')
// Creation du client pocketbase pour l'envoie de requete vers le serveur
const pb_client = new PocketBase("http://127.0.0.1:8090")
import axios from "axios"


require('cross-fetch/polyfill');
export default class UsersController {
    public async getUserById(ctx: HttpContextContract) {
        // Controller permettant la récupération d'un utilisateur par son ID
    }

    // Controlleur permettant la récupération d'un utilisateur par son nom d'utilisateur
    public async getUserByUsername(ctx: HttpContextContract, username: String) {
        username = username.toString().toLowerCase()
        // Envoie de la requete de recherche d'utilisateur vers la base de données

        try {
            // On utilise la fonction getFirstListItem car il existe qu'un seul enregistrement du nom d'utilisateur
            // const record = await pb_client.collection("users").getFirstListItem("username='" + username + "'")

            // Utilisateur d'une requete axios au lieu du client pocketbase pour pouvoir tester l'authentification de l'utilisateur

            const response = await axios.get(`http://127.0.0.1:8090/api/collections/users/records?filter=(username='${username}')`, {
                headers: {
                    "Authorization": ctx.request.encryptedCookie("access_token")
                },
            })

            const record = response.data
            if (record.totalItems == 0) ctx.response.status(404).send({
                "result": "Utilisateur introuvable"
            })
            else {
                const user = record.items[0]
                delete user.collectionId
                delete user.collectionName
                delete user.created
                delete user.updated
                delete user.emailVisibility

                ctx.response.status(200).send({
                    "result": { ...user }
                })
            }
        } catch (e) {
            ctx.response.status(401)
        }
    }

    public async getUsers(ctx: HttpContextContract) {
        // Controlleur permettant la récupération de tous les utilisateurs
    }
    public async deleteMe(ctx: HttpContextContract) {
        // Controlleur permettant à l'utilisateur de supprimer son compte.

        // Il faut impérativement avoir un token utilisateur valid avant de pouvoir supprimer un compte
        // L'id du token devant correspondre à l'id du compte à supprimer

        // if (!token)
        //     ctx.response.status(401, {
        //         error: "Token is empty"
        //     })

        // a ce niveau,le token n'est pas vide ! On l'envoie donc vers notre base pocketbase pour vérification

        const userId = ctx.request.params().userId
        try {
            pb_client.collection("users").delete(userId)
            ctx.response.status(200).send({
                "result": "User deleted"
            })
        } catch (e) {
            ctx.response.status(401)
        }
    }
}
