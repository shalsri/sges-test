
//Epoch to date conversions
function dateStringToCalendarFeedableDate(completeDateTime){
    console.log(completeDateTime.getUTCMonth())

    var dateString = ""
    var monthString = ""
    var yearString = ""
    var returnString = ""

    if(completeDateTime.getDate() < 10){
        dateString = "0"  + completeDateTime.getDate()
    }else{
        dateString = completeDateTime.getDate()
    }

    if(completeDateTime.getMonth() < 10){
        monthString = "0" + completeDateTime.getMonth()
    } else{
        monthString = completeDateTime.getMonth()
    }

    returnString = completeDateTime.getFullYear() + "-" + monthString + "-" + dateString
    console.log(returnString)
    return returnString

}