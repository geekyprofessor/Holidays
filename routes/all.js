var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    req.locals = { combined : new Array() };

    var _res = { 
        json : function(md){ 
            if (md.Name) {
                md.routeName = req.locals.routeName;
                req.locals.combined.push(md);
            }
        },
        send : function() {}
     }

    for(var _routeName in res.locals.availableRoutes){
        if (_routeName != 'all') {
            var _route = res.locals.availableRoutes[_routeName]; 
            req.locals.routeName = _routeName;
            _route(req, _res, next);
        } 
    } 
    try {
        res.json(req.locals.combined);
    }
    catch (ex) {}
});

router.get('/:year', function(req, res, next){
    req.locals = { combined : new Array() };

    var _res = { 
        json : function(md){ 
            if (md.Name) {
                md.routeName = req.locals.routeName;
                req.locals.combined.push(md);
            }
        },
        send : function() {}
     }

    for(var _routeName in res.locals.availableRoutes){
        if (_routeName != 'all') {
            var _route = res.locals.availableRoutes[_routeName]; 
            req.locals.routeName = _routeName;
            _route(req, _res, next);
        } 
    } 
    try {
        res.json(req.locals.combined);
    }
    catch (ex) {}
});


module.exports = router;