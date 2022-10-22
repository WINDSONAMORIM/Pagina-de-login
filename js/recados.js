let linha, coluna1, coluna2, coluna3, id;
let tabelaRecado = document.getElementById('tabelaLista');
let logado = document.getElementById('user');
const btnInserir = document.getElementById('btnInserir');
const off = document.getElementById('off');
let imgEditar = document.createElement('img');
let imgExcluir = document.createElement('img');

const userLogado = JSON.parse(sessionStorage.getItem('chave'));
logado.innerText = userLogado.email;

off.addEventListener('click', deslogar);

btnInserir.addEventListener('click', (e) =>{
    e.preventDefault(); 
    if(btnInserir.value == 'Inserir'){
        btnInserir.onclick = inserir();
    }else{
        btnInserir.onclick = atualizar();
    }
})

const atualizaRecado = (recado) => localStorage.setItem('recado', JSON.stringify(recado));
const recuperaRecado = () => JSON.parse(localStorage.getItem('recado') || '[]');

preencher();

function preencher(){
    let recados = recuperaRecado();

    const recado = recados.filter((recado) =>{
        return recado.email == userLogado.email  
    })
     
    recado.forEach((element) => {
        criarPlanilha()

        linha.setAttribute('id',element.id)
        coluna1.innerHTML = element.motivo;
        coluna2.innerHTML = element.descricao;
        coluna3.appendChild(imgEditar);
        coluna3.appendChild(imgExcluir); 
        
        imgEditar.addEventListener('click',(e) =>{
            const rowId = e.target.parentNode.parentNode.id;
            editar(rowId)     
        })

        imgExcluir.addEventListener('click',(e)=>{
            const linha = e.target.parentNode.parentNode;
            recados = recados.filter(dado => dado.id != linha.id)
            atualizaRecado(recados);
            linha.remove();
        })
    });
}

function inserir(){
    const motivo = document.getElementById('inputMotivo').value;
    const descricao = document.getElementById('inputDescricao').value;

    if(validaCampos(motivo, descricao)){          
        const recados =  recuperaRecado();

        recados.push({
            id: recados.length +1,
            email: userLogado.email,   
            motivo: document.getElementById('inputMotivo').value,     
            descricao: document.getElementById('inputDescricao').value
        })

        criarPlanilha()
        coluna1.innerHTML = motivo;
        coluna2.innerHTML = descricao;
        coluna3.appendChild(imgEditar)
        coluna3.appendChild(imgExcluir)

        imgEditar.addEventListener('click',(e) =>{
            const rowId = e.target.parentNode.parentNode.id;
            editar(rowId)     
        })

        imgExcluir.addEventListener('click',(e)=>{
            const linha = e.target.parentNode.parentNode;
            recados = recados.filter(dado => dado.id != linha.id)
            atualizaRecado(recados);
            linha.remove();
        })
               
        atualizaRecado(recados);
    }        
}

function validaCampos(motivo, descricao){
    if(!motivo || !descricao){
        alert('preencha os dados')
        return
    }else{
        return true
    }
} 

function criarPlanilha(){
    linha   = tabelaRecado.insertRow(-1);
          
    coluna1 = linha.insertCell(0);
    coluna2 = linha.insertCell(1);
    coluna3 = linha.insertCell(2); 

    coluna1.setAttribute('class','row-data');
    coluna2.setAttribute('class','row-data');
    coluna3.setAttribute('class','row-data');

    coluna2.style.cssText= 'text-align: center'
    coluna3.style.width = '15%'

    imgEditar = document.createElement('img');
    imgEditar.setAttribute('src',"./assets/imagens/editar.png");
    imgExcluir = document.createElement('img');
    imgExcluir.setAttribute('src','./assets/imagens/delete.png');
    imgEditar.setAttribute('class','acao');
    imgExcluir.setAttribute('class','acao');
}

function editar(rowId){

    btnInserir.setAttribute('value',"atualizar")
    //recupera a linha selecionada
    const data = document.getElementById(rowId).querySelectorAll(".row-data"); 
    //recupera o valor da planilha e coloca nos inputs
    document.getElementById('inputMotivo').value = data[0].innerText;
    document.getElementById('inputDescricao').value = data[1].innerText; 
    id = rowId;    
}

function atualizar(){
    const motivo = document.getElementById('inputMotivo').value;
    const descricao = document.getElementById('inputDescricao').value; 

    if(validaCampos(motivo, descricao)){  
        let recados = recuperaRecado();
        const recado = recados.find(dado => dado.id == id);

        recado.motivo = motivo;
        recado.descricao = descricao;
        atualizaRecado(recados)
        location.reload()
        console.log(id)
        console.log(recados[id-1] )
        console.log(recados)
    }
}

function deslogar(){
    open('index.html',target='_parent')
    sessionStorage.clear();
}