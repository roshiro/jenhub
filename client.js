var yaml = require('js-yaml').safeLoad
var _ = require('lodash');
var config = require('config-node')({	yml: yaml })
var url = "http://" + config.jenkins.username + ':' + config.jenkins.password + '@' + config.jenkins.url
console.log('connecting to url...' + config.jenkins.url)
var jenkins = require('jenkins')(url)



jenkins.info(function(err, data) {
   if (err) throw err;
   _.forEach(data.jobs, function(j){
     if(j.name.indexOf('Sage_One_Payroll_Core_Abe') > -1){
       console.log(j.name, j.url)
       jenkins.build.get(j.name, 318, function(err, data){
         console.log(data.changeSet)
       })
     }
   })
});
