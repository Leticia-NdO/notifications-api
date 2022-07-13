import { Request, Response } from "express";
import Animes from "../entities/Animes";
import LiveTV from "../entities/LiveTV";
import Movies from '../entities/Movies';
import Series from "../entities/Series";
import UserCollection from "../entities/UserCollection";


// quando o usuário clicar para seguir (ou favoritar) uma midia, será enviado uma requisição com o user_id, media_id.

// [x] Criar os models das tabelas de midia


class UserCollectionController {

    async switchFollowing(request: Request, response: Response) {

        // [x] Verificar se o usuário está com followingAll === true
        const followingAll = await UserCollection.findOne({
            where: {
                user_id: request.body.user_id,
                followingAll: true
            }
        }).catch((err) => {
            console.log(err)
            return response.status(500).send(err)
        })

        console.log(followingAll)


        if (followingAll) {

            // [x] Se estiver, verificar se ele já tem o following === false para aquela mídia específica

            const userItem: any = await UserCollection.findOne({
                where: {
                    media_id: request.body.media_id,
                    user_id: request.body.user_id,
                    following: false
                }
            }).catch((err) => {
                console.log(err)
                return response.status(500).send(err)
            })

            // [x] Se já tiver, o registro simplesmente é destruído
            if (userItem) {
                await UserCollection.destroy({
                    where: {
                        media_id: request.body.media_id
                    }
                }).then(() => {
                    return response.status(201).send()
                }).catch((err) => {
                    console.log(err)
                    return response.status(500).send()
                })
            }

            // [x] Se ainda não tem, cria um novo registro na sua coleção com following === false

            else {

                const tables: any = [Series, Animes, Movies, LiveTV]
                let mediaType = ''

                for (let i = 0; i < 4; i++) {
                    const aux = await tables[i].findOne({
                        where: {
                            tmdb_id: request.body.media_id
                        }
                    })

                    if (aux) {
                        mediaType = tables[i].name
                        break
                    }
                }

                await UserCollection.create({
                    user_id: request.body.user_id,
                    isFavorite: false,
                    following: false,
                    followingAll: null,
                    media_type: mediaType,
                    media_id: request.body.media_id
                }).then(() => {
                    return response.status(201).send()
                })

            }
        }

        else {



            // [x] Se followingAll === false | null, verificar se o usuário já segue ou não aquela midia

            const userItem: any = await UserCollection.findOne({
                where: {
                    media_id: request.body.media_id,
                    user_id: request.body.user_id
                }
            }).catch((err) => {
                console.log(err)
                return response.status(500).send(err)
            })

            // [x] Se já existe, muda o estado do following
            if (userItem) {
                await UserCollection.update({
                    following: !userItem.following
                }, {
                    where: {
                        user_id: request.body.user_id
                    }
                }).then(() => {
                    return response.status(201).send()
                }).catch((err) => {
                    console.log(err)
                    return response.status(500).send()
                })
            }

            // [x] Se ainda não existe, cria um novo registro na sua coleção

            // [x] Fazer uma sequência de findOne's em todas as tabelas de mídia até achar um resultado.
            else {

                const tables: any = [Series, Animes, Movies, LiveTV]
                let mediaType = ''

                for (let i = 0; i < 4; i++) {

                    console.log(tables[i])

                    const aux = await tables[i].findOne({
                        where: {
                            tmdb_id: request.body.media_id
                        }
                    })

                    if (aux) {
                        mediaType = tables[i].name
                        break
                    }
                }

                // [x] Após verificar em qual tabela essa mídia existe, o campo media_type é preenchido de acordo com isso. Então será criado um registro em user_collection com esses dados.

                await UserCollection.create({
                    user_id: request.body.user_id,
                    isFavorite: false,
                    following: true,
                    media_type: mediaType,
                    media_id: request.body.media_id
                }).then(() => {
                    return response.status(201).send()
                })

            }
        }
    }

    async switchFavorite(request: Request, response: Response) {

        const userItem: any = await UserCollection.findOne({
            where: {
                media_id: request.body.media_id
            }
        }).catch((err) => {
            console.log(err)
            return response.status(500).send()
        })

        if (userItem) {
            await UserCollection.update({
                isFavorite: !userItem.isFavorite
            }, {
                where: {
                    user_id: request.body.user_id,
                    followingAll: null
                }
            }).then((err) => {
                return response.status(201).send()
            }).catch((err) => {
                console.log(err)
                return response.status(500).send()
            })
        }

        else {


            const tables: any = [Series, Animes, Movies, LiveTV]
            let mediaType = ''

            for (let i = 0; i < 4; i++) {
                const aux = await tables[i].findOne({
                    where: {
                        tmdb_id: request.body.media_id
                    }
                })

                if (aux) {
                    mediaType = tables[i].name
                    break
                }
            }

            await UserCollection.create({
                user_id: request.body.user_id,
                isFavorite: true,
                following: false,
                media_type: mediaType,
                followingAll: null,
                media_id: request.body.media_id
            }).then(() => {
                return response.status(201).send()
            }).catch((err) => {
                console.log(err)
                return response.status(500).send()
            })
        }
    }


    // [x] Fazer switch do followingAll
    async switchFollowingAll(request: Request, response: Response) {

        // [x] Verificar se o usuário já está com o followingAll ligado
        const followingAll = await UserCollection.findOne({
            where: {
                user_id: request.body.user_id,
                followingAll: true
            }
        }).catch((err) => {
            console.log(err)
            return response.status(500).send(err)
        })


        // [x] Se tiver, destruir o regsitro de followingAll === true
        if (followingAll) {

            await UserCollection.destroy({
                where: {
                    user_id: request.body.user_id,
                    following: false
                }
            }).catch((err) => {
                console.log(err)
                return response.status(500).send()
            })

            await UserCollection.destroy({
                where: {
                    user_id: request.body.user_id,
                    followingAll: true
                }
            }).then(() => {
                return response.status(201).send()
            }).catch((err) => {
                console.log(err)
                return response.status(500).send()
            }) // possibilidade de ao destruir todos os registros, criar um novo só com o followingAll = false e id de usuário igual ao do request.body.user_id para podermos criar um dash que mostra todos que nao tem notificação ligada
        }

        // [x] Se não tiver, destruir todos os seus registros em user_collection e criar um de followingAll === true
        else {

            await UserCollection.destroy({
                where: {
                    user_id: request.body.user_id
                }
            }).catch((err) => {
                console.log(err)
                return response.status(500).send()
            })


            await UserCollection.create({
                user_id: request.body.user_id,
                isFavorite: null,
                following: null,
                followingAll: true,
                media_type: null,
                media_id: null
            }).then(() => {
                return response.status(201).send()
            }).catch((err) => {
                console.log(err)
                return response.status(500).send()
            })

        }




    }

}

export default new UserCollectionController