const makeDELETErequest = async(postId) => {
    console.log({postId: postId})
    let result = await $.ajax({
        url: `/articles/delete/${postId}`,
        type: 'DELETE',
    });

    if(typeof result != "undefined"){
        if(result.message == 'succes deleting the post'){
            alert(result.message);
            location.replace("/users")
        }else{
            alert('deleting failed');
        }
    }
}