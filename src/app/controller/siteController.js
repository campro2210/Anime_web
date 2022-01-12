const { query } = require("express");
const Book = require("../models/Book");

class SiteController {
    //GET
    home(req, res, next) {
        Book.find({}).sort({'_id':-1}).limit(24)
            .then(result => res.render('home', { result }))
            .catch(next);

    };
    search(req, res, next) {
        Book.find({ name: { "$regex": req.query.name, "$options": "i" } })
            .then(result => res.json({ result }))
            .catch(next);

    };
    //[GET] --detail book-- address: .../book/:slug
    detail(req, res, next) {
        Book.findOne({ slug: req.params.slug })
            .then(result => res.render('detail', {
                result,
            }))
            .catch(next);

    };

    notpage(req, res, next) {
        res.render('404');
    };

    showAll(req, res, next) {
        Promise.all([Book.find({}), Book.countDocumentsDeleted(), Book.count()])
            .then(([result, totalDel,total]) => res.json({
                result,
                totalDel,
                total,
            }))
            .catch(next)
    };
    searchOne(req,res,next){
        Book.find({ _id: req.query.q })
            .then((result) => res.json({
                result,
            }))
            .catch(next)
    }

    searchType(req, res, next) {
        Promise.all([Book.find({ type: req.query.q }), Book.countDocumentsDeleted(), Book.count()])
            .then(([result, totalDel, total]) => res.json({
                result,
                totalDel,
                total,
            }))
            .catch(next)
    };

    searchName(req, res, next) {
        Promise.all([Book.find({ name: { "$regex": req.query.q, "$options": "i" } }), Book.countDocumentsDeleted(), Book.count()])
            .then(([result, totalDel, total]) => res.json({
                result,
                totalDel,
                total,
            }))
            .catch(next)
    }
}

module.exports = new SiteController();
