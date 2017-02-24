const api = {
  getBio(username){
    username = username.toLowerCase().trim();
    let url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res) => res.json());
  },
  getRepos(username , pageId){
    if(!pageId){
      pageId=1;
    }
    username = username.toLowerCase().trim();
    let url = `https://api.github.com/users/${username}/repos?page=${pageId}&per_page=50`;
    return fetch(url).then((res) => res.json());
  },
  getNotes(username){
    username = username.toLowerCase().trim();
    let url = `https://githubnota.firebaseio.com/${username}.json`;
    return fetch(url).then((res)=>res.json());
  },
  addNote(username,note){
    username = username.toLowerCase().trim();
    let url = `https://githubnota.firebaseio.com/${username}.json`;
    return fetch(url,{
      method:'post',
      body:JSON.stringify(note)
    }).then((res)=>res.json());
  },
};

export default api;
