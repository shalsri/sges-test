$(document).ready(function() {

    $.ajax({
        url: baseurl + "/samples",
        type: 'Get',
        async: false,
        success: function (data) {
            // alert(data.length)

            for (i = 0; i < data.length;i++){

                $('#listOfSamples').append(
                    '<tr id='+data[i].uniqueSampleId+' onclick="extractId(this)">'+
                        '<td id=>'+data[i].sampleId+'</td>'+
                        '<td>'+data[i].sampleType+'</td>'+
                        '<td>'+data[i].sampleStatus+'</td>'+
                    '</tr>');
            }
            
        },
        cache: false,
        contentType: false,
        
    });


    $("#addSamplesScreen").click(function(){
        location.href = 'addSample.html'
    });

    $("#sarathyHome").click(function(){
        location.href = 'dashboard.html'
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
          }

    });
});

function extractId(row){
    // alert(row.id);
    window.localStorage.setItem("sampleId",row.id )
    window.location.href = 'sampleDetails.html';
}