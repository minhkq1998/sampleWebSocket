'use strict';
// goi url
var url = 'http://localhost:8080';

function addProductPage() {
        let toName = document.getElementById("username").innerHTML;
        let toRole = document.getElementById("userRole").innerHTML;
        localStorage.setItem("userName", toName);
        localStorage.setItem("role", toRole);
        location.href = "productManager.html";
    }
    
    function addUserPage() {
        location.href = "userManager.html";
    }
    
    function toPublicPage() {
        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value;
        let role = document.getElementById("role").value;         
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
        localStorage.setItem("role", role);
        location.href = "home.html";
        
    }

    function publicToUserPage() {
        let toName = document.getElementById("username").innerHTML;
        let toRole = document.getElementById("userRole").innerHTML;
        localStorage.setItem("userName", toName);
        localStorage.setItem("role", toRole);
        location.href = "user.html";
    }

    function userToPublic() {
        let toName = document.getElementById("username").innerHTML;
        let toRole = document.getElementById("userRole").innerHTML;
        localStorage.setItem("userName", toName);
        localStorage.setItem("role", toRole);
        location.href = "user.html";
    }

    $(function () {
        $("form").on('submit', function (e) {
            e.preventDefault();
        });
        $( "#login" ).click(function() { toPublicPage(); });
        $( "#disconnect" ).click(function() { disconnect(); });
        $( "#send" ).click(function() { sendName(); });
    });
    
    
    
    