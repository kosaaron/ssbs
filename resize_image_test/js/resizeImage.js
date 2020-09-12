
document.getElementById("sendPhoto").addEventListener("click", function (params) {
    alert('Siker');
    let photoTagId = 'pic1'; // 

    if(photoTagId !== null){
        $.ajax({
            type: "POST",
            url: "./php/resizeImage.php",
            data: {
                PhotoTagId: photoTagId
            },
            success: function (data) {
                $("#" + photoTagId).attr("src",data['Base64file']);
            },
            dataType: 'json'
        });
    }
})


