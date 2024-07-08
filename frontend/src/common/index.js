const backendDomin = "http://localhost:5000"

const SummaryApi =  {
    signUp : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    deleteUser : {
        url : `${backendDomin}/api/delete-user`,
        method : 'delete'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    updateProfile : {
        url : `${backendDomin}/api/update-profile`,
        method : "post"
    },
    updatePassword : {
        url : `${backendDomin}/api/update-password`,
        method : "post"
    },
    google_login_success : {
        url : `${backendDomin}/api/login/success`,
        method : 'get'
    },
    google_login_failed : {
        url : `${backendDomin}/api/login/failed`,
        method : 'get'
    },
    google_logout : {
        url : `${backendDomin}/api/logout`,
        method : 'get'
    },
    google_profile : {
        url : `${backendDomin}/api/google`,
        method : 'get'
    },
    google_callback : {
        url : `${backendDomin}/api/google/callback`,
        method : 'get'
    },
    refund : {
        url : `${backendDomin}/api/refund/create`,
        method : 'post'
    }, 
    allMyBooking : {
        url : `${backendDomin}/api/myBooking/read`,
        method : 'get'
    }
}
export default SummaryApi