const express = require('express');
const routerWiki = express.Router();
const addPageHtml = require('../views/addPage');
const { Page } = require("../models/index");
const wikipage = require('../views/wikipage')
const main = require('../views/main')
//const { addPage } = require("../views/addPage");

routerWiki.get('/', async (req, res) => {
  
  const allPages = await Page.findAll()
  res.send(main(allPages))
 
})
// routerWiki.post('/', (req, res) => {
//   console.log(`<h1>descriptive tag </h1>`);
//   res.send(addPageHtml());
// });


routerWiki.get('/add', (req, res) => {

  res.send(addPageHtml());
})

routerWiki.get('/:slug', async(req,res) =>{
  const foundPage = await Page.findOne({
    where: {slug: req.params.slug}
  })
  res.send(wikipage(foundPage))

})



routerWiki.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  let tit = req.body.title;
  let cont = req.body.content;
  const page = new Page({
    title: tit,
    content: cont
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    console.log('inserted page:', page);

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});


module.exports = routerWiki;
