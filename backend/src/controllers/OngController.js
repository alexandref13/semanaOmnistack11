const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports ={
    async create(req,res){

        const { name, email, whatsapp, city, uf } = req.body
        
        let [ong_name] = await connection('ongs').where('name', name).count()
        let [ong_email] = await connection('ongs').where('email', email).count()

        if(ong_name['count(*)'] === 0 && ong_email['count(*)'] === 0){
            const id = generateUniqueId()

            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
            })
            
            return res.json({ id })
        }if(ong_name['count(*)'] === 0 && ong_email['count(*)'] > 0){
            return res.json({error: "Email already exist "})
        }
        if(ong_name['count(*)'] > 0 && ong_email['count(*)'] === 0){
            return res.json({error: "Name already exist "})
        }
        if(ong_name['count(*)'] !== 0 && ong_email['count(*)'] !== 0){
            let [ong] = await connection('ongs').where({
                'name':name,
                'email': email,
                'whatsapp': whatsapp,
                'city': city,
                'uf': uf
            }).select('id')


            return res.json(ong);
        } 
    },
    async index(req,res){

        const ongs = await connection('ongs').select('*');

        return res.json(ongs)
    }
}