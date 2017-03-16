Meteor.startup(function() {
    
    
    // MONGO_URL="mongodb://djisse:paela95v@ds139278.mlab.com:39278/heroku_3xpfhsv3";
    // console.log("URL= ");
    // console.log(MONGO_URL); 
    


    if(Meteor.users.find().count() == 0) {
        var users = [
            {name:"admin",email:"admin@admin.com",roles:['admin']}
        ];
        _.each(users, function (user) {
            var id;
            var num = 7;
            id = Accounts.createUser({
                email: user.email,
                password: "123",
                profile: { username: user.name ,num_affiliate:num}
            });
            Roles.addUsersToRoles(id, user.roles);
        });
    }
});