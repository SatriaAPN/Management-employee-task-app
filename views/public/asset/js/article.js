const sendDeleteCommentRequest = async(commentUuid, articleUrl) => {
    let result = await $.ajax({
        url: `/comments/delete/${commentUuid}`,
        type: 'DELETE',
    });

    if(typeof result != "undefined"){
        if(result.message == 'succes deleting the comment'){
            alert(result.message);
            location.replace(`/${articleUrl}`);
        }else{
            alert('deleting failed');
        }
    }
}