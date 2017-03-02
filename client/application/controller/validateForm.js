$.validator.setDefaults({
	rules: {
    	username: {
    		required: true
    	},
    	siretnum:{
    		required: true
    	},
    	contactname:{
    		required: true
    	},
        email: {
            required: true,
            email: true
        },
        phone:{
        	required: true,
        	number: true
        },
        address:{
        	required: true
        },
        password: {
            required: true,
            minlength: 6
        },
        agree:{
        	required: true
        },
        passport: {
    		required: true
    	}
    }
});