const e = require('cors');
const express = require('express');
const router = express.Router();
const Comments = require('../models/Comments')

//display reported comments
router.get('/reportedcomments',(req,res) => {
    Comments.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

router.get('/comrepcount', (req, res) =>{
    var query = Comments.find({isVisible:'false'})
    query.count(function(err, count) {
        if (err) {
            console.log(err);
        } else {
           res.json({count});
        }
    });
})

router.put('/restorecomment/:id', async (req,res)=>{
    try{
        console.log('comment restored');
        await Comments.findByIdAndUpdate(req.params.id,{
            isVisible:req.body.isVisible
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
})

router.delete('/reportedcomments/delete/:id',(req,res)=>{
    Comments.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            res.json({status:'error'});
        }else{
            res.json({status:'ok'});
        }
    })
})

// Post comment
router.post('/addComment', async (req, res) => {
    try {
        await Comments.create({
            commentAuthor: req.body.commentAuthor,
            postId: req.body.postID,
            responseTo: req.body.responseTo,
            comment: req.body.comment,
            time: req.body.commentTime,
            image: req.body.image
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

// Retrieve comments
router.get('/getComments', async (req, res) => {
    Comments.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Report a comment
router.put('/addReport/:id', (req, res) => {
    Comments.findByIdAndUpdate(
        req.params.id,
        {
            description: req.body.description,
            isVisible: false
        },
        (err, updatedComment) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated succesfully"
            });
        }
    );
});

// Edit a comment
router.put('/editComment/:id', (req,res) => {
    Comments.findByIdAndUpdate(
        req.params.id,
        {
            isEdited: true,
            comment:req.body.comment
        },
        (err, updatedComment) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated succesfully"
            });
        }
    )
})

// Retrieve specific comment
router.get("/getComment/:id", (req,res) => {
    
    let commentId = req.params.id;

    Comments.findById(commentId,(err,comment) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            comment
        });
    });
});

// Delete a comment
router.delete('/deleteComment/:id',(req,res) => {
    Comments.findByIdAndRemove(req.params.id).exec((err,deletedComment) => {
        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });

        return res.json({
            message:"Delete successful",deletedComment
        });
    });
});

module.exports = router;
