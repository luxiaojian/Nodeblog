var Blog = require('../models/blog');
var User = require('../models/user');

exports.new = function(req,res){
  res.render('new',{
    title:'发表新的文章'
  });
}

exports.index = function(req,res){
  Blog.find({},function(err,blogs){
    res.render('index',{
      blogs:blogs
    })
  })
}

exports.create = function(req,res){
  var blog = new Blog(req.body.blog),
    username = req.params.user;
  blog.updated =blog.created = Date.now();
  console.log(blog.tags);
  User.findOne({name: username},function(err,user){
    blog.userId = user._id;
    blog.save(function(err,blog){
      if(!err){
        res.redirect('/u/'+username + '/blog');
      }else{
        console.log(err);
      }
    })
  })
};

exports.list = function(req,res){
  var username = req.params.user;
  User.findOne({name:username},function(err,user){
    Blog.find({userId:user._id},function(err,blogs){
      res.render('list',{
        title: '文章列表页',
        blogs:blogs
      })
    })
  })
};

exports.edit =function(req,res){
  var id = req.params.id;
  Blog.findById(id,function(err,b){
    if(err){
      console.log(err);
    }
    res.render('edit',{
      b:b
    })
  })
};

exports.show= function(req,res){
  var id = req.params.id;
  Blog.findById(id,function(err,b){
    if(err){
      console.log(err);
    }
    res.render('show',{
      b:b
    })
  })
};

exports.update =function(req,res){
  var id = req.params.id;
  var b = req.body.blog;
  var name = req.params.user;
  Blog.findById(id,function(err,blog){
    blog.blogtitle = b.blogtitle;
    blog.blogbody = b.blogbody;
    blog.tags.push(b.tags);
    blog.updated = Date.now();
    blog.save(function(err,blog){
      if(err){
        console.log(err);
      }
      res.redirect('/u/'+name+'/blog/'+id);
    })
  })
};

