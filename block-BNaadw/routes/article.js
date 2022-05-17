const express = require('express');
const articleRouter = express.Router();
const articleModel = require('../models/article');
const commentModel = require('../models/comment');

articleRouter.get('/new', (req,res) => {
    return res.render('newArticle');
})

articleRouter.get('/', (req,res) => {
    articleModel.find({},(err,articles) => {
        if(err) next(err);
        res.render('articles', {articles});
    })
})

articleRouter.post('/:id/comment', (req,res) => {
    let body = {
        comment: req.body.comment.trim(),
        articleId: req.params.id
    }
    commentModel.create(body, (err,comment) => {
        console.log(err,comment);
        articleModel.findByIdAndUpdate(req.params.id,{"$push": {"comments":req.params.id}},(err,article) => {
            console.log(article);
            res.redirect('/articles/'+article.slug)
        })
    })
})

articleRouter.get('/:slug/:favor', (req,res) => {
    let favor = req.params.favor;
    articleModel.findOne({slug: req.params.slug},(err,article) => {
        if(err) next(err);
        let likes =  favor === 'like' ? article.likes+1: article.likes > 0? article.likes-1 : 0;
        articleModel.findByIdAndUpdate(article.id,{likes},(err,article)=>{
            console.log(err,article);
            res.redirect('/articles/'+article.slug);
        })
    })
})

articleRouter.get('/:slug', (req,res) => {
    console.log(req.params);
    articleModel.findOne({slug: req.params.slug}).populate('comments').exec((err,article) => {
        if(err) next(err);
        console.log(article);
        res.render('article', {article});
    })
})


articleRouter.post('/new', (req,res) => {
    articleModel.create(req.body, (err,article) => {
        console.log(err,article);
        res.redirect('/articles')
    })
})

module.exports = articleRouter;