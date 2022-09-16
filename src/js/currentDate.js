function setData(){
    const date = new Date();
    const data = document.querySelector('.current-date');
    let opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    data.innerHTML = `${date.toLocaleDateString('pt-BR', opcoes)}`;

}

setData();