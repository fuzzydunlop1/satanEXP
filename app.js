require('dotenv').config()

const Snoowrap = require('snoowrap')
const Snoostorm = require('snoostorm')
const fs = require('fs')

const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

const streamOpts = {
    subreddit: 'all',
    results: 200
};

const comments = client.CommentStream(streamOpts);

let rawdata = fs.readFileSync('data.json')
let data = JSON.parse(rawdata)

let satanexp = data.satanexp;
let godexp = data.godexp;

const satanreply = (comment, count) => {

            return `/u/${comment.author.name} uses "Mormon". This is a victory for Satan. Satan is now beating Mormon God {satanexp} to {godexp}\n\n ^(I am a bot. [Click here to find out what this is about.](https://www.nytimes.com/aponline/2018/10/07/us/ap-us-rel-mormon-conference-church-name.html))`        
   
}

const godreply = (comment, count) => {

            return `/u/${comment.author.name} uses "Latter-day Saint". This is a victory for God. However, Satan is still beating Mormon God {satanexp} to {godexp}\n\n ^(I am a bot. [Click here to find out what this is about.](https://www.nytimes.com/aponline/2018/10/07/us/ap-us-rel-mormon-conference-church-name.html))`        
   
}

const saveData = (satanexp, godexp) => {
    let data = JSON.stringify({
        satanexp,
        godexp
    })
    fs.writeFileSync('data.json', data)
}

const checkGodFalseFlags = (comment) => {
    if (comment.body.toLowerCase().includes('mormont')){
        return false
    } else if (comment.author.name.toLowerCase() == 'satanexp' ) {
        return false
    } else if (comment.body.toLowerCase().includes('exmormon')) {
        return false
    } else if (comment.body.toLowerCase().includes('mormon')) {
        return true
    } else if (comment.body.toLowerCase().includes('latter-day saint')) {
        return true
    } else if (comment.body.toLowerCase().includes('latter day saint')) {
        return true
    } else {
        return false
    }
}

const checkSatanFalseFlags = (comment) => {
    if (comment.body.toLowerCase().includes('mormont')){
        return false
    } else if (comment.author.name.toLowerCase() == 'satanexp' ) {
        return false
    } else if (comment.body.toLowerCase().includes('exmormon')) {
        return false
    } else if (comment.body.toLowerCase().includes('mormon')) {
        return true
    } else if (comment.body.toLowerCase().includes('latter-day saint')) {
        return true
    } else if (comment.body.toLowerCase().includes('latter day saint')) {
        return true
    } else {
        return false
    }
}

comments.on('comment', (comment) => {
    if (checkGodFalseFlags(comment)) {
        console.log(`****${comment.subreddit_name_prefixed} - ${comment.link_title}****`);
        console.log(`****${comment.body}**** \n`);
        godexp++
        saveData(satanexp, godexp);
        const replyMessage = reply(comment, count)
        comment.reply(replyMessage)
    }   
    if (checkSatanFalseFlags(comment)) {
        console.log(`****${comment.subreddit_name_prefixed} - ${comment.link_title}****`);
        console.log(`****${comment.body}**** \n`);
        satanexp++
        saveData(satanexp, godexp);
        const replyMessage = reply(comment, count)
        comment.reply(replyMessage)
    } 
})
