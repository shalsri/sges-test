$(document).ready(function() {

    $("#coreboxCard").click(function(){
        // alert("Corebox Card!!!!!!!!!!");
        location.href = "CoreboxList.html"
    });

    $("#sampleCard").click(function(){
        // alert("Sample Card!!!!!!!!!!");
    });
    
    $("#logout").click(function(){

        if (confirm('Are you sure you want to logout?')) {
            // Save it!
            $.ajax({
                url: baseurl + "/logout",
                type: 'POST',
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    location.href = 'index.html'
                }
            })
          } else {
            // Do nothing!
            return
          }

    });




});