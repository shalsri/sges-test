$(document).ready(function() {

$("#addSampleFormSubmit").click(function(){

        // location.href = 'sampleDetails.html'

        // if(validateForm() == false){
        //     alert("Fill all the fields");
        //     return
        // }

        var date_sample_arrival = new Date($('#sampleArrivalDate').val()).getTime() / 1000
        var date_sample_logging = new Date($('#sampleArrivalLog').val()).getTime() / 1000

        // alert(date_sample_arrival)

        var formData = new FormData();

        formData.append("projectId","abc")
        formData.append("sampleWeight",$('#sampleWeight').val())
        formData.append("sampleType",$('#sampleType').val())
        formData.append("dateOfSampleArrival",date_sample_arrival)
        formData.append("dateOfSampleLogging",date_sample_logging)
        formData.append("sampleStatus",$('#sampleStatus').val())
        formData.append("sampleId",$('#sampleId').val())
        formData.append("photo",$('#UploadedFile')[0].files[0])

        $.ajax({
            url: baseurl + "/samples/initSample",
            type: 'POST',
            data: formData,
            async: false,
            success: function (data) {
                // alert(data)
                alert("Sample added")
                location.href = 'sampleList.html'
            },
            cache: false,
            contentType: false,
            processData: false
        })

    });

    $("#sarathyHome").click(function(){
        location.href = 'sampleList.html'
    });


});

function validateForm() {
    var isValid = true;
    $('.addSampleForm').each(function() {
      if ( $(this).val() === '' )
          isValid = false;
    });
    
    return isValid;
  }