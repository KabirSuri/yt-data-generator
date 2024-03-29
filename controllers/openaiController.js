const req = require('express/lib/request')
const res = require('express/lib/response')
const openai = require('../config/openaiConfig')

const generateMeta = async (req, res) => {
    const { title } = req.body

    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "user", 
                "content": `Come up with a description for a YouTube video called ${title}`
            }
        ],
        max_tokens: 100
    })

    //console.log(description.choices[0].message)

    const tags = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "user", 
                "content": `Come up with ten key words for a YouTube video called ${title}`
            }
        ],
        max_tokens: 100
    })

    //console.log(tags.choices[0].message)
    res.status(200).json({
        description: description.choices[0].message,
        tags: tags.choices[0].message
    })
}

const generateImage = async (req, res) =>{

    const image = await openai.images.generate({
        //model="dall-e-3",
        prompt: req.body.prompt,
        size: "512x512",
        quality: "standard",
        n: 1,
    })

    console.log(image.data[0].url)
    res.json({
        url: image.data[0].url
    })

}

module.exports = { generateMeta, generateImage }