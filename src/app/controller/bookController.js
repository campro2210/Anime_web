const { render } = require("ejs");
const Book = require("../models/Book");
//ADMIN
class BookController {

    //[GET] --page admin book: address: .../admin
    manager(req, res, next) {
        Promise.all([Book.find({}), Book.countDocumentsDeleted(), Book.count()])
            .then(([result, totalDel,total]) => res.render('admin/admin', {
                result,
                textsearch: req.query.name,
                totalDel,
                total
            }))
            .catch(next)

    };

    //[POST] --save book-- address: .../admin/create/
    store(req, res, next) {
        const data = new Book(req.body);
        data
            .save()
            .then(() => res.json({ mess: 'Create Success!!!' }))
            .catch(next);

    };

    //[GET] --show page update-- address: .../update/:id
    edit(req, res, next) {
        Book.findById(req.params.id)
            .then(book => res.render('admin/update', {
                book,
            }))
            .catch(next);

    }

    //[PUT].../update/:id
    update(req, res, next) {
        Book.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ mess: 'Update Success!!!' }))
            .catch(next);

    }

    //[POST] ...control in form .../admin/control-actionForm
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'DELETE':
                Book.delete({ _id: { $in: req.body.bookIds } })
                    .then(() => res.json({ mess: 'Delete Success!!!' }))
                    .catch(next);
                break;
            case 'DELETE-ALL':
                Book.remove({ _id: { $in: req.body.bookIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'RESTORE':
                Book.restore({ _id: { $in: req.body.bookIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default: res.json({ mess: 'not active' })
        }

    }

    //[DELETE] .../admin/delete/:id
    destroy(req, res, next) {
        Book.delete({ _id: req.params.id })
            .then(() => res.json({ mess: 'Delete Success!!!' }))
            .catch(next);

    }

    // [DELETE] .../admin/delete/:id/force
    forceDestroy(req, res, next) {
        Book.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }

    //[GET] --page admin book,trash: address: .../admin/trash
    trash(req, res, next) {
        Book.findDeleted({})
            .then((result) => res.render('admin/trash', {
                result,
            }))
            .catch(next);

    };

    // [PATCH] .../admin/trash/:id/restore
    restore(req, res, next) {
        Book.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);

    }

}

module.exports = new BookController();
