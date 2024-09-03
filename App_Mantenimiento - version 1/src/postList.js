const postList = document.querySelector('.Activos')
/*
export const setupPosts = (data)=>{
    if(data.length){
        //console.log('loop posts')
        data.forEach(doc =>{
          const post = doc.data()
          console.log(post)
        })
        //console.log(postList)
    } else {
      //console.log('no posts')
        postList.innerHTML ='<h1> No hay post </h1>'
    }
}*/

export const setupPosts = (data)=>{
  if(data.length){
    let html = ''
    data.forEach(doc =>{
        const post = doc.data()
        const li = `
        <li class="list-group-item list-group-item-action">
            <h5>${post.content}</h5>
            <p>${post.id}</p>
          </li>
        `
        
        //html += li
       })

    postList.innerHTML = html
  } else {
    //console.log('no posts')
    postList.innerHTML ='<h1> No hay post </h1>'
  }
}

