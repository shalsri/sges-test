var sampleId = window.localStorage.getItem("sampleId");
// alert(sampleId)

$(document).ready(function() {

    var imageId = ""

    $.ajax({
        url: baseurl + "/samples/onesample/"+ sampleId,
        type: 'Get',
        success: function (data) {
            console.log(data)

            if(data[0].sampleImageId != null){
                imageId = data[0].sampleImageId[0]
            }

            var arrivalCompleteDate = new Date(data[0].dateOfSampleArrival * 1000);
            var arrivalLoggingDate  = new Date(data[0].dateOfSampleLogging * 1000) 
            

            // console.log(sampleArrivalDate)
            $('#sampleId').val(data[0].sampleId)
            $('#sampleType').val(data[0].sampleType)
            $('#sampleWeight').val(data[0].sampleWeight)
            $('#sampleStatus').val(data[0].sampleStatus)
            $('#dateOfSampleArrival').val(dateStringToCalendarFeedableDate(arrivalCompleteDate))
            $('#dateOfSampleLogging').val(dateStringToCalendarFeedableDate(arrivalLoggingDate))
            $('#sampleObservations').val();

            $('#sampleImage'). attr("src", baseurl + '/samples/sampleimage?mediaId=' + imageId);

        }
    });

    $('#editForm').click(function(){

        $("#sampleId").prop('disabled', false);
        $('#sampleType').prop('disabled', false)
        $('#sampleWeight').prop('disabled', false)
        $('#sampleStatus').prop('disabled', false)
        $('#dateOfSampleArrival').prop('disabled', false)
        $('#dateOfSampleLogging').prop('disabled', false)
        $('#sampleObservations').prop('disabled', false)
        $('#UploadedFile').css('display', 'block')
        $('#editFormSubmit').css('display','block')
        $('#editForm').css('display','none')

    });

    $('#editFormSubmit').click(function(){

        // alert(
        // $("#sampleId").val() +
        // $('#sampleType').val() + 
        // $('#sampleWeight').val() + 
        // $('#sampleStatus').val() + 
        // new Date($('#dateOfSampleArrival').val()).getTime() / 1000 + 
        // new Date($('#dateOfSampleLogging').val()).getTime() / 1000 + 
        // $('#sampleObservations').val())

        var editedSampleArrivalDate = new Date($('#dateOfSampleArrival').val()).getTime() / 1000
        var editedSampleLogginglDate = new Date($('#dateOfSampleLogging').val()).getTime() / 1000

        var formData = new FormData();
        formData.append("projectId","abc")
        formData.append("sampleWeight",$('#sampleWeight').val())
        formData.append("sampleType",$('#sampleType').val())
        formData.append("dateOfSampleArrival",editedSampleArrivalDate)
        formData.append("dateOfSampleLogging",editedSampleLogginglDate)
        formData.append("sampleStatus",$('#sampleStatus').val())
        formData.append("sampleId",$('#sampleId').val())
        formData.append("photo",$('#UploadedFile')[0].files[0])

        $.ajax({
            url: baseurl + "/samples/updatesample/" + sampleId,
            type: 'POST',
            data: formData,
            async: false,
            success: function (data) {
                // alert(data)
                location.reload()
            },
            cache: false,
            contentType: false,
            processData: false
        })

    });

    $("#UploadedFile").change(function() {
        readURL(this);
      });

      $("#sarathyHome").click(function(){
        location.href = 'dashboard.html'
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#blah').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
